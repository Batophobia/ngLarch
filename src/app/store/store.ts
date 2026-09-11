import { Component, inject } from '@angular/core';
import { GameService } from '../services/game';

@Component({
  selector: 'app-store',
  imports: [],
  templateUrl: './store.html',
  styleUrl: './store.css',
})
export class Store {
  readonly game = inject(GameService);

  repairLab(): void {
    this.game.repairLab();
  }

  hireTrainer(): void {
    this.game.hireTrainer();
  }
}