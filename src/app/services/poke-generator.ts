import { Injectable, inject } from '@angular/core';
import { GameService } from './game';

@Injectable({
  providedIn: 'root'
})
export class PokeGeneratorService {
  private game = inject(GameService);
  private trainerSuccessChance = 0.25;

  private readonly startingPokemon = [
    16, // Pidgey
    19  // Rattata
  ];

  generate(): void {
    if (!this.game.labRepaired()) return;

    if (Math.random() >= this.trainerSuccessChance) return;

    const speciesId = this.startingPokemon[
      Math.floor(Math.random() * this.startingPokemon.length)
    ];

    this.game.addPokemon(speciesId);
  }
}