import { PokeAssignment } from "./poke-assignment";

export interface PokeOwned {
  speciesId: number;
  quantity: number;
  assignments: PokeAssignment[];
}
