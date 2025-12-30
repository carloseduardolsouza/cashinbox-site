import { Component } from '@angular/core';
import { NavHeader } from '../../components/nav-header/nav-header';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contato',
  imports: [NavHeader, CommonModule, FormsModule],
  templateUrl: './contato.html',
  styleUrl: './contato.css',
})
export class Contato {
  contactForm = {
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'sales',
    message: ''
  };

  subjects = [
    { value: 'sales', label: 'Vendas' },
    { value: 'support', label: 'Suporte Técnico' },
    { value: 'partnership', label: 'Parcerias' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'other', label: 'Outros' }
  ];

  contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'contato@cashinbox.com.br',
      description: 'Resposta em até 24 horas'
    },
    {
      icon: '📱',
      title: 'Telefone',
      value: '+55 (11) 4000-0000',
      description: 'Seg a Sex, 9h às 18h'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      value: '+55 (11) 9 9999-9999',
      description: 'Atendimento imediato'
    },
    {
      icon: '📍',
      title: 'Endereço',
      value: 'São Paulo, SP',
      description: 'Av. Paulista, 1000'
    }
  ];

  socialMedia = [
    { icon: '📘', name: 'Facebook', link: '#' },
    { icon: '📷', name: 'Instagram', link: '#' },
    { icon: '🔗', name: 'LinkedIn', link: '#' },
    { icon: '🐦', name: 'Twitter', link: '#' }
  ];

  onSubmit() {
    console.log('Form submitted:', this.contactForm);
    // Implementar lógica de envio
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    this.resetForm();
  }

  resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: 'sales',
      message: ''
    };
  }

  formatPhone(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      value = value.replace(/(\d)(\d{4})$/, '$1-$2');
      this.contactForm.phone = value;
    }
  }
}