import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { NavHeader } from '../../components/nav-header/nav-header';
import { Footer } from '../../components/footer/footer';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NavHeader, Footer, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  startFreeTrial() {
    this.router.navigate(['/cadastro']);
  }

  seeDemo() {
    this.router.navigate(['/plataforma']);
  }

  navigateToModulos() {
    this.router.navigate(['/modulos']);
  }

  navigateToPrecos() {
    this.router.navigate(['/precos']);
  }

  navigateToContato() {
    this.router.navigate(['/contato']);
  }

  scrollToSection(sectionId: string) {
    if (!this.isBrowser) return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}