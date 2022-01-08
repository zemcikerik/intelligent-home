import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { IntegerFeatureComponent } from './integer-feature.component';
import { AppModule } from '../../app.module';

describe('IntegerFeatureComponent', () => {
  let fixture: MockedComponentFixture<IntegerFeatureComponent>;
  let component: IntegerFeatureComponent;

  beforeEach(() => MockBuilder(IntegerFeatureComponent, AppModule));

  beforeEach(() => {
    fixture = MockRender(IntegerFeatureComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
