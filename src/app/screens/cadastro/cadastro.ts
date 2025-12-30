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
  totalSteps: number = 4;

  // Step 1 - Dados do Usuário
  name: string = '';
  email: string = '';
  phone: string = '';

  // Step 2 - Senha
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // Step 3 - Dados da Empresa
  nomeFantasia: string = '';
  razaoSocial: string = '';
  cpfCnpj: string = '';
  numero: string = '';
  segmento: string = '';

  // Step 4 - Endereço
  pais: string = 'Brasil';
  estado: string = '';
  cidade: string = '';
  rua: string = '';
  bairro: string = '';
  cep: string = '';
  complemento: string = '';

  acceptTerms: boolean = false;

  segments = [
    'Comércio',
    'Serviços',
    'Indústria',
    'Tecnologia',
    'Saúde',
    'Educação',
    'Construção',
    'Alimentação',
    'Moda e Vestuário',
    'Automotivo',
    'Agronegócio',
    'Outros'
  ];

  estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

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

    if (this.currentStep === 2) {
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
    }

    if (this.currentStep === 3) {
      if (!this.nomeFantasia || !this.razaoSocial || !this.cpfCnpj || 
          !this.numero || !this.segmento) {
        alert('Por favor, preencha todos os campos obrigatórios da empresa!');
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

  onSubmit() {
    if (!this.acceptTerms) {
      alert('Você precisa aceitar os termos de uso!');
      return;
    }

    if (!this.pais || !this.estado || !this.cidade || !this.rua || 
        !this.bairro || !this.cep) {
      alert('Por favor, preencha todos os campos obrigatórios do endereço!');
      return;
    }

    const cadastroData = {
      usuario: {
        nome: this.name,
        email: this.email,
        telefone: this.phone,
        senha: this.password
      },
      empresa: {
        nomeFantasia: this.nomeFantasia,
        razaoSocial: this.razaoSocial,
        cpfCnpj: this.cpfCnpj,
        numero: this.numero,
        segmento: this.segmento
      },
      endereco: {
        pais: this.pais,
        estado: this.estado,
        cidade: this.cidade,
        rua: this.rua,
        bairro: this.bairro,
        cep: this.cep,
        complemento: this.complemento
      }
    };

    console.log('Cadastro completo:', cadastroData);
    alert('Cadastro realizado com sucesso! Você terá 14 dias de teste gratuito.');
    
    // Aqui você implementará a lógica de cadastro
    this.router.navigate(['/login']);
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

  formatCpfCnpj(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      // CPF
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      // CNPJ
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    
    this.cpfCnpj = value;
  }

  formatCep(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 8) {
      value = value.replace(/^(\d{5})(\d)/, '$1-$2');
      this.cep = value;
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}