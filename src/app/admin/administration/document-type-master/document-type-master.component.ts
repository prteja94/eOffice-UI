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
import { DocumentTypeMaster, DocumentTypeService } from './document-type.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-document-type-master',
  templateUrl: './document-type-master.component.html',
  styleUrls: ['./document-type-master.component.scss']
})
export class DocumentTypeMasterComponent implements OnInit{

  form: FormGroup = new FormGroup({
    docTypeName: new FormControl(''),
    docTypeNameAr: new FormControl(''),
   
  });
  submitted = false;

  @ViewChild('table') table: APIDefinition;

  dataList: DocumentTypeMaster[] = [];
  filterArray: DocumentTypeMaster[] = [];
  dataDetail: DocumentTypeMaster | null = null;
  config: any;
  selected:any;
  editData: UntypedFormGroup | any;


  public configuration: Config;
  public columns: Columns[];
  public data: DocumentTypeMaster[] = [];
  documentTypeData : DocumentTypeMaster | null;


  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef
    ,private documentTypeMasterService:DocumentTypeService, private fb: UntypedFormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        docTypeName: ['', Validators.required],
        docTypeNameAr: ['', Validators.required],      
      }
      
    );

    this.columns = [
      { key: 'sno', title: 'S.No', width: '5%' },
      { key: 'docTypeName', title: 'Document Type Name' },
      { key: 'documentNameAr', title: 'Document Type Name Ar' },
      { key: 'status', title: 'Status'},
      { key: 'CreatedBy', title: 'CreatedBy' },
      { key: 'updatedON', title: 'Created On / Updated On' },
      { key: 'isActive', title: 'Edit Data' , searchEnabled: false}
    ];
    //this.data = data;

   this.documentTypeMasterService.getTableData().subscribe((response) => {
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
      docTypeId: ['', Validators.required],
      docTypeName: ['', Validators.required],
      docTypeNameAr: ['', Validators.required],
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

    this.documentTypeMasterService.create(this.form.value).subscribe((response) => {
      if(response.status === 201){  
        this.toastr.success('You are awesome!', 'Date Saved Successfully!', {
          timeOut: 3000,
          
        });
        this.documentTypeMasterService.getTableData().subscribe((response) => {
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

  openModal(content: TemplateRef<any>,  documentTypeData: DocumentTypeMaster | null) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
    );
    
    if (documentTypeData != null) {
      this.dataDetail = documentTypeData;
      this.editData?.patchValue({
        docTypeId: documentTypeData.docTypeId,
        docTypeName: documentTypeData.docTypeName,
        docTypeNameAr: documentTypeData.docTypeNameAr,
        status: documentTypeData.status
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
    if (this.documentTypeData) {
      if (this.editData != null) {
        this.documentTypeData.docTypeId = this.editData.get('docTypeId')?.value;
        this.documentTypeData.docTypeName = this.editData.get('docTypeName')?.value;
        this.documentTypeData.docTypeNameAr = this.editData.get('docTypeNameAr')?.value;
        this.documentTypeData.status=this.editData.get('status')?.value;
      }
    }
  }

  onUpdate() {
    console.log(this.editData.value);
    this.documentTypeMasterService.update(this.editData.value).subscribe((response) => {
      if(response.status === 201){
        this.toastr.success('You are awesome!', 'Date Updated Successfully!', {
          timeOut: 3000,
          
        });
        this.modalService.dismissAll('close');
        this.documentTypeMasterService.getTableData().subscribe((response) => {
          this.data=response;
        })
      }
    })
  }
}