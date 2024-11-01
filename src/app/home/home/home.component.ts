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

  // redirectToAdminLogin() {
  //   this.router.navigate(['admin-login']);
  // }
  redirectToLogin() {
    this.router.navigate(['login']);
  }
}
