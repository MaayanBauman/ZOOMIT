import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'add-category-dialog',
  templateUrl: './addCategoryDialog.component.html',
  styleUrls: ['./addCategoryDialog.component.css'],
})

export class AddCategoryDialog {
  public name: string;

  constructor(public dialogRef: MatDialogRef<AddCategoryDialog>) {
    this.name = '';
  }

  public addCategory() {
    if (!this.name) {
      return;
    }

    this.dialogRef.close(this.name);
  }
}

