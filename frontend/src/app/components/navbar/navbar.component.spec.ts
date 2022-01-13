import { MockBuilder, MockedComponentFixture, MockRender } from 'ng-mocks';
import { NavbarComponent } from './navbar.component';
import { AppModule } from '../../app.module';

describe('NavbarComponent', () => {
  let fixture: MockedComponentFixture<NavbarComponent>;
  let component: NavbarComponent;

  beforeEach(() => MockBuilder(NavbarComponent, AppModule));

  beforeEach(() => {
    fixture = MockRender(NavbarComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
