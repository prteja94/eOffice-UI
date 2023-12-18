import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild, } from '@angular/core';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import Validation from '../../../shared/validation';
import { Tabledata, data } from '../../../../assets/data-form';
import { API, Columns, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExternalLocationMaster, ExternalLocationService } from './external-location.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-external-location',
  templateUrl: './external-location.component.html',
  styleUrls: ['./external-location.component.scss']
})
export class ExternalLocationComponent implements OnInit{

  form: FormGroup = new FormGroup({
    locationName: new FormControl(''),
    locationNameAr: new FormControl(''),
   
  });
  submitted = false;

  @ViewChild('table') table: APIDefinition;


  dataList: ExternalLocationMaster[] = [];
  filterArray: ExternalLocationMaster[] = [];
  dataDetail: ExternalLocationMaster | null = null;
  config: any;
  selected:any;
  editData: UntypedFormGroup | any;

  public configuration: Config;
  public columns: Columns[];
  public data: ExternalLocationMaster[] = [];
  externalLocData : ExternalLocationMaster | null;


  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,
    private externalLocationService: ExternalLocationService,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        locationName: ['', Validators.required],
        locationNameAr: ['', Validators.required]  ,
        status: ['', Validators.required]    
      }
      
    );

    this.columns = [
      { key: 'sno', title: 'S.No', width: '5%' },
      { key: 'locationName', title: 'Location Name' },
      { key: 'locationNameAr', title: 'Location Name Ar' },
      { key: 'status', title: 'Status' },
      { key: 'CreatedBy', title: 'CreatedBy' },
      { key: 'updatedON', title: 'Created On / Updated On' },
      { key: 'isActive', title: 'Edit Data' , searchEnabled: false}
    ];
    //this.data = data;

    this.externalLocationService.getTableData().subscribe((response) => {
      this.data=response;
    })

    this.configuration = { ...DefaultConfig };
    //this.configuration.infiniteScroll = true;
    this.configuration.paginationEnabled = false;
    this.configuration.searchEnabled = true;
    this.configuration.rows = 15;
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = false;
    //this.configuration.checkboxes = true;

    this.editData = this.fb.group({
      locationId: ['', Validators.required],
      locationName: ['', Validators.required],
      locationNameAr: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.externalLocationService.create(this.form.value).subscribe((response) => {
      if(response.status === 201 || response.status === 200) {
        this.toastr.success('You are awesome!', 'Date Saved Successfully!', {
          timeOut: 3000,
          
        });
        this.externalLocationService.getTableData().subscribe((response) => {
          this.data=response;
        })
      }
    })
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


  onChange(row: any): void {
    const index = this.data.indexOf(row);
    if (this.selected.has(index)) {
      this.selected.delete(index);
    } else {
      this.selected.add(index);
    }
  }

  closeResult = '';

  openModal(content: TemplateRef<any>,  externalLocData : ExternalLocationMaster | null) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
    );
    
    if (externalLocData != null) {
      this.dataDetail = externalLocData;
      this.editData?.patchValue({
        locationId: externalLocData.locationId,
        locationName: externalLocData.locationName,
        locationNameAr: externalLocData.locationNameAr,
        status: externalLocData.status
      });
    }
  }

  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  onEdit() {
    if (this.externalLocData) {
      if (this.editData != null) {
        this.externalLocData.locationId = this.editData.get('locationId')?.value;
        this.externalLocData.locationName = this.editData.get('locationName')?.value;
        this.externalLocData.locationNameAr = this.editData.get('locationNameAr')?.value;
        this.externalLocData.status=this.editData.get('status')?.value;
      }
    }
  }

  onUpdate() {
    console.log(this.editData.value);
    this.externalLocationService.update(this.editData.value).subscribe((response) => {
      if(response.status === 201 || response.status === 200){
        this.toastr.success('You are awesome!', 'Date Updated Successfully!', {
          timeOut: 3000,
          
        });
        this.modalService.dismissAll('close');
        this.externalLocationService.getTableData().subscribe((response) => {
          this.data=response;
        })
      }
    })
  }
}
