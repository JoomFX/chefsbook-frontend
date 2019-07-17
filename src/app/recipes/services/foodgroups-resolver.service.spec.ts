import { TestBed } from '@angular/core/testing';

import { FoodgroupsResolverService } from './foodgroups-resolver.service';

describe('FoodgroupsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodgroupsResolverService = TestBed.get(FoodgroupsResolverService);
    expect(service).toBeTruthy();
  });
});
