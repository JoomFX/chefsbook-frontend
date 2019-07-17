import { TestBed } from '@angular/core/testing';

import { ListRecipesResolverService } from './list-recipes-resolver.service';

describe('ListRecipesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListRecipesResolverService = TestBed.get(ListRecipesResolverService);
    expect(service).toBeTruthy();
  });
});
