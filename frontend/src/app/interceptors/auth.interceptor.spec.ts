import { MockBuilder, MockRender } from 'ng-mocks';
import { AuthInterceptor } from './auth.interceptor';
import { TokenStorageService } from '../services';

describe('AuthInterceptor', () => {
  let interceptor: AuthInterceptor;

  beforeEach(() => MockBuilder(AuthInterceptor).mock(TokenStorageService));

  beforeEach(() => interceptor = MockRender(AuthInterceptor).point.componentInstance);

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
