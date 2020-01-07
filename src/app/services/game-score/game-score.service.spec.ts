import { TestBed } from '@angular/core/testing';

import { GameScoreService } from './game-score.service';

describe('GameScoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameScoreService = TestBed.get(GameScoreService);
    expect(service).toBeTruthy();
  });
});
