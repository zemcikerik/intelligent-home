import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { HomeComponent } from './home.component';
import { AppModule } from '../../app.module';

describe('HomeComponent', () => {
  let fixture: MockedComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(() => MockBuilder(HomeComponent, AppModule));

  beforeEach(() => {
    fixture = MockRender(HomeComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
