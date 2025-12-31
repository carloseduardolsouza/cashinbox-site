import { Component, OnInit } from '@angular/core';
import { NavHeader } from '../../components/nav-header/nav-header';
import { Footer } from '../../components/footer/footer';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NavHeader, Footer, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Scroll para o topo ao carregar a página
    window.scrollTo(0, 0);
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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}