import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { PlanetResponse } from '../app.models';

@Injectable({
	providedIn: 'root'
})
export class SearchService {

	constructor(private http: HttpClient) {}

	searchByKeyword(input: string, resource: string) {
		return of(input)
			.pipe(
				debounceTime(500),
				distinctUntilChanged(),
				switchMap(keyword => this.searchResource(resource, keyword))
			);
	}

	private searchResource(resource: string, keyword: string): Observable<Object> {
		return this.http.get(`https://swapi.co/api/${resource}/?search=${keyword}`)
			.pipe(
				mergeMap((response: PlanetResponse) => response.results)
			);
	}
}
