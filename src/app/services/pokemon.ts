import { Injectable } from '@angular/core';
import { POKEMON } from '../data/pokemon';
import { PokemonSpecies } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly pokemon = POKEMON;

  getById(id: number): PokemonSpecies | undefined {
    return this.pokemon.find(pokemon => pokemon.id === id);
  }

  getAll(): PokemonSpecies[] {
    return this.pokemon;
  }
}