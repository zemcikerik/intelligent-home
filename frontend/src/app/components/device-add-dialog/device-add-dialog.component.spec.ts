import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceAddDialogComponent } from './device-add-dialog.component';

describe('DeviceAddDialogComponent', () => {
  let component: DeviceAddDialogComponent;
  let fixture: ComponentFixture<DeviceAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
