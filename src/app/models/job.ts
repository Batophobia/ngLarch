import { PokemonType } from "./poke-type";

export interface Job {
  id: string;
  name: string;
  description: string;

  allowedTypes: PokemonType[];
}