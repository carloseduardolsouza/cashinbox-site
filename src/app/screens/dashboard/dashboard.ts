import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NovaEmpresaModal } from '../../components/nova-empresa-modal/nova-empresa-modal';
import { PlanoModal } from '../../components/plano-modal/plano-modal';

interface Plano {
  id_plano: number;
  nome: string;
  valor: string;
  duracao_dias: number;
  fidelidade: boolean;
  fidelidade_dias: number | null;
  created_at: string;
  updated_at: string;
}

interface Assinatura {
  id_assinatura: number;
  status: string;
  expira_em: string;
  fidelidade_fim: string | null;
  created_at: string;
  updated_at: string;
  id_plano: number;
  id_empresa: number;
  plano: Plano;
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
  assinatura: Assinatura | null;
}

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

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, FormsModule, NovaEmpresaModal, PlanoModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true
})
export class Dashboard implements OnInit {
  usuario: Usuario = {
    id_usuario: 0,
    nome: '',
    email: '',
    telefone: '',
    role: '',
    ultimo_acesso: '',
    created_at: '',
    updated_at: ''
  };

  usuarioAvatar = '👨‍💼';
  empresaSelecionada: Empresa | null = null;
  empresas: Empresa[] = [];
  
  // Modal de adicionar empresa
  showAddEmpresaModal = false;
  
  // Modal de planos
  showPlanoModal = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadUserData();
    this.loadEmpresasData();
  }

  private loadUserData() {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        this.usuario = JSON.parse(userData);
        this.usuarioAvatar = this.getAvatarFromName(this.usuario.nome);
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
        const data = JSON.parse(empresasData);
        this.empresas = Array.isArray(data) ? data : [];
        
        if (this.empresas.length > 0) {
          this.empresaSelecionada = this.empresas[0];
        }
      } catch (error) {
        console.error('Erro ao carregar dados das empresas:', error);
      }
    }
  }

  private getAvatarFromName(nome: string): string {
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

  // Funções da modal de empresa
  openAddEmpresaModal() {
    this.showAddEmpresaModal = true;
  }

  closeAddEmpresaModal() {
    this.showAddEmpresaModal = false;
  }

  onEmpresaCadastrada() {
    this.closeAddEmpresaModal();
    this.reloadEmpresas();
  }

  async reloadEmpresas() {
    try {
      const response = await fetch('https://cashinbox.shop/login/userUpdate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.usuario && data.usuario.dadosEmpresas) {
          this.empresas = data.usuario.dadosEmpresas;
          localStorage.setItem('empresasData', JSON.stringify(this.empresas));
          
          if (this.empresas.length > 0 && !this.empresaSelecionada) {
            this.empresaSelecionada = this.empresas[0];
          }
        }
      }
    } catch (error) {
      console.error('Erro ao recarregar empresas:', error);
    }
  }

  // Funções da modal de planos
  navegarParaPlanos() {
    if (!this.empresaSelecionada) {
      alert('Selecione uma empresa primeiro!');
      return;
    }
    this.showPlanoModal = true;
  }

  closePlanoModal() {
    this.showPlanoModal = false;
  }

  async onPlanoContratado() {
    this.closePlanoModal();
    await this.reloadEmpresas();
    
    if (this.empresaSelecionada) {
      const empresaAtualizada = this.empresas.find(
        e => e.id_empresa === this.empresaSelecionada!.id_empresa
      );
      if (empresaAtualizada) {
        this.empresaSelecionada = empresaAtualizada;
      }
    }
  }

  selecionarEmpresa(empresa: Empresa) {
    this.empresaSelecionada = empresa;
    console.log('Empresa selecionada:', empresa);
  }

  formatCpfCnpj(cpfCnpj: string): string {
    const numbers = cpfCnpj.replace(/\D/g, '');
    
    if (numbers.length === 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (numbers.length === 14) {
      return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    
    return cpfCnpj;
  }

  formatTelefone(telefone: string): string {
    const numbers = telefone.replace(/\D/g, '');
    
    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (numbers.length === 10) {
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
    if (!this.empresaSelecionada?.assinatura?.plano) {
      return 'Sem plano';
    }
    return this.empresaSelecionada.assinatura.plano.nome;
  }

  getValorPlano(): number {
    if (!this.empresaSelecionada?.assinatura?.plano) {
      return 0;
    }
    return parseFloat(this.empresaSelecionada.assinatura.plano.valor);
  }

  getDataVencimento(): Date {
    if (!this.empresaSelecionada?.assinatura?.expira_em) {
      const hoje = new Date();
      hoje.setDate(hoje.getDate() + 30);
      return hoje;
    }
    return new Date(this.empresaSelecionada.assinatura.expira_em);
  }

  getDiasRestantes(): number {
    const vencimento = this.getDataVencimento();
    const hoje = new Date();
    const diff = vencimento.getTime() - hoje.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  getStatusEmpresa(): 'ativo' | 'pendente' | 'vencido' {
    if (!this.empresaSelecionada?.assinatura) {
      return 'vencido';
    }

    const status = this.empresaSelecionada.assinatura.status.toLowerCase();
    
    if (status === 'ativa') {
      const diasRestantes = this.getDiasRestantes();
      if (diasRestantes > 7) return 'ativo';
      if (diasRestantes > 0) return 'pendente';
      return 'vencido';
    } else if (status === 'pendente') {
      return 'pendente';
    } else {
      return 'vencido';
    }
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

  renovarPlano() {
    if (!this.empresaSelecionada) {
      alert('Selecione uma empresa primeiro!');
      return;
    }
    this.showPlanoModal = true;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('userData');
    localStorage.removeItem('empresasData');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    
    console.log('Logout realizado');
    
    this.router.navigate(['/login']);
  }

  voltarParaHome() {
    this.router.navigate(['/']);
  }

  editarEmpresa() {
    console.log('Editar empresa:', this.empresaSelecionada);
    alert('Funcionalidade de edição em desenvolvimento!');
  }

  configurarModulo(modulo: string) {
    console.log('Configurar módulo:', modulo);
    alert(`Configuração do módulo ${modulo} em desenvolvimento!`);
  }
}