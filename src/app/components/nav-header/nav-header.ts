import { Component, HostListener, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-nav-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-header.html',
  styleUrl: './nav-header.css',
})
export class NavHeader implements OnInit {
  mobileMenuOpen = false;
  isScrolled = false;
  isLoggedIn = false;
  userName = '';
  userAvatar = '👨‍💼';
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // Verificar scroll inicial apenas no browser
    if (this.isBrowser) {
      this.checkScroll();
      this.checkLoginStatus();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      this.checkScroll();
    }
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    // Fechar menu mobile ao redimensionar para desktop
    if (this.isBrowser && window.innerWidth > 1024 && this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  private checkScroll() {
    if (this.isBrowser) {
      this.isScrolled = window.scrollY > 10;
    }
  }

  private checkLoginStatus() {
    if (this.isBrowser) {
      this.isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
      if (this.isLoggedIn) {
        const userData = localStorage.getItem('userData');
        if (userData) {
          try {
            const user = JSON.parse(userData);
            this.userName = user.nome || 'Usuário';
            this.userAvatar = this.getAvatarFromName(this.userName);
          } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
          }
        }
      }
    }
  }

  private getAvatarFromName(nome: string): string {
    const firstLetter = nome.charAt(0).toUpperCase();
    const avatars: { [key: string]: string } = {
      'A': '👨‍💼', 'B': '👩‍💼', 'C': '👨‍💻', 'D': '👩‍💻', 'E': '👨‍🔧',
      'F': '👩‍🔧', 'G': '👨‍🎨', 'H': '👩‍🎨', 'I': '👨‍🍳', 'J': '👩‍🍳',
      'K': '👨‍⚕️', 'L': '👩‍⚕️', 'M': '👨‍🏫', 'N': '👩‍🏫', 'O': '👨‍🚀',
      'P': '👩‍🚀', 'Q': '👨‍🎓', 'R': '👩‍🎓', 'S': '👨‍💼', 'T': '👩‍💼',
      'U': '👨‍🔬', 'V': '👩‍🔬', 'W': '👨‍🎤', 'X': '👩‍🎤', 'Y': '👨‍✈️', 'Z': '👩‍✈️'
    };
    return avatars[firstLetter] || '👤';
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToCadastro() {
    this.router.navigate(['/cadastro']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    if (!this.isBrowser) return;

    localStorage.removeItem('authToken');
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('empresasData');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    this.isLoggedIn = false;
    this.userName = '';
    
    this.router.navigate(['/']);
  }

  toggleMobileMenu() {
    if (!this.isBrowser) return;
    
    this.mobileMenuOpen = !this.mobileMenuOpen;
    
    // Prevenir scroll quando menu estiver aberto
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    if (!this.isBrowser) return;
    
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}