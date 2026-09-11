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

  readonly labRepaired = signal(false);
  readonly trainers = signal(0);
  readonly labRepairCost = signal(10);
  readonly trainerCost = signal(5);

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

  addPokemon(speciesId: number, quantity = 1): void {
    if (quantity <= 0) return;

    this.pokemon.update(currentPokemon => {
      const existing = currentPokemon.find(
        pokemon => pokemon.speciesId === speciesId
      );

      if (existing) {
        return currentPokemon.map(pokemon =>
          pokemon.speciesId === speciesId
            ? {
              ...pokemon,
              quantity: pokemon.quantity + quantity
            }
            : pokemon
        );
      }

      return [
        ...currentPokemon,
        {
          speciesId,
          quantity,
          assignments: []
        }
      ];
    });
  }

  tick(): void {
    let money = 0;
    let research = 0;

    for (const pokemon of this.pokemon()) {
      for (const assignment of pokemon.assignments) {
        const job = this.jobService.getById(assignment.jobId);

        if (!job) continue;

        money += job.production.money * assignment.quantity;
        research += job.production.research * assignment.quantity;
      }
    }

    this.money.update(value => value + money);
    this.research.update(value => value + research);
  }

  repairLab(): boolean {
    if (this.labRepaired()) return false;
    if (this.money() < this.labRepairCost()) return false;

    this.money.update(money => money - this.labRepairCost());
    this.labRepaired.set(true);

    return true;
  }

  hireTrainer(): boolean {
    if (!this.labRepaired()) return false;
    if (this.research() < this.trainerCost()) return false;

    this.research.update(research => research - this.trainerCost());
    this.trainers.update(trainers => trainers + 1);
    this.trainerCost.update(cost => cost + 5);

    return true;
  }
}