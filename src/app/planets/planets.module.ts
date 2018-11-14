import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsRoutingModule } from './planets-routing.module';
import { PlanetsComponent } from './planets.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';
import { PlanetComponent } from './planet/planet.component';

@NgModule({
  declarations: [PlanetsComponent, PlanetDetailComponent, PlanetComponent],
  imports: [CommonModule, PlanetsRoutingModule]
})
export class PlanetsModule { }
