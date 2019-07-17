import { TestBed } from '@angular/core/testing';

import { RecipesDetailsResolverService } from './recipes-details-resolver.service';

describe('RecipesDetailsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipesDetailsResolverService = TestBed.get(RecipesDetailsResolverService);
    expect(service).toBeTruthy();
  });
});
