import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PlanetResponse } from '../app.models';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) {}

  searchResource(resource: string, keyword: string): Observable<Object> {
    return this.http.get(`https://swapi.co/api/${resource}/?search=${keyword}`)
      .pipe(
        mergeMap((response: PlanetResponse) => response.results)
      );
  }
}
