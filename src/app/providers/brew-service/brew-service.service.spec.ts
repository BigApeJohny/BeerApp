import { TestBed } from '@angular/core/testing';

import { BrewServiceService } from './brew-service.service';

describe('BrewServiceService', () => {
  let service: BrewServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrewServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
