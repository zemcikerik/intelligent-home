import { MockBuilder, MockRender } from 'ng-mocks';
import { FeatureService } from './feature.service';
import { ServerConnectionService } from './server-connection.service';

describe('FeatureService', () => {
  let service: FeatureService;

  beforeEach(() => MockBuilder(FeatureService).mock(ServerConnectionService));
  beforeEach(() => service = MockRender(FeatureService).point.componentInstance);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
