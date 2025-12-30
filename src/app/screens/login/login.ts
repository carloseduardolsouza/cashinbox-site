import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Login attempt:', { email: this.email, rememberMe: this.rememberMe });
    // Aqui você implementará a lógica de autenticação
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  loginWithGoogle() {
    console.log('Login with Google');
    // Implementar login com Google
  }

  loginWithMicrosoft() {
    console.log('Login with Microsoft');
    // Implementar login com Microsoft
  }
}