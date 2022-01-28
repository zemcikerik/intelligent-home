import { MockBuilder, MockRender } from 'ng-mocks';``
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => MockBuilder(AuthService).keep(HttpClientTestingModule));

  beforeEach(() => service = MockRender(AuthService).point.componentInstance);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
