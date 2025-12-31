import { Component } from '@angular/core';
import { NavHeader } from '../../components/nav-header/nav-header';
import { CommonModule } from '@angular/common';
import { BetaPopup } from '../../components/beta-popup/beta-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modulos',
  imports: [NavHeader, CommonModule, BetaPopup],
  templateUrl: './modulos.html',
  styleUrl: './modulos.css',
})
export class Modulos {
  showBetaPopup = false;
  selectedModule: string = '';

  modules = [
    {
      id: 'farmacia',
      name: 'Farmácias',
      icon: '💊',
      description: 'Sistema completo para gestão de farmácias e drogarias',
      color: '#10b981',
      features: [
        'Controle de medicamentos controlados',
        'Integração com receituário digital',
        'Gestão de validade de produtos',
        'Controle de lote e rastreabilidade',
        'Programa de fidelidade'
      ],
      status: 'Em Desenvolvimento'
    },
    {
      id: 'supermercado',
      name: 'Supermercados',
      icon: '🛒',
      description: 'Solução para gestão de supermercados e mercearias',
      color: '#2563eb',
      features: [
        'PDV com código de barras',
        'Gestão de perecíveis',
        'Controle de hortifruti',
        'Promoções e ofertas',
        'Gestão de açougue e padaria'
      ],
      status: 'Em Desenvolvimento'
    },
    {
      id: 'salao',
      name: 'Salões de Beleza',
      icon: '💇',
      description: 'Gestão completa para salões de beleza',
      color: '#ec4899',
      features: [
        'Agendamento online',
        'Gestão de profissionais',
        'Controle de comissões',
        'Ficha de clientes',
        'Gestão de produtos'
      ],
      status: 'Em Desenvolvimento'
    },
    {
      id: 'barbearia',
      name: 'Barbearias',
      icon: '💈',
      description: 'Sistema especializado para barbearias',
      color: '#f59e0b',
      features: [
        'Agendamento por profissional',
        'Histórico de cortes',
        'Programa de fidelidade',
        'Venda de produtos',
        'Gestão de horários'
      ],
      status: 'Em Desenvolvimento'
    },
    {
      id: 'restaurante',
      name: 'Restaurantes',
      icon: '🍽️',
      description: 'Solução para restaurantes e lanchonetes',
      color: '#ef4444',
      features: [
        'Gestão de mesas',
        'Cardápio digital',
        'Controle de pedidos',
        'Integração com delivery',
        'Gestão de estoque de alimentos'
      ],
      status: 'Em Desenvolvimento'
    },
    {
      id: 'oficina',
      name: 'Oficinas Mecânicas',
      icon: '🔧',
      description: 'Sistema para oficinas e autopeças',
      color: '#6366f1',
      features: [
        'Ordem de serviço',
        'Gestão de peças',
        'Agendamento de serviços',
        'Histórico de veículos',
        'Orçamentos'
      ],
      status: 'Em Desenvolvimento'
    },
    {
      id: 'academia',
      name: 'Academias',
      icon: '💪',
      description: 'Gestão para academias e espaços fitness',
      color: '#8b5cf6',
      features: [
        'Controle de acesso',
        'Gestão de planos',
        'Agendamento de aulas',
        'Avaliação física',
        'App para alunos'
      ],
      status: 'Em Desenvolvimento'
    },
    {
      id: 'petshop',
      name: 'Pet Shops',
      icon: '🐾',
      description: 'Sistema para pet shops e clínicas veterinárias',
      color: '#14b8a6',
      features: [
        'Ficha de pets',
        'Agendamento de banho e tosa',
        'Controle de vacinas',
        'Venda de produtos',
        'Histórico de atendimentos'
      ],
      status: 'Em Desenvolvimento'
    },
    {
      id: 'clinica',
      name: 'Clínicas Médicas',
      icon: '🏥',
      description: 'Gestão para clínicas e consultórios',
      color: '#06b6d4',
      features: [
        'Agendamento de consultas',
        'Prontuário eletrônico',
        'Gestão de convênios',
        'Prescrição digital',
        'Faturamento TISS'
      ],
      status: 'Em Desenvolvimento'
    },
    {
      id: 'loja',
      name: 'Lojas de Roupas',
      icon: '👔',
      description: 'Sistema para lojas de roupas e acessórios',
      color: '#a855f7',
      features: [
        'Gestão de grade (tamanho/cor)',
        'Controle de estoque',
        'Etiquetas personalizadas',
        'Promoções e descontos',
        'Programa de fidelidade'
      ],
      status: 'Em Desenvolvimento'
    },
    {
      id: 'padaria',
      name: 'Padarias',
      icon: '🥖',
      description: 'Solução para padarias e confeitarias',
      color: '#f97316',
      features: [
        'Controle de produção',
        'Gestão de ingredientes',
        'Receitas e fichas técnicas',
        'Validade de produtos',
        'PDV especializado'
      ],
      status: 'Em Desenvolvimento'
    },
    {
      id: 'outros',
      name: 'Outros Segmentos',
      icon: '🏪',
      description: 'Módulos personalizados para outros setores',
      color: '#64748b',
      features: [
        'Sistema adaptável',
        'Customização completa',
        'Funcionalidades específicas',
        'Suporte dedicado',
        'Desenvolvimento sob medida'
      ],
      status: 'Em Desenvolvimento'
    }
  ];

  constructor(private router: Router) {}

  selectModule(moduleId: string, moduleName: string) {
    this.selectedModule = moduleName;
    this.showBetaPopup = true;
  }

  onBetaAccept() {
    this.showBetaPopup = false;
    alert(`Obrigado por se interessar pelo módulo ${this.selectedModule}! Entraremos em contato em breve.`);
    this.router.navigate(['/cadastro']);
  }

  onBetaClose() {
    this.showBetaPopup = false;
    this.selectedModule = '';
  }
}