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
  UntypedFormGroup,
  UntypedFormBuilder,
} from '@angular/forms';
import Validation from '../../../shared/validation';
import { Tabledata, data } from '../../../../assets/data-form';
import { API, Columns, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';
import { PriorityMaster, PriorityMasterService } from './priority-master.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-priority-master',
  templateUrl: './priority-master.component.html',
  styleUrls: ['./priority-master.component.scss']
})
export class PriorityMasterComponent implements OnInit{

  form: FormGroup = new FormGroup({
    privilegeName: new FormControl(''),
    privilegeAribic: new FormControl(''),
   
  });
  submitted = false;

  @ViewChild('table') table: APIDefinition;

  dataList: PriorityMaster[] = [];
  filterArray: PriorityMaster[] = [];
  dataDetail: PriorityMaster | null = null;
  config: any;
  selected:any;
  editData: UntypedFormGroup | any;


  public configuration: Config;
  public columns: Columns[];
  public data: PriorityMaster[] = [];
  priorityData : PriorityMaster | null;


  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,
    private priortityMasterService:PriorityMasterService,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        priorityName: ['', Validators.required],
        priorityNameAr: ['', Validators.required],
      
      });

    this.columns = [
      { key: 'priorityId', title: 'S.No', width: '5%' },
      { key: 'priorityName', title: 'Priority Name' },
      { key: 'priorityNameAr', title: 'Priority Name Ar' },
      { key: 'status', title: 'Status'},
      { key: 'createdByUserName', title: 'CreatedBy' },
      { key: 'createdDate', title: 'Created On / Updated On' },
      { key: 'isActive', title: 'Edit Data' , searchEnabled: false}
    ];
   // this.data = data;

   this.priortityMasterService.getTableData().subscribe((response) => {
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
      priorityId: ['', Validators.required],
      priorityName: ['', Validators.required],
      priorityNameAr: ['', Validators.required],
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


    this.priortityMasterService.create(this.form.value).subscribe((response) => {
       if(response.status === 201) {
        this.priortityMasterService.getTableData().subscribe((response) => {
          this.data=response;
        })
      }
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

  closeResult = '';

  openModal(content: TemplateRef<any>,  priorityData: PriorityMaster | null) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
    );
    
    if (priorityData != null) {
      this.dataDetail = priorityData;
      console.log(priorityData);
      this.editData?.patchValue({
        priorityId: priorityData.priorityId,
        priorityName: priorityData.priorityName,
        priorityNameAr: priorityData.priorityNameAr,
        status: priorityData.status
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
    if (this.priorityData) {
      if (this.editData != null) {
        this.priorityData.priorityId = this.editData.get('priorityId')?.value;
        this.priorityData.priorityName = this.editData.get('priorityName')?.value;
        this.priorityData.priorityNameAr = this.editData.get('priorityNameAr')?.value;
        this.priorityData.status=this.editData.get('status')?.value;
      }
    }
  }

  onUpdate() {
    console.log(this.editData.value);
    this.priortityMasterService.update(this.editData.value).subscribe((response) => {
      if(response.status === 201){
        this.modalService.dismissAll('close');
        this.priortityMasterService.getTableData().subscribe((response) => {
          this.data=response;
        })
      }
    })
  }
 }
