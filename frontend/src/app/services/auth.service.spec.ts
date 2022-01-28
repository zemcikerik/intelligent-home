import { MockBuilder, MockRender } from 'ng-mocks';``
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => MockBuilder(AuthService));

  beforeEach(() => service = MockRender(AuthService).point.componentInstance);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
