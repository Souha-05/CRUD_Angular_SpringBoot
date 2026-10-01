import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  message = '';
  messageType: 'success' | 'error' | 'info' = 'info';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup(): void {

    this.authService.signup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }).subscribe({
      next: (user) => {
        this.authService.setCurrentUser(user);
        this.message = 'Signup successful.';
        this.messageType = 'success';
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.message = err.error?.message ?? err.error ?? 'Unable to create account.';
        this.messageType = 'error';
      }
    });
  }

  clearMessage(): void {
    this.message = '';
    this.messageType = 'info';
  }
}