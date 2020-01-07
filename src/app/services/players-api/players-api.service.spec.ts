import { TestBed } from '@angular/core/testing';

import { PlayersApiService } from './players-api.service';

describe('PlayersApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayersApiService = TestBed.get(PlayersApiService);
    expect(service).toBeTruthy();
  });
});
