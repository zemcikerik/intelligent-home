import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { FeatureComponent } from './feature.component';
import { AppModule } from '../../app.module';

describe('FeatureComponent', () => {
  let fixture: MockedComponentFixture<FeatureComponent>;
  let component: FeatureComponent;

  beforeEach(() => MockBuilder(FeatureComponent, AppModule));

  beforeEach(() => {
    fixture = MockRender(FeatureComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
