import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { UserCreateDialogComponent } from './user-create-dialog.component';

describe('UserCreateDialogComponent', () => {
  let fixture: MockedComponentFixture<UserCreateDialogComponent>;
  let component: UserCreateDialogComponent;

  beforeEach(() => MockBuilder(UserCreateDialogComponent));

  beforeEach(() => {
    fixture = MockRender(UserCreateDialogComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
