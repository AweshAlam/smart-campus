import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { StudentRegistrationComponent } from './student/student-registration/student-registration.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './login/admin-login/admin-login.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { AuthGuard } from './auth.guard';
export const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin/student/register', component: StudentRegistrationComponent },
  { path: 'admin', component: AdminDashboardComponent,canActivate: [AuthGuard], data: { role: 'ROLE_ADMIN' } },
  { path: 'admin-login', component:AdminLoginComponent,},
  { path: 'student', component: StudentDashboardComponent,canActivate: [AuthGuard], data: { role: 'ROLE_STUDENT'}},
  { path: '**', redirectTo: 'home', pathMatch:'full' }
];
