import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginFacade } from '../../store';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading$: Observable<boolean> = EMPTY;
  error$: Observable<string | null> = EMPTY;

  loginForm = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(private loginFacade: LoginFacade) {
    this.loading$ = loginFacade.isLoginLoading();
    this.error$ = loginFacade.getLoginError();
  }

  login(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.loginFacade.login(username, password);
    }
  }

}
