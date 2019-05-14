import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Person {
  name: string;
  dni: number;
  lastname: string;
  year: number;
}

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private server = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
  ) {}

  create(person: Person): Observable<Person> {
    return this.http.post<Person>(`${this.server}/person`, person);
  }

  remove(name: string): Observable<any> {
    return this.http.delete(`${this.server}/person/${name}`);
  }

  getByName(name: String): Observable<Person> {
    return this.http.get<Person>(`${this.server}/persons/${name}`);
  }
}
