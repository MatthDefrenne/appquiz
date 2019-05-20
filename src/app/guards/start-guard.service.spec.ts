import { TestBed } from '@angular/core/testing';

import { StartGuardService } from './start-guard.service';

describe('StartGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StartGuardService = TestBed.get(StartGuardService);
    expect(service).toBeTruthy();
  });
});
