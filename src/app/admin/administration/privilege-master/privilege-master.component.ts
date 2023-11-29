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
import { PrivilegeMaster, PrivilegeMasterService } from './privilege-master.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-privilege-master',
  templateUrl: './privilege-master.component.html',
  styleUrls: ['./privilege-master.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivilegeMasterComponent implements OnInit{

  form: FormGroup = new FormGroup({
    privilegeName: new FormControl(''),
    privilegeNameAr: new FormControl(''),
   
  });
  submitted = false;

  @ViewChild('table') table: APIDefinition;

  dataList: PrivilegeMaster[] = [];
  filterArray: PrivilegeMaster[] = [];
  dataDetail: PrivilegeMaster | null = null;
  config: any;
  selected:any;
  editData: UntypedFormGroup | any;

  public configuration: Config;
  public columns: Columns[];
  public data: PrivilegeMaster[] = [];
  privilegeData : PrivilegeMaster | null;


  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef, 
    private privilegeMasterService: PrivilegeMasterService,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        privilegeName: ['', Validators.required],
        privilegeNameAr: ['', Validators.required],
      
      }
      
    );

    this.columns = [
      { key: 'privilegeId', title: 'S.No', width: '5%' },
      { key: 'privilegeName', title: 'Privilege Name' },
      { key: 'privilegeNameAr', title: 'Privilege Name Ar' },
      { key: 'status', title: 'Status'},
      { key: 'createdByUserName', title: 'CreatedBy' },
      { key: 'createdDate', title: 'Created On / Updated On' },
      { key: 'isActive', title: 'Edit Data' , searchEnabled: false}
    ];
   // this.data = data;

    this.privilegeMasterService.getTableData().subscribe((response) => {
      this.data=response;
    })

    this.configuration = { ...DefaultConfig };
    //this.configuration.infiniteScroll = true;
    this.configuration.paginationEnabled = false;
    this.configuration.searchEnabled = true;
    //this.configuration.rows = 15;
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = false;
    //this.configuration.checkboxes = true;

    this.editData = this.fb.group({
      privilegeId: ['', Validators.required],
      privilegeName: ['', Validators.required],
      privilegeNameAr: ['', Validators.required],
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
    this.privilegeMasterService.create(this.form.value).subscribe((response) => {
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
  closeResult = '';

  openModal(content: TemplateRef<any>,  privilegeData : PrivilegeMaster | null) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
    );
    
    if (privilegeData != null) {
      this.dataDetail = privilegeData;
      this.editData?.patchValue({
        privilegeId: privilegeData.privilegeId,
        privilegeName: privilegeData.privilegeName,
        privilegeNameAr: privilegeData.privilegeNameAr,
        status: privilegeData.status
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
    if (this.privilegeData) {
      if (this.editData != null) {
        this.privilegeData.privilegeId = this.editData.get('privilegeId')?.value;
        this.privilegeData.privilegeName = this.editData.get('privilegeName')?.value;
        this.privilegeData.privilegeNameAr = this.editData.get('privilegeNameAr')?.value;
        this.privilegeData.status=this.editData.get('status')?.value;
      }
    }
  }

  onUpdate() {
    console.log(this.editData.value);
    this.privilegeMasterService.update(this.editData.value).subscribe((response) => {
      if(response.status === 201){
        this.modalService.dismissAll('close');
        this.privilegeMasterService.getTableData().subscribe((response) => {
          this.data=response;
        })
      }
    })
  }
}
