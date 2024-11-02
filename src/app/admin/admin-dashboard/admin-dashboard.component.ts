import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router,RouterOutlet,RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [RouterOutlet,RouterLink],
  standalone: true
})
export class AdminDashboardComponent {
  noStudents = 0;
  noCameras = 0;
  noSchedules = 0;

  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;

  constructor(private router: Router) {
    this.startCamera();
  }

  startCamera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          this.videoElement.nativeElement.srcObject = stream;
        })
        .catch((error) => {
          console.error('Error accessing camera:', error);
        });
    } else {
      console.error('Camera not supported on this browser.');
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  dashboard() {
    this.router.navigate(['admin']);
  }

  classes() {
    this.router.navigate(['admin/classes']);
  }
}
