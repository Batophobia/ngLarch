import { computed, inject, Injectable, signal } from '@angular/core';
import { STARTING_POKEMON } from '../data/collection';
import { PokeOwned } from '../models/poke-owned';
import { PokemonService } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private pokemonService = inject(PokemonService)

  readonly research = signal(0);
  readonly money = signal(0);
  readonly pokemon = signal<PokeOwned[]>(STARTING_POKEMON);

  readonly ownedPokemon = computed(() =>
    this.pokemon().map(owned => ({ quantity: owned.quantity, species: this.pokemonService.getById(owned.speciesId) }))
  )

  assignPokemon(speciesId: number, jobId: string, quantity: number) {

  }
  unassignPokemon(speciesId: number, jobId: string, quantity: number) {

  }
}