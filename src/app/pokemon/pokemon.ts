import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GameService } from '../services/game';

@Component({
  selector: 'app-pokemon',
  imports: [RouterLink],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css'
})
export class PokemonCollection {
  readonly game = inject(GameService);

  readonly search = signal('');
  readonly filter = signal<'all' | 'assigned' | 'unassigned'>('all');

  readonly pokemon = computed(() => {
    const search = this.search().trim().toLowerCase();
    const filter = this.filter();

    return this.game.ownedPokemon()
      .filter(owned => {
        if (!search) {
          return true;
        }

        return owned.species?.name.toLowerCase().includes(search);
      })
      .filter(owned => {
        const available = this.game.getUnassignedPokemon(owned.speciesId);

        switch (filter) {
          case 'assigned':
            return available < owned.quantity;

          case 'unassigned':
            return available > 0;

          default:
            return true;
        }
      });
  });

  setSearch(event: Event) {
    this.search.set((event.target as HTMLInputElement).value);
  }

  setFilter(event: Event) {
    this.filter.set(
      (event.target as HTMLSelectElement).value as 'all' | 'assigned' | 'unassigned'
    );
  }
}