import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { UserTableComponent } from './user-table.component';
import { AppModule } from '../../app.module';

describe('UserTableComponent', () => {
  let fixture: MockedComponentFixture<UserTableComponent>;
  let component: UserTableComponent;

  beforeEach(() => MockBuilder(UserTableComponent, AppModule));

  beforeEach(() => {
    fixture = MockRender(UserTableComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
