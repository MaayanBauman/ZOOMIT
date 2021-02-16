import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, EventsCount, CategoryWithEventsCount, EventsPriceSum } from '../../models/category';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryDialog } from './addCategoryDialog/addCategoryDialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment';
import { Observable, forkJoin } from 'rxjs';


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

    forkJoin([
      this.getAllCategories2(),
      this.getCategoriesEventNumber(), 
      this.getCategoriesEventPriceSum()
    ]).subscribe(
      (res) => {
        const allCategories: Category[] = res[0];
        const categoriesEventNumber: EventsCount[] = res[1];
        const categoriesEventPriceSum: EventsPriceSum[] = res[2];

        this.categories = allCategories.map((category: Category): CategoryWithEventsCount => {
          const eventsNumber: EventsCount | undefined = categoriesEventNumber.find(
            (eventCount: EventsCount) => eventCount._id === category._id);
          const eventsPriceSum: EventsPriceSum | undefined = categoriesEventPriceSum.find(
              (eventPriceSum: EventsPriceSum) => eventPriceSum._id === category._id);
          
          return {
            _id: category._id,
            name: category.name,
            events: eventsNumber?.count,
            prices: eventsPriceSum?.value
          };
        });

        this.showSpinner = false;
      },
      (err) => {
        this._snackBar.open("ניראה שיש לנו קצת בעיה תחזרו מאוחר יותר יהיה בסדר", undefined, {
          panelClass: 'notif-error',
          horizontalPosition: 'left'
        });
      }
    );
  }

  private getAllCategories2(): Observable<Category[]> {
    return this.http.get<any[]>(`${environment.serverUrl}/categories`);
  }

  private getCategoriesEventNumber(): Observable<EventsCount[]> {
    return this.http.get<any[]>(`${environment.serverUrl}/events/categories/count`);
  }

  private getCategoriesEventPriceSum(): Observable<EventsPriceSum[]> {
    return this.http.get<any[]>(`${environment.serverUrl}/events/categories/price/sum`);
  }

  public deleteCategory(category: CategoryWithEventsCount): void {
    this.http.delete<any[]>(`${environment.serverUrl}/categories/${category._id}`).subscribe(
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

  public addCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.post<any[]>(
          `${environment.serverUrl}/categories`,
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
      }
    });
  }
}
