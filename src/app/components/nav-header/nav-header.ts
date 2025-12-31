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

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToCadastro() {
    this.router.navigate(['/cadastro']);
  }

  navigateToHome() {
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