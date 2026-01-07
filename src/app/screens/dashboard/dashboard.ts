import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  assinatura: Assinatura;
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

interface NovaEmpresaData {
  usuario: number;
  user_login: string;
  senha: string;
  endereco: {
    pais: string;
    estado: string;
    cidade: string;
    bairro: string;
    rua: string;
    complemento: string;
    cep: string;
  };
  nome_fantasia: string;
  razao_social: string;
  cpf_cnpj: string;
  telefone: string;
  inscricao_estadual: string;
  segmento: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, FormsModule],
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
  isSubmittingEmpresa = false;
  
  // Dados do formulário
  novaEmpresa = {
    user_login: '',
    senha: '',
    confirmarSenha: '',
    nome_fantasia: '',
    razao_social: '',
    cpf_cnpj: '',
    telefone: '',
    inscricao_estadual: '',
    segmento: '',
    pais: 'BR',
    estado: '',
    cidade: '',
    bairro: '',
    rua: '',
    complemento: '',
    cep: ''
  };

  estados = [
    { sigla: 'AC', nome: 'Acre' },
    { sigla: 'AL', nome: 'Alagoas' },
    { sigla: 'AP', nome: 'Amapá' },
    { sigla: 'AM', nome: 'Amazonas' },
    { sigla: 'BA', nome: 'Bahia' },
    { sigla: 'CE', nome: 'Ceará' },
    { sigla: 'DF', nome: 'Distrito Federal' },
    { sigla: 'ES', nome: 'Espírito Santo' },
    { sigla: 'GO', nome: 'Goiás' },
    { sigla: 'MA', nome: 'Maranhão' },
    { sigla: 'MT', nome: 'Mato Grosso' },
    { sigla: 'MS', nome: 'Mato Grosso do Sul' },
    { sigla: 'MG', nome: 'Minas Gerais' },
    { sigla: 'PA', nome: 'Pará' },
    { sigla: 'PB', nome: 'Paraíba' },
    { sigla: 'PR', nome: 'Paraná' },
    { sigla: 'PE', nome: 'Pernambuco' },
    { sigla: 'PI', nome: 'Piauí' },
    { sigla: 'RJ', nome: 'Rio de Janeiro' },
    { sigla: 'RN', nome: 'Rio Grande do Norte' },
    { sigla: 'RS', nome: 'Rio Grande do Sul' },
    { sigla: 'RO', nome: 'Rondônia' },
    { sigla: 'RR', nome: 'Roraima' },
    { sigla: 'SC', nome: 'Santa Catarina' },
    { sigla: 'SP', nome: 'São Paulo' },
    { sigla: 'SE', nome: 'Sergipe' },
    { sigla: 'TO', nome: 'Tocantins' }
  ];

  segmentos = [
    'Farmácia',
    'Supermercado',
    'Salão de Beleza',
    'Barbearia',
    'Restaurante',
    'Lanchonete',
    'Oficina Mecânica',
    'Academia',
    'Pet Shop',
    'Clínica Médica',
    'Loja de Roupas',
    'Loja de Calçados',
    'Padaria',
    'Confeitaria',
    'Móveis e Eletrodomésticos',
    'Informática',
    'Papelaria',
    'Autopeças',
    'Outro'
  ];

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
        this.empresas = JSON.parse(empresasData);
        
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

  // Funções da modal
  openAddEmpresaModal() {
    this.showAddEmpresaModal = true;
    this.resetNovaEmpresaForm();
  }

  closeAddEmpresaModal() {
    this.showAddEmpresaModal = false;
    this.resetNovaEmpresaForm();
  }

  resetNovaEmpresaForm() {
    this.novaEmpresa = {
      user_login: '',
      senha: '',
      confirmarSenha: '',
      nome_fantasia: '',
      razao_social: '',
      cpf_cnpj: '',
      telefone: '',
      inscricao_estadual: '',
      segmento: '',
      pais: 'BR',
      estado: '',
      cidade: '',
      bairro: '',
      rua: '',
      complemento: '',
      cep: ''
    };
  }

  formatTelefoneModal(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
      value = value.replace(/(\d)(\d{4})$/, '$1-$2');
      this.novaEmpresa.telefone = value;
    }
  }

  formatCepModal(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 8) {
      value = value.replace(/^(\d{5})(\d)/, '$1-$2');
      this.novaEmpresa.cep = value;
    }
  }

  formatCpfCnpjModal(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      // CPF
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else if (value.length <= 14) {
      // CNPJ
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    
    this.novaEmpresa.cpf_cnpj = value;
  }

  async submitNovaEmpresa() {
    // Validações
    if (!this.novaEmpresa.user_login || !this.novaEmpresa.senha || !this.novaEmpresa.confirmarSenha) {
      alert('Por favor, preencha o login e senha!');
      return;
    }

    if (this.novaEmpresa.senha !== this.novaEmpresa.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    if (this.novaEmpresa.senha.length < 6) {
      alert('A senha deve ter no mínimo 6 caracteres!');
      return;
    }

    if (!this.novaEmpresa.nome_fantasia || !this.novaEmpresa.razao_social) {
      alert('Por favor, preencha o nome fantasia e razão social!');
      return;
    }

    if (!this.novaEmpresa.cpf_cnpj || !this.novaEmpresa.telefone) {
      alert('Por favor, preencha o CPF/CNPJ e telefone!');
      return;
    }

    if (!this.novaEmpresa.segmento) {
      alert('Por favor, selecione um segmento!');
      return;
    }

    if (!this.novaEmpresa.estado || !this.novaEmpresa.cidade || !this.novaEmpresa.bairro || !this.novaEmpresa.rua || !this.novaEmpresa.cep) {
      alert('Por favor, preencha todos os campos de endereço obrigatórios!');
      return;
    }

    this.isSubmittingEmpresa = true;

    // Montar o JSON conforme especificado
    const empresaData: NovaEmpresaData = {
      usuario: this.usuario.id_usuario,
      user_login: this.novaEmpresa.user_login,
      senha: this.novaEmpresa.senha,
      endereco: {
        pais: this.novaEmpresa.pais,
        estado: this.novaEmpresa.estado,
        cidade: this.novaEmpresa.cidade,
        bairro: this.novaEmpresa.bairro,
        rua: this.novaEmpresa.rua,
        complemento: this.novaEmpresa.complemento,
        cep: this.novaEmpresa.cep.replace(/\D/g, '')
      },
      nome_fantasia: this.novaEmpresa.nome_fantasia,
      razao_social: this.novaEmpresa.razao_social,
      cpf_cnpj: this.novaEmpresa.cpf_cnpj.replace(/\D/g, ''),
      telefone: this.novaEmpresa.telefone.replace(/\D/g, ''),
      inscricao_estadual: this.novaEmpresa.inscricao_estadual || '0',
      segmento: this.novaEmpresa.segmento
    };

    console.log('JSON da nova empresa:', JSON.stringify(empresaData, null, 2));

    try {
      const response = await fetch('https://cashinbox.shop/empresas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empresaData),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar empresa');
      }

      const result = await response.json();
      console.log('Empresa cadastrada:', result);

      alert('Empresa cadastrada com sucesso!');
      
      // Recarregar as empresas
      await this.reloadEmpresas();
      
      this.closeAddEmpresaModal();
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao cadastrar empresa. Tente novamente.');
    } finally {
      this.isSubmittingEmpresa = false;
    }
  }

  async reloadEmpresas() {
    try {
      const response = await fetch(`https://cashinbox.shop/login/userUpdate` , {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (response.ok) {
        const empresas = await response.json();
        this.empresas = empresas;
        localStorage.setItem('empresasData', JSON.stringify(empresas));
        
        if (empresas.length > 0 && !this.empresaSelecionada) {
          this.empresaSelecionada = empresas[0];
        }
      }
    } catch (error) {
      console.error('Erro ao recarregar empresas:', error);
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

  navegarParaPlanos() {
    this.router.navigate(['/precos']);
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

  renovarPlano() {
    console.log('Renovar plano da empresa:', this.empresaSelecionada);
    this.navegarParaPlanos();
  }

  configurarModulo(modulo: string) {
    console.log('Configurar módulo:', modulo);
    alert(`Configuração do módulo ${modulo} em desenvolvimento!`);
  }
}