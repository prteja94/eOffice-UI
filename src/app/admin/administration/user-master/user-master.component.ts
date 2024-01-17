import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild} from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  Validators,
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import { API, Columns, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';
import { ModalDismissReasons, NgbAlertModule, NgbDatepickerModule, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserMaster, UserMasterService } from './user-master.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.scss']
})
export class UserMasterComponent implements OnInit{

  form: FormGroup = new FormGroup({
    privilegeName: new FormControl(''),
    privilegeAribic: new FormControl(''),
   
  });
  submitted = false;

  @ViewChild('table') table: APIDefinition;

  dataList: UserMaster[] = [];
  filterArray: UserMaster[] = [];
  dataDetail: UserMaster | null = null;
  config: any;
  selected:any;
  editData: UntypedFormGroup | any;

  public configuration: Config;
  public columns: Columns[];
  public data: UserMaster[] = [];
  userData : UserMaster | null;

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef,
    private userMasterService: UserMasterService,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal,
    private datePipe: DatePipe,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        loginId: ['', Validators.required],
        displayName: ['', Validators.required],
        ldapIdentifier: ['', Validators.required],
        designation: ['', Validators.required] ,
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        hiredDate: ['', Validators.required] ,
        dob: ['', Validators.required],
        userId: ['', Validators.required],
      }
      
    );

    this.columns = [
      { key: 'indexvalue', title: 'S.No', width: '5%'  },
      { key: 'displayName', title: 'Display Name' },
      { key: 'ldapIdentifier', title: 'Ldap Identifier' },
      { key: 'status', title: 'Status'},
      { key: 'designation', title: 'Designation' },
      { key: 'isActive', title: 'Edit Data' , searchEnabled: false}

    ];
    //this.data = data;

    this.userMasterService.getTableData().subscribe((response) => {
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
      indexvalue: ['', Validators.required],
      displayName: ['', Validators.required],
      designation: ['', Validators.required],
      status: ['', Validators.required],
      updatedByUserId: ['', Validators.nullValidator],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      hiredDate: ['', Validators.required] ,
      dob: ['', Validators.required],
      ldapIdentifier: ['', Validators.required],
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
    this.userMasterService.create(this.form.value).subscribe((response) => {
      this.toastr.success('You are awesome!', 'Date Saved Successfully!', {
        timeOut: 3000,        
      });
      this.userMasterService.getTableData().subscribe((response) => {
        this.data=response;
      })
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

  openModal(content: TemplateRef<any>,  userData: UserMaster | null) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
    );
    
    if (userData != null) {
      this.dataDetail = userData;
     const formattedDob = this.datePipe.transform(userData.dob, 'yyyy-MM-dd');
     const formattedHireDate = this.datePipe.transform(userData.hiredDate, 'yyyy-MM-dd');
      console.log(userData);
      this.editData?.patchValue({
        indexvalue: userData.indexvalue,
        loginId: userData.loginId,
        displayName: userData.displayName,
        firstName: userData.firstName,
        lastName: userData.lastName,
        ldapIdentifier: userData.ldapIdentifier,
        hiredDate: formattedHireDate,
        dob: formattedDob,
        designation: userData.designation,
        status: userData.status
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
    if (this.userData) {
      if (this.editData != null) {
        this.userData.indexvalue = this.editData.get('indexvalue')?.value;
        this.userData.designation = this.editData.get('designation')?.value;
        this.userData.displayName = this.editData.get('displayName')?.value;
        this.userData.status=this.editData.get('status')?.value;
        this.userData.firstName=this.editData.get('firstName')?.value;
        this.userData.lastName=this.editData.get('lastName')?.value;
        this.userData.hiredDate=this.editData.get('hiredDate')?.value;
        this.userData.ldapIdentifier=this.editData.get('ldapIdentifier')?.value;
      }
    }
  }

  onUpdate() {
    console.log(this.editData.value);
    this.userMasterService.update(this.editData.value).subscribe((response) => {
      if(response.status === 201){
        this.toastr.success('You are awesome!', 'Date Updated Successfully!', {
          timeOut: 3000,            
        });
        this.modalService.dismissAll('close');
        this.userMasterService.getTableData().subscribe((response) => {
          this.data=response;
        })
      }
    })
  }
}




