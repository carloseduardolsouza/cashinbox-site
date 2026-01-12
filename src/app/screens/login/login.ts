import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface Plano {
  id_plano: number;
  nome: string;
  valor: string;
  duracao_dias: number;
  fidelidade: boolean;
  fidelidade_dias: number | null;
  created_at: string;
  updated_at: string;
}

interface Assinatura {
  id_assinatura: number;
  status: string;
  expira_em: string;
  fidelidade_fim: string | null;
  created_at: string;
  updated_at: string;
  id_plano: number;
  id_empresa: number;
  plano: Plano;
}

interface Empresa {
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
  assinatura: Assinatura;
}

interface Usuario {
  id_usuario: number;
  nome: string;
  email: string;
  telefone: string;
  role: string;
  ultimo_acesso: string;
  created_at: string;
  updated_at: string;
}

interface LoginResponse {
  message: string;
  token: string;
  usuario: Usuario;
  dadosEmpresas: Empresa[];
}

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';
  sessionExpiredMessage: string = '';
  private isBrowser: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) return;

    // Verificar se há mensagem de sessão expirada
    this.route.queryParams.subscribe(params => {
      if (params['message']) {
        this.sessionExpiredMessage = params['message'];
        
        // Limpar a mensagem da URL após 5 segundos
        setTimeout(() => {
          this.sessionExpiredMessage = '';
          this.router.navigate(['/login']);
        }, 5000);
      }
    });

    // Carregar email salvo se existir
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.email = rememberedEmail;
      this.rememberMe = true;
    }
  }

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

      // ✅ SALVAR DATA DO LOGIN
      this.authService.saveLoginDate();

      // Se "Lembrar-me" estiver marcado, salvar email
      if (this.rememberMe) {
        localStorage.setItem('rememberedEmail', this.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      console.log('Login realizado com sucesso:', loginData);

      // ✅ REDIRECIONAR BASEADO NO ROLE
      if (loginData.usuario.role === 'admin') {
        this.router.navigate(['/admin-dashboard']);
      } else {
        this.router.navigate(['/dashboard']);
      }
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
}