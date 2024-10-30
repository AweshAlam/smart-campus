import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../app.config';
import { LoginService } from '../../../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule]
})
export class LoginComponent {
  credentials = {
    username: '',
    password: ''
  };
  loginError: string | null = null;

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    if (this.credentials.username && this.credentials.password) {
        console.log("Form submitted");
        this.loginService.doLogin(this.credentials).subscribe(
            (response: any) => {
                console.log("Full Response:", response); // Log full response
                const token = response.jwtToken; // Access the token correctly
                console.log("Token:", token); // Now this should log the actual token
                    this.loginService.loginUser(token); 
                    const role = this.loginService.getRoleFromToken();
                     console.log("Role from token:", role);
                     if (role) {
                      if (role === 'ROLE_ADMIN') {
                        this.router.navigate(['/admin']);
                      } else if (role === 'ROLE_STUDENT') {
                        this.router.navigate(['/student']);
                      }  else {
                        this.loginError = 'Unknown role. Access denied.';
                      }
                    } else {
                      this.loginError = 'Failed to retrieve role from token. Please login again.';
                    }
            },
            (error) => {
                console.log("Login error:", error); // Log the error
            }
        );
    }
}

}
