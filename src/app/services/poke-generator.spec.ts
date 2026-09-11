import { TestBed } from '@angular/core/testing';

import { PokeGeneratorService } from './poke-generator';

describe('PokeGeneratorService', () => {
  let service: PokeGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
