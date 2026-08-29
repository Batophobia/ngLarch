import { Pokemon } from '../pokemon/pokemon';
import { GameService } from './../services/game';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-lab',
  imports: [Pokemon],
  templateUrl: './lab.html',
  styleUrl: './lab.css',
})
export class Lab {
  game = inject(GameService);

  addResearch() {
    this.game.research.update(cur => cur + 1)
  }
  addMoney() {
    this.game.money.update(cur => cur + 1)
  }
}
