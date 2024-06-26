import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,} from '@angular/core';
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
import Validation from '../../shared/validation';
import { Tabledata, data } from '../../../assets/data-form';
import { NgSelectComponent } from '@ng-select/ng-select';
import { API, Columns, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';
import { OrgType, OrgTypeService } from '../../admin/administration/org-type/org-type.service';
import { DirectionService } from '../../shared/services/direction.service';

//import { ErrorStateMatcher } from '@angular/material/core';
//import {TranslateService} from '@ngx-translate/core';

/** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }


@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {

  //emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  //matcher = new MyErrorStateMatcher();
  dataList: OrgType[] = [];
  filterArray: OrgType[] = [];
  dataDetail: OrgType | null = null;
  config: any;

  public configuration: Config;
  public columns: Columns[];
  public data: OrgType[] = [];
  OrgNameService: any;
  orgNameList: any;
  orgTypeData: OrgType | null;
  topLevel: any;
  loginId : any;

  @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;

  ngSelectInstances: NgSelectComponent[] = [];

  setData: UntypedFormGroup | any;

  form: FormGroup = new FormGroup({
    groupName: new FormControl(''),
    topOrg: new FormControl(''),
    orgUnit: new FormControl(''),
    multiSelect: new FormControl('')
  });
  submitted = false;

  multiSelect: number | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private orgTypeService: OrgTypeService,
    public directionService: DirectionService,
    private fb: UntypedFormBuilder,
    private formBuilder: FormBuilder
  ) { 
   
  }

  multi: any[] = [
    { id: 1, name: 'Multi 1' },
    { id: 2, name: 'Multi 2' },
    { id: 3, name: 'Multi 3' },
    { id: 4, name: 'Multi 4' },
  ];

  ngOnInit(): void {  
    this.form = this.formBuilder.group(
      {
        groupName: ['', Validators.required],
        topOrg: ['', Validators.required],
        orgUnit: ['', Validators.required],
        multi: ['', Validators.required],
        multiSelect: [null],
      }
    );

    this.setData = this.fb.group({
      defaultSelectM: ['', Validators.required]
    });

    this.columns = [
      { key: 'groupName', title: 'Group Name' },
      { key: 'userLists', title: 'User Lists' },
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
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
  }
 
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
  
  leftList = ['Item 1', 'Item 2', 'Item 3','Item 1', 'Item 2', 'Item 3','Item 1', 'Item 2', 'Item 3','Item 1', 'Item 2', 'Item 3'];
  rightList = ['Item 4', 'Item 5'];
  selectedItems: { left: string[]; right: string[] } = { left: [], right: [] };



  selectItem(item: string, side: 'left' | 'right'): void {
    const index = this.selectedItems[side].indexOf(item);
    if (index > -1) {
      this.selectedItems[side].splice(index, 1); // Deselect
    } else {
      this.selectedItems[side].push(item); // Select
    }
  }

  moveSelected(side: 'left' | 'right'): void {
    const source = side === 'left' ? this.leftList : this.rightList;
    const destination = side === 'left' ? this.rightList : this.leftList;
    const itemsToMove = this.selectedItems[side];

    itemsToMove.forEach(item => {
      const index = source.indexOf(item);
      if (index > -1) {
        source.splice(index, 1);
        destination.push(item);
      }
    });

   // Clearing the selected items from the side they were moved from
   this.selectedItems[side] = [];
  }

  moveAll(side: 'left' | 'right') {
    const source = side === 'left' ? this.leftList : this.rightList;
    const destination = side === 'left' ? this.rightList : this.leftList;

    destination.push(...source);
    source.length = 0; // Empty source list

     // Clearing selected items for both lists after moving all items
     this.selectedItems.left = [];
     this.selectedItems.right = [];
  }
}
