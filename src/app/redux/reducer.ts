import { AuthActions, PlanetActions } from './actions.enum';

export let initialState = [];

export function authData(state: any = initialState, action) {
	switch (action.type) {
		case AuthActions.SET_AUTH_STATUS:
			return {...state, isLoggedIn: action.payload};
		default:
			return state;
	}
}

export function planetData(state: any = initialState, action) {
	switch (action.type) {
		case PlanetActions.ADD_PLANETS:
			return {...state, planets: action.payload};
		case PlanetActions.ADD_PLANET_TO_FAVOURITES:
			// Fallback to an empty array if undefined
			const currentFavourites = state.favourites || [];
			return {...state, favourites: [...currentFavourites, ...action.payload]};
		case PlanetActions.REMOVE_PLANET_FROM_FAVOURITES:
			const filteredFavourites = [...state.favourites].filter((favourite) => favourite.name !== action.payload.name);
			return {...state, favourites: filteredFavourites};
		default:
			return state;
	}
}
