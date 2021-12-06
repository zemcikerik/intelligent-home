import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownFeatureComponent } from './dropdown-feature.component';

describe('DropdownFeatureComponent', () => {
  let component: DropdownFeatureComponent;
  let fixture: ComponentFixture<DropdownFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
