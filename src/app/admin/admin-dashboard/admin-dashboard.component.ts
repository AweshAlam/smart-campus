import { Component } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  noStudents = 0;
  noCameras = 0;
  noSchedules = 0;
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  register() {
    this.router.navigate(['/admin/student/register']);
  }
  list() {
    this.router.navigate(['student-list']);
  }
}
