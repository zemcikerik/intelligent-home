import { TestBed } from '@angular/core/testing';

import { InitialStateService } from './initial-state.service';

describe('InitialStateService', () => {
  let service: InitialStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitialStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
