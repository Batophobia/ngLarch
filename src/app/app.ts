import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { PokeGeneratorService } from './services/poke-generator';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private pokemonGenerator = inject(PokeGeneratorService);

  protected readonly title = signal('larch');

  constructor() {
    setInterval(() => {
      this.pokemonGenerator.generate();
    }, 5000);
  }
}
