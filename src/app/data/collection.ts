import { PokeOwned } from "../models/poke-owned";

export const STARTING_POKEMON: PokeOwned[] = [
  {
    speciesId: 19,
    quantity: 5,
    assignments: [
      {
        jobId: 'general-research',
        quantity: 3
      },
      {
        jobId: 'delivery',
        quantity: 2
      }
    ]

  },
  {
    speciesId: 16,
    quantity: 3,
    assignments: [
      {
        jobId: 'general-research',
        quantity: 3
      }
    ]

  }
];