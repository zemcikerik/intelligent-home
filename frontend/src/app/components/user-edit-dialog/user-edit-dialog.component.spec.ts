import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { UserEditDialogComponent } from './user-edit-dialog.component';

describe('UserEditDialogComponent', () => {
  let fixture: MockedComponentFixture<UserEditDialogComponent>;
  let component: UserEditDialogComponent;

  beforeEach(() => MockBuilder(UserEditDialogComponent));

  beforeEach(() => {
    fixture = MockRender(UserEditDialogComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
