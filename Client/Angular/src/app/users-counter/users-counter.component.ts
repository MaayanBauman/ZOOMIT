import { Component } from '@angular/core';
import { RealtimeService } from '../realtime.service';

@Component({
  selector: 'app-users-counter',
  templateUrl: './users-counter.component.html',
  styleUrls: ['./users-counter.component.css']
})
export class UsersCounterComponent  {
  usersCounter!: Number;

  constructor(private service : RealtimeService){
    service.usersCounter.subscribe((counter: Number) => this.usersCounter = counter);
  }
}
