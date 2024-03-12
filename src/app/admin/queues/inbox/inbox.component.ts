import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Tabledata, data } from '../../../../assets/data';
import { API, Columns, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';
import {  NgbDate, NgbDateStruct, NgbCalendar, NgbDatepickerModule, NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InboxService } from './inbox.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent {

  @ViewChild('table') table: APIDefinition;

  public configuration: Config;
  public columns: Columns[];
  public data: Tabledata[] = [];
  public selected = new Set();
  public clicked: string;
  active = 1;
  
  constructor(private cdr: ChangeDetectorRef, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter,private modalService: NgbModal,private inboxService:InboxService) {

  
  }

  ngOnInit(): void {
    this.columns = [
      { key: '', title: '', searchEnabled: false, width: '2%' },
      { key: '', title: '', searchEnabled: false, width: '2%' },
      { key: '', title: '', searchEnabled: false, width: '2%' },
      { key: 'actionOwnerName', title: 'User' },
      { key: 'subject', title: 'Subject' },
      { key: 'docTypeName', title: 'Document Type' },
      { key: 'activityDate', title: 'Submitted Date & Time'},
      { key: 'refNo', title: 'Reference No' },
    ];
   // this.data = data;

    this.inboxService.getTableData().subscribe((response) => {
      this.data = response;
      this.cdr.detectChanges();
    })

    this.configuration = { ...DefaultConfig };
    //this.configuration.infiniteScroll = true;
    this.configuration.paginationEnabled = false;
    this.configuration.searchEnabled = true;
    this.configuration.rows = 100;
    this.configuration.resizeColumn = true;
    this.configuration.fixedColumnWidth = false;
    //this.configuration.checkboxes = true;
    
  }


  onChange(row: any): void {
    const index = this.data.indexOf(row);
    if (this.selected.has(index)) {
      this.selected.delete(index);
    } else {
      this.selected.add(index);
    }
  }

  pdfSrc = "assets/img/file-sample_150kB.pdf"; // Path to your PDF file

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  eventEmitted($event: { event: string; value: any }): void {
    this.clicked = JSON.stringify($event);
   
    //console.log('$event', $event);

    if ($event.event === 'onClick') {
      this.openModal($event.value.row);
    }
    
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

  onUpdate() {
  
  }

  currentItem: any;

  openModal(row: any) {
    this.currentItem = row;  // Store the clicked row's data
    this.modalService.open(this.modalContent, { fullscreen: true });
  }

  model1: string;
  model2: string;
}


