import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';

import { TranslateService } from '@ngx-translate/core';
import { DirectionService } from '../../shared/services/direction.service';

@Component({
  selector: 'app-ejob',
  templateUrl: './ejob.component.html',
  styleUrls: ['./ejob.component.scss']
})
export class EjobComponent implements AfterViewInit  {
  // Declare a ViewChild to access the Quill editor component
  @ViewChild('editor', { static: true }) editorComponent: QuillEditorComponent;

  files: File[] = [];

  onFileSelected(event: any): void {
    this.files = Array.from(event.target.files);
  }
  
  constructor(private translate: TranslateService,
    public directionService: DirectionService,) {
    translate.setDefaultLang('en');
  }
  
  // Event handlers with specific event types
  focus(event: QuillEditorComponent) {
    console.log('Quill editor focused', event);
  }

  blur(event: QuillEditorComponent) {
    console.log('Quill editor blurred', event);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang); // Switch the active language
  }

  ngAfterViewInit() {}
}
