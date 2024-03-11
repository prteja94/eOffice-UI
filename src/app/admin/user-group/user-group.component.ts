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
