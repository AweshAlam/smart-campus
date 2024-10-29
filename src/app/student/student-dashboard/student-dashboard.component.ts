import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../app.config';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {
  student: any = {};

  apiUrl = "http://localhost:8080"

  constructor(private http: HttpClient, private router: Router) {
    this.getStudentData();
  }

  getStudentData() {
    const reg_no = localStorage.getItem('username')
    this.http.get(`apiUrl/student/{reg_no}`).subscribe({
      next: (response: any) => {
        this.student = response;
      },
      error: (err) => {
        console.log('Error fetching student data:', err);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
