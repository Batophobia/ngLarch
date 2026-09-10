import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  imports: [],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css'
})
export class PokemonDetail {
  private route = inject(ActivatedRoute);
  private pokemonService = inject(PokemonService);

  readonly pokemon = this.pokemonService.getById(
    Number(this.route.snapshot.paramMap.get('id'))
  );
}