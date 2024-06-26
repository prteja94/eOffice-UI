import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import Validation from '../../../shared/validation';
import { Tabledata, data } from '../../../../assets/data';
import { API, Columns, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';
import {  NgbDate, NgbDateStruct, NgbCalendar, NgbDatepickerModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal, ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DirectionService } from '../../../shared/services/direction.service';
import { OrgType, OrgTypeService } from '../../../admin/administration/org-type/org-type.service';


@Component({
  selector: 'app-mainsection',
  templateUrl: './mainsection.component.html',
  styleUrls: ['./mainsection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
  
export class MainsectionComponent implements OnInit {

  
  @ViewChild('table') table: APIDefinition;
  active = 1;
  public configuration: Config;
  public columns: Columns[];
  public data: Tabledata[] = [];
  public selected = new Set();
  public clicked: string;
  submitted = false;

  constructor(private cdr: ChangeDetectorRef, private calendar: NgbCalendar,
    private fb: UntypedFormBuilder,
    private formBuilder: FormBuilder,
    public formatter: NgbDateParserFormatter,
    private translate: TranslateService,
    public directionService: DirectionService,
    private modalService: NgbModal) {
  }
  DWObject: any;

  selectedFolder: string;

  form: FormGroup = new FormGroup({
    folderSelect: new FormControl(''),
  });


  ngOnInit(): void {
    this.translateColumns();
    
    this.translate.onLangChange.subscribe(() => {
      this.translateColumns();
    });
    this.data = data;

    this.configuration = { ...DefaultConfig };
    //this.configuration.infiniteScroll = true;
    this.configuration.selectRow = true;
    
    this.configuration.paginationEnabled = false;
    this.configuration.searchEnabled = true;
    this.configuration.rows = 100;
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = false;

    //this.configuration.checkboxes = true;
    
    this.form = this.formBuilder.group(
      {
        priorityName: ['', Validators.required],
        folderSelect: [null, Validators.required],
      }
    );

  }

  translateColumns(): void {
    this.columns = [
      { key: '', title: '', searchEnabled: false, width: '2%' },
      { key: '', title: '', searchEnabled: false, width: '2%' },
      { key: '', title: '', searchEnabled: false, width: '2%' },
      { key: 'user', title: this.translate.instant('User') },
      { key: 'subject', title: this.translate.instant('Subject') },
      { key: 'project', title: this.translate.instant('Document Type') },
      { key: 'timestamp', title: this.translate.instant('Submitted Date & Time') },
      { key: 'reference', title: this.translate.instant('Reference No') }
    ];
  }

  onChange(row: any): void {
    const index = this.data.indexOf(row);
    if (this.selected.has(index)) {
      this.selected.delete(index);
    } else {
      this.selected.add(index);
    }
  }

  model1: string;
  model2: string;
  
  

  // model: NgbDateStruct;
  // hoveredDate: NgbDate | null = null;

  // fromDate: NgbDate | null;
	// toDate: NgbDate | null = null;

  // onDateSelection(date: NgbDate) {
	// 	if (!this.fromDate && !this.toDate) {
	// 		this.fromDate = date;
	// 	} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
	// 		this.toDate = date;
	// 	} else {
	// 		this.toDate = null;
	// 		this.fromDate = date;
	// 	}
	// }

  // isHovered(date: NgbDate) {
	// 	return (
	// 		this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
	// 	);
	// }

	// isInside(date: NgbDate) {
	// 	return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	// }

	// isRange(date: NgbDate) {
	// 	return (
	// 		date.equals(this.fromDate) ||
	// 		(this.toDate && date.equals(this.toDate)) ||
	// 		this.isInside(date) ||
	// 		this.isHovered(date)
	// 	);
  // }

  // validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
	// 	const parsed = this.formatter.parse(input);
	// 	return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	// }



  
  pdfSrc = "assets/img/file-sample_150kB.pdf"; // Path to your PDF file

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  eventEmitted($event: { event: string; value: any }): void {
    this.clicked = JSON.stringify($event);
   
    //console.log('$event', $event);

    if ($event.event === 'onClick') {
      this.openModal($event.value.row);
    }
    
  }

  currentItem: any;

  openModal(row: any) {
    this.currentItem = row;  // Store the clicked row's data
    this.modalService.open(this.modalContent, { fullscreen: true });
  }

  onUpdate() {
  
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
  
  onFolderChange(): void {
    this.selectedFolder = this.form.get('folderSelect')?.value;
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
    this.form.reset();
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
