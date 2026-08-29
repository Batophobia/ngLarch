import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCollection } from './pokemon';

describe('Pokemon', () => {
  let component: PokemonCollection;
  let fixture: ComponentFixture<PokemonCollection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCollection],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCollection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
