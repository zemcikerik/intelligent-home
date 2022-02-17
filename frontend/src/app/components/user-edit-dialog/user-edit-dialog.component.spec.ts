import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { UserEditDialogComponent } from './user-edit-dialog.component';
import { AppModule } from '../../app.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from '../../models';

describe('UserEditDialogComponent', () => {
  let fixture: MockedComponentFixture<UserEditDialogComponent>;
  let component: UserEditDialogComponent;

  beforeEach(() =>
    MockBuilder(UserEditDialogComponent, AppModule)
      .mock(MatDialogRef)
      .provide({ provide: MAT_DIALOG_DATA, useValue: { id: 1, username: 'Test', role: Role.USER, } })
  );

  beforeEach(() => {
    fixture = MockRender(UserEditDialogComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
