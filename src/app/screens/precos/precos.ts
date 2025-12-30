import { Component } from '@angular/core';
import { NavHeader } from '../../components/nav-header/nav-header';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-precos',
  imports: [NavHeader, CommonModule],
  templateUrl: './precos.html',
  styleUrl: './precos.css',
})
export class Precos {
  billingCycle: 'monthly' | 'yearly' = 'monthly';

  plans = [
    {
      name: 'Starter',
      description: 'Perfeito para pequenos negócios começando',
      monthlyPrice: 49,
      yearlyPrice: 470,
      icon: '🚀',
      color: '#10b981',
      popular: false,
      features: [
        'Até 3 usuários',
        '1 empresa',
        'Dashboard básico',
        'Fluxo de caixa',
        'Relatórios básicos',
        'Suporte por email',
        '100 transações/mês',
        'Backup semanal'
      ]
    },
    {
      name: 'Professional',
      description: 'Ideal para empresas em crescimento',
      monthlyPrice: 149,
      yearlyPrice: 1430,
      icon: '💼',
      color: '#2563eb',
      popular: true,
      features: [
        'Até 15 usuários',
        '3 empresas',
        'Dashboard avançado',
        'Fluxo de caixa projetado',
        'Relatórios avançados',
        'Suporte prioritário',
        'Transações ilimitadas',
        'Backup diário',
        'Automações',
        'Integrações bancárias',
        'API access'
      ]
    },
    {
      name: 'Enterprise',
      description: 'Para grandes empresas com necessidades complexas',
      monthlyPrice: 399,
      yearlyPrice: 3830,
      icon: '🏢',
      color: '#7c3aed',
      popular: false,
      features: [
        'Usuários ilimitados',
        'Empresas ilimitadas',
        'Dashboard personalizado',
        'Análise preditiva com IA',
        'Relatórios customizados',
        'Suporte 24/7',
        'Transações ilimitadas',
        'Backup em tempo real',
        'Automações avançadas',
        'Integrações premium',
        'API dedicada',
        'Gerente de conta dedicado',
        'Treinamento personalizado',
        'SLA garantido'
      ]
    }
  ];

  faqs = [
    {
      question: 'Posso mudar de plano a qualquer momento?',
      answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças serão refletidas no próximo ciclo de cobrança.'
    },
    {
      question: 'Existe período de teste gratuito?',
      answer: 'Sim, oferecemos 14 dias de teste gratuito em todos os planos, sem necessidade de cartão de crédito.'
    },
    {
      question: 'Como funciona o pagamento anual?',
      answer: 'No plano anual, você economiza aproximadamente 20% em relação ao plano mensal. O pagamento é feito uma vez por ano.'
    },
    {
      question: 'Posso cancelar a qualquer momento?',
      answer: 'Sim, você pode cancelar sua assinatura a qualquer momento sem multas ou taxas adicionais.'
    },
    {
      question: 'Vocês oferecem desconto para ONGs?',
      answer: 'Sim! Oferecemos descontos especiais para ONGs e instituições sem fins lucrativos. Entre em contato conosco.'
    },
    {
      question: 'O que acontece se eu exceder os limites?',
      answer: 'Vamos notificá-lo antes de atingir os limites. Você pode fazer upgrade do plano ou adicionar recursos conforme necessário.'
    }
  ];

  toggleBillingCycle() {
    this.billingCycle = this.billingCycle === 'monthly' ? 'yearly' : 'monthly';
  }

  getPrice(plan: any): number {
    return this.billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  }

  selectPlan(planName: string) {
    console.log(`Selected plan: ${planName}`);
    // Implementar lógica de seleção de plano
  }
}