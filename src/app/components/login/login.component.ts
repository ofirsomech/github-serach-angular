import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

// import * as jwt from 'jsonwebtoken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService) {}

  login() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe(
        () => {
          console.log('Login successful');
          // TODO: redirect the user to the home page
        },
        (error) => {
          this.error = error.error;
        }
      );
    } else {
      this.error = 'Username and password are required';
    }
  }
}
