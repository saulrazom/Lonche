import { TestBed } from '@angular/core/testing';

import { GoToCityService } from './go-to-city.service';

describe('GoToCityService', () => {
  let service: GoToCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoToCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
