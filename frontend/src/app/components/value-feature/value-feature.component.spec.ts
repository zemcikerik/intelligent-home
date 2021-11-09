import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueFeatureComponent } from './value-feature.component';

describe('ValueFeatureComponent', () => {
  let component: ValueFeatureComponent;
  let fixture: ComponentFixture<ValueFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValueFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValueFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
