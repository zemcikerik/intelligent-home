import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { UserEntryComponent } from './user-entry.component';
import { AppModule } from '../../app.module';

describe('UserEntryComponent', () => {
  let fixture: MockedComponentFixture<UserEntryComponent>;
  let component: UserEntryComponent;

  beforeEach(() => MockBuilder(UserEntryComponent, AppModule));

  beforeEach(() => {
    fixture = MockRender(UserEntryComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
