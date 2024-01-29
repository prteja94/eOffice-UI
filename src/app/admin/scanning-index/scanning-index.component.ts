import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  Input,
  OnDestroy
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import Dynamsoft from 'dwt';
import { WebTwain } from 'dwt/dist/types/WebTwain';
import { ThumbnailViewer } from 'dwt/dist/types/WebTwain.Viewer';
import { ThumbnailViewerSettings } from 'dwt/dist/types/WebTwain.Viewer';
import { ViewMode } from 'dwt/dist/types/WebTwain.Viewer';
import { ViewerEvent } from 'dwt/dist/types/WebTwain.Viewer';

import { environment } from '../../../environments/environment';


import { TranslateService } from '@ngx-translate/core';

import { TreeNode } from './tree-node.model';
import { TreeService } from './tree.service';

//import { ErrorStateMatcher } from '@angular/material/core';
import {  NgbModal, NgbModalConfig, NgbDate, NgbDateStruct, NgbCalendar, NgbDatepickerModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

/** Error when invalid control is dirty, touched, or submitted. */
/*export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}*/

@Component({
  selector: 'app-scanning-index',
  templateUrl: './scanning-index.component.html',
  styleUrls: ['./scanning-index.component.scss']
})

export class ScanningIndexComponent implements AfterViewInit, OnInit{
  submitted = false;
  active = 1;

  
  constructor(private cdr: ChangeDetectorRef, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private translate: TranslateService) {
    translate.setDefaultLang('en');
  }
    
  model3: string;
  model4: string;

  selectedOption: string = 'option1'; // To store the selected radio button option
  option1Value: string;   // To store form data for Option 1
  option2Value: string;   // To store form data for Option 2
  topOrgUnitData: OrgUnit[] = [];
  orgNameData: OrgUnit[] = [];
  priorityData: PriorityMaster[] = [];
  classData: DocumentClassificationMaster[] = [];
  userData: UserMaster[] = [];
  externalLocData: ExternalLocationMaster[] = [];
  isFormDisabled: boolean = false;

  changeLanguage(lang: string) {
    this.translate.use(lang); // Switch the active language
  }

  ngAfterViewInit() { }


  /**
   * Global variables and status flags.
   */
  public bWin = true;
  public dwtMounted = false;
  public bMobile: boolean;
  public bUseCameraViaDirectShow: boolean;
  public containerId = "dwtcontrolContainer";
  public videoContainerId = "videoContainer";
  public editorShown = false;
  public devices: Device[];
  public showDevices: boolean = false;
  public deviceName: string = "Choose...";
  public thumbnail: ThumbnailViewer;
  public emptyBuffer: boolean = true;
  public zones: Zone[] = [];
  public mainViewerPos = { x: 0, y: 0 };
  public videoPlaying: boolean = false;
  public showVideoText: string = "Show Video";
  public instantError: string = "There is no image in buffer!";
  public outputMessages: Message[] = [];
  public historyMessages: Message[] = [];
  public bDontScrollMessages: boolean = true;
  scanningData : ScanningIndex = {
    activityId: 0,
    refNo: '',
    barcodeId: "",
    seqno: "",
    docRefNumber: "",
    docRoute: "",
    docSubRoute: "",
    docType: 0,
    docTypeName: "",
    externalLocId: 0,
    extLocName: "",
    extUserName: '',
    folderDesc: "",
    folderId: 0,
    folderPath: "",
    internOrgId1: 0,
    internOrgId2: 0,
    subject: "",
    priorityId: 0,
    classId: 0,
    addedOn: '',
    internUserId: 0,
    archiever: 0,
    recOrSen:0
  };

  /**
   * Buffer info
   */
  public current: 0;
  public count: 0;
  /**
   * Options.
   */
  public formatsToImport = {
    JPG: true,
    PNG: true,
    TIF: false,
    PDF: false
  };

  @ViewChild('myForm')
  ngForm:FormGroup;

  clearMessage() {
    this.instantError = "";
  }
  showMessage(msg: string) {
    this.instantError = msg;
  }

  ngOnInit(): void {
    Dynamsoft.DWT.Containers = [{
        WebTwainId: 'dwtObject',
        ContainerId: this.containerId,
        Width: '100%',
        Height: '600px'
    }];
    Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => {
      this.Dynamsoft_OnReady();
      
     
    });
    Dynamsoft.DWT.ProductKey = environment.Dynamsoft.dwtProductKey;
    Dynamsoft.DWT.ResourcesPath = environment.Dynamsoft.resourcesPath;
    Dynamsoft.DWT.Load();
  }
  
  DWObject: WebTwain | any = null;
  Dynamsoft_OnReady() {
    this.DWObject = Dynamsoft.DWT.GetWebTwain(this.containerId);
    //this.DWObject.Viewer.createImageEditor().show();
    this.DWObject.Crop();
    this.DWObject.ChangeBitDepth();
    this.DWObject.SetDPI();
    this.DWObject.ConvertToBW();
    this.DWObject.ConvertToGrayScale();
    this.DWObject.Invert();
    this.Dynamsoft_OnReady();
    
  }

  updateViewer() {
    if (this.DWObject){
		this.thumbnail = this.DWObject.Viewer.createThumbnailViewer(<ThumbnailViewerSettings>{size: '20%'});
		this.DWObject.Viewer.width = "100%";
		this.DWObject.Viewer.height = "100%";
		this.thumbnail.show();
		return true;
	}
    else
      return false;
  }

  onSubmit(): void {
    this.submitted = true;
    this.scanningIndexService.create(this.scanningData).subscribe(
      (response) => {
        this.scanningData.refNo = response.body.refNo;
        this.isFormDisabled = true;
        this.cdr.detectChanges();
        if(response.status === 201 || response.status === 200) {
          this.toastr.success('You are awesome!', 'Date Saved Successfully!', {
            timeOut: 3000,
          })
        }
      }
    )
  }
 
 
  showEditor() {
    this.DWObject.Viewer.createImageEditor().show();
    this.DWObject.RegisterEvent('CloseImageEditorUI', () => {
      this.editorShown = false;
    });
    this.editorShown = true;
  }

  acquireImage() {
    if (this.DWObject) {
        this.DWObject.SelectSourceAsync()
        .then(() => {
            return this.DWObject.AcquireImageAsync({
                IfDisableSourceAfterAcquire: true,
            });
        })
        .then( (result:any) => {
            console.log(result);
        })
        .catch((exp:any) => {
            console.error(exp.message);
        })
        .finally(() => {
            this.DWObject.CloseSourceAsync().catch((e:any) => {
                console.error(e);
            });
        });
    }
  }
  
  open(content: any) {
		this.modalService.open(content, { size: 'sm' });
	}

}

interface Device {
  deviceId: string,
  name: string,
  label: string,
  type: string,
  deviceInfo: any
}
interface Message {
  time: number;
  text: string;
  type: string;
}

interface Zone {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
}

