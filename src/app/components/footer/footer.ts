import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();
  newsletterEmail = '';
  isSubmitting = false;

  footerLinks = {
    product: [
      { label: 'Plataforma', route: '/plataforma' },
      { label: 'Módulos', route: '/modulos' },
      { label: 'Download', route: '/download' },
      { label: 'Preços', route: '/precos' }
    ],
    company: [
      { label: 'Sobre nós', route: '#' },
      { label: 'Carreiras', route: '#' },
      { label: 'Blog', route: '#' },
      { label: 'Contato', route: '/contato' }
    ],
    resources: [
      { label: 'Documentação', route: '#' },
      { label: 'Tutoriais', route: '#' },
      { label: 'Suporte', route: '#' },
      { label: 'API', route: '#' }
    ],
    legal: [
      { label: 'Privacidade', route: '#' },
      { label: 'Termos de Uso', route: '#' },
      { label: 'Segurança', route: '#' },
      { label: 'LGPD', route: '#' }
    ]
  };

  socialLinks = [
    { icon: '📘', name: 'Facebook', url: 'https://facebook.com' },
    { icon: '📷', name: 'Instagram', url: 'https://instagram.com' },
    { icon: '🔗', name: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: '🐦', name: 'Twitter', url: 'https://twitter.com' },
    { icon: '▶️', name: 'YouTube', url: 'https://youtube.com' }
  ];

  onNewsletterSubmit(event: Event) {
    event.preventDefault();
    
    if (!this.newsletterEmail || !this.isValidEmail(this.newsletterEmail)) {
      alert('Por favor, insira um e-mail válido!');
      return;
    }

    this.isSubmitting = true;

    // Simular envio
    setTimeout(() => {
      alert(`Obrigado por se inscrever! Confirme seu e-mail: ${this.newsletterEmail}`);
      this.newsletterEmail = '';
      this.isSubmitting = false;
    }, 1000);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}