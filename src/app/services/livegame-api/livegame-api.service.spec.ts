import { TestBed } from '@angular/core/testing';

import { LivegameApiService } from './livegame-api.service';

describe('LivegameApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LivegameApiService = TestBed.get(LivegameApiService);
    expect(service).toBeTruthy();
  });
});
