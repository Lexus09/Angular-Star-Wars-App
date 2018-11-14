import { Component, Output, OnInit, Input, OnDestroy, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { from, Subscription } from 'rxjs';
import { mergeMap, map, toArray } from 'rxjs/operators';
import { AddPlanetToFavourites, RemovePlanetFromFavourites } from '../../redux/actions';
import { Planet, Person } from '../planets.models';

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
  randomPlanetImg: string;
  baseUrl: string;

  constructor(private http: HttpClient, private store: Store<any>) { }

  ngOnInit(): void {
    this.store.select('planetData')
      .subscribe(
        planetData => {
          const { favourites } = planetData;
          this.isFavourite = favourites && favourites.some((favourite: Planet) => favourite.name === this.planet.name);
        }
      );

    this.baseUrl = '../../../assets/images/';
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

    this.planetInhabitants$ = from(inhabitantUrls)
      .pipe(
        mergeMap(url => this.http.get(url.toString())),
        map((inhabitant: Person) => inhabitant.name),
        toArray()
      )
      .subscribe(
        planetInhabitors => this.getInhabitors.emit(planetInhabitors)
      );
  }
}
