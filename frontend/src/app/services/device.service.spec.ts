import { MockBuilder, MockInstance, MockRender, MockReset } from 'ng-mocks';
import { DeviceService } from './device.service';
import { ServerConnectionService } from './server-connection.service';
import { hot } from 'jest-marbles';

describe('DeviceService', () => {
  let service: DeviceService;
  let spyWatch: jest.Mock;

  beforeEach(() => MockBuilder(DeviceService).mock(ServerConnectionService));

  beforeEach(() => {
    const mockWatch = (path: string) => hot('a', { a: path });
    spyWatch = MockInstance(ServerConnectionService, 'watch', jest.fn().mockImplementation(mockWatch));

    service = MockRender(DeviceService).point.componentInstance;
  });

  afterEach(MockReset);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should watch device addition', () => {
    expect(spyWatch).toHaveBeenCalledWith('/device/add');
    expect(service.deviceAdd$).toBeObservable(hot('a', { a: '/device/add' }));
  });

  it('should watch device removal', () => {
    expect(spyWatch).toHaveBeenCalledWith('/device/remove');
    expect(service.deviceRemove$).toBeObservable(hot('a', { a: '/device/remove' }));
  });
});
