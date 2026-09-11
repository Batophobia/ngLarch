import { Component, computed, inject } from '@angular/core';

import { STORE_ITEMS } from '../data/store';
import { GameService } from '../services/game';

@Component({
  selector: 'app-store',
  imports: [],
  templateUrl: './store.html',
  styleUrl: './store.css'
})
export class Store {
  readonly game = inject(GameService);

  readonly items = computed(() =>
    STORE_ITEMS.filter(item => this.isAvailable(item.id))
  );

  private isAvailable(itemId: string): boolean {
    switch (itemId) {
      case 'repair-lab':
        return !this.game.isStoreItemPurchased(itemId);

      case 'recruit-trainer':
        return this.game.labRepaired();

      default:
        return false;
    }
  }

  purchase(itemId: string): void {
    switch (itemId) {
      case 'repair-lab':
        this.game.repairLab();
        break;

      case 'recruit-trainer':
        this.game.hireTrainer();
        break;
    }
  }

  getCost(itemId: string): number {
    switch (itemId) {
      case 'repair-lab':
        return this.game.labRepairCost();

      case 'recruit-trainer':
        return this.game.trainerCost();

      default:
        return 0;
    }
  }

  canAfford(itemId: string): boolean {
    const item = STORE_ITEMS.find(item => item.id === itemId);
    if (!item) return false;

    const cost = this.getCost(itemId);

    return item.currency === 'money'
      ? this.game.money() >= cost
      : this.game.research() >= cost;
  }
}