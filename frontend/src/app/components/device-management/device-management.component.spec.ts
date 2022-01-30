import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { DeviceManagementComponent } from './device-management.component';
import { AppModule } from '../../app.module';

describe('DeviceManagementComponent', () => {
  let fixture: MockedComponentFixture<DeviceManagementComponent>;
  let component: DeviceManagementComponent;

  beforeEach(() => MockBuilder(DeviceManagementComponent, AppModule));

  beforeEach(() => {
    fixture = MockRender(DeviceManagementComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
