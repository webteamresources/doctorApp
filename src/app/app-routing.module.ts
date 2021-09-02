import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/guards/admin.guard';
import { LoginGuard } from 'src/guards/login.guard';
import { AppointmentsComponent } from './appointments/appointments.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';
import { HomeComponent } from './home/home.component';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginRegisterComponent, canActivate: [LoginGuard] },
  { path: 'register', component: LoginRegisterComponent, canActivate: [LoginGuard] },
  { path: 'logout', component: LogoutComponent },
  { path: 'book-appointment', component: BookAppointmentComponent },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [AdminGuard] },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
