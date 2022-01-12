import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RgbFeatureComponent } from './rgb-feature.component';

describe('RgbFeatureComponent', () => {
  let component: RgbFeatureComponent;
  let fixture: ComponentFixture<RgbFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RgbFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RgbFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
