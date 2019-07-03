import { TestBed } from '@angular/core/testing';

import { RecipesDataService } from './recipes-data.service';

describe('RecipesDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipesDataService = TestBed.get(RecipesDataService);
    expect(service).toBeTruthy();
  });
});
