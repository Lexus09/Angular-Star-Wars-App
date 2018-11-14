export interface Planet {
	climate: string;
	created: Date;
	diameter: number;
	edited: Date;
	films: Array<string>;
	gravity: number;
	name: string;
	orbitalPeriod: number;
	population: number;
	residents: Array<string>;
	rotationPeriod: number;
	surfaceWater: number;
	terrain: string;
	url: string;
	imgUrl: string;
}

export interface Person {
	birthYear: Date;
	eyeColor: string;
	films: Array<string>;
	gender: string;
	hairColor: string;
	height: number;
	homeWorld: string;
	mass: number;
	name: string;
	skinColor: string;
	created: Date;
	edited: Date;
	species: Array<string>;
	starships: Array<string>;
	url: string;
}

export interface PlanetResponse {
	next: string;
	results: Array<Object>;
}

export enum PlanetImages {
	'planet_1.png',
	'planet_2.png',
	'planet_3.png',
	'planet_4.png',
	'planet_5.png',
	'planet_6.png'
}
