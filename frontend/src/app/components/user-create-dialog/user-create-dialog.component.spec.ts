import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { UserCreateDialogComponent } from './user-create-dialog.component';
import { AppModule } from '../../app.module';
import { MatDialogRef } from '@angular/material/dialog';

describe('UserCreateDialogComponent', () => {
  let fixture: MockedComponentFixture<UserCreateDialogComponent>;
  let component: UserCreateDialogComponent;

  beforeEach(() =>
    MockBuilder(UserCreateDialogComponent, AppModule)
      .mock(MatDialogRef)
  );

  beforeEach(() => {
    fixture = MockRender(UserCreateDialogComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
