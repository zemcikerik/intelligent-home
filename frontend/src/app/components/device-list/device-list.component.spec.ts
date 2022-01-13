import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { DeviceListComponent } from './device-list.component';
import { AppModule } from '../../app.module';

describe('DeviceListComponent', () => {
  let fixture: MockedComponentFixture<DeviceListComponent>;
  let component: DeviceListComponent;

  beforeEach(() => MockBuilder(DeviceListComponent, AppModule));

  beforeEach(() => {
    fixture = MockRender(DeviceListComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
