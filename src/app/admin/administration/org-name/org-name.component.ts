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
import { OrgNameService } from './org-name.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TableDataInf } from './tabledata-inf';
import { Subject } from 'rxjs';

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

  dataList: TableDataInf[] = [];
  filterArray: TableDataInf[] = [];
  dataDetail: TableDataInf | null = null;
  config: any;
  selected:any;
  editData: UntypedFormGroup | any;

  private ngUnsubscribe: Subject<void> = new Subject<void>();
  public columns: Columns[];
  

  public configuration: Config;
  public data: any[] = [];
  OrgNameService: any;
  orgNameList: any;
  orgData: TableDataInf | null;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,
    private orgNameService:OrgNameService , private fb: UntypedFormBuilder,
    private modalService: NgbModal){}

      

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        orgName: ['', Validators.required],
        orgAribic: ['', Validators.required],
        orgId: ['', Validators.required],
        orgType: ['', Validators.required],
      }
      );
      
      this.orgNameService.getParentOrgId().subscribe((response) => {
        this.websiteList=response;

      });

      this.orgNameService.getTableData().subscribe((response) => {
        this.orgNameList = response;
      })
    

    this.columns = [
      { key: 'sno', title: 'S.No', width: '5%' },
      { key: 'orgName', title: 'org Name' },
      { key: 'orgNameAr', title: 'org Name Ar' },
      { key: 'status', title: 'Status'},
      { key: 'CreatedBy', title: 'CreatedBy' },
      { key: 'updatedON', title: 'Created On / Updated On' }
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
      orgType: ['', Validators.required]
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
      console.log(response);
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

  openModal(content: TemplateRef<any>,  orgData: TableDataInf | null) {
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
        orgId: orgData.orgId
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
      }
    }
  }

  onUpdate() {
    console.log(this.editData.value);
    this.orgNameService.update(this.editData.value).subscribe((response) => {
      console.log(response);
    })
  }
}
