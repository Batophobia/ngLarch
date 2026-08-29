import { Component, inject } from '@angular/core';
import { GameService } from '../services/game';
import { PokeAssignment } from '../models/poke-assignment';

@Component({
  selector: 'app-pokemon',
  imports: [],
  templateUrl: './pokemon.html',
  styleUrl: './pokemon.css'
})
export class PokemonCollection {
  readonly game = inject(GameService);

  assignToJob(speciesId: number, jobId: string, quantity = 1) {
    this.game.assignPokemon(speciesId, jobId, quantity);
  }

  unassignFromJob(speciesId: number, jobId: string, quantity = 1) {
    this.game.unassignPokemon(speciesId, jobId, quantity);
  }

  getAssignedQuantity(assignments: PokeAssignment[], jobId: string): number {
    return assignments.find(assignment => assignment.jobId === jobId)?.quantity ?? 0;
  }

}