import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GameService } from '../services/game';
import { PokemonService } from '../services/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  imports: [RouterLink],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css'
})
export class PokemonDetail {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);
  readonly game = inject(GameService);

  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));

  readonly species = this.pokemonService.getById(this.pokemonId);

  readonly owned = computed(() =>
    this.game.ownedPokemon().find(
      pokemon => pokemon.speciesId === this.pokemonId
    )
  );

  assignToJob(jobId: string, quantity = 1) {
    this.game.assignPokemon(this.pokemonId, jobId, quantity);
  }

  unassignFromJob(jobId: string, quantity = 1) {
    this.game.unassignPokemon(this.pokemonId, jobId, quantity);
  }

  getAssignedQuantity(jobId: string): number {
    return this.owned()?.assignments.find(
      assignment => assignment.jobId === jobId
    )?.quantity ?? 0;
  }
}