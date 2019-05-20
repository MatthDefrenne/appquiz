import { TestBed } from '@angular/core/testing';

import { BattleGuardService } from './battle-guard.service';

describe('BattleGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BattleGuardService = TestBed.get(BattleGuardService);
    expect(service).toBeTruthy();
  });
});
