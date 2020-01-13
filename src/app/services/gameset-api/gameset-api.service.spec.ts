import { TestBed } from '@angular/core/testing';

import { GamesetApiService } from './gameset-api.service';

describe('GamesetApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GamesetApiService = TestBed.get(GamesetApiService);
    expect(service).toBeTruthy();
  });
});
