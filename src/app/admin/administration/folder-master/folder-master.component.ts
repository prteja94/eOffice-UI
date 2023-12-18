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
import { FolderMaster, FolderMasterService } from './folder-master.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-folder-master',
  templateUrl: './folder-master.component.html',  
  styleUrls: ['./folder-master.component.scss']
})
export class FolderMasterComponent implements OnInit{
  websiteList: any = [];
  form: FormGroup = new FormGroup({
    privilegeName: new FormControl(''),
    privilegeAribic: new FormControl(''),
   
  });
  submitted = false;

  @ViewChild('table') table: APIDefinition;

  dataList: FolderMaster[] = [];
  filterArray: FolderMaster[] = [];
  dataDetail: FolderMaster | null = null;
  config: any;
  selected:any;
  editData: UntypedFormGroup | any;


  public configuration: Config;
  public columns: Columns[];
  public data: FolderMaster[] = [];
  folderData : FolderMaster | null;


  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef, 
    private folderMasterService : FolderMasterService, private fb: UntypedFormBuilder,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        folderName: ['', Validators.required],
        folderNameAr: ['', Validators.required],
        exampleRadios: ['', Validators.required]  
      }
      
    );

    this.columns = [
      { key: 'folderId', title: 'S.No', width: '5%'  },
      { key: 'folderName', title: 'Action Name' },
      { key: 'folderNameAr', title: 'Action Name Ar' },
      { key: 'status', title: 'Status'},
      { key: 'createdByUserName', title: 'CreatedBy' },
      { key: 'createdDate', title: 'Created On / Updated On' },
      { key: 'isActive', title: 'Edit Data' , searchEnabled: false}
    ];
    //this.data = data;
    this.configuration = { ...DefaultConfig };
    //this.configuration.infiniteScroll = true;
    this.configuration.paginationEnabled = false;
    this.configuration.searchEnabled = true;
    //this.configuration.rows = 15;
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = false;
    //this.configuration.checkboxes = true;

    this.folderMasterService.getTableData().subscribe((response) => {
      this.data=response;
    })

    this.editData = this.fb.group({
      folderName: ['', Validators.required],
      folderNameAr: ['', Validators.required],
      folderId: ['', Validators.required],
      status: ['', Validators.required],
      exRadios: ['', Validators.required],
      parentFolderId: [''],
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
    this.folderMasterService.create(this.form.value).subscribe((response) => {
      if(response.status === 201){
        this.folderMasterService.getTableData().subscribe((response) => {
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

  openModal(content: TemplateRef<any>,  folderData: FolderMaster | null) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
    );
    
    if (folderData != null) {
      this.dataDetail = folderData;
      console.log(folderData);
      this.editData?.patchValue({
        folderId: folderData.folderId,
        folderName: folderData.folderName,
        folderNameAr: folderData.folderNameAr,
        status: folderData.status,
        exRadios: folderData.topNode,
        parentFolderId: folderData.parentFolderId
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
    if (this.folderData) {
      if (this.editData != null) {
        this.folderData.folderId = this.editData.get('folderId')?.value;
        this.folderData.folderName = this.editData.get('folderName')?.value;
        this.folderData.folderNameAr = this.editData.get('folderNameAr')?.value;
        this.folderData.status=this.editData.get('status')?.value;
        this.folderData.topNode=this.editData.get('exRadios')?.value;
        if(this.editData.get('exRadios')?.value == 'option2'){
          this.folderData.parentFolderId=this.editData.get('parentFolderId')?.value;
        }
      }
    }
  }

  onUpdate() {
    console.log(this.editData.value);
    this.folderMasterService.update(this.editData.value).subscribe((response) => {
      if(response.status === 201){
        this.modalService.dismissAll('close');
        this.folderMasterService.getTableData().subscribe((response) => {
          this.data=response;
        })
      }
    })
  }
}