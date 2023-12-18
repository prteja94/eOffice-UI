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
import { RoleMaster, RoleMasterService } from './role-master.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService,ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-role-master',
  templateUrl: './role-master.component.html',
  styleUrls: ['./role-master.component.scss']
})
export class RoleMasterComponent implements OnInit{

  form: FormGroup = new FormGroup({
    privilegeName: new FormControl(''),
    privilegeAribic: new FormControl(''),
   
  });
  submitted = false;

  @ViewChild('table') table: APIDefinition;

  public configuration: Config;
  public columns: Columns[];
  public data: RoleMaster[] = [];
  public selected = new Set();
  editData: UntypedFormGroup | any;
  dataDetail: RoleMaster | null = null;
  roleData : RoleMaster | null;


  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,
     private rolemasterService: RoleMasterService,
     private fb: UntypedFormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        roleName: ['', Validators.required],
        roleNameAr: ['', Validators.required],
        createdByUserId: ['1']
      }      
    );

    this.columns = [
      { key: 'sno', title: 'S.No', width: '5%' },
      { key: 'roleName', title: 'Role Name' },
      { key: 'roleNameAr', title: 'Role Name Ar' },
      { key: 'status', title: 'Status' },
      { key: 'CreatedBy', title: 'CreatedBy' },
      { key: 'updatedON', title: 'Created On / Updated On' },
      { key: 'isActive', title: 'Edit Data' , searchEnabled: false}
    ];
    //this.data = data;

    this.rolemasterService.getTableData().subscribe((response) => {
      this.data = response;
    })

    this.configuration = { ...DefaultConfig };
    //this.configuration.infiniteScroll = true;
    //this.configuration.paginationEnabled = false;
    this.configuration.searchEnabled = true;
    //this.configuration.rows = 15;
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = false;
    //this.configuration.checkboxes = true;

    this.editData = this.fb.group({
      roleId: ['', Validators.required],
      roleName: ['', Validators.required],
      roleNameAr: ['', Validators.required],
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
    this.rolemasterService.create(this.form.value).subscribe((response) => {
      if(response.status === 201) {
        this.toastr.success('You are awesome!', 'Date Saved Successfully!', {
          disableTimeOut: true,
        });
        this.rolemasterService.getTableData().subscribe((response) => {
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

  openModal(content: TemplateRef<any>,  roleData: RoleMaster | null) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
    );

    if (roleData != null) {
      this.dataDetail = roleData;
      this.editData?.patchValue({
        roleId: roleData.roleId,
        roleName: roleData.roleName,
        roleNameAr: roleData.roleNameAr,
        status: roleData.status
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
  if (this.roleData) {
    if (this.editData != null) {
      this.roleData.roleId = this.editData.get('roleId')?.value;
      this.roleData.roleName = this.editData.get('roleName')?.value;
      this.roleData.roleNameAr = this.editData.get('roleNameAr')?.value;
      this.roleData.status=this.editData.get('status')?.value;
    }
  }
}

onUpdate() {
  console.log(this.editData.value);
  this.rolemasterService.update(this.editData.value).subscribe((response) => {
    if(response.status === 201){
      this.toastr.success('You are awesome!', 'Date Updated Successfully!', {
        disableTimeOut: true,
      });
      this.modalService.dismissAll('close');
      this.rolemasterService.getTableData().subscribe((response) => {
        this.data=response;
      })
    }
  })
}
}

