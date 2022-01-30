import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { UserManagementComponent } from './user-management.component';
import { AppModule } from '../../app.module';

describe('UserManagementComponent', () => {
  let fixture: MockedComponentFixture<UserManagementComponent>;
  let component: UserManagementComponent;

  beforeEach(() => MockBuilder(UserManagementComponent, AppModule));

  beforeEach(() => {
    fixture = MockRender(UserManagementComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
