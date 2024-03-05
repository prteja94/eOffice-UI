import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Tabledata, data } from '../../../../assets/data';
import { API, Columns, APIDefinition, DefaultConfig, Config } from 'ngx-easy-table';
import {  NgbDate, NgbDateStruct, NgbCalendar, NgbDatepickerModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-outbox',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.scss']
})
export class OutboxComponent {
  @ViewChild('table') table: APIDefinition;

  public configuration: Config;
  public columns: Columns[];
  public data: Tabledata[] = [];
  public selected = new Set();

  constructor(private cdr: ChangeDetectorRef, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {

  
  }

  ngOnInit(): void {
    this.columns = [
      { key: '', title: '', searchEnabled: false, width: '2%' },
      { key: '', title: '', searchEnabled: false, width: '2%' },
      { key: '', title: '', searchEnabled: false, width: '2%' },
      { key: 'user', title: 'User' },
      { key: 'subject', title: 'Subject' },
      { key: 'project', title: 'Document Type' },
      { key: 'timestamp', title: 'Submitted Date & Time'},
      { key: 'reference', title: 'Reference No' },
    ];
    this.data = data;

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

  model1: string;
  model2: string;
}
