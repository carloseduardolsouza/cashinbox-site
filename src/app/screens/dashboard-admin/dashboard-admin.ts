import { Component, OnInit, PLATFORM_ID, Inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  usuario?: Usuario;
}

@Component({
  selector: 'app-dashboard-admin',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css',
  standalone: true,
})
export class DashboardAdmin implements OnInit {
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
  private isBrowser: boolean;

  // Dados para o painel admin
  empresas: Empresa[] = [];
  usuarios: Usuario[] = [];
  planos: Plano[] = [];
  assinaturas: Assinatura[] = [];

  // Filtros e pesquisa
  searchTerm: string = '';
  filtroStatus: string = 'todos';

  // Estados de visualização
  viewMode: 'empresas' | 'usuarios' | 'planos' | 'assinaturas' = 'empresas';
  isLoading: boolean = false;
  showModal: boolean = false;
  modalMode: 'create' | 'edit' = 'create';
  selectedItem: any = null;

  // Estatísticas
  stats = {
    totalEmpresas: 0,
    totalUsuarios: 0,
    totalPlanos: 0,
    assinaturasAtivas: 0,
    receitaMensal: 0,
  };

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (!this.isBrowser) return;

    // Validar autenticação e verificar se é admin
    if (!this.authService.validateAuth()) {
      return;
    }

    if (!this.authService.isAdmin()) {
      alert('Acesso negado! Você não tem permissão para acessar esta página.');
      this.router.navigate(['/dashboard']);
      return;
    }

    this.loadUserData();
    this.loadAllData();
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

  async loadAllData() {
    this.isLoading = true;
    try {
      await Promise.all([
        this.loadEmpresas(),
        this.loadUsuarios(),
        this.loadPlanos(),
        this.loadAssinaturas(),
      ]);
      this.calculateStats();
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao carregar dados do sistema.');
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  async loadEmpresas() {
    try {
      const token = this.authService.getToken();
      if (!token) return;

      const response = await fetch('https://cashinbox.shop/empresas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.empresas = data.data || [];
      } else if (response.status === 401) {
        this.authService.logout('Sessão expirada. Por favor, faça login novamente.');
      }
    } catch (error) {
      console.error('Erro ao carregar empresas:', error);
    }
  }

  async loadUsuarios() {
    try {
      const token = this.authService.getToken();
      if (!token) return;

      const response = await fetch('https://cashinbox.shop/usuarios', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.usuarios = data.data || [];
      } else if (response.status === 401) {
        this.authService.logout('Sessão expirada. Por favor, faça login novamente.');
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  }

  async loadPlanos() {
    try {
      const response = await fetch('https://cashinbox.shop/planos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.planos = data.data || [];
      }
    } catch (error) {
      console.error('Erro ao carregar planos:', error);
    }
  }

  async loadAssinaturas() {
    try {
      const token = this.authService.getToken();
      if (!token) return;

      const response = await fetch('https://cashinbox.shop/assinaturas', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.assinaturas = data.data || [];
      } else if (response.status === 401) {
        this.authService.logout('Sessão expirada. Por favor, faça login novamente.');
      }
    } catch (error) {
      console.error('Erro ao carregar assinaturas:', error);
    }
  }

  calculateStats() {
    this.stats.totalEmpresas = this.empresas.length;
    this.stats.totalUsuarios = this.usuarios.length;
    this.stats.totalPlanos = this.planos.length;

    // Contar assinaturas ativas
    this.stats.assinaturasAtivas = this.empresas.filter(
      empresa => empresa.assinatura?.status.toLowerCase() === 'ativa'
    ).length;

    // Calcular receita mensal
    this.stats.receitaMensal = this.empresas.reduce((total, empresa) => {
      if (empresa.assinatura?.status.toLowerCase() === 'ativa') {
        return total + parseFloat(empresa.assinatura.plano.valor);
      }
      return total;
    }, 0);
  }

  changeView(mode: 'empresas' | 'usuarios' | 'planos' | 'assinaturas') {
    this.viewMode = mode;
    this.searchTerm = '';
    this.filtroStatus = 'todos';
  }

  get filteredEmpresas() {
    let filtered = this.empresas;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(
        empresa =>
          empresa.nome_fantasia.toLowerCase().includes(term) ||
          empresa.razao_social.toLowerCase().includes(term) ||
          empresa.cpf_cnpj.includes(term) ||
          empresa.email?.toLowerCase().includes(term)
      );
    }

    if (this.filtroStatus !== 'todos') {
      filtered = filtered.filter(empresa => {
        const status = empresa.assinatura?.status.toLowerCase() || 'sem-plano';
        return status === this.filtroStatus;
      });
    }

    return filtered;
  }

  get filteredUsuarios() {
    if (!this.searchTerm) return this.usuarios;

    const term = this.searchTerm.toLowerCase();
    return this.usuarios.filter(
      usuario =>
        usuario.nome.toLowerCase().includes(term) ||
        usuario.email.toLowerCase().includes(term) ||
        usuario.telefone.includes(term)
    );
  }

  get filteredPlanos() {
    if (!this.searchTerm) return this.planos;

    const term = this.searchTerm.toLowerCase();
    return this.planos.filter(plano => plano.nome.toLowerCase().includes(term));
  }

  get filteredAssinaturas() {
    if (!this.searchTerm) return this.assinaturas;

    const term = this.searchTerm.toLowerCase();
    return this.assinaturas.filter(
      assinatura =>
        assinatura.status.toLowerCase().includes(term) ||
        assinatura.id_assinatura.toString().includes(term)
    );
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

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  getStatusClass(status?: string): string {
    if (!status) return 'status-sem-plano';

    const statusLower = status.toLowerCase();
    if (statusLower === 'ativa') return 'status-ativo';
    if (statusLower === 'pendente') return 'status-pendente';
    return 'status-vencido';
  }

  getStatusLabel(status?: string): string {
    if (!status) return 'Sem Plano';

    const statusLower = status.toLowerCase();
    if (statusLower === 'ativa') return 'Ativo';
    if (statusLower === 'pendente') return 'Pendente';
    if (statusLower === 'vencida') return 'Vencido';
    return status;
  }

  voltarParaDashboard() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.authService.logout();
  }

  voltarParaHome() {
    this.router.navigate(['/']);
  }

  // Métodos para gerenciar modais
  openCreateModal() {
    this.modalMode = 'create';
    this.selectedItem = null;
    this.showModal = true;
  }

  openEditModal(item: any) {
    this.modalMode = 'edit';
    this.selectedItem = { ...item };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedItem = null;
  }

  // Métodos CRUD para Usuários
  async deleteUsuario(id: number) {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return;

    try {
      const token = this.authService.getToken();
      if (!token) return;

      const response = await fetch(`https://cashinbox.shop/usuarios/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Usuário deletado com sucesso!');
        await this.loadUsuarios();
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao deletar usuário');
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao deletar usuário');
    }
  }

  async createUsuario(data: any) {
    try {
      const token = this.authService.getToken();
      if (!token) return;

      const response = await fetch('https://cashinbox.shop/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Usuário criado com sucesso!');
        this.closeModal();
        await this.loadUsuarios();
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao criar usuário');
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário');
    }
  }

  async updateUsuario(id: number, data: any) {
    try {
      const token = this.authService.getToken();
      if (!token) return;

      const response = await fetch(`https://cashinbox.shop/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Usuário atualizado com sucesso!');
        this.closeModal();
        await this.loadUsuarios();
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao atualizar usuário');
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário');
    }
  }

  // Métodos CRUD para Empresas
  async deleteEmpresa(id: number) {
    if (!confirm('Tem certeza que deseja deletar esta empresa? Todos os dados vinculados serão removidos.')) return;

    try {
      const token = this.authService.getToken();
      if (!token) return;

      const response = await fetch(`https://cashinbox.shop/empresas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Empresa deletada com sucesso!');
        await this.loadEmpresas();
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao deletar empresa');
      }
    } catch (error) {
      console.error('Erro ao deletar empresa:', error);
      alert('Erro ao deletar empresa');
    }
  }

  // Métodos CRUD para Planos
  async deletePlano(id: number) {
    if (!confirm('Tem certeza que deseja deletar este plano?')) return;

    try {
      const token = this.authService.getToken();
      if (!token) return;

      const response = await fetch(`https://cashinbox.shop/planos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Plano deletado com sucesso!');
        await this.loadPlanos();
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao deletar plano. Verifique se há assinaturas ativas vinculadas.');
      }
    } catch (error) {
      console.error('Erro ao deletar plano:', error);
      alert('Erro ao deletar plano');
    }
  }

  async createPlano(data: any) {
    try {
      const token = this.authService.getToken();
      if (!token) return;

      const response = await fetch('https://cashinbox.shop/planos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Plano criado com sucesso!');
        this.closeModal();
        await this.loadPlanos();
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao criar plano');
      }
    } catch (error) {
      console.error('Erro ao criar plano:', error);
      alert('Erro ao criar plano');
    }
  }

  async updatePlano(id: number, data: any) {
    try {
      const token = this.authService.getToken();
      if (!token) return;

      const response = await fetch(`https://cashinbox.shop/planos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Plano atualizado com sucesso!');
        this.closeModal();
        await this.loadPlanos();
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao atualizar plano');
      }
    } catch (error) {
      console.error('Erro ao atualizar plano:', error);
      alert('Erro ao atualizar plano');
    }
  }

  // Métodos para Assinaturas
  async deleteAssinatura(id: number) {
    if (!confirm('Tem certeza que deseja deletar esta assinatura?')) return;

    try {
      const token = this.authService.getToken();
      if (!token) return;

      const response = await fetch(`https://cashinbox.shop/assinaturas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Assinatura deletada com sucesso!');
        await this.loadAssinaturas();
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao deletar assinatura');
      }
    } catch (error) {
      console.error('Erro ao deletar assinatura:', error);
      alert('Erro ao deletar assinatura');
    }
  }

  async cancelarAssinatura(id: number) {
    if (!confirm('Tem certeza que deseja cancelar esta assinatura?')) return;

    try {
      const token = this.authService.getToken();
      if (!token) return;

      const response = await fetch(`https://cashinbox.shop/assinaturas/cancelar/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'Assinatura cancelada com sucesso!');
        await this.loadAssinaturas();
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao cancelar assinatura');
      }
    } catch (error) {
      console.error('Erro ao cancelar assinatura:', error);
      alert('Erro ao cancelar assinatura');
    }
  }

  async updateAssinatura(id: number, data: any) {
    try {
      const token = this.authService.getToken();
      if (!token) return;

      const response = await fetch(`https://cashinbox.shop/assinaturas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Assinatura atualizada com sucesso!');
        this.closeModal();
        await this.loadAssinaturas();
      } else {
        const error = await response.json();
        alert(error.message || 'Erro ao atualizar assinatura');
      }
    } catch (error) {
      console.error('Erro ao atualizar assinatura:', error);
      alert('Erro ao atualizar assinatura');
    }
  }

  getNomeEmpresaById(id: number): string {
    const empresa = this.empresas.find(e => e.id_empresa === id);
    return empresa?.nome_fantasia || `Empresa #${id}`;
  }

  getNomePlanoById(id: number): string {
    const plano = this.planos.find(p => p.id_plano === id);
    return plano?.nome || `Plano #${id}`;
  }
}
