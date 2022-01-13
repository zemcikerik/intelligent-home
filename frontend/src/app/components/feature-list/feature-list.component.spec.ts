import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { FeatureListComponent } from './feature-list.component';
import { AppModule } from '../../app.module';

describe('FeatureListComponent', () => {
  let fixture: MockedComponentFixture<FeatureListComponent>;
  let component: FeatureListComponent;

  beforeEach(() => MockBuilder(FeatureListComponent, AppModule));

  beforeEach(() => {
    fixture = MockRender(FeatureListComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
