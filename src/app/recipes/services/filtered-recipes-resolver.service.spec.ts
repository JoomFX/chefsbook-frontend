import { TestBed } from '@angular/core/testing';

import { FilteredRecipesResolverService } from './filtered-recipes-resolver.service';

describe('FilteredRecipesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FilteredRecipesResolverService = TestBed.get(FilteredRecipesResolverService);
    expect(service).toBeTruthy();
  });
});
