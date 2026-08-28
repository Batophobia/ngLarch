import { STARTING_POKEMON } from '../data/collection';
import { PokemonService } from '../services/pokemon';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-lab',
  imports: [],
  templateUrl: './lab.html',
  styleUrl: './lab.css',
})
export class Lab {
  constructor(private pokemonService: PokemonService) { }

  research = signal(0)
  money = signal(0)
  pokemon = STARTING_POKEMON

  addResearch() {
    this.research.update(cur => cur + 1)
  }
  addMoney() {
    this.money.update(cur => cur + 1)
  }
}
