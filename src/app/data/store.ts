import { StoreItem } from "../models/store";

export const STORE_ITEMS: StoreItem[] = [
  {
    id: 'repair-lab',
    name: 'Repair Lab',
    description: 'Repair the laboratory and begin accepting Pokémon.',
    currency: 'money',
    cost: 10,
    repeatable: false
  },
  {
    id: 'recruit-trainer',
    name: 'Recruit Trainer',
    description: 'Recruit a trainer who may bring Pokémon to the laboratory.',
    currency: 'research',
    cost: 5,
    repeatable: true
  }
];