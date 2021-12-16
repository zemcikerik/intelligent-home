import { TestBed } from '@angular/core/testing';

import { AddDeviceService } from './add-device.service';

describe('AddDeviceService', () => {
  let service: AddDeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddDeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
