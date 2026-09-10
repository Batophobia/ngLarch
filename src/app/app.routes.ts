import { Routes } from '@angular/router';
import { Lab } from './lab/lab';
import { Jobs } from './jobs/jobs';
import { PokemonCollection } from './pokemon/pokemon';

export const routes: Routes = [
  {
    path: 'lab',
    component: Lab
  }, {
    path: 'jobs',
    component: Jobs
  }, {
    path: 'pokemon',
    component: PokemonCollection
    // }, {
    // path: 'pokedex/:id',
    // component: PokemonCollection?
    // }, {
    // path: 'pokedex',
    // component: TODO
    // }, {
    // path: 'awards', // achievements, badges, 
    // component: TODO
  }, {
    path: '',
    redirectTo: '/lab',
    pathMatch: 'full'
  }
];
