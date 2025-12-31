import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Empresa {
  id: string;
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  plano: string;
  dataVencimento: Date;
  status: 'ativo' | 'pendente' | 'vencido';
  valorPlano: number;
  modulosAtivos: string[];
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true
})
export class Dashboard implements OnInit {
  usuario = {
    nome: 'João Silva',
    email: 'joao@empresa.com',
    avatar: '👨‍💼'
  };

  empresaSelecionada: Empresa | null = null;

  empresas: Empresa[] = [
    {
      id: '1',
      nomeFantasia: 'Minha Empresa Ltda',
      razaoSocial: 'Minha Empresa LTDA',
      cnpj: '12.345.678/0001-90',
      plano: 'Semestral',
      dataVencimento: new Date('2025-06-15'),
      status: 'ativo',
      valorPlano: 329.90,
      modulosAtivos: ['Farmácia', 'CRM Inteligente', 'Fluxo de Caixa']
    },
    {
      id: '2',
      nomeFantasia: 'Filial Centro',
      razaoSocial: 'Minha Empresa Filial Centro LTDA',
      cnpj: '12.345.678/0002-71',
      plano: 'Mensal',
      dataVencimento: new Date('2025-01-20'),
      status: 'ativo',
      valorPlano: 59.90,
      modulosAtivos: ['Supermercado', 'Estoque']
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.empresaSelecionada = this.empresas[0];
  }

  selecionarEmpresa(empresa: Empresa) {
    this.empresaSelecionada = empresa;
  }

  getDiasRestantes(dataVencimento: Date): number {
    const hoje = new Date();
    const diff = dataVencimento.getTime() - hoje.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  getStatusClass(status: string): string {
    const classes: Record<string, string> = {
      'ativo': 'status-ativo',
      'pendente': 'status-pendente',
      'vencido': 'status-vencido'
    };
    return classes[status] || 'status-ativo';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'ativo': 'Ativo',
      'pendente': 'Pagamento Pendente',
      'vencido': 'Vencido'
    };
    return labels[status] || 'Ativo';
  }

  navegarParaPlanos() {
    this.router.navigate(['/precos']);
  }

  navegarParaModulos() {
    this.router.navigate(['/modulos']);
  }

  logout() {
    // Implementar lógica de logout
    this.router.navigate(['/login']);
  }

  voltarParaHome() {
    this.router.navigate(['/']);
  }
}