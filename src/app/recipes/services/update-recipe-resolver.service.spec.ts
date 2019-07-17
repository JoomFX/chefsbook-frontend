import { TestBed } from '@angular/core/testing';

import { UpdateRecipeResolverService } from './update-recipe-resolver.service';

describe('UpdateRecipeResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateRecipeResolverService = TestBed.get(UpdateRecipeResolverService);
    expect(service).toBeTruthy();
  });
});
