import { Routes } from '@angular/router';
import { Lab } from './lab/lab';
import { Jobs } from './jobs/jobs';
import { PokemonCollection } from './pokemon/pokemon';
import { PokemonDetail } from './pokemon-detail/pokemon-detail';
import { Store } from './store/store';

export const routes: Routes = [
  {
    path: 'lab',
    component: Lab
  }, {
    path: 'store',
    component: Store
  }, {
    path: 'jobs',
    component: Jobs
  }, {
    path: 'pokemon',
    component: PokemonCollection
  }, {
    path: 'pokemon/:id',
    component: PokemonDetail
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
