import { Component, ViewChild, AfterViewInit, ElementRef  } from '@angular/core';
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
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef<HTMLInputElement>;

  files: File[] = [];

  onFileSelected(event: any): void {
    const filesToAdd: File[] = Array.from(event.target.files as FileList);
    this.files.push(...filesToAdd);
    event.target.value = ''; // Reset file input to allow the same file to be selected again
  }

  deleteFile(index: number): void {
    this.files.splice(index, 1);
  }

  uploadFiles(): void {
    // Placeholder for upload logic
    console.log('Uploading', this.files);
    // Here you would typically call a service to upload the files to a server
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
