import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { PreventExitGuard } from './prevent-exit.guard';

describe('preventExitGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => PreventExitGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
