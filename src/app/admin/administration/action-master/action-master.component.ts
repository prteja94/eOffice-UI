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
import { API, Columns, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';
import { ActionMaster, ActionMasterService } from './action-master.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-action-master',
  templateUrl: './action-master.component.html',
  styleUrls: ['./action-master.component.scss']
})
  
export class ActionMasterComponent implements OnInit{

  form: FormGroup = new FormGroup({
    privilegeName: new FormControl(''),
    privilegeAribic: new FormControl(''),
   
  });
  submitted = false;

  @ViewChild('table') table: APIDefinition;

  public configuration: Config;
  public columns: Columns[];
  public data: ActionMaster[] = [];
  public selected = new Set();
  editData: UntypedFormGroup | any;
  dataDetail: ActionMaster | null = null;
  actionData : ActionMaster | null;


  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,
    private actionMasterService:ActionMasterService,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        actionName: ['', Validators.required],
        actionNameAr: ['', Validators.required],
      
      }
      
    );

    this.columns = [
      { key: 'actionId', title: 'S.No', width: '5%'  },
      { key: 'actionName', title: 'Action Name' },
      { key: 'actionNameAr', title: 'Action Name Ar' },
      { key: 'status', title: 'Status'},
      { key: 'createdByUserName', title: 'CreatedBy' },
      { key: 'createdDate', title: 'Created On / Updated On' },
      { key: 'isActive', title: 'Edit Data' , searchEnabled: false}
    ];

    this.actionMasterService.getTableData().subscribe((response) => {
      this.data = response;
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
      actionId: ['', Validators.required],
      actionName: ['', Validators.required],
      actionNameAr: ['', Validators.required],
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
    this.actionMasterService.create(this.form.value).subscribe((response) => {
      if(response.status === 201 || response.status === 200) {
        this.toastr.success('You are awesome!', 'Date Saved Successfully!', {
          timeOut: 3000,
          
        });
        this.actionMasterService.getTableData().subscribe((response) => {
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

  openModal(content: TemplateRef<any>,  actionData: ActionMaster | null) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
    );

    if (actionData != null) {
      this.dataDetail = actionData;
      this.editData?.patchValue({
        actionId: actionData.actionId,
        actionName: actionData.actionName,
        actionNameAr: actionData.actionNameAr,
        status: actionData.status
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
  if (this.actionData) {
    if (this.editData != null) {
      this.actionData.actionId = this.editData.get('actionId')?.value;
      this.actionData.actionName = this.editData.get('actionName')?.value;
      this.actionData.actionNameAr = this.editData.get('actionNameAr')?.value;
      this.actionData.status=this.editData.get('status')?.value;
    }
  }
}

onUpdate() {
  this.actionMasterService.update(this.editData.value).subscribe((response) => {
    if(response.status === 201 || response.status === 200){
      this.toastr.success('You are awesome!', 'Date Updated Successfully!', {
        timeOut: 3000,
        
      });
      this.modalService.dismissAll('close');
      this.actionMasterService.getTableData().subscribe((response) => {
        this.data=response;
      })
    }
  })
 }
}

