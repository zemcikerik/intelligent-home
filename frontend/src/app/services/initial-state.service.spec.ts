import { MockBuilder, MockRender } from 'ng-mocks';
import { InitialStateService } from './initial-state.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('InitialStateService', () => {
  let service: InitialStateService;

  beforeEach(() => MockBuilder(InitialStateService).keep(HttpClientTestingModule));

  beforeEach(() => service = MockRender(InitialStateService).point.componentInstance);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
