import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss']
})
export class PlanetDetailComponent {

  @Input() planetInhabitants: Array<string>;

  constructor() { }
}
