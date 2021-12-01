import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { DeviceComponent } from './device.component';
import { AppModule } from '../../app.module';

describe('DeviceComponent', () => {
  let fixture: MockedComponentFixture<DeviceComponent>;
  let component: DeviceComponent;

  beforeEach(() => MockBuilder(DeviceComponent, AppModule));

  beforeEach(() => {
    fixture = MockRender(DeviceComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
