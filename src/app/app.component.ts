import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Enable standalone component
  imports: [RouterModule] // Include RouterModule for routing
})
export class AppComponent {
  title = 'Smart Campus Surveillance';
}
