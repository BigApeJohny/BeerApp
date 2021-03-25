import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from './../../../environments/environment';
import { Beer } from './../../models/beer.interface';

@Injectable({
  providedIn: 'root'
})
export class BrewServiceService {

  constructor(public http: HttpClient) {}

  public getBeers(): Observable<Beer[]> {
    const beersEndpoint = `/api/${environment.api.ontariobeerapi.beers}`;
    return this.http.get<Beer[]>(beersEndpoint, {}).pipe(
      catchError(this.handleError<Beer[]>('getBeers', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
