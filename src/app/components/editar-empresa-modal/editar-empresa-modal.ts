import { Component, Input, Output, EventEmitter, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

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
  enderecos?: Endereco[];
  assinaturas?: Assinatura[];
  assinatura?: Assinatura | null;
}

@Component({
  selector: 'app-editar-empresa-modal',
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-empresa-modal.html',
  styleUrl: './editar-empresa-modal.css',
  standalone: true,
})
export class EditarEmpresaModal {
  @Input() show: boolean = false;
  @Input() empresa: Empresa | null = null;
  @Output() onCloseModal = new EventEmitter<void>();

  private isBrowser: boolean;

  constructor(
    private authService: AuthService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  closeModal() {
    this.onCloseModal.emit();
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

  getEnderecoPrincipal(): Endereco | null {
    if (this.empresa && this.empresa.enderecos && this.empresa.enderecos.length > 0) {
      return this.empresa.enderecos[0];
    }
    return null;
  }
}
