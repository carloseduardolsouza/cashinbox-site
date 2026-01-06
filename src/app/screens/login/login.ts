import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface LoginResponse {
  message: string;
  token: string;
  usuario: {
    id_usuario: number;
    nome: string;
    email: string;
    telefone: string;
    role: string;
    ultimo_acesso: string;
    created_at: string;
    updated_at: string;
  };
  dadosEmpresas: Array<{
    id_empresa: number;
    user_login: string;
    nome_fantasia: string;
    razao_social: string;
    email: string | null;
    senha: string;
    telefone: string;
    cpf_cnpj: string;
    inscricao_estadual: string;
    segmento: string;
    ultimo_acesso: string;
    created_at: string;
    updated_at: string;
    id_usuario: number;
  }>;
}

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
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  async onSubmit() {
    // Validações básicas
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, preencha todos os campos!';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Por favor, insira um e-mail válido!';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response = await fetch('https://cashinbox.shop/login/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          senha: this.password,
        }),
      });

      const data: LoginResponse | { error: string } = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Tratar erro 401 com mensagem do backend
          const errorData = data as { error: string };
          throw new Error(errorData.error || 'E-mail ou senha incorretos!');
        } else if (response.status === 404) {
          throw new Error('Usuário não encontrado!');
        } else {
          throw new Error('Erro ao fazer login. Tente novamente.');
        }
      }

      const loginData = data as LoginResponse;

      // Armazenar dados no localStorage
      localStorage.setItem('authToken', loginData.token);
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userData', JSON.stringify(loginData.usuario));
      localStorage.setItem('empresasData', JSON.stringify(loginData.dadosEmpresas));
      localStorage.setItem('userEmail', loginData.usuario.email);
      localStorage.setItem('userName', loginData.usuario.nome);

      // Se "Lembrar-me" estiver marcado, salvar email
      if (this.rememberMe) {
        localStorage.setItem('rememberedEmail', this.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      console.log('Login realizado com sucesso:', loginData);

      // Redirecionar para o dashboard
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      console.error('Erro no login:', error);
      this.errorMessage = error.message || 'Erro ao fazer login. Tente novamente.';
    } finally {
      this.isLoading = false;
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  ngOnInit() {
    // Carregar email salvo se existir
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.email = rememberedEmail;
      this.rememberMe = true;
    }
  }
}