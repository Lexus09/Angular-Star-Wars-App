import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empty, Observable, of, from } from 'rxjs';
import { map, expand, scan, mergeMap, concatMap, toArray } from 'rxjs/operators';
import { Planet, PlanetResponse, PlanetImages, Person } from '../planets/planets.models';

@Injectable({
	providedIn: 'root'
})
export class PlanetsService {

	constructor(private http: HttpClient) { }

	fetchAllPlanets(): Observable<Array<Object>> {
		return this.getPlanetsInPage('https://swapi.co/api/planets/')
			.pipe(
				expand((response: PlanetResponse) => response.next ? this.getPlanetsInPage(response.next) : empty()),
				concatMap((response: PlanetResponse) => response.results),
				mergeMap((result: Planet) => of({...result, imgUrl: PlanetImages[Math.floor(Math.random() * 6)]})),
				scan((acc, result: Planet) => acc.concat(result), [])
			);
	}

	getInhabitants(inhabitantUrls: Array<string>): Observable<Array<string | Person>> {
		return from(inhabitantUrls)
			.pipe(
				mergeMap(url => this.http.get(url.toString())),
				map((inhabitant: Person) => inhabitant.name),
				toArray()
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
