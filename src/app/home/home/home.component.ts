import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from "../../login/login/login.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [LoginComponent]
})
export class HomeComponent {
  constructor(private router: Router) {}

  scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToHome() {
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToFeatures() {
    const featuresSection = document.getElementById('featuresSec');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  }


  // redirectToAdminLogin() {
  //   this.router.navigate(['admin-login']);
  // }
  redirectToLogin() {
    this.router.navigate(['login']);
  }
}
