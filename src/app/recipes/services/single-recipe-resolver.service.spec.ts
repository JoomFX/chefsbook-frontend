import { TestBed } from '@angular/core/testing';

import { SingleRecipeResolverService } from './single-recipe-resolver.service';

describe('RecipesDetailsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SingleRecipeResolverService = TestBed.get(SingleRecipeResolverService);
    expect(service).toBeTruthy();
  });
});
