import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { NavHeader } from '../../components/nav-header/nav-header';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-precos',
  imports: [NavHeader, CommonModule],
  templateUrl: './precos.html',
  styleUrl: './precos.css',
})
export class Precos implements OnInit {
  private isBrowser: boolean;

  constructor(private router: Router, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      window.scrollTo(0, 0);
    }
  }

  plans = [
    {
      name: 'Mensal',
      description: 'Pagamento mensal sem compromisso',
      price: 59.9,
      period: 'mês',
      icon: '📅',
      color: '#10b981',
      popular: false,
    },
    {
      name: 'Trimestral',
      description: 'Economize pagando a cada 3 meses',
      price: 169.9,
      period: 'trimestre',
      savingsText: 'Economize R$ 9,70',
      icon: '📊',
      color: '#2563eb',
      popular: false,
    },
    {
      name: 'Semestral',
      description: 'Melhor custo-benefício para 6 meses',
      price: 329.9,
      period: 'semestre',
      savingsText: 'Economize R$ 29,50',
      icon: '💼',
      color: '#7c3aed',
      popular: true,
    },
    {
      name: 'Anual',
      description: 'Máxima economia com plano anual',
      price: 609.9,
      period: 'ano',
      savingsText: 'Economize R$ 108,90',
      icon: '🏆',
      color: '#f59e0b',
      popular: false,
    },
  ];

  features = [
    'Fluxo de caixa completo',
    'Gerenciamento de comissões para vendedores',
    'Controle de estoque',
    'Notificações em tempo real',
    'Cobrança automatizada',
    'Sistema de crediário próprio',
    'Análise preditiva com IA',
    'Gerenciamento de contas a pagar',
    'Serviço de backup automático',
    'Suporte técnico',
    'Atualizações gratuitas',
    '14 dias de teste grátis',
  ];

  faqs = [
    {
      question: 'Posso mudar de plano a qualquer momento?',
      answer:
        'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças serão refletidas no próximo ciclo de cobrança.',
    },
    {
      question: 'Existe período de teste gratuito?',
      answer:
        'Sim, oferecemos 14 dias de teste gratuito com acesso completo a todas as funcionalidades, sem necessidade de cartão de crédito.',
    },
    {
      question: 'Como funciona o pagamento?',
      answer:
        'O pagamento é feito de acordo com o plano escolhido: mensal, trimestral, semestral ou anual. Aceitamos cartão de crédito, débito e PIX.',
    },
    {
      question: 'Posso cancelar a qualquer momento?',
      answer:
        'Sim, você pode cancelar sua assinatura a qualquer momento sem multas ou taxas adicionais.',
    },
    {
      question: 'Quantos usuários posso cadastrar?',
      answer: 'Todos os planos permitem cadastro de usuários ilimitados dentro da sua empresa.',
    },
    {
      question: 'O que está incluído em todos os planos?',
      answer:
        'Todos os planos incluem: fluxo de caixa, gerenciamento de comissões, controle de estoque, notificações, cobrança automatizada, crediário, IA, contas a pagar e backup.',
    },
  ];

  selectPlan(planName: string) {
    console.log(`Selected plan: ${planName}`);
    alert(`Você selecionou o plano ${planName}. Redirecionando para o cadastro...`);
    // Implementar lógica de seleção de plano e redirecionamento
  }

  getMonthlyEquivalent(plan: any): string {
    if (plan.period === 'mês') return '';

    const months: Record<string, number> = {
      trimestre: 3,
      semestre: 6,
      ano: 12,
    };

    const monthly = (plan.price / months[plan.period]).toFixed(2);
    return `R$ ${monthly}/mês`;
  }

  routerCadastro() {
    this.router.navigate(['/cadastro']);
  }

  routerWhatsapp() {
    window.open('https://api.whatsapp.com/send/?phone=6294625955&text&type=phone_number&app_absent=0', '_blank');
  }
}
