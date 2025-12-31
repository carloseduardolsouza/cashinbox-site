import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-header.html',
  styleUrl: './nav-header.css',
})
export class NavHeader implements OnInit {
  mobileMenuOpen = false;
  isScrolled = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Verificar scroll inicial
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    // Fechar menu mobile ao redimensionar para desktop
    if (window.innerWidth > 1024 && this.mobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  private checkScroll() {
    this.isScrolled = window.scrollY > 10;
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
    this.mobileMenuOpen = !this.mobileMenuOpen;
    
    // Prevenir scroll quando menu estiver aberto
    if (this.mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
    document.body.style.overflow = '';
  }
}