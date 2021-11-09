import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanFeatureComponent } from './boolean-feature.component';

describe('BooleanFeatureComponent', () => {
  let component: BooleanFeatureComponent;
  let fixture: ComponentFixture<BooleanFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooleanFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
