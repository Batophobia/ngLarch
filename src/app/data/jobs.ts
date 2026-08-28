import { Job } from '../models/job';
import { POKEMON_TYPES } from '../models/poke-type';

export const JOBS: Job[] = [
  {
    id: 'general-research',
    name: 'General Research',
    description: 'Conduct general research at the laboratory.',
    allowedTypes: POKEMON_TYPES // All types can do
  },
  {
    id: 'delivery',
    name: 'Deliveries',
    description: 'Help local businesses and trainers with deliveries.',
    allowedTypes: ['flying']
  }
];