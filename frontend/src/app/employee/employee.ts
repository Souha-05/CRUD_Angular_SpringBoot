import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeService } from '../services/employee';
import { Employee } from '../models/employee';

type MessageType = 'success' | 'error' | 'info';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.html',
  styleUrls: ['./employee.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] = [];
  showTable = false;
  showForm = true;
  loading = false;
  message = '';
  messageType: MessageType = 'info';

  employee: Employee = {
    firstName: '',
    email: '',
    lastName: ''
  };

  editMode = false;
  selectedId: number | null = null;

  constructor(private service: EmployeeService) {}

  ngOnInit(): void {
  }

  prepareForAdd(): void {
    this.showForm = true;
    this.showTable = false;
    this.resetForm();
  }

  loadEmployees(): void {
    this.showForm = false;
    this.consultEmployees();
  }

  refreshEmployees(): void {
    this.showForm = false;
    this.consultEmployees(false);
  }

  onAddClick(form?: NgForm) {
    this.setMessage('Adding employee...', 'info');
    this.addEmployee(form);
  }

  onUpdateClick() {
    this.setMessage('Updating employee...', 'info');
    this.updateEmployee();
  }

  onDeletePromptClick() {
    this.setMessage('Deleting employee...', 'info');
    this.deleteEmployeeByPrompt();
  }

  onConsultClick() {
    this.setMessage('Loading employees...', 'info');
    this.consultEmployees();
  }

  onResetClick(form?: NgForm) {
    this.resetForm(form);
  }

  consultEmployees(showMessage = true) {
    this.showTable = true;
    this.showForm = false;
    this.loading = true;
    if (showMessage) {
      this.setMessage('Loading employees...', 'info');
    }

    this.service.getAll().subscribe({
      next: data => {
        this.employees = data;
        this.loading = false;
        this.showTable = true;
        if (showMessage) {
          this.setMessage('Employees loaded successfully.', 'success');
        }
      },
      error: () => {
        this.loading = false;
        this.showTable = true;
        this.employees = [];
        this.setMessage('Unable to load employees.', 'error');
      }
    });
  }

  addEmployee(form?: NgForm) {
    this.loading = true;
    this.service.create(this.employee).subscribe({
      next: () => {
        this.loading = false;
        this.resetForm(form);
        this.consultEmployees(false);
        this.setMessage('Employee added successfully.', 'success');
      },
      error: () => {
        this.loading = false;
        this.setMessage('Error while adding employee.', 'error');
      }
    });
  }

  updateEmployee() {
    const id = this.askEmployeeId('la mise a jour');
    if (id === null) {
      return;
    }

    this.loading = true;
    this.service.getById(id).subscribe({
      next: () => {
        this.service.update(id, this.employee).subscribe({
          next: () => {
            this.loading = false;
            this.resetForm();
            this.consultEmployees(false);
            this.setMessage('Employee updated successfully.', 'success');
          },
          error: () => {
            this.loading = false;
            this.setMessage('Error while updating employee.', 'error');
          }
        });
      },
      error: () => {
        this.loading = false;
        this.setMessage('ID does not exist.', 'error');
      }
    });
  }

  deleteEmployee(id: number) {
    this.loading = true;
    this.service.delete(id).subscribe({
      next: () => {
        this.loading = false;
        this.consultEmployees(false);
        this.setMessage('Employee deleted successfully.', 'success');
      },
      error: () => {
        this.loading = false;
        this.setMessage('ID does not exist.', 'error');
      }
    });
  }

  editEmployee(emp: Employee) {
    this.employee = { ...emp };
    this.selectedId = emp.id!;
    this.editMode = true;
    this.showForm = true;
    this.setMessage('Employee loaded into the form.', 'info');
  }

  consultEmployeeById() {
    const id = this.askEmployeeId('la consultation');
    if (id === null) {
      return;
    }

    this.loading = true;
    this.service.getById(id).subscribe({
      next: employee => {
        this.loading = false;
        this.employees = [employee];
        this.showTable = true;
        this.setMessage('Employee found and displayed.', 'success');
      },
      error: () => {
        this.loading = false;
        this.showTable = true;
        this.employees = [];
        this.setMessage('ID does not exist.', 'error');
      }
    });
  }

  deleteEmployeeByPrompt() {
    const id = this.askEmployeeId('la suppression');
    if (id === null) {
      return;
    }

    this.deleteEmployee(id);
  }

  private askEmployeeId(actionLabel: string): number | null {
    const actionTextMap: Record<string, string> = {
      'la mise a jour': 'the update',
      'la consultation': 'the consultation',
      'la suppression': 'the deletion'
    };

    const rawValue = window.prompt(`Enter the employee ID for ${actionTextMap[actionLabel] ?? actionLabel}`);

    if (rawValue === null) {
      return null;
    }

    const id = Number(rawValue);
    if (!Number.isInteger(id) || id <= 0) {
      this.setMessage('Invalid ID.', 'error');
      return null;
    }

    return id;
  }

  private setMessage(text: string, type: MessageType) {
    this.message = text;
    this.messageType = type;
  }

  resetForm(form?: NgForm) {
    this.employee = { firstName: '', lastName: '', email: '' };
    form?.resetForm(this.employee);
    this.editMode = false;
    this.selectedId = null;
    this.showForm = true;
    this.setMessage('Form cleared.', 'info');
  }
}