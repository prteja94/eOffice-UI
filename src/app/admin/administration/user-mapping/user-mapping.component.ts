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
import { UserMappingMaster, UserMappingService, UserPrivileges } from './user-mapping.service';
import { UserMaster, UserMasterService } from '../user-master/user-master.service';
import { OrgType, OrgTypeService } from '../org-type/org-type.service';
import { OrgNameService, OrgUnit } from '../org-name/org-name.service';
import { RoleMaster, RoleMasterService } from '../role-master/role-master.service';
import { AssignmentPermissionMasterComponent } from '../assignment-permission-master/assignment-permission-master.component';
import { AssignmentPermMaster, AssignmentPermissionMasterService } from '../assignment-permission-master/assignment-permission-master.service';
import { PrivilegeMaster, PrivilegeMasterService } from '../privilege-master/privilege-master.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-mapping',
  templateUrl: './user-mapping.component.html',
  styleUrls: ['./user-mapping.component.scss']
})
export class UserMappingComponent implements OnInit{

  form: FormGroup = new FormGroup({
    privilegeName: new FormControl(''),
    privilegeAribic: new FormControl(''),
   
  });
  submitted = false;

  @ViewChild('table') table: APIDefinition;
  dataList: UserMappingMaster[] = [];
  filterArray: UserMappingMaster[] = [];
  dataDetail: UserMappingMaster | null = null;
  config: any;
  selected:any;
  editData: UntypedFormGroup | any;

  public configuration: Config;
  public columns: Columns[];
  public data: Tabledata[] = [];
  userData: UserMaster[] = [];
  orgTypeData: OrgType[] = [];
  orgNameData: OrgUnit[] = [];
  roleData: RoleMaster[] = [];
  privilegeId: UserPrivileges[] = [];
  privilegeIds : number[] = [];
  assignPermData: AssignmentPermMaster[] = [];
  privilegeData: PrivilegeMaster[]=[];
  userMapData: UserMappingMaster | null;
  content: TemplateRef<any>;
  topOrgUnitData: OrgUnit[] = [];


  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,
    private userMappingService: UserMappingService,
     private userMasterService: UserMasterService,
     private fb: UntypedFormBuilder,
     private orgTypeService: OrgTypeService,
     private orgNameService: OrgNameService,
     private roleMasterService: RoleMasterService,
     private assignmentPermService:AssignmentPermissionMasterService,
     private privilegeService:PrivilegeMasterService,
    private modalService: NgbModal,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        userId: ['', Validators.required],
        orgTypeId: ['', Validators.required],
        orgId: ['', Validators.required],
        roleId: ['', Validators.required],
        superiorUserId: ['', Validators.required],
        assignId: ['', Validators.required],
        privilegeId: ['', Validators.required]
      }
      
    );

    this.columns = [
      { key: 'indexvalue', title: 'S.No', width: '5%' },
      { key: 'userName ', title: 'User' },
      { key: 'orgName', title: 'Org Unit' },
      { key: 'roleName', title: 'Role' },
      { key: 'superiorUserName', title: 'Superior' },
      // { key: 'userAssignmentPermission', title: 'User Assignment Permission' },
      // { key: 'userPrivileges', title: 'User Privileges' },
      // { key: 'userActions', title: 'User Actions' },
      { key: 'Status', title: 'Status' },
      { key: 'createdByUserName', title: 'Created By' },
      { key: 'createdDate', title: 'Created Date' }
      // { key: 'updatedON', title: 'Created On / Updated On' }
    ];
   // this.data = data;

    this.userMappingService.getTableData().subscribe((response) => {
      this.data = response;
    });

    this.configuration = { ...DefaultConfig };
    //this.configuration.infiniteScroll = true;
    this.configuration.paginationEnabled = false;
    this.configuration.searchEnabled = true;
    //this.configuration.rows = 15;
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = false;
    //this.configuration.checkboxes = true;

    this.userMasterService.getTableData().subscribe((response) => {
      this.userData = response;
    });

    this.orgTypeService.getTableData().subscribe((response) => {
      this.orgTypeData = response;
    });

    this.orgNameService.getTableData().subscribe((response) => {
      this.topOrgUnitData=response;
    })

    this.orgNameService.getTableData().subscribe((response) => {
      this.orgNameData = response;
    });

    this.roleMasterService.getTableData().subscribe((response) => {
      this.roleData = response;
    });

    this.assignmentPermService.getTableData().subscribe((response) => {
      this.assignPermData = response;
    });

    this.privilegeService.getTableData().subscribe((response) => {
      this.privilegeData = response;
    });

    this.editData = this.fb.group({
      indexvalue: ['', Validators.required],
      userId: ['', Validators.required],
      orgTypeId: ['', Validators.required],
      orgId: ['', Validators.required],
      roleId: ['', Validators.required],
      assignId: ['', Validators.required],
      privilegeIds: ['', Validators.required],
      status: ['', Validators.required],
      superiorUserId: ['', Validators.nullValidator]
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
    this.userMappingService.create(this.form.value).subscribe((response) => {
      if(response.status === 201){
        this.toastr.success('You are awesome!', 'Date Saved Successfully!', {
          timeOut: 3000,
          
        });
        this.userMappingService.getTableData().subscribe((response) => {
          this.data=response;
        })
      }
    })
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
  openModal(content: TemplateRef<any>,  userMapData : UserMappingMaster | null) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
    );
    
    if (userMapData != null) {
      this.dataDetail = userMapData;
      this.editData?.patchValue({
        indexvalue: userMapData.indexvalue,
        userId: userMapData.userId,
        orgId: userMapData.orgId,
        roleId: userMapData.roleId,
        superiorUserId: userMapData.superiorUserId,
        privilegeIds: userMapData.userprivilegesList.map((userPrivilege: UserPrivileges) => userPrivilege.privilegeName),
        orgTypeId: userMapData.orgTypeId,
        assignId: userMapData.assignId,  
        status: userMapData.status
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
    if (this.userMapData) {
      if (this.editData != null) {
        this.userMapData.indexvalue = this.editData.get('indexvalue')?.value;
        this.userMapData.userId = this.editData.get('userId')?.value;
        this.userMapData.orgId = this.editData.get('orgId')?.value;
        this.userMapData.roleId = this.editData.get('roleId')?.value;
        this.userMapData.superiorUserId = this.editData.get('superiorUserId')?.value;
        this.userMapData.status=this.editData.get('status')?.value;
      }
    }
  }

  onUpdate() {
    console.log(this.editData.value);
    this.userMappingService.update(this.editData.value).subscribe((response) => {
      if(response.status === 201){
          this.toastr.success('You are awesome!', 'Date Updated Successfully!', {
            timeOut: 3000,            
          });
        this.modalService.dismissAll('close');
        this.userMappingService.getTableData().subscribe((response) => {
          this.data=response;
        })
      }
    })
  }
}
