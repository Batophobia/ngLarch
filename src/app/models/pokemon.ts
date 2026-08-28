import { PokemonType } from "./poke-type";

export interface PokemonSpecies {
  id: number;
  name: string;
  types: PokemonType[];
}