import { Action } from '@ngrx/store';
import { AuthActions, PlanetActions } from './actions.enum';

export class SetAuthStatus implements Action {
	readonly type = AuthActions.SET_AUTH_STATUS;
	constructor(public payload: boolean) {}
}

export class AddPlanets implements Action {
	readonly type = PlanetActions.ADD_PLANETS;
	constructor(public payload: Object) {}
}

export class AddPlanetToFavourites implements Action {
	readonly type = PlanetActions.ADD_PLANET_TO_FAVOURITES;
	constructor(public payload: Object) {}
}

export class RemovePlanetFromFavourites implements Action {
	readonly type = PlanetActions.REMOVE_PLANET_FROM_FAVOURITES;
	constructor(public payload: Object) {}
}
