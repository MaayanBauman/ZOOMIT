import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Category } from '../../models/category';
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

  constructor(private http: HttpClient) {
    this.categories = [];
    this.showSpinner = true;
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
}
