import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  currentStep: number = 1;
  totalSteps: number = 2;

  // Step 1 - Dados do Usuário
  name: string = '';
  email: string = '';
  phone: string = '';

  // Step 2 - Senha
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  acceptTerms: boolean = false;

  constructor(private router: Router) {}

  nextStep() {
    // Validações por etapa
    if (this.currentStep === 1) {
      if (!this.name || !this.email || !this.phone) {
        alert('Por favor, preencha todos os campos obrigatórios!');
        return;
      }
      if (!this.isValidEmail(this.email)) {
        alert('Por favor, insira um e-mail válido!');
        return;
      }
    }

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  async onSubmit() {
    if (!this.password || !this.confirmPassword) {
      alert('Por favor, preencha todos os campos de senha!');
      return;
    }
    
    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }
    
    if (this.password.length < 8) {
      alert('A senha deve ter no mínimo 8 caracteres!');
      return;
    }

    if (!this.acceptTerms) {
      alert('Você precisa aceitar os termos de uso!');
      return;
    }

    const cadastroData = {
      nome: this.name,
      email: this.email,
      telefone: this.phone,
      senha: this.password,
    };

    try {
      // Cria o usuario no servidor
      const response = await fetch('https://cashinbox.shop/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cadastroData),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar usuário');
      }

      const result = await response.json();
      console.log('Usuário criado:', result);

      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao realizar cadastro. Tente novamente.');
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  formatPhone(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      value = value.replace(/(\d)(\d{4})$/, '$1-$2');
      this.phone = value;
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}