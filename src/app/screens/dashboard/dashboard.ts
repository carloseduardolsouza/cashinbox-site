import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Usuario {
  id_usuario: number;
  nome: string;
  email: string;
  telefone: string;
  role: string;
  ultimo_acesso: string;
  created_at: string;
  updated_at: string;
}

interface Empresa {
  id_empresa: number;
  user_login: string;
  nome_fantasia: string;
  razao_social: string;
  email: string | null;
  senha: string;
  telefone: string;
  cpf_cnpj: string;
  inscricao_estadual: string;
  segmento: string;
  ultimo_acesso: string;
  created_at: string;
  updated_at: string;
  id_usuario: number;
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
    nome: '',
    email: '',
    avatar: '👨‍💼',
    role: ''
  };

  empresaSelecionada: Empresa | null = null;
  empresas: Empresa[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Verificar se usuário está logado
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    // Carregar dados do usuário
    this.loadUserData();

    // Carregar empresas
    this.loadEmpresasData();

    console.log('Dashboard carregado:', {
      usuario: this.usuario,
      empresas: this.empresas,
      empresaSelecionada: this.empresaSelecionada
    });
  }

  private loadUserData() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const user: Usuario = JSON.parse(userData);
        this.usuario.nome = user.nome;
        this.usuario.email = user.email;
        this.usuario.role = user.role;
        this.usuario.avatar = this.getAvatarFromName(user.nome);
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  private loadEmpresasData() {
    const empresasData = localStorage.getItem('empresasData');
    if (empresasData) {
      try {
        this.empresas = JSON.parse(empresasData);
        
        // Selecionar primeira empresa por padrão
        if (this.empresas.length > 0) {
          this.empresaSelecionada = this.empresas[0];
        }
      } catch (error) {
        console.error('Erro ao carregar dados das empresas:', error);
      }
    }
  }

  private getAvatarFromName(nome: string): string {
    // Retorna emoji baseado na primeira letra do nome
    const firstLetter = nome.charAt(0).toUpperCase();
    const avatars: { [key: string]: string } = {
      'A': '👨‍💼', 'B': '👩‍💼', 'C': '👨‍💻', 'D': '👩‍💻', 'E': '👨‍🔧',
      'F': '👩‍🔧', 'G': '👨‍🎨', 'H': '👩‍🎨', 'I': '👨‍🍳', 'J': '👩‍🍳',
      'K': '👨‍⚕️', 'L': '👩‍⚕️', 'M': '👨‍🏫', 'N': '👩‍🏫', 'O': '👨‍🚀',
      'P': '👩‍🚀', 'Q': '👨‍🎓', 'R': '👩‍🎓', 'S': '👨‍💼', 'T': '👩‍💼',
      'U': '👨‍🔬', 'V': '👩‍🔬', 'W': '👨‍🎤', 'X': '👩‍🎤', 'Y': '👨‍✈️', 'Z': '👩‍✈️'
    };
    return avatars[firstLetter] || '👤';
  }

  selecionarEmpresa(empresa: Empresa) {
    this.empresaSelecionada = empresa;
    console.log('Empresa selecionada:', empresa);
  }

  formatCpfCnpj(cpfCnpj: string): string {
    // Remove caracteres não numéricos
    const numbers = cpfCnpj.replace(/\D/g, '');
    
    if (numbers.length === 11) {
      // CPF: 000.000.000-00
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (numbers.length === 14) {
      // CNPJ: 00.000.000/0000-00
      return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    
    return cpfCnpj;
  }

  formatTelefone(telefone: string): string {
    // Remove caracteres não numéricos
    const numbers = telefone.replace(/\D/g, '');
    
    if (numbers.length === 11) {
      // Celular: (00) 00000-0000
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numbers.length === 10) {
      // Fixo: (00) 0000-0000
      return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    
    return telefone;
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  }

  formatDateTime(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  }

  getPlanoAtual(): string {
    // Simular plano (você pode adicionar essa informação na API)
    return 'Semestral';
  }

  getValorPlano(): number {
    // Simular valor (você pode adicionar essa informação na API)
    return 329.90;
  }

  getDataVencimento(): Date {
    // Simular vencimento em 30 dias
    const vencimento = new Date();
    vencimento.setDate(vencimento.getDate() + 30);
    return vencimento;
  }

  getDiasRestantes(): number {
    const vencimento = this.getDataVencimento();
    const hoje = new Date();
    const diff = vencimento.getTime() - hoje.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  getStatusEmpresa(): 'ativo' | 'pendente' | 'vencido' {
    const diasRestantes = this.getDiasRestantes();
    if (diasRestantes > 7) return 'ativo';
    if (diasRestantes > 0) return 'pendente';
    return 'vencido';
  }

  getStatusClass(status?: string): string {
    const statusAtual = status || this.getStatusEmpresa();
    const classes: Record<string, string> = {
      'ativo': 'status-ativo',
      'pendente': 'status-pendente',
      'vencido': 'status-vencido'
    };
    return classes[statusAtual] || 'status-ativo';
  }

  getStatusLabel(status?: string): string {
    const statusAtual = status || this.getStatusEmpresa();
    const labels: Record<string, string> = {
      'ativo': 'Ativo',
      'pendente': 'Pagamento Pendente',
      'vencido': 'Vencido'
    };
    return labels[statusAtual] || 'Ativo';
  }

  getModulosAtivos(): string[] {
    if (!this.empresaSelecionada) return [];
    
    // Retornar módulos baseados no segmento
    const segmento = this.empresaSelecionada.segmento.toLowerCase();
    
    const modulosPorSegmento: { [key: string]: string[] } = {
      'farmacia': ['Farmácia', 'CRM Inteligente', 'Fluxo de Caixa'],
      'supermercado': ['Supermercado', 'Estoque', 'CRM Inteligente'],
      'software': ['CRM Inteligente', 'Fluxo de Caixa', 'Dashboard'],
      'default': ['Fluxo de Caixa', 'CRM Inteligente', 'Gestão Financeira']
    };

    for (const key in modulosPorSegmento) {
      if (segmento.includes(key)) {
        return modulosPorSegmento[key];
      }
    }
    return modulosPorSegmento['default'];
  }

  navegarParaPlanos() {
    this.router.navigate(['/precos']);
  }

  navegarParaModulos() {
    this.router.navigate(['/modulos']);
  }

  logout() {
    // Limpar localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('empresasData');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    console.log('Logout realizado');
    
    // Redirecionar para login
    this.router.navigate(['/login']);
  }

  voltarParaHome() {
    this.router.navigate(['/']);
  }

  editarEmpresa() {
    console.log('Editar empresa:', this.empresaSelecionada);
    alert('Funcionalidade de edição em desenvolvimento!');
  }

  renovarPlano() {
    console.log('Renovar plano da empresa:', this.empresaSelecionada);
    this.navegarParaPlanos();
  }

  configurarModulo(modulo: string) {
    console.log('Configurar módulo:', modulo);
    alert(`Configuração do módulo ${modulo} em desenvolvimento!`);
  }
}