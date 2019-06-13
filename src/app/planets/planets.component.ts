import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeMap, scan, tap } from 'rxjs/operators';
import { of, Subscription, Observable } from 'rxjs';
import { SearchService } from '../services/search.service';
import { Planet, Person } from './planets.models';
import { appConst } from '../app.const';

@Component({
	selector: 'app-planets',
	templateUrl: './planets.component.html',
	styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit, OnDestroy {

	private planetData$: Subscription;
	private bodyClassList: DOMTokenList;
	planets: Array<Planet>;
	favourites: Array<Planet>;
	people: Array<Person>;
	searchResult$: Observable<Object>;
	searchValue: string;
	shouldShowFavourites: boolean;
	closeContainer: boolean;
	searchTimedOut: boolean;

	constructor(
		private store: Store<any>,
		private searchService: SearchService
	) {}

	ngOnInit(): void {
		this.planetData$ = this.store.select('planetData')
			.subscribe(
				planetData => {
					this.planets = planetData.planets;
					this.favourites = planetData.favourites;
				}
			);

		this.bodyClassList = document.body.classList;
	}

	ngOnDestroy(): void {
		this.planetData$.unsubscribe();
	}

	onShowInhabitors(inhabitors: Array<Person>): void {
		this.people = inhabitors;
		document.body.classList.add(appConst.cssClasses.preventScroll);
	}

	searchPlanets(input: string): void {
		this.searchValue = input;
		this.searchResult$ = this.searchService.searchByKeyword(input, 'planets')
			.pipe(
				tap(() => this.searchTimedOut = false),
				mergeMap((planet: Planet) => of({...planet, imgUrl: this.getPlanetImgUrl(planet)})),
				scan((acc, planet: Planet) => [...acc, planet], []),
				tap((result: Array<Planet>) => this.searchTimedOut = !result.length)
			);
	}

	getPlanetImgUrl(planetResult: Planet): string {
		const matchedPlanet = this.planets.find((planet: Planet) => planet.name === planetResult.name) as Planet;
		return matchedPlanet.imgUrl;
	}

	toggleFavourites(): void {
		if (this.shouldShowFavourites) {
			this.removeOverlay(); // Need to run this to preserve the closing animation
		} else {
			this.shouldShowFavourites = true;
			this.bodyClassList.add(appConst.cssClasses.preventScroll);
		}
	}

	removeOverlay(): void {
		const people = this.people || [];

		if (people.length && this.shouldShowFavourites) {
			this.people.length = 0;
			return;
		} else if (people.length) {
			this.people.length = 0;
		}

		this.closeContainer = true;
		setTimeout(() => {
			this.shouldShowFavourites = false;
			this.closeContainer = false;
		}, 500);

		this.bodyClassList.remove(appConst.cssClasses.preventScroll);
	}
}
