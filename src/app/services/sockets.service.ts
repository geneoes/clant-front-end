import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, fromEvent } from 'rxjs';
import { tap, distinctUntilChanged, filter, first} from 'rxjs/Operators';
import { isValidName } from '../app.utils';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  private socket: SocketIOClient.Socket = io('http://localhost:3000');

  constructor() {}

  listen(): Observable<any> {

    return fromEvent(this.socket, 'names')
      .pipe(
        filter(isValidName),
        // first(),
        tap((name) => {
          // log something
          // console.log(''value: ', name');
        }),
        distinctUntilChanged(),
      );
  }

}
