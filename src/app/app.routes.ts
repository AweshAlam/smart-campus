import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { StudentRegistrationComponent } from './student/student-registration/student-registration';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { AuthGuard } from './auth.guard';
import { StudentListComponent } from './admin/student-list/student-list.component';
import { ManageClassesComponent } from './admin/manage-classes/manage-classes.component';
export const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent,canActivate: [AuthGuard], data: { role: 'ROLE_ADMIN' },children:[
    { path: 'student-list', component: StudentListComponent},
    { path: 'admin/student/register', component: StudentRegistrationComponent },
    { path: 'admin/classes', component: ManageClassesComponent}
  ] },
  { path: 'student', component: StudentDashboardComponent,canActivate: [AuthGuard], data: { role: 'ROLE_STUDENT'}},
  { path: '**', redirectTo: 'home', pathMatch:'full' }
];
