import { TestBed } from '@angular/core/testing';

import { NotificatorService } from './notificator.service';

describe('NotificatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NotificatorService = TestBed.get(NotificatorService);
    expect(service).toBeTruthy();
  });
});
