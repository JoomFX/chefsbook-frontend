import { TestBed } from '@angular/core/testing';

import { CreateRecipeResolverService } from './create-recipe-resolver.service';

describe('CreateRecipeResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateRecipeResolverService = TestBed.get(CreateRecipeResolverService);
    expect(service).toBeTruthy();
  });
});
