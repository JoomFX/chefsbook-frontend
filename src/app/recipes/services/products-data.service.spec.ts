import { TestBed } from '@angular/core/testing';

import { ProductsDataService } from './products-data.service';

describe('ProductsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsDataService = TestBed.get(ProductsDataService);
    expect(service).toBeTruthy();
  });
});
