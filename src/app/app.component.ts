import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { empty, Observable, of } from 'rxjs';
import { map, expand, scan, mergeMap, concatMap } from 'rxjs/operators';
import { AddPlanets } from './redux/actions';
import { Planet } from './planets/planets.models';
import { PlanetResponse, PlanetImages } from './app.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private store: Store<any>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.fetchAllPlanets()
      .subscribe(
        planets => this.store.dispatch(new AddPlanets(planets)),
        () => console.warn('Couldn\'t fetch planets!')
      );
  }

  private fetchAllPlanets(): Observable<Array<Object>> {
    return this.getPlanetsInPage('https://swapi.co/api/planets/')
      .pipe(
        expand((response: PlanetResponse) => response.next ? this.getPlanetsInPage(response.next) : empty()),
        concatMap((response: PlanetResponse) => response.results),
        mergeMap((result: Planet) => of({...result, imgUrl: PlanetImages[Math.floor(Math.random() * 6)]})),
        scan((acc, result: Planet) => acc.concat(result), [])
      );
  }

  private getPlanetsInPage(url: string): Observable<Object> {
    return this.http.get(url)
      .pipe(
        map((response: PlanetResponse) => {
          return {
            next: response.next,
            results: response.results
          };
        })
      );
  }
}
