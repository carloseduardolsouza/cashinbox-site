import { Component, OnInit, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NovaEmpresaModal } from '../../components/nova-empresa-modal/nova-empresa-modal';
import { PlanoModal } from '../../components/plano-modal/plano-modal';
import { AuthService } from '../../services/auth.service';

// ... (interfaces permanecem as mesmas)
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

interface Endereco {
  id_endereco: number;
  pais: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  complemento: string;
  cep: string;
  id_empresa: number;
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
  enderecos?: Endereco[];
  assinaturas?: Assinatura[];
  assinatura?: Assinatura | null;
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
  dadosEmpresas?: Empresa[];
}

interface UserUpdateResponse {
  message: string;
  usuario: Usuario;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, FormsModule, NovaEmpresaModal, PlanoModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  standalone: true,
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
    updated_at: '',
  };

  usuarioAvatar = '👨‍💼';
  empresaSelecionada: Empresa | null = null;
  empresas: Empresa[] = [];

  showAddEmpresaModal = false;
  showPlanoModal = false;
  showEditarEmpresaModal = false; // ✅ NOVO
  private isBrowser: boolean;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService, // ✅ INJETAR AuthService
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) return;

    // ✅ VALIDAR AUTENTICAÇÃO E EXPIRAÇÃO
    if (!this.authService.validateAuth()) {
      return; // AuthService já redireciona para login
    }

    this.loadUserData();
    this.loadEmpresasData();
    this.reloadEmpresas();
  }

  private loadUserData() {
    if (!this.isBrowser) return;

    const userData = this.authService.getUserData();
    if (userData) {
      this.usuario = userData;
      this.usuarioAvatar = this.getAvatarFromName(this.usuario.nome);
    } else {
      this.authService.logout();
    }
  }

  private loadEmpresasData() {
    if (!this.isBrowser) return;

    const empresasData = localStorage.getItem('empresasData');
    if (empresasData) {
      try {
        const data = JSON.parse(empresasData);
        this.empresas = this.processEmpresas(Array.isArray(data) ? data : []);

        if (this.empresas.length > 0) {
          this.empresaSelecionada = this.empresas[0];
        }

        this.cdr.detectChanges();
      } catch (error) {
        console.error('Erro ao carregar dados das empresas:', error);
      }
    }
  }

  private getAvatarFromName(nome: string): string {
    const firstLetter = nome.charAt(0).toUpperCase();
    const avatars: { [key: string]: string } = {
      A: '👨‍💼', B: '👩‍💼', C: '👨‍💻', D: '👩‍💻', E: '👨‍🔧',
      F: '👩‍🔧', G: '👨‍🎨', H: '👩‍🎨', I: '👨‍🍳', J: '👩‍🍳',
      K: '👨‍⚕️', L: '👩‍⚕️', M: '👨‍🏫', N: '👩‍🏫', O: '👨‍🚀',
      P: '👩‍🚀', Q: '👨‍🎓', R: '👩‍🎓', S: '👨‍💼', T: '👩‍💼',
      U: '👨‍🔬', V: '👩‍🔬', W: '👨‍🎤', X: '👩‍🎤', Y: '👨‍✈️', Z: '👩‍✈️',
    };
    return avatars[firstLetter] || '👤';
  }

  openAddEmpresaModal() {
    this.showAddEmpresaModal = true;
  }

  closeAddEmpresaModal() {
    this.showAddEmpresaModal = false;
  }

  async onEmpresaCadastrada() {
    this.closeAddEmpresaModal();
    await this.reloadEmpresas();
  }

  private processEmpresas(empresas: Empresa[]): Empresa[] {
    return empresas.map((empresa) => {
      if (empresa.assinaturas && empresa.assinaturas.length > 0) {
        const assinaturaAtiva = empresa.assinaturas.find(
          (assinatura) => assinatura.status.toLowerCase() === 'ativa'
        );
        empresa.assinatura = assinaturaAtiva || empresa.assinaturas[0];
      } else {
        empresa.assinatura = null;
      }
      return empresa;
    });
  }

  async reloadEmpresas() {
    if (!this.isBrowser) return;

    try {
      const token = this.authService.getToken();
      if (!token) {
        console.error('Token não encontrado');
        return;
      }

      const response = await fetch('https://cashinbox.shop/login/userUpdate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: UserUpdateResponse = await response.json();

        if (data.usuario && data.usuario.dadosEmpresas) {
          this.empresas = this.processEmpresas(data.usuario.dadosEmpresas);

          localStorage.setItem('empresasData', JSON.stringify(this.empresas));
          localStorage.setItem('userData', JSON.stringify({
            id_usuario: data.usuario.id_usuario,
            nome: data.usuario.nome,
            email: data.usuario.email,
            telefone: data.usuario.telefone,
            role: data.usuario.role,
            ultimo_acesso: data.usuario.ultimo_acesso,
            created_at: data.usuario.created_at,
            updated_at: data.usuario.updated_at,
          }));

          if (!this.empresaSelecionada || !this.empresas.find((e) => e.id_empresa === this.empresaSelecionada?.id_empresa)) {
            if (this.empresas.length > 0) {
              this.empresaSelecionada = this.empresas[0];
            } else {
              this.empresaSelecionada = null;
            }
          } else {
            const empresaAtualizada = this.empresas.find(
              (e) => e.id_empresa === this.empresaSelecionada?.id_empresa
            );
            if (empresaAtualizada) {
              this.empresaSelecionada = empresaAtualizada;
            }
          }

          this.cdr.detectChanges();
        }
      } else {
        if (response.status === 401) {
          this.authService.logout('Sessão expirada. Por favor, faça login novamente.');
        }
      }
    } catch (error) {
      console.error('Erro ao recarregar empresas:', error);
    }
  }

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
  }

  selecionarEmpresa(empresa: Empresa) {
    this.empresaSelecionada = empresa;
    this.cdr.detectChanges();
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
        year: 'numeric',
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
        minute: '2-digit',
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
      ativo: 'status-ativo',
      pendente: 'status-pendente',
      vencido: 'status-vencido',
    };
    return classes[statusAtual] || 'status-ativo';
  }

  getStatusLabel(status?: string): string {
    const statusAtual = status || this.getStatusEmpresa();
    const labels: Record<string, string> = {
      ativo: 'Ativo',
      pendente: 'Pagamento Pendente',
      vencido: 'Vencido',
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
    this.authService.logout();
  }

  gerarBoleto() {
    try {
      const token = this.authService.getToken();
      const dados = {
        id_empresa: this.empresaSelecionada?.id_empresa,
      };

      fetch('https://cashinbox.shop/site/buscarBoleto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dados),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success && data.boleto && data.boleto !== false) {
            window.open(data.boleto, '_blank');
          } else {
            alert('O boleto ainda não foi gerado. Por favor, tente novamente mais tarde.');
          }
        })
        .catch((error) => {
          console.error('Erro ao buscar boleto:', error);
          alert('Erro ao buscar o boleto. Por favor, tente novamente.');
        });
    } catch (error) {
      console.error('Erro ao gerar boleto:', error);
      alert('Erro inesperado ao gerar boleto.');
    }
  }

  voltarParaHome() {
    this.router.navigate(['/']);
  }

  // ✅ NOVA FUNCIONALIDADE: Ver dados completos da empresa
  editarEmpresa() {
    if (!this.empresaSelecionada) {
      alert('Selecione uma empresa primeiro!');
      return;
    }
    
    this.showEditarEmpresaModal = true;
  }

  closeEditarEmpresaModal() {
    this.showEditarEmpresaModal = false;
  }

  configurarModulo(modulo: string) {
    console.log('Configurar módulo:', modulo);
    alert(`Configuração do módulo ${modulo} em desenvolvimento!`);
  }
}