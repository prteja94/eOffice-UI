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
} from '@angular/forms';
import Validation from '../../../shared/validation';
import { Tabledata, data } from '../../../../assets/active-master';
import { API, Columns, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';
import { UserMaster, UserMasterService } from '../user-master/user-master.service';
import { OrgType, OrgTypeService } from '../org-type/org-type.service';
import { OrgNameService, OrgUnit } from '../org-name/org-name.service';
import { FolderPermissionMaster, FolderPermissionService } from './folder-permission.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FolderMaster, FolderMasterService } from '../folder-master/folder-master.service';

@Component({
  selector: 'app-folder-permission',
  templateUrl: './folder-permission.component.html',
  styleUrls: ['./folder-permission.component.scss']
})
export class FolderPermissionComponent implements OnInit{

  form: FormGroup = new FormGroup({
    privilegeName: new FormControl(''),
    privilegeAribic: new FormControl(''),
   
  });
  submitted = false;

  @ViewChild('table') table: APIDefinition;

  dataList: FolderPermissionMaster[] = [];
  filterArray: FolderPermissionMaster[] = [];
  dataDetail: FolderPermissionMaster | null = null;
  config: any;
  selected:any;
  editData: FolderPermissionMaster | any;

  public configuration: Config;
  public columns: Columns[];
  public data: Tabledata[] = [];
  userData: UserMaster[] = [];
  orgTypeData: OrgType[] = [];
  orgNameData: OrgUnit[] = [];
  folderPermData: FolderPermissionMaster | null;
  optionValue: any;
  folderData: FolderMaster[] = [];


  constructor(private formBuilder: FormBuilder, private userMasterService:UserMasterService,private orgTypeService: OrgTypeService
    ,private fb: UntypedFormBuilder,private orgNameService: OrgNameService,
    private modalService: NgbModal,private folderPermService:FolderPermissionService,
    private folderMasterService:FolderMasterService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        actionName: ['', Validators.required],
        actionAribic: ['', Validators.required],
      
      }
      
    );

    this.columns = [
      { key: 'indexvalue', title: 'S.No', width: '5%'  },
      { key: 'folderName', title: 'Folder Name' },
      { key: 'folderNameAr', title: 'Folder Name Ar' },
      { key: 'permissionType', title: 'Permission Type' },      
      { key: 'status', title: 'Status'},
      { key: 'createdByUserName', title: 'CreatedBy' },
      { key: 'createdDate', title: 'Created On / Updated On' }
    ];
   // this.data = data;

    this.configuration = { ...DefaultConfig };
    //this.configuration.infiniteScroll = true;
    this.configuration.paginationEnabled = false;
    this.configuration.searchEnabled = true;
    //this.configuration.rows = 15;
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = false;
    //this.configuration.checkboxes = true;

    this.folderPermService.getTableData().subscribe((response) => {
      this.data = response;
    })

    this.userMasterService.getTableData().subscribe((response) => {
      this.userData = response;
    });

    this.orgTypeService.getTableData().subscribe((response) => {
      this.orgTypeData = response;
    });

    this.orgNameService.getTableData().subscribe((response) => {
      this.orgNameData = response;
    });

    this.folderMasterService.getTableData().subscribe((response) => {
      this.folderData = response;
    })

    this.editData = this.fb.group({
      indexvalue: ['', Validators.required],
      folderName: ['', Validators.required],
      permissionType: ['', Validators.required],
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

    console.log(JSON.stringify(this.form.value, null, 2));
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

  openModal(content: TemplateRef<any>,  folderPermData : FolderPermissionMaster | null) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
    );
    
    if (folderPermData != null) {
      this.dataDetail = folderPermData;
      this.editData?.patchValue({
        indexvalue: folderPermData.indexvalue,
        folderName: folderPermData.folderName,
        permissionType: folderPermData.permissionType,
        status: folderPermData.status
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
    if (this.folderPermData) {
      if (this.editData != null) {
        this.folderPermData.folderId = this.editData.get('folderId')?.value;
        this.folderPermData.folderName = this.editData.get('folderName')?.value;
        this.folderPermData.folderNameAr = this.editData.get('folderNameAr')?.value;
        this.folderPermData.status=this.editData.get('status')?.value;
      }
    }
  }

  onUpdate() {
    console.log(this.editData.value);
    this.folderPermService.update(this.editData.value).subscribe((response) => {
      if(response.status === 201){
        this.modalService.dismissAll('close');
        this.folderPermService.getTableData().subscribe((response) => {
          this.data=response;
        })
      }
    })
  }

}

