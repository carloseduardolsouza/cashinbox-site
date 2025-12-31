import { Component, OnInit } from '@angular/core';
import { NavHeader } from '../../components/nav-header/nav-header';
import { CommonModule } from '@angular/common';
import { BetaPopup } from '../../components/beta-popup/beta-popup';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-modulos',
  imports: [NavHeader, CommonModule, BetaPopup, RouterModule],
  templateUrl: './modulos.html',
  styleUrl: './modulos.css',
})
export class Modulos implements OnInit {
  showBetaPopup = false;
  selectedModule: string = '';
  selectedModuleId: string = '';

  modules = [
    {
      id: 'farmacia',
      name: 'Farmácias',
      icon: '💊',
      description: 'Sistema completo para gestão de farmácias e drogarias com controle de medicamentos e receituário',
      color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      features: [
        'Controle de medicamentos controlados',
        'Integração com receituário digital',
        'Gestão de validade de produtos',
        'Controle de lote e rastreabilidade',
        'Programa de fidelidade integrado'
      ],
      status: 'Beta'
    },
    {
      id: 'supermercado',
      name: 'Supermercados',
      icon: '🛒',
      description: 'Solução completa para gestão de supermercados, mercearias e minimercados',
      color: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      features: [
        'PDV integrado com código de barras',
        'Gestão inteligente de perecíveis',
        'Controle específico de hortifruti',
        'Sistema de promoções e ofertas',
        'Gestão de açougue e padaria'
      ],
      status: 'Beta'
    },
    {
      id: 'salao',
      name: 'Salões de Beleza',
      icon: '💇',
      description: 'Gestão completa para salões de beleza, esmalteria e clínicas de estética',
      color: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      features: [
        'Agendamento online integrado',
        'Gestão de profissionais e cadeiras',
        'Cálculo automático de comissões',
        'Ficha completa de clientes',
        'Controle de estoque de produtos'
      ],
      status: 'Beta'
    },
    {
      id: 'barbearia',
      name: 'Barbearias',
      icon: '💈',
      description: 'Sistema especializado para barbearias modernas e tradicionais',
      color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      features: [
        'Agendamento por profissional',
        'Histórico de cortes e preferências',
        'Programa de fidelidade automático',
        'Venda de produtos integrada',
        'Gestão inteligente de horários'
      ],
      status: 'Beta'
    },
    {
      id: 'restaurante',
      name: 'Restaurantes',
      icon: '🍽️',
      description: 'Solução para restaurantes, lanchonetes e delivery',
      color: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
      features: [
        'Gestão de mesas e comandas',
        'Cardápio digital interativo',
        'Controle de pedidos em tempo real',
        'Integração com delivery',
        'Gestão de estoque de alimentos'
      ],
      status: 'Beta'
    },
    {
      id: 'oficina',
      name: 'Oficinas Mecânicas',
      icon: '🔧',
      description: 'Sistema para oficinas mecânicas, elétricas e autopeças',
      color: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      features: [
        'Ordem de serviço digital',
        'Gestão completa de peças',
        'Agendamento de serviços',
        'Histórico de veículos',
        'Sistema de orçamentos'
      ],
      status: 'Beta'
    },
    {
      id: 'academia',
      name: 'Academias',
      icon: '💪',
      description: 'Gestão para academias, studios e espaços fitness',
      color: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      features: [
        'Controle de acesso automatizado',
        'Gestão de planos e mensalidades',
        'Agendamento de aulas e treinos',
        'Avaliação física digital',
        'App exclusivo para alunos'
      ],
      status: 'Beta'
    },
    {
      id: 'petshop',
      name: 'Pet Shops',
      icon: '🐾',
      description: 'Sistema para pet shops, clínicas veterinárias e banho e tosa',
      color: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
      features: [
        'Ficha completa de pets',
        'Agendamento de banho e tosa',
        'Controle de vacinas e vermífugos',
        'Venda de produtos pet',
        'Histórico completo de atendimentos'
      ],
      status: 'Beta'
    },
    {
      id: 'clinica',
      name: 'Clínicas Médicas',
      icon: '🏥',
      description: 'Gestão para clínicas médicas, consultórios e laboratórios',
      color: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      features: [
        'Agendamento de consultas online',
        'Prontuário eletrônico completo',
        'Gestão de convênios médicos',
        'Prescrição digital integrada',
        'Faturamento TISS automatizado'
      ],
      status: 'Beta'
    },
    {
      id: 'loja',
      name: 'Lojas de Roupas',
      icon: '👔',
      description: 'Sistema para lojas de roupas, calçados e acessórios',
      color: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
      features: [
        'Gestão de grade completa (tamanho/cor)',
        'Controle de estoque por variação',
        'Etiquetas personalizadas',
        'Sistema de promoções inteligente',
        'Programa de fidelidade'
      ],
      status: 'Beta'
    },
    {
      id: 'padaria',
      name: 'Padarias',
      icon: '🥖',
      description: 'Solução para padarias, confeitarias e cafeterias',
      color: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      features: [
        'Controle de produção diária',
        'Gestão de ingredientes e receitas',
        'Fichas técnicas detalhadas',
        'Controle de validade rigoroso',
        'PDV especializado para padaria'
      ],
      status: 'Beta'
    },
    {
      id: 'outros',
      name: 'Outros Segmentos',
      icon: '🏪',
      description: 'Módulos personalizados para diversos outros setores',
      color: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
      features: [
        'Sistema totalmente adaptável',
        'Customização completa',
        'Funcionalidades específicas',
        'Suporte dedicado',
        'Desenvolvimento sob medida'
      ],
      status: 'Beta'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Scroll para o topo ao carregar
    window.scrollTo(0, 0);
  }

  selectModule(moduleId: string, moduleName: string) {
    this.selectedModule = moduleName;
    this.selectedModuleId = moduleId;
    this.showBetaPopup = true;
  }

  onBetaAccept() {
    this.showBetaPopup = false;
    
    // Salvar módulo selecionado no sessionStorage
    sessionStorage.setItem('selectedModule', JSON.stringify({
      id: this.selectedModuleId,
      name: this.selectedModule
    }));
    
    alert(`Obrigado por se interessar pelo módulo ${this.selectedModule}! Você será direcionado para o cadastro.`);
    this.router.navigate(['/cadastro']);
  }

  onBetaClose() {
    this.showBetaPopup = false;
    this.selectedModule = '';
    this.selectedModuleId = '';
  }
}