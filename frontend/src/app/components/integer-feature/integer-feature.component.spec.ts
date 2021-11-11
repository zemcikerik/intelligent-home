import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegerFeatureComponent } from './integer-feature.component';

describe('IntegerFeatureComponent', () => {
  let component: IntegerFeatureComponent;
  let fixture: ComponentFixture<IntegerFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntegerFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegerFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
