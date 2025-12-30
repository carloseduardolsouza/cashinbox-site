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
  totalSteps: number = 3;

  // Step 1 - Dados Pessoais
  name: string = '';
  email: string = '';
  phone: string = '';

  // Step 2 - Empresa
  companyName: string = '';
  companySize: string = '';
  segment: string = '';

  // Step 3 - Senha
  password: string = '';
  confirmPassword: string = '';
  acceptTerms: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  companySizes = [
    { value: '1-10', label: '1-10 funcionários' },
    { value: '11-50', label: '11-50 funcionários' },
    { value: '51-200', label: '51-200 funcionários' },
    { value: '201-500', label: '201-500 funcionários' },
    { value: '500+', label: 'Mais de 500 funcionários' }
  ];

  segments = [
    'Comércio',
    'Serviços',
    'Indústria',
    'Tecnologia',
    'Saúde',
    'Educação',
    'Construção',
    'Alimentação',
    'Outros'
  ];

  constructor(private router: Router) {}

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!this.acceptTerms) {
      alert('Você precisa aceitar os termos de uso!');
      return;
    }

    console.log('Cadastro completo:', {
      name: this.name,
      email: this.email,
      phone: this.phone,
      companyName: this.companyName,
      companySize: this.companySize,
      segment: this.segment
    });
    
    // Aqui você implementará a lógica de cadastro
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
}