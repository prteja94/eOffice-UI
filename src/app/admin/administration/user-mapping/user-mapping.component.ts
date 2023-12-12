import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
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
import { Tabledata, data } from '../../../../assets/data-form';
import { API, Columns, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';
import { UserMappingService } from './user-mapping.service';
import { UserMaster, UserMasterService } from '../user-master/user-master.service';
import { OrgType, OrgTypeService } from '../org-type/org-type.service';
import { OrgNameService, OrgUnit } from '../org-name/org-name.service';
import { RoleMaster, RoleMasterService } from '../role-master/role-master.service';

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

  public configuration: Config;
  public columns: Columns[];
  public data: Tabledata[] = [];
  public selected = new Set();
  userData: UserMaster[] = [];
  orgTypeData: OrgType[] = [];
  orgNameData: OrgUnit[] = [];
  roleData: RoleMaster[] = [];


  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,
    private userMappingService: UserMappingService,
     private userMasterService: UserMasterService,
     private fb: UntypedFormBuilder,
     private orgTypeService: OrgTypeService,
     private orgNameService: OrgNameService,
     private roleMasterService: RoleMasterService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        actionName: ['', Validators.required],
        actionAribic: ['', Validators.required],
        userId: ['', Validators.required],
      }
      
    );

    this.columns = [
      { key: 'user ', title: 'User' },
      { key: 'orgUnit', title: 'Org Unit' },
      { key: 'role', title: 'Role' },
      { key: 'superior', title: 'Superior' },
      { key: 'userAssignmentPermission', title: 'User Assignment Permission' },
      { key: 'userPrivileges', title: 'User Privileges' },
      { key: 'userActions', title: 'User Actions' },
      { key: 'Status', title: 'Status' },
      { key: 'createdBy', title: 'Created By' },
      { key: 'createddate', title: 'Created Date' },
      { key: 'updatedON', title: 'Created On / Updated On' }
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
      this.orgNameData = response;
    });

    this.roleMasterService.getTableData().subscribe((response) => {
      this.roleData = response;
    })
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
      console.log(response);
    })
    console.log(JSON.stringify(this.form.value, null, 2));
    this.form.reset();
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
}
