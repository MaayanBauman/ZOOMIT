import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ToastrService } from 'ngx-toastr';
import { Category } from '../../models/category';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class CategoriesComponent implements OnInit {
  public categories: Category[];
  public showSpinner: boolean;
  public isChartLoad: boolean;

  constructor(private http: HttpClient, public dialog: MatDialog) {
    this.categories = [];
    this.showSpinner = true;
    this.isChartLoad = false;
  }

  ngOnInit() {
    this.getAllCategories().subscribe((res) => {
      this.categories = res;
      this.showSpinner = false;
    });
  }

  private getAllCategories(): Observable<Category[]> {
    return this.http.get<any[]>('http://localhost:8080/categories');
  }

  public deleteCategory(category: Category) {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

    // this.http.delete<any[]>(`http://localhost:8080/categories/${category._id}`).subscribe((res) => {
    //   alert('delete!' + category.name);
    // });
  }

  public editCategory(category: any) {
    alert('edit!' + category._id);
  }

  public addCategory() {
    const category = {
      _id: "5ffe0a39c4b60b6c63b1f4d1",
      name: 'נגרות'
    }

    this.http.post<any[]>('http://localhost:8080/categories', { category }).subscribe((res) => {
      alert('add!' + category.name);
    });;
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  template: '<div></div>',
})
export class DialogElementsExampleDialog {}
