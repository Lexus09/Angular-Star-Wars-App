import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddPlanets } from './redux/actions';
import { PlanetsService } from './planets/planets.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	constructor(
		private store: Store<any>,
		private planetsService: PlanetsService
	) {}

	ngOnInit(): void {
		this.planetsService.fetchAllPlanets()
			.subscribe(
				planets => this.store.dispatch(new AddPlanets(planets)),
				() => console.warn('Couldn\'t fetch planets!')
			);
	}
}
