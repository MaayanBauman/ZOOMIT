import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, EventsCount, CategoryWithEventsCount } from '../../models/category';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryDialog } from './addCategoryDialog/addCategoryDialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CategoriesComponent implements OnInit {
  public categories: CategoryWithEventsCount[];
  public showSpinner: boolean;

  constructor(private http: HttpClient, public dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.categories = [];
    this.showSpinner = true;
  }

  ngOnInit() {
    this.getAllCategories();
  }

  private getAllCategories(): void {
    this.showSpinner = true;

    this.http.get<any[]>('http://localhost:8080/categories').subscribe((res: Category[]) => {
      this.getCategoriesEventNumber().subscribe(
        (countRes: EventsCount[]) => {
          this.categories = res.map((category): CategoryWithEventsCount => {
            const eventsNumber: EventsCount | undefined = countRes.find(
              (eventsCount: EventsCount) => eventsCount._id === category._id);

            return {
              _id: category._id,
              name: category.name,
              events: eventsNumber?.count
            };
          });

          this.showSpinner = false;
        },
        (err) => {
          this._snackBar.open("ניראה שיש לנו בעיה קטנה :( תנסו שוב יותר מאוחר...", undefined, {
            panelClass: 'notif-error',
            horizontalPosition: 'left'
          });
        }
      );
    });
  }

  private getCategoriesEventNumber() {
    return this.http.get<any[]>('http://localhost:8080/events/categories/count');
  }

  public deleteCategory(category: CategoryWithEventsCount) {
    this.http.delete<any[]>(`http://localhost:8080/categories/${category._id}`).subscribe(
      (res) => {
        this._snackBar.open(`הקטגוריה ${category.name} נמחקה`, undefined, {
          duration: 2000,
          panelClass: 'notif-success',
          horizontalPosition: 'left'
        });

        const index = this.categories.indexOf(category);
        this.categories.splice(index, 1);
      },
      (err) => {
        this._snackBar.open("אויי משהו השתבש במחיקה אולי ננסה שוב?", undefined, {
          duration: 2000,
          panelClass: 'notif-error',
          horizontalPosition: 'left'
        });
      }
    );
  }

  public addCategory() {
    const dialogRef = this.dialog.open(AddCategoryDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.http.post<any[]>(
          'http://localhost:8080/categories',
          { category: { name: result } }
        ).subscribe(
          (res: any) => {
            this._snackBar.open(`יששש נוספה קטגוריה חדשה- ${result}!`, undefined, {
              duration: 2000,
              panelClass: 'notif-success',
              horizontalPosition: 'left'
            });

            this.categories.push({ _id: res.ops[0]._id, name: res.ops[0].name, events: undefined});
          },
          (err) => {
            this._snackBar.open("אופס ניראה שהייתה בעיה והקטגוריה לא נוצרה", undefined, {
              duration: 2000,
              panelClass: 'notif-error',
              horizontalPosition: 'left'
            });
          }
        );
    });
  }
}
