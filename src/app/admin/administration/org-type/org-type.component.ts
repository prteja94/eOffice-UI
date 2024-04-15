import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
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
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import Validation from '../../../shared/validation';
import { Tabledata, data } from '../../../../assets/data-form';
import { API, Columns, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';
import { OrgType, OrgTypeService } from './org-type.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { DirectionService } from '../../../shared/services/direction.service';

@Component({
  selector: 'app-org-type',
  templateUrl: './org-type.component.html',
  styleUrls: ['./org-type.component.scss']
})
export class OrgTypeComponent implements OnInit {

  form: FormGroup = new FormGroup({
    privilegeName: new FormControl(''),
    privilegeAribic: new FormControl(''),
    
  });
  submitted = false;

  @ViewChild('table') table: APIDefinition;

  dataList: OrgType[] = [];
  filterArray: OrgType[] = [];
  dataDetail: OrgType | null = null;
  config: any;
  selected:any;
  editData: UntypedFormGroup | any;

  public configuration: Config;
  public columns: Columns[];
  public data: OrgType[]= [];
  OrgNameService: any;
  orgNameList: any;
  orgTypeData: OrgType | null;
  topLevel: any;
  loginId : any;

  constructor(private formBuilder: FormBuilder, 
    private cdr: ChangeDetectorRef, private orgTypeService: OrgTypeService,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal,
    public directionService: DirectionService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        orgTypeName: ['', Validators.required],
        orgTypeNameAr: ['', Validators.required],
        topLevel: ['', Validators.required],
        addedByUserId: ['']
      }
      
    );

    const json = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.loginId = json['loginId'];

    this.columns = [
      { key: 'orgTypeId', title: 'S.No', width: '5%' },
      { key: 'orgTypeName', title: 'orgtype Name' },
      { key: 'orgTypeNameAr', title: 'orgtype Name Ar' },
      { key: 'topLevel', title: 'Top Level'},
      { key: 'status', title: 'Status' },
      { key: 'addedByUserName', title: 'CreatedBy' },
      { key: 'addedOn', title: 'Created On / Updated On' },
      { key: 'isActive', title: 'Edit Data' , searchEnabled: false}
    ];
    //this.data = data;

    this.orgTypeService.getTableData().subscribe((response) => {
      this.data = response;
      this.cdr.detectChanges();
    })
    this.configuration = { ...DefaultConfig };
    this.configuration.paginationEnabled = false;
    this.configuration.searchEnabled = true;
    this.configuration.rows = 15;
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = false;

    this.editData = this.fb.group({
      orgTypeId: ['', Validators.required],
      orgTypeName: ['', Validators.required],
      orgTypeNameAr: ['', Validators.required],
      topLevel: ['', Validators.required],
      status: ['', Validators.required],
      updatedByUserId: ['', Validators.nullValidator],
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
    this.form.patchValue({
      addedByUserId: this.loginId,
    });
    this.orgTypeService.create(this.form.value).subscribe((response) => {
      if(response.status === 201){
        this.toastr.success('You are awesome!', 'Date Saved Successfully!', {
          timeOut: 3000,
          
        });
        this.orgTypeService.getTableData().subscribe((response) => {
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

  openModal(content: TemplateRef<any>,  orgTypeData: OrgType | null) {
    this.submitted = false;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
    );
    
    if (orgTypeData != null) {
      this.dataDetail = orgTypeData;
      this.editData?.patchValue({
        orgTypeId: orgTypeData.orgTypeId,
        orgTypeName: orgTypeData.orgTypeName,
        orgTypeNameAr: orgTypeData.orgTypeNameAr,
        status: orgTypeData.status,
        topLevel: orgTypeData.topLevel
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
    if (this.orgTypeData) {
      if (this.editData != null) {
        this.orgTypeData.orgTypeId = this.editData.get('orgId')?.value;
        this.orgTypeData.orgTypeName = this.editData.get('orgName')?.value;
        this.orgTypeData.orgTypeNameAr = this.editData.get('orgNameAr')?.value;
        this.orgTypeData.topLevel=this.editData.get('topLevel')?.value;
        this.orgTypeData.status=this.editData.get('status')?.value;
        this.orgTypeData.updatedByUserId=this.loginId;
      }
    }
  }

  onUpdate() {
    console.log(this.editData.value);
    this.orgTypeService.update(this.editData.value).subscribe((response) => {
      if(response.status === 201){
        this.toastr.success('You are awesome!', 'Date Updated Successfully!', {
          timeOut: 3000,
        });
        this.modalService.dismissAll('close');
        this.orgTypeService.getTableData().subscribe((response) => {
          this.data=response;
        })
      }
    })
  }
 }
