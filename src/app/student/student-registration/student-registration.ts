import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../app.config';
import { StudentService } from '../../../../service/student.service';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule]
})
export class StudentRegistrationComponent {
  reg_no: string ='';
  s_name: string = '';
  email: string = '';
  mob_no: string = '';
  errorMessage: string = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  register() {
    const studentData = {
      reg_no: this.reg_no,
      s_name: this.s_name,
      email: this.email,
      mob_no: this.mob_no,
    };

    this.studentService.registerStudent(studentData).subscribe({
      next: () => {
        alert("Student Registered Successfully.");
        this.router.navigate(['admin/student/register']); // Navigate to login on successful registration
      },
      error: (error) => {
        console.error('Registration error: ', error);
        console.error('Authorization header was:', localStorage.getItem('token'));
        this.errorMessage = 'Registration failed. Please try again.';
    }
    });
  }
}