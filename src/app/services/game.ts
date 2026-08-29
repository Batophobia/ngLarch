import { computed, inject, Injectable, signal } from '@angular/core';
import { STARTING_POKEMON } from '../data/collection';
import { PokeOwned } from '../models/poke-owned';
import { PokemonService } from './pokemon';
import { JobService } from './job';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private pokemonService = inject(PokemonService)
  private jobService = inject(JobService);

  readonly research = signal(0);
  readonly money = signal(0);
  readonly pokemon = signal<PokeOwned[]>(STARTING_POKEMON);
  readonly unlockedJobs = signal<string[]>([
    'general-research',
    'delivery-01'
  ]);

  readonly ownedPokemon = computed(() =>
    this.pokemon().map(owned => ({ ...owned, species: this.pokemonService.getById(owned.speciesId) }))
  )

  getUnassignedPokemon(speciesId: number): number {
    const owned = this.pokemon().find(pokemon => pokemon.speciesId === speciesId);

    if (!owned) return 0;

    const assigned = owned.assignments.reduce((total, assignment) => total + assignment.quantity, 0);

    return owned.quantity - assigned;
  }

  assignPokemon(speciesId: number, jobId: string, quantity: number): boolean {
    if (quantity <= 0) return false;

    const owned = this.pokemon().find(poke => poke.speciesId === speciesId);
    if (!owned) return false;

    const species = this.pokemonService.getById(speciesId);
    if (!species) return false;

    const job = this.jobService.getById(jobId);
    if (!job || !this.unlockedJobs().includes(jobId)) return false;

    const eligible = job.allowedTypes.some(type => species.types.includes(type));
    if (!eligible) return false;

    if (this.getUnassignedPokemon(speciesId) < quantity) return false;

    this.pokemon.update(currentPokemon =>
      currentPokemon.map(pokemon => {
        if (pokemon.speciesId !== speciesId)
          return pokemon;

        const assignment = pokemon.assignments.find(assignment => assignment.jobId === jobId);

        if (assignment) {
          return {
            ...pokemon,
            assignments: pokemon.assignments.map(existingAssignment =>
              existingAssignment.jobId === jobId
                ? {
                  ...existingAssignment,
                  quantity: existingAssignment.quantity + quantity
                }
                : existingAssignment
            )
          };
        }

        return {
          ...pokemon,
          assignments: [
            ...pokemon.assignments,
            {
              jobId,
              quantity
            }
          ]
        };
      })
    );

    return true;
  }

  unassignPokemon(speciesId: number, jobId: string, quantity: number): boolean {
    if (quantity <= 0) return false;

    const owned = this.pokemon().find(poke => poke.speciesId === speciesId);
    if (!owned) return false;

    const assignment = owned.assignments.find(assignment => assignment.jobId === jobId);
    if (!assignment || assignment.quantity < quantity) return false;

    this.pokemon.update(currentPokemon =>
      currentPokemon.map(pokemon => {
        if (pokemon.speciesId !== speciesId) {
          return pokemon;
        }

        return {
          ...pokemon,
          assignments: pokemon.assignments
            .map(existingAssignment => {
              if (existingAssignment.jobId !== jobId)
                return existingAssignment;

              return {
                ...existingAssignment,
                quantity: existingAssignment.quantity - quantity
              };
            })
            .filter(existingAssignment => existingAssignment.quantity > 0)
        };
      })
    );

    return true;
  }

  getAvailableJobsForPokemon(speciesId: number) {
    const types = this.pokemonService.getById(speciesId)?.types;
    if (!types || types.length < 1) return [];

    return this.jobService.getEligibleJobs(types).filter(job => this.unlockedJobs().includes(job.id))
  }
}