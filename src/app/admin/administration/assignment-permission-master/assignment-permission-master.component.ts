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
import { AssignmentPermMaster, AssignmentPermissionMasterService } from './assignment-permission-master.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assignment-permission-master',
  templateUrl: './assignment-permission-master.component.html',
  styleUrls: ['./assignment-permission-master.component.scss']
})
export class AssignmentPermissionMasterComponent implements OnInit{

  form: FormGroup = new FormGroup({
    privilegeName: new FormControl(''),
    privilegeAribic: new FormControl(''),
   
  });
  submitted = false;

  @ViewChild('table') table: APIDefinition;

  
  dataList: AssignmentPermMaster[] = [];
  filterArray: AssignmentPermMaster[] = [];
  dataDetail: AssignmentPermMaster | null = null;
  config: any;
  selected:any;
  editData: UntypedFormGroup | any;

  public configuration: Config;
  public columns: Columns[];
  public data: AssignmentPermMaster[] = [];
  assignPermData : AssignmentPermMaster | null;


  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,
    private assignmentPermissionMasterService:AssignmentPermissionMasterService,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        assignPermName: ['', Validators.required],
        assignPermNameAr: ['', Validators.required],
      
      }
      
    );

    this.columns = [
      { key: 'assignId', title: 'S.No', width: '5%' },
      { key: 'assignPermName', title: 'Permission Name'},
      { key: 'assignPermNameAr', title: 'Permission Name Ar'},
      { key: 'status', title: 'Status'},
      { key: 'createdByUserName', title: 'CreatedBy'},
      { key: 'createdDate', title: 'Created On / Updated On'},
      { key: 'isActive', title: 'Edit Data' , searchEnabled: false}
    ];
    //this.data = data;

    this.assignmentPermissionMasterService.getTableData().subscribe((response) => {
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
      assignId: ['', Validators.required],
      assignPermName: ['', Validators.required],
      assignPermNameAr: ['', Validators.required],
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

    this.assignmentPermissionMasterService.create(this.form.value).subscribe((response) => {
      if(response.status === 201 || response.status === 200){
        this.assignmentPermissionMasterService.getTableData().subscribe((response) => {
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

  openModal(content: TemplateRef<any>,  assignPermData: AssignmentPermMaster | null) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
    );
    
    if (assignPermData != null) {
      this.dataDetail = assignPermData;
      this.editData?.patchValue({
        assignId: assignPermData.assignId,
        assignPermName: assignPermData.assignPermName,
        assignPermNameAr: assignPermData.assignPermNameAr,
        status: assignPermData.status
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
    if (this.assignPermData) {
      if (this.editData != null) {
        this.assignPermData.assignId = this.editData.get('assignId')?.value;
        this.assignPermData.assignPermName = this.editData.get('assignPermName')?.value;
        this.assignPermData.assignPermNameAr = this.editData.get('assignPermNameAr')?.value;
        this.assignPermData.status=this.editData.get('status')?.value;
      }
    }
  }

  onUpdate() {
    this.assignmentPermissionMasterService.update(this.editData.value).subscribe((response) => {
      if(response.status === 201 || response.status === 200){
        this.modalService.dismissAll('close');
        this.assignmentPermissionMasterService.getTableData().subscribe((response) => {
          this.data=response;
        })
      }
    })
  }





}

