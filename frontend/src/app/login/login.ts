import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
 
  email = '';
  password = '';
  message = '';
  messageType: 'success' | 'error' | 'info' = 'info';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
  
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: user => {
        this.authService.setCurrentUser(user);
        this.message = 'Login successful.';
        this.messageType = 'success';
        this.router.navigate(['/employees']);
      },
      error: () => {
        this.message = 'Invalid email or password.';
        this.messageType = 'error';
      }
    });
  }

  clearMessage(): void {
    this.message = '';
    this.messageType = 'info';
  }
}
