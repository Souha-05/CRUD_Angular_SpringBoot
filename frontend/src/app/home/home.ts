import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeComponent } from '../employee/employee';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, EmployeeComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  @ViewChild(EmployeeComponent) employeeComponent?: EmployeeComponent;
  showAddForm = false;
  showEmployeesList = false;

  constructor(private authService: AuthService, private router: Router) {}

  addEmployee(): void {
    this.showAddForm = true;
    this.showEmployeesList = false;
    this.employeeComponent?.prepareForAdd();
  }

  showEmployees(): void {
    this.showEmployeesList = true;
    this.showAddForm = false;
    this.employeeComponent?.loadEmployees();
  }

  disconnect(): void {
    this.authService.clearCurrentUser();
    this.router.navigate(['/signup']);
  }

  showDashboardByDefault(): void {
    this.showEmployeesList = false;
    this.showAddForm = false;
  }
}
