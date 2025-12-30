import { Component } from '@angular/core';
import { NavHeader } from '../../components/nav-header/nav-header';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plataforma',
  imports: [NavHeader, CommonModule],
  templateUrl: './plataforma.html',
  styleUrl: './plataforma.css',
})
export class Plataforma {
  features = [
    {
      icon: '📊',
      title: 'Dashboard Inteligente',
      description: 'Visualize todas as suas métricas financeiras em tempo real com gráficos interativos e personalizáveis.',
      details: [
        'KPIs em tempo real',
        'Gráficos customizáveis',
        'Exportação de dados',
        'Widgets personalizados'
      ]
    },
    {
      icon: '💰',
      title: 'Gestão de Fluxo de Caixa',
      description: 'Controle completo de entradas e saídas com projeções futuras e alertas inteligentes.',
      details: [
        'Projeções automáticas',
        'Alertas de saldo baixo',
        'Categorização inteligente',
        'Relatórios detalhados'
      ]
    },
    {
      icon: '🤖',
      title: 'Automação de Processos',
      description: 'Automatize tarefas repetitivas e ganhe tempo para focar no crescimento do seu negócio.',
      details: [
        'Conciliação automática',
        'Emissão de boletos',
        'Lembretes de pagamento',
        'Cobrança automatizada'
      ]
    },
    {
      icon: '📈',
      title: 'Análise Preditiva com IA',
      description: 'Utilize inteligência artificial para previsões e insights estratégicos.',
      details: [
        'Previsão de vendas',
        'Análise de tendências',
        'Recomendações inteligentes',
        'Detecção de anomalias'
      ]
    },
    {
      icon: '👥',
      title: 'Gestão de Comissões',
      description: 'Gerencie comissões de vendedores de forma automática e transparente.',
      details: [
        'Cálculo automático',
        'Múltiplas regras',
        'Relatórios por vendedor',
        'Histórico completo'
      ]
    },
    {
      icon: '📦',
      title: 'Controle de Estoque',
      description: 'Gerencie seu estoque com precisão e receba alertas de reposição.',
      details: [
        'Controle em tempo real',
        'Alertas de estoque baixo',
        'Movimentações detalhadas',
        'Integração com vendas'
      ]
    },
    {
      icon: '💳',
      title: 'Sistema de Crediário',
      description: 'Sistema completo de parcelamento próprio para suas vendas.',
      details: [
        'Parcelamento flexível',
        'Controle de inadimplência',
        'Lembretes automáticos',
        'Relatórios de recebíveis'
      ]
    },
    {
      icon: '📝',
      title: 'Contas a Pagar',
      description: 'Gerencie todas as contas a pagar da sua empresa em um só lugar.',
      details: [
        'Calendário de pagamentos',
        'Alertas de vencimento',
        'Histórico completo',
        'Categorização de despesas'
      ]
    },
    {
      icon: '💾',
      title: 'Backup Automático',
      description: 'Seus dados sempre seguros com backup automático na nuvem.',
      details: [
        'Backup diário',
        'Recuperação fácil',
        'Criptografia total',
        'Armazenamento seguro'
      ]
    }
  ];

  technologies = [
    { name: 'Cloud Computing', icon: '☁️' },
    { name: 'Machine Learning', icon: '🧠' },
    { name: 'API Rest', icon: '🔌' },
    { name: 'Blockchain', icon: '⛓️' },
    { name: 'Big Data', icon: '📊' },
    { name: 'AI Analytics', icon: '🤖' }
  ];
}