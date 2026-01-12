import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly LOGIN_DATE_KEY = 'loginDate';
  private readonly AUTH_TOKEN_KEY = 'authToken';
  private readonly USER_LOGGED_IN_KEY = 'userLoggedIn';
  private readonly MAX_DAYS_WITHOUT_LOGIN = 3;
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Salva a data do login no localStorage
   */
  saveLoginDate(): void {
    if (!this.isBrowser) return;
    
    const now = new Date().getTime();
    localStorage.setItem(this.LOGIN_DATE_KEY, now.toString());
  }

  /**
   * Verifica se o login expirou (mais de 3 dias)
   * @returns true se expirou, false caso contrário
   */
  isLoginExpired(): boolean {
    if (!this.isBrowser) return false;

    const loginDateStr = localStorage.getItem(this.LOGIN_DATE_KEY);
    if (!loginDateStr) return true;

    const loginDate = parseInt(loginDateStr, 10);
    const now = new Date().getTime();
    const daysPassed = (now - loginDate) / (1000 * 60 * 60 * 24);

    return daysPassed > this.MAX_DAYS_WITHOUT_LOGIN;
  }

  /**
   * Valida se o usuário está autenticado e se o login não expirou
   * @returns true se válido, false caso contrário
   */
  validateAuth(): boolean {
    if (!this.isBrowser) return false;

    const isLoggedIn = localStorage.getItem(this.USER_LOGGED_IN_KEY) === 'true';
    const hasToken = !!localStorage.getItem(this.AUTH_TOKEN_KEY);

    if (!isLoggedIn || !hasToken) {
      return false;
    }

    if (this.isLoginExpired()) {
      this.logout('Sua sessão expirou após 3 dias de inatividade. Por favor, faça login novamente.');
      return false;
    }

    return true;
  }

  /**
   * Faz logout do usuário
   * @param message Mensagem opcional para exibir ao usuário
   */
  logout(message?: string): void {
    if (!this.isBrowser) return;

    // Limpar todos os dados do localStorage
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    localStorage.removeItem(this.USER_LOGGED_IN_KEY);
    localStorage.removeItem('userData');
    localStorage.removeItem('empresasData');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem(this.LOGIN_DATE_KEY);

    // Redirecionar para login
    this.router.navigate(['/login'], {
      queryParams: message ? { message } : {}
    });
  }

  /**
   * Verifica se o usuário é admin
   * @returns true se for admin, false caso contrário
   */
  isAdmin(): boolean {
    if (!this.isBrowser) return false;

    try {
      const userData = localStorage.getItem('userData');
      if (!userData) return false;

      const user = JSON.parse(userData);
      return user.role === 'admin';
    } catch (error) {
      console.error('Erro ao verificar role do usuário:', error);
      return false;
    }
  }

  /**
   * Obtém o token de autenticação
   * @returns token ou null
   */
  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  /**
   * Obtém os dados do usuário
   * @returns dados do usuário ou null
   */
  getUserData(): any {
    if (!this.isBrowser) return null;

    try {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Erro ao obter dados do usuário:', error);
      return null;
    }
  }
}