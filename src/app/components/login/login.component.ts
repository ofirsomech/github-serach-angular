import { Component } from '@angular/core';
// import * as jwt from 'jsonwebtoken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor() {}

  login() {
    if (this.username === 'root' && this.password === '123456') {
      // const token = jwt.sign({ username: this.username }, 'your-secret-key', { expiresIn: '1h' });
      const token = "123"
      localStorage.setItem('token', token);
      // redirect the user to the home page
      console.log('Login successful');
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
