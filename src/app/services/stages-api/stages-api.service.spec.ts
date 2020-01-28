import { TestBed } from '@angular/core/testing';

import { StagesApiService } from './stages-api.service';

describe('StagesApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StagesApiService = TestBed.get(StagesApiService);
    expect(service).toBeTruthy();
  });
});
