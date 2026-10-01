import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { EmployeeComponent } from './employee/employee';
import { LoginComponent } from './login/login';
import { SignupComponent } from './signup/signup';

export const routes: Routes = [
	{ path: '', redirectTo: 'signup', pathMatch: 'full' },
	{ path: 'employees', component: HomeComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent }
];
