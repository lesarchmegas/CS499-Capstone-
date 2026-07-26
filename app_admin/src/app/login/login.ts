import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';
  name = ''; // required by your backend (yes, even though it's weird)
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {

    const payload = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.http.post('http://localhost:3000/api/login', payload)
      .subscribe({
        next: (res: any) => {

          // SAVE TOKEN (IMPORTANT FOR WEEK 7)
          localStorage.setItem('travlr_token', res.token);

          console.log('LOGIN SUCCESS');

          this.router.navigate(['']);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.error.message || 'Login failed';
        }
      });
  }
}