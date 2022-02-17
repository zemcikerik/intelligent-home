import { MockBuilder, MockRender } from 'ng-mocks';
import { UserService } from './user.service';
import { AppModule } from '../app.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => MockBuilder(UserService, AppModule).keep(HttpClientTestingModule));

  beforeEach(() => service = MockRender(UserService).point.componentInstance);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
