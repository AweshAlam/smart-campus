import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    this.router.navigate(['/admin-login']);
  }
  register() {
    this.router.navigate(['/admin/student/register']);
  }
}
