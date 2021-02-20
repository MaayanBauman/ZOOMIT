import { forkJoin, Observable } from 'rxjs';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Event, ExtendedEvent } from '../../models/event';
import { User } from 'src/models/user';
import { Category } from 'src/models/category';
import { Source } from 'src/models/source';

@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  public events: ExtendedEvent[];
  public showSpinner: boolean;
  public eventsDisplayedColumns: string[] = ['author_name', 'title', 'category', 'start_time', 'price', 'registered_number', 'func'];
  public displayedColumns: string[] = ['author_name', 'title', 'category'];
  //public dataSource: MatTableDataSource<ExtendedEvent>;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.events = [];
    this.showSpinner = true;
    //this.dataSource = this.dataSource = new MatTableDataSource(this.events);
    //this.dataSource = new MatTableDataSource(this.events);
  }

  ngOnInit() {
    this.getExtendedEvents();
  }

  private getAllEvents = (): Observable<Event[]> => {
    return this.http.get<any[]>(`${environment.serverUrl}/events`);
  }

  private getAllCategories(): Observable<Category[]> {
    return this.http.get<any[]>(`${environment.serverUrl}/categories`);
  }

  private getAllUsers(): Observable<User[]> {
    return this.http.get<any[]>(`${environment.serverUrl}/users`);
  }

  private getAllSources(): Observable<Source[]> {
    return this.http.get<any[]>(`${environment.serverUrl}/sources`);
  }

  private getExtendedEvents = (): void => {
    this.showSpinner = true;

    forkJoin([
      this.getAllEvents(),
      this.getAllCategories(),
      this.getAllUsers(),
      this.getAllSources()
    ]).subscribe(
      (res) => {
        const rawEvents: Event[] = res[0];
        const categories: Category[] = res[1];
        const zoomers: User[] = res[2];
        const sources: Source[] = res[3];

        this.events = rawEvents.map((event: Event): ExtendedEvent => {
          const categoryName: string | undefined = categories.find(
            (category: Category) => category._id === event.category)?.name;

          let authorName: string | undefined = undefined;
          let authorIsActive: boolean = true;
          if (event.zoomer_id) {
            const zoomer = zoomers.find(
              (zoomer: User) => zoomer._id === event.zoomer_id);
            authorName = zoomer?.full_name;
            authorIsActive = zoomer?.user_type === 'zoomer';
          } else if (event.source_id) {
            authorName = sources.find(
              (source: Source) => source._id === event.source_id)?.name;
          }

          return {
            _id: event._id,
            title: event.title,
            description: event.description,
            zoom_link: event.zoom_link,
            password: event.password,
            start_time: event.start_time,
            end_time: event.end_time,
            max_registers: event.max_registers,
            registered_number: event.registered_users.length,
            category_name: categoryName,
            price: event.price,
            author_name: authorName,
            author_is_active: authorIsActive
          };
        });

        this.showSpinner = false;
      },
      (err) => {
        this._snackBar.open("נראה שיש לנו קצת בעיה תחזרו מאוחר יותר שתו קפה או משהו", undefined, {
          panelClass: 'notif-error',
          horizontalPosition: 'left'
        });
      });

  }

  public removeEvent(event: ExtendedEvent): void {
    if (confirm("למחוק את האירוע " + event.title + "?")) {
      this.http.delete<any[]>(`${environment.serverUrl}/events/${event._id}`).subscribe(
        (res) => {
          this._snackBar.open(`האירוע ${event.title} נמחק בהצלחה!`, undefined, {
            duration: 2000,
            panelClass: 'notif-success',
            horizontalPosition: 'left'
          });

          this.ngOnInit();
          /* const index = this.events.indexOf(event);
          this.events.splice(index, 1); */
          //this.dataSource = new MatTableDataSource(this.events);
        },
        (err) => {
          this._snackBar.open("אויי משהו השתבש במחיקה, אולי ננסה שוב?", undefined, {
            duration: 2000,
            panelClass: 'notif-error',
            horizontalPosition: 'left'
          });
        }
      );
    }
  }
}