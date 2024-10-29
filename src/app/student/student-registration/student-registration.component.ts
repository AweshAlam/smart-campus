import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../app.config';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule]
})
export class StudentRegistrationComponent {
  reg_no: number | null = null;
  s_name: string = '';
  email: string = '';
  mob_no: string = '';
  errorMessage: string = '';
   apiUrl = "http://localhost:8080/admin/student/register"

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    let studentData = {
      reg_no: this.reg_no,
      s_name: this.s_name,
      email: this.email,
      mob_no: this.mob_no,
    };

    this.http.post(`this.apiUrl`, studentData).subscribe({
      next: (response) => {
        console.log(response);
        // this.router.navigate(['/admin/student/register']);
        alert("Student Registered Successfully.")
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }
}
