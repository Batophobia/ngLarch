import { PokemonType } from "./poke-type";
import { ResourceProduction } from "./resource-production";

export interface Job {
  id: string;
  name: string;
  description: string;
  allowedTypes: PokemonType[];
  production: ResourceProduction
}