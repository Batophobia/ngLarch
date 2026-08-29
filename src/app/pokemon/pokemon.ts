import { Component, inject } from '@angular/core';
import { GameService } from '../services/game';

@Component({
  selector: 'app-pokemon',
  imports: [],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css'
})
export class Pokemon {
  readonly game = inject(GameService);

  assignPidgeyToResearch() {
    this.game.assignPokemon(
      16,
      'general-research',
      1
    );
  }

  unassignPidgeyFromResearch() {
    this.game.unassignPokemon(
      16,
      'general-research',
      1
    );
  }
}