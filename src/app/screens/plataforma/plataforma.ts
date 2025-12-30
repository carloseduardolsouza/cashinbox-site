import { Component } from '@angular/core';
import { NavHeader } from '../../components/nav-header/nav-header';

@Component({
  selector: 'app-plataforma',
  imports: [NavHeader],
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
        'Conciliação bancária',
        'Emissão de boletos',
        'Lembretes de pagamento',
        'Integração com bancos'
      ]
    },
    {
      icon: '📈',
      title: 'Relatórios Avançados',
      description: 'Gere relatórios profissionais com análises preditivas e insights acionáveis.',
      details: [
        'Análise preditiva',
        'DRE automatizado',
        'Balanço patrimonial',
        'Fluxo de caixa projetado'
      ]
    },
    {
      icon: '🔒',
      title: 'Segurança Máxima',
      description: 'Seus dados protegidos com criptografia de ponta a ponta e conformidade com LGPD.',
      details: [
        'Criptografia AES-256',
        'Backup automático',
        'Auditoria completa',
        'Conformidade LGPD'
      ]
    },
    {
      icon: '📱',
      title: 'Multi-Plataforma',
      description: 'Acesse de qualquer lugar: web, mobile ou desktop. Seus dados sempre sincronizados.',
      details: [
        'App iOS e Android',
        'Desktop Windows/Mac',
        'Interface web',
        'Sincronização em nuvem'
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