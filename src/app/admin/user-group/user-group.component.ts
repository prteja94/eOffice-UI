import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
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
export class UserGroupComponent {

  //emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  //matcher = new MyErrorStateMatcher();
 
  leftList = ['Item 1', 'Item 2', 'Item 3'];
  rightList = ['Item 4', 'Item 5'];
  selectedItems: { left: string[]; right: string[] } = { left: [], right: [] };


  selectItem(item: string, side: 'left' | 'right') {
    const index = this.selectedItems[side].indexOf(item);
    if (index > -1) {
      this.selectedItems[side].splice(index, 1); // Deselect
    } else {
      this.selectedItems[side].push(item); // Select
    }
  }

  moveSelected(side: 'left' | 'right') {
    const source = side === 'left' ? this.rightList : this.leftList;
    const destination = side === 'left' ? this.leftList : this.rightList;

    this.selectedItems[side].forEach(item => {
      const index = source.indexOf(item);
      if (index > -1) {
        source.splice(index, 1);
        destination.push(item);
      }
    });

    this.selectedItems[side] = []; // Clear selection after moving
  }

  moveAll(side: 'left' | 'right') {
    const source = side === 'left' ? this.rightList : this.leftList;
    const destination = side === 'left' ? this.leftList : this.rightList;

    destination.push(...source);
    source.length = 0; // Empty source list
  }
}
