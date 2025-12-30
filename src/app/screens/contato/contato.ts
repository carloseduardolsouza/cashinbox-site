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
      value: 'cashinboxsoftware@gmail.com',
      description: 'Resposta em até 24 horas'
    },
    {
      icon: '💬',
      title: 'WhatsApp',
      value: '(62) 99462-5955',
      description: 'Atendimento imediato',
      link: 'https://wa.me/5562994625955'
    }
  ];

  socialMedia = [
    { icon: '📘', name: 'Facebook', link: '#' },
    { icon: '📷', name: 'Instagram', link: '#' },
    { icon: '🔗', name: 'LinkedIn', link: '#' }
  ];

  onSubmit() {
    console.log('Form submitted:', this.contactForm);
    
    // Montar mensagem para WhatsApp
    const message = `Olá! Meu nome é ${this.contactForm.name}.
    
Email: ${this.contactForm.email}
Telefone: ${this.contactForm.phone}
Empresa: ${this.contactForm.company || 'Não informado'}
Assunto: ${this.subjects.find(s => s.value === this.contactForm.subject)?.label}

Mensagem: ${this.contactForm.message}`;
    
    const whatsappUrl = `https://wa.me/5562994625955?text=${encodeURIComponent(message)}`;
    
    alert('Sua mensagem será enviada via WhatsApp!');
    window.open(whatsappUrl, '_blank');
    
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

  openWhatsApp() {
    window.open('https://wa.me/5562994625955', '_blank');
  }
}