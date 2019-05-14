import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketsService } from './services/sockets.service';
import { PersonService } from './services/person.service';
import {Subscription, Observable } from 'rxjs';
import { flatMap, map, retry } from 'rxjs/Operators';
import { formatPerson } from './app.utils';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  $current: Observable<string>;

  constructor(
    private sockets: SocketsService,
    private service: PersonService,
  ) {}

  async ngOnInit() {

    // const person = await this.service.getByName('andrea').toPromise();

    this.$current = this.sockets
      .listen()
      .pipe(
        flatMap((name) => {
          return this.service
            .getByName(name)
            .pipe(
              retry(3)
            );
        }),
        map(formatPerson)
      );
      // .subscribe(
      //   (name) => console.log('SUCCESS: ', name),
      //   (error) => console.log('ERROR: ', error),
      //   () => console.log('COMPLETED'),
      // );
  }
}

























// this.$calling = this.socketsService
// .listenNames()
// .pipe(
//   tap(saveLastName),
//   map(toMayus),
//   distinctUntilChanged(),
//   flatMap((name: string) => {
//     return this.personService
//       .getByName(name)
//       .pipe(
//         retry(3)
//       );
//   }),
//   map(formatPerson),
//   tap(() => this.store.dispatch(new Increment()))
// );

// .subscribe(
//   (value: string) => console.log('SUCCESS VALUE: ', value),
//   () => console.log('ERROR'),
//   () => console.log('SOCKETS COMPLETED'),
// );
