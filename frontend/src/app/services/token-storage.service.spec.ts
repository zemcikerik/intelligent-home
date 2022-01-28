import { MockBuilder, MockRender } from 'ng-mocks';
import { TokenStorageService } from './token-storage.service';

describe('TokenStorageService', () => {
  let service: TokenStorageService;

  beforeEach(() => MockBuilder(TokenStorageService));

  beforeEach(() => service = MockRender(TokenStorageService).point.componentInstance)

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
