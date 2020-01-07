import { TestBed } from '@angular/core/testing';

import { GameSetService } from './game-set.service';

describe('GameSetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameSetService = TestBed.get(GameSetService);
    expect(service).toBeTruthy();
  });
});
