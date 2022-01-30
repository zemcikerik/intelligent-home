import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { LoginComponent } from './login.component';
import { AppModule } from '../../app.module';

describe('LoginComponent', () => {
  let fixture: MockedComponentFixture<LoginComponent>;
  let component: LoginComponent;

  beforeEach(() => MockBuilder(LoginComponent, AppModule));

  beforeEach(() => {
    fixture = MockRender(LoginComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
