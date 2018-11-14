import { Component, Output, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AddPlanetToFavourites, RemovePlanetFromFavourites } from '../../redux/actions';
import { Planet } from '../planets.models';
import { planetConst } from './planet.const';
import { PlanetsService } from '../../services/planets.service';

@Component({
	selector: 'app-planet',
	templateUrl: './planet.component.html',
	styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit, OnDestroy {

	@Input() planet: Planet;
	@Input() isFavouritesContainer?: boolean;
	@Output() getInhabitors: EventEmitter<Array<Object>> = new EventEmitter();

	private planetInhabitants$: Subscription;
	isFavourite: boolean;
	baseUrl = planetConst.baseImagesUrl;

	constructor(
		private http: HttpClient,
		private store: Store<any>,
		private planetsService: PlanetsService
	) { }

	ngOnInit(): void {
		this.store.select('planetData')
			.subscribe(
				planetData => {
					const { favourites } = planetData;
					this.isFavourite = favourites && favourites.some((favourite: Planet) => favourite.name === this.planet.name);
				}
			);
	}

	ngOnDestroy(): void {
		if (this.planetInhabitants$) {
			this.planetInhabitants$.unsubscribe();
		}
	}

	addOrRemoveFavourite(planet: Planet): void {
		this.isFavourite
			? this.store.dispatch(new RemovePlanetFromFavourites(planet))
			: this.store.dispatch(new AddPlanetToFavourites(planet));
	}

	onGetInhabitants(inhabitantUrls: Array<string>): void {
		if (!inhabitantUrls.length) {
			alert('No people reside on this planet!');
			return;
		}

		this.planetInhabitants$ = this.planetsService.getInhabitants(inhabitantUrls)
			.subscribe(
				planetInhabitors => this.getInhabitors.emit(planetInhabitors),
				() => console.warn('Error retrieving inhabitors!')
			);
	}
}
