import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StudentService } from '../../../../service/student.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
  imports: [RouterOutlet],
  standalone: true
})
export class StudentDashboardComponent {
  student: any = {};

  constructor(private studentService: StudentService, private router: Router, private routerOutlet:RouterOutlet) {
    this.getStudentData();
  }

  getStudentData() {
    const reg_no = localStorage.getItem('username');
    if (reg_no) {
      this.studentService.getStudentName(reg_no).subscribe({
        next: (response: any) => {
          this.student = response;
        },
        error: (err) => {
          console.log('Error fetching student data:', err);
        }
      });
    } else {
      console.log('Registration number not found in localStorage.');
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Optionally remove the username
    this.router.navigate(['/login']);
  }
}
