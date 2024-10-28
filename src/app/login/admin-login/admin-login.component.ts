import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../app.config';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const credentials = { username: this.username, password: this.password };

    this.http.post(`${environment.apiUrl}login`, credentials).subscribe({
      next: (response) => {
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid login credentials';
      }
    });
    console.log(this.username,this.password);
  }
}