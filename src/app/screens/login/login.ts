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
    if (!this.email || !this.password) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    console.log('Login attempt:', { 
      email: this.email, 
      rememberMe: this.rememberMe 
    });
    
    // Aqui você implementará a lógica de autenticação
    alert('Login realizado com sucesso! (Funcionalidade em desenvolvimento)');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}