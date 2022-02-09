import { MockBuilder, MockRender } from 'ng-mocks';
import { ServerConnectionService, WS_SERVER_URL_TOKEN } from './server-connection.service';
import { PRODUCTION_TOKEN } from '../production.token';
import { TokenStorageService } from './token-storage.service';

describe('ServerConnectionService', () => {
  let service: ServerConnectionService;

  beforeEach(() =>
    MockBuilder(ServerConnectionService)
      .mock(TokenStorageService)
      .provide({ provide: WS_SERVER_URL_TOKEN, useValue: '' })
      .provide({ provide: PRODUCTION_TOKEN, useValue: '' })
  );

  beforeEach(() => service = MockRender(ServerConnectionService).point.componentInstance);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
