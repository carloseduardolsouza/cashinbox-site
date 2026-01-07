import { Component, ChangeDetectorRef } from '@angular/core';
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

  // Estados de erro e loading
  errorMessage: string = '';
  errorType: 'error' | 'warning' | '' = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  nextStep() {
    // Limpa mensagens de erro
    this.clearError();

    // Validações por etapa
    if (this.currentStep === 1) {
      if (!this.name || !this.email || !this.phone) {
        this.showError('Por favor, preencha todos os campos obrigatórios!', 'warning');
        return;
      }
      if (!this.isValidEmail(this.email)) {
        this.showError('Por favor, insira um e-mail válido!', 'warning');
        return;
      }
    }

    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    this.clearError();
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    this.clearError();

    if (!this.password || !this.confirmPassword) {
      this.showError('Por favor, preencha todos os campos de senha!', 'warning');
      return;
    }
    
    if (this.password !== this.confirmPassword) {
      this.showError('As senhas não coincidem!', 'warning');
      return;
    }
    
    if (this.password.length < 8) {
      this.showError('A senha deve ter no mínimo 8 caracteres!', 'warning');
      return;
    }

    if (!this.acceptTerms) {
      this.showError('Você precisa aceitar os termos de uso!', 'warning');
      return;
    }

    const cadastroData = {
      nome: this.name,
      email: this.email,
      telefone: this.phone,
      senha: this.password,
    };

    console.log('Iniciando cadastro...', cadastroData);
    this.isLoading = true;
    this.cdr.detectChanges(); // Força detecção de mudança

    fetch('https://cashinbox.shop/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cadastroData),
    })
      .then(response => {
        console.log('Resposta recebida - Status:', response.status);
        
        const responseStatus = response.status;
        const responseOk = response.ok;

        return response.json()
          .then(result => {
            console.log('JSON parseado:', result);
            return { result, responseStatus, responseOk };
          })
          .catch(jsonError => {
            console.error('Erro ao parsear JSON:', jsonError);
            return { 
              result: { error: 'Erro ao processar resposta do servidor.' }, 
              responseStatus, 
              responseOk: false 
            };
          });
      })
      .then(({ result, responseStatus, responseOk }) => {
        console.log('Processando resultado - Status:', responseStatus, 'OK:', responseOk);
        
        // SEMPRE desativa o loading aqui
        this.isLoading = false;
        this.cdr.detectChanges(); // Força detecção de mudança

        // Verifica se foi sucesso (status 200-299)
        if (responseOk) {
          console.log('✅ Usuário criado com sucesso:', result);
          window.alert('Usuário criado com sucesso!');
          this.router.navigate(['/login']);
          return;
        }

        console.log('❌ Erro detectado:', result);

        // Trata erros específicos
        
        // Erro de email duplicado
        if (
          result.error && 
          (result.error.includes('Unique constraint failed') || 
           result.error.includes('usuarios_email_key') ||
           result.error.toLowerCase().includes('duplicate') ||
           result.error.toLowerCase().includes('already exists'))
        ) {
          this.showError(
            'Este e-mail já está sendo usado por outro usuário. Por favor, utilize outro e-mail.',
            'error'
          );
          this.currentStep = 1;
          this.cdr.detectChanges(); // Força detecção de mudança
          return;
        }

        // Erro de validação
        if (responseStatus === 400) {
          const errorMsg = result.message || result.error || 'Dados inválidos. Verifique as informações e tente novamente.';
          this.showError(errorMsg, 'warning');
          this.cdr.detectChanges(); // Força detecção de mudança
          return;
        }

        // Erro interno do servidor
        if (responseStatus === 500) {
          const errorMsg = result.message || result.error || 'Erro no servidor. Por favor, tente novamente em alguns instantes.';
          this.showError(errorMsg, 'error');
          this.cdr.detectChanges(); // Força detecção de mudança
          return;
        }

        // Outros erros
        const errorMsg = result.message || result.error || 'Erro ao realizar cadastro. Por favor, tente novamente.';
        this.showError(errorMsg, 'error');
        this.cdr.detectChanges(); // Força detecção de mudança
      })
      .catch(error => {
        console.error('❌ Erro no catch:', error);
        // SEMPRE desativa o loading aqui também
        this.isLoading = false;
        this.showError(
          'Erro de conexão. Verifique sua internet e tente novamente.',
          'error'
        );
        this.cdr.detectChanges(); // Força detecção de mudança
      });
  }

  showError(message: string, type: 'error' | 'warning') {
    this.errorMessage = message;
    this.errorType = type;
  }

  clearError() {
    this.errorMessage = '';
    this.errorType = '';
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