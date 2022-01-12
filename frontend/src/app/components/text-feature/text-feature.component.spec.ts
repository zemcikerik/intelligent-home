import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TextFeatureComponent} from './text-feature.component';

describe('TextFeatureComponent', () => {
  let component: TextFeatureComponent;
  let fixture: ComponentFixture<TextFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextFeatureComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
