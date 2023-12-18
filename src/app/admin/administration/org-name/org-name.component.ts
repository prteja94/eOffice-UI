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
import { API, Columns, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';
import { OrgNameService, OrgUnit } from './org-name.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { OrgType, OrgTypeService } from '../org-type/org-type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-org-name',
  templateUrl: './org-name.component.html',
  styleUrls: ['./org-name.component.scss']
})
export class OrgNameComponent implements OnInit{
  websiteList: any = [];
  form: FormGroup = new FormGroup({
    privilegeName: new FormControl(''),
    privilegeAribic: new FormControl(''),
  });
  submitted = false;

  @ViewChild('table') table: APIDefinition;

  dataList: OrgUnit[] = [];
  filterArray: OrgUnit[] = [];
  dataDetail: OrgUnit | null = null;
  config: any;
  selected:any;
  editData: UntypedFormGroup | any;

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public columns: Columns[];
  

  public configuration: Config;
  public data: any[] = [];
  OrgNameService: any;
  orgNameList: any;
  orgData: OrgUnit | null;
  orgTypeList: OrgType[] | null ;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,
    private orgNameService:OrgNameService , private fb: UntypedFormBuilder,
    private modalService: NgbModal, private orgTypeService: OrgTypeService,
    private toastr: ToastrService){}

      

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        orgName: ['', Validators.required],
        orgNameAr: ['', Validators.required],
        parentOrgId: ['', Validators.required],
        orgTypeId: ['', Validators.required]
      }
      );
      
      this.orgNameService.getParentOrgId().subscribe((response) => {
        this.websiteList=response;

      });

      this.orgNameService.getTableData().subscribe((response) => {
        this.orgNameList = response;
      })

      this.orgTypeService.getTableData().subscribe((response) => {
        this.orgTypeList = response;
      })
    

    this.columns = [
      { key: 'sno', title: 'S.No', width: '5%' },
      { key: 'orgName', title: 'Org Unit' },
      { key: 'orgNameAr', title: 'Org Unit Ar' },
      { key: 'parentOrgName', title: 'Parent Org Name' },
      { key: 'orgTypeName', title: 'Org Type Name' },
      { key: 'status', title: 'Status'},
      { key: 'CreatedBy', title: 'CreatedBy' },
      { key: 'updatedON', title: 'Created On / Updated On' },
      { key: 'isActive', title: 'Edit Data' , searchEnabled: false}
    ];
    //this.data = data;

    this.configuration = { ...DefaultConfig };
    //this.configuration.infiniteScroll = true;
    this.configuration.paginationEnabled = false;
    this.configuration.searchEnabled = true;
    this.configuration.rows = 15;
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = false;
    //this.configuration.checkboxes = true;

    this.editData = this.fb.group({
      orgName: ['', Validators.required],
      orgNameAr: ['', Validators.required],
      orgId: ['', Validators.required],
      status: ['', Validators.required],
      parentOrgId: ['', Validators.required],
      topOrgId: ['', Validators.required],
      orgTypeId: ['', Validators.required]
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

    this.orgNameService.create(this.form.value).subscribe((response) => {
      if(response.status === 201){
        this.toastr.success('You are awesome!', 'Date Saved Successfully!', {
          timeOut: 3000,
          
        });
        this.orgNameService.getTableData().subscribe((response) => {
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
  onEvent(event: { event: string; value: any }): void {
    this.selected = JSON.stringify(event.value.row, null, 2);
  }


	closeResult = '';

  openModal(content: TemplateRef<any>,  orgData: OrgUnit | null) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
    );
    
    if (orgData != null) {
      this.dataDetail = orgData;
      this.editData?.patchValue({
        orgName: orgData.orgName,
        orgNameAr: orgData.orgNameAr,
        orgId: orgData.orgId,
        status: orgData.status,
        updatedByUserId: 1,
        parentOrgId: orgData.parentOrgId,
        topOrgId: orgData.topOrgId,
        orgTypeId: orgData.orgTypeId
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
    if (this.orgData) {
      if (this.editData != null) {
        this.orgData.orgName = this.editData.get('orgName')?.value;
        this.orgData.orgNameAr = this.editData.get('orgNameAr')?.value;
        this.orgData.orgId = this.editData.get('orgId')?.value;
        this.orgData.status= this.editData.get('status')?.value;
        this.orgData.parentOrgId=this.editData.get('parentOrgId')?.value;
        this.orgData.topOrgId=this.editData.get('topOrgId')?.value;
        this.orgData.orgTypeId=this.editData.get('orgTypeId')?.value;
        this.orgData.updatedByUserId=1;

      }
    }
  }

  onUpdate() {
    console.log(this.editData.value);
    this.orgNameService.update(this.editData.value).subscribe((response) => {
      if(response.status === 201){
        this.toastr.success('You are awesome!', 'Date Updated Successfully!', {
          timeOut: 3000,
        });
        this.modalService.dismissAll('close');
        this.orgNameService.getTableData().subscribe((response) => {
          this.orgNameList=response;
        })
      }
    })
  }
}
