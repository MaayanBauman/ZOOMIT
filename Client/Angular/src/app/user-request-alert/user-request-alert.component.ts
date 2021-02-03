import {Component} from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-request-alert',
  templateUrl: './user-request-alert.component.html',
  styleUrls: ['./user-request-alert.component.css']
})
export class UserRequestAlertComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.open('בקשת זומר חדשה!', 'X', {
      duration: 6000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass:['user-request-alert'],
    });
  }
}

