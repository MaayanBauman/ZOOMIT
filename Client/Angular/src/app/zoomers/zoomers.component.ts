import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {User, UserType} from '../../models/user';
import { environment } from '../../environments/environment';
import { DataRowOutlet } from '@angular/cdk/table';

interface zoomerRequesterTableRow {
  fullName : string,
  email : string
}

interface zoomerTableRow {
  fullName : string,
  email : string,
  approvedDate : Date,
  zoomsCount: number
}
@Component({
  selector: 'zoomers',
  templateUrl: './zoomers.component.html',
  styleUrls: ['./zoomers.component.css']
})
export class ZoomersComponent implements OnInit {
  public zoomers: User[];
  public showSpinner: boolean;
  public zoomerRequesters : User[];
  public zoomerDisplayedColumns: string[] = ['full_name', 'email', 'func'];
  public zoomerRequesterDisplayedColumns: string[] = ['full_name', 'email', 'approvedDate', 'zoomsCount', 'func'];

  constructor(private http: HttpClient) {
    this.zoomers = [];
    this.zoomerRequesters = [];
    this.showSpinner = true;
  }

  private getAllZoomers = (): Observable<User[]> => {
    return this.http.get<any[]>(`${environment.serverUrl}/users/types/zoomer`);
  }

  private getAllZoomerRequesters= (): Observable<User[]> => {
    return this.http.get<any[]>(`${environment.serverUrl}/users/zoomer/requesters`);
  }

  approveZoomer = (zoomer: User) => {
    this.showSpinner = true;
    this.http.put(`${environment.serverUrl}/users/${zoomer._id}`, {
      user: {
        ...zoomer,
        approved_date: new Date(),
        is_waiting_for_approval: false,
        user_type: UserType.ZOOMER
      }
    }).subscribe((res)=>{
      this.ngOnInit();
    })
  }

  cancelZoomer = (zoomer: User) => {
    this.showSpinner = true;
    this.http.put(`${environment.serverUrl}/users/${zoomer._id}`, {
      user: {
        ...zoomer,
        user_type: UserType.USER
      }
    }).subscribe((res)=>{
      this.ngOnInit();
    })
  }

  ngOnInit(): void {
    this.getAllZoomers().subscribe((res) => {
      this.zoomers = res;
      this.showSpinner = false;
    });
    this.getAllZoomerRequesters().subscribe((res) => {
      this.zoomerRequesters = res;
      this.showSpinner = false;
    });
  }

}
