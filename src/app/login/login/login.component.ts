import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../app.config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const credentials = { username: this.username, password: this.password };

    this.http.post(`${environment.apiUrl}login`, credentials).subscribe({
      next: (response) => {
        this.router.navigate(['/student']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid login credentials';
      }
    });
    console.log(this.username,this.password);
  }
  // username: string = '';
  // password: string = '';
  // errorMessage: string = '';

  // constructor(private router: Router) {}

  // login() {
  //   if (this.username === 'student' && this.password === '12345') {
  //     this.router.navigate(['/student']);
  //   } else {
  //     this.errorMessage = 'Invalid login credentials';
  //   }

  //   console.log('Username:', this.username, 'Password:', this.password);
  // }
}
