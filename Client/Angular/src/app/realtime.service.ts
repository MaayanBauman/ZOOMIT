import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class RealtimeService {

  usersCounter = this.socket.fromEvent<Number>('usersCount');

  constructor(private socket: Socket) { }
}
