import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

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

interface NovaAssinaturaResponse {
  id_assinatura: number;
  status: string;
  expira_em: string;
  fidelidade_fim: string | null;
  created_at: string;
  updated_at: string;
  id_plano: number;
  id_empresa: number;
  boleto: string;
}

@Component({
  selector: 'app-plano-modal',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './plano-modal.html',
  styleUrls: ['./plano-modal.css'],
})
export class PlanoModal implements OnInit, OnChanges {
  @Input() show = false;
  @Input() empresaId = 0;
  @Output() onCloseModal = new EventEmitter<void>();
  @Output() onPlanoContratado = new EventEmitter<void>();

  planos: Plano[] = [];
  isLoading = false;
  isLoadingPlanos = false;
  planoSelecionado: Plano | null = null;
  showConfirmacao = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    console.log('PlanoModal initialized', { show: this.show, empresaId: this.empresaId });
    this.carregarPlanos();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show'] && changes['show'].currentValue === true && this.planos.length === 0) {
      console.log('Modal opened, loading planos...');
      this.carregarPlanos();
    }
  }

  async carregarPlanos() {
    this.isLoadingPlanos = true;
    console.log('Starting to load planos...');

    try {
      const response = await fetch('https://cashinbox.shop/planos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error('Erro ao carregar planos');
      }

      const data = await response.json();

      console.log('Data received:', data);

      if (data && data.data && Array.isArray(data.data)) {
        this.planos = data.data.slice(0, -2);
        console.log('Planos loaded successfully:', this.planos);
      } else if (Array.isArray(data)) {
        this.planos = data;
        console.log('Planos loaded successfully (direct array):', this.planos);
      } else {
        console.error('Unexpected data format:', data);
        this.planos = [];
      }
    } catch (error) {
      console.error('Erro ao carregar planos:', error);
      alert('Erro ao carregar planos disponíveis. Tente novamente.');
      this.planos = [];
    } finally {
      this.isLoadingPlanos = false;
      console.log(
        'Finished loading planos. isLoadingPlanos:',
        this.isLoadingPlanos,
        'planos count:',
        this.planos.length
      );
    }
  }

  selecionarPlano(plano: Plano) {
    console.log('Plano selecionado:', plano);
    this.planoSelecionado = plano;
    this.showConfirmacao = true;
  }

  cancelarConfirmacao() {
    this.showConfirmacao = false;
    this.planoSelecionado = null;
  }

  async confirmarContratacao() {
    if (!this.planoSelecionado) return;

    // Verificar se está no browser
    if (!this.isBrowser) {
      console.error('Não está executando no browser');
      return;
    }

    // Obter o token do localStorage
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Você precisa estar logado para contratar um plano. Redirecionando para o login...');
      this.close();
      window.location.href = '/login';
      return;
    }

    this.isLoading = true;

    try {
      // Requisição POST para contratar o plano
      const response = await fetch('https://cashinbox.shop/site/novaAssinatura', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_plano: this.planoSelecionado.id_plano,
          id_empresa: this.empresaId,
        }),
      });

      // Verificar se houve erro na resposta
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        
        if (response.status === 401) {
          throw new Error('Sessão expirada. Por favor, faça login novamente.');
        } else if (response.status === 400) {
          throw new Error(errorData?.error || errorData?.message || 'Dados inválidos para contratação do plano.');
        } else if (response.status === 404) {
          throw new Error('Plano ou empresa não encontrado.');
        } else if (response.status === 500) {
          throw new Error('Erro no servidor. Tente novamente mais tarde.');
        } else {
          throw new Error(errorData?.error || errorData?.message || 'Erro ao contratar plano.');
        }
      }

      const data: NovaAssinaturaResponse = await response.json();
      console.log('Plano contratado:', data);

      // Verificar se o boleto foi retornado
      if (!data.boleto) {
        throw new Error('Boleto não foi gerado. Entre em contato com o suporte.');
      }

      // CORREÇÃO 2: Abrir o PDF do boleto em uma nova aba (sem await)
      window.open(data.boleto, '_blank', 'noopener,noreferrer');

      alert('Plano contratado com sucesso! O boleto foi aberto em uma nova aba.');
      
      this.showConfirmacao = false;
      this.planoSelecionado = null;
      this.onPlanoContratado.emit();
      
    } catch (error: any) {
      console.error('Erro ao contratar plano:', error);
      
      // Tratamento de erros específicos
      if (error.message.includes('Sessão expirada') || error.message.includes('login')) {
        alert(error.message);
        localStorage.clear();
        window.location.href = '/login';
      } else {
        alert(error.message || 'Erro ao contratar plano. Tente novamente.');
      }
    } finally {
      this.isLoading = false;
    }
  }

  close() {
    this.showConfirmacao = false;
    this.planoSelecionado = null;
    this.onCloseModal.emit();
  }

  getValorFormatado(valor: string): string {
    return parseFloat(valor).toFixed(2);
  }

  getDuracaoTexto(dias: number): string {
    if (dias === 30) return 'Mensal';
    if (dias === 90) return 'Trimestral';
    if (dias === 180) return 'Semestral';
    if (dias === 365) return 'Anual';
    return `${dias} dias`;
  }

  getValorMensal(plano: Plano): string {
    const valor = parseFloat(plano.valor);
    const meses = plano.duracao_dias / 30;
    return (valor / meses).toFixed(2);
  }

  getIconePlano(nome: string): string {
    const icons: { [key: string]: string } = {
      Mensal: '📅',
      Trimestral: '📊',
      Semestral: '💼',
      Anual: '🏆',
      Beta: '🚀',
    };
    return icons[nome] || '📦';
  }

  getCorPlano(nome: string): string {
    const colors: { [key: string]: string } = {
      Mensal: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      Trimestral: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      Semestral: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
      Anual: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      Beta: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
    };
    return colors[nome] || 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
  }

  isPlanoPopular(nome: string): boolean {
    return nome === 'Semestral' || nome === 'Beta';
  }
}