import { inject, Injectable } from '@angular/core';

import { PokemonService } from './pokemon';
import { GameService } from './game';

@Injectable({
  providedIn: 'root'
})

export class PokeGeneratorService {
  private pokemonService = inject(PokemonService);
  private game = inject(GameService);

  private readonly startingPokemon = [
    16, // Pidgey
    19  // Rattata
  ];

  generate(): void {
    const speciesId = this.startingPokemon[
      Math.floor(Math.random() * this.startingPokemon.length)
    ];

    this.game.addPokemon(speciesId);
  }
}
