import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { LoadingIndicatorComponent } from './loading-indicator.component';
import { AppModule } from '../../app.module';

describe('LoadingIndicatorComponent', () => {
  let fixture: MockedComponentFixture<LoadingIndicatorComponent>;
  let component: LoadingIndicatorComponent;

  beforeEach(() => MockBuilder(LoadingIndicatorComponent, AppModule));

  beforeEach(() => {
    fixture = MockRender(LoadingIndicatorComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
