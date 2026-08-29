import { Job } from '../models/job';
import { POKEMON_TYPES } from '../models/poke-type';

export const JOBS: Job[] = [
  {
    id: 'general-research',
    name: 'General Research',
    description: 'Conduct general research at the laboratory.',
    allowedTypes: POKEMON_TYPES, // All types can do
    production: {
      money: 0,
      research: 1
    }
  },
  {
    id: 'delivery-01',
    name: 'Basic Deliveries',
    description: 'Help local businesses and trainers with small deliveries.',
    allowedTypes: ['flying'],
    production: {
      money: 1,
      research: 0
    }
  },
  {
    id: 'delivery-02',
    name: 'Medium Deliveries',
    description: 'Help local businesses with more deliveries.',
    allowedTypes: ['flying'],
    production: {
      money: 1,
      research: 0
    }
  }
];