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
import { DocumentClassificationMaster, DocumentClassificationService } from './document-classification.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-document-classification-master',
  templateUrl: './document-classification-master.component.html',
  styleUrls: ['./document-classification-master.component.scss']
})
export class DocumentClassificationMasterComponent implements OnInit{

  form: FormGroup = new FormGroup({
    className: new FormControl(''),
    classNameAr: new FormControl(''),
   
  });
  submitted = false;

  @ViewChild('table') table: APIDefinition;

  dataList: DocumentClassificationMaster[] = [];
  filterArray: DocumentClassificationMaster[] = [];
  dataDetail: DocumentClassificationMaster | null = null;
  config: any;
  selected:any;
  editData: UntypedFormGroup | any;

  public configuration: Config;
  public columns: Columns[];
  public data: DocumentClassificationMaster[] = [];
  docClassData : DocumentClassificationMaster | null;


  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,
    private documentClassificationService:DocumentClassificationService,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        className: ['', Validators.required],
        classNameAr: ['', Validators.required],
      
      }      
    );

    this.columns = [
      { key: 'sno', title: 'S.No', width: '5%' },
      { key: 'className', title: 'Classificaton Name' },
      { key: 'classNameAr', title: 'Classificaton Name Ar' },
      { key: 'status', title: 'Status'},
      { key: 'CreatedBy', title: 'CreatedBy' },
      { key: 'updatedON', title: 'Created On / Updated On' },
      { key: 'isActive', title: 'Edit Data' , searchEnabled: false}
    ];
  //  this.data = data;

  this.documentClassificationService.getTableData().subscribe((response) => {
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
      classId: ['', Validators.required],
      className: ['', Validators.required],
      classNameAr: ['', Validators.required],
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

    this.documentClassificationService.create(this.form.value).subscribe((response) => {
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

  openModal(content: TemplateRef<any>,  docClassData: DocumentClassificationMaster | null) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
    );
    
    if (docClassData != null) {
      this.dataDetail = docClassData;
      this.editData?.patchValue({
        classId: docClassData.classId,
        className: docClassData.className,
        classNameAr: docClassData.classNameAr,
        status: docClassData.status
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
    if (this.docClassData) {
      if (this.editData != null) {
        this.docClassData.classId = this.editData.get('classId')?.value;
        this.docClassData.className = this.editData.get('className')?.value;
        this.docClassData.classNameAr = this.editData.get('classNameAr')?.value;
        this.docClassData.status=this.editData.get('status')?.value;
      }
    }
  }

  onUpdate() {
    console.log(this.editData.value);
    this.documentClassificationService.update(this.editData.value).subscribe((response) => {
      if(response.status === 201){
        this.modalService.dismissAll('close');
        this.documentClassificationService.getTableData().subscribe((response) => {
          this.data=response;
        })
      }
    })
  }
}

