import { MockBuilder, MockRender } from 'ng-mocks';
import { AdminGuard } from './admin.guard';
import { AppModule } from '../app.module';

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => MockBuilder(AdminGuard, AppModule));

  beforeEach(() => guard = MockRender(AdminGuard).point.componentInstance);

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
