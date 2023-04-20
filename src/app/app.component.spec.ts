import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(() => {
    component = new AppComponent();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if user is logged in', () => {
    localStorage.setItem('token', 'test_token');
    expect(component.isLoggedIn()).toBeTruthy();
  });

  it('should return false if user is not logged in', () => {
    localStorage.removeItem('token');
    expect(component.isLoggedIn()).toBeFalsy();
  });
});
