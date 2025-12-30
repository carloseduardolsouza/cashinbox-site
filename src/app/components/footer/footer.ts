import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  currentYear = new Date().getFullYear();

  footerLinks = {
    product: [
      { label: 'Plataforma', route: '/plataforma' },
      { label: 'Download', route: '/download' },
      { label: 'Preços', route: '/precos' },
      { label: 'Atualizações', route: '#' }
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
    { icon: '📘', name: 'Facebook', url: '#' },
    { icon: '📷', name: 'Instagram', url: '#' },
    { icon: '🔗', name: 'LinkedIn', url: '#' },
    { icon: '🐦', name: 'Twitter', url: '#' },
    { icon: '▶️', name: 'YouTube', url: '#' }
  ];
}