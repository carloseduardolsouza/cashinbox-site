import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@Component({
  selector: 'app-plano-modal',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './plano-modal.html',
  styleUrls: ['./plano-modal.css']
})
export class PlanoModal {
  @Input() show = false;
  @Input() empresaId = 0;
  @Output() onCloseModal = new EventEmitter<void>();
  @Output() onPlanoContratado = new EventEmitter<void>();

  planos: Plano[] = [];
  isLoading = false;
  isLoadingPlanos = false;
  planoSelecionado: Plano | null = null;
  showConfirmacao = false;

  ngOnInit() {
    if (this.show) {
      this.carregarPlanos();
    }
  }

  ngOnChanges() {
    if (this.show && this.planos.length === 0) {
      this.carregarPlanos();
    }
  }

  async carregarPlanos() {
    this.isLoadingPlanos = true;
    try {
      const response = await fetch('https://cashinbox.shop/planos', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      
      if (!response.ok) {
        throw new Error('Erro ao carregar planos');
      }
      
      const data = await response.json();
      this.planos = Array.isArray(data.data) ? data.data : [];
    } catch (error) {
      console.error('Erro ao carregar planos:', error);
      alert('Erro ao carregar planos disponíveis. Tente novamente.');
    } finally {
      this.isLoadingPlanos = false;
    }
  }

  selecionarPlano(plano: Plano) {
    this.planoSelecionado = plano;
    this.showConfirmacao = true;
  }

  cancelarConfirmacao() {
    this.showConfirmacao = false;
    this.planoSelecionado = null;
  }

  async confirmarContratacao() {
    if (!this.planoSelecionado) return;

    this.isLoading = true;

    try {
      // Requisição para contratar o plano
      const response = await fetch('https://cashinbox.shop/assinaturas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_empresa: this.empresaId,
          id_plano: this.planoSelecionado.id_plano
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao contratar plano');
      }

      const data = await response.json();
      console.log('Plano contratado:', data);

      // Requisição GET para obter o link do boleto
      const boletoResponse = await fetch(
        `https://cashinbox.shop/assinaturas/${data.id_assinatura}/boleto`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!boletoResponse.ok) {
        throw new Error('Erro ao obter boleto');
      }

      const boletoData = await boletoResponse.json();
      
      // Abre o PDF do boleto em uma nova aba
      if (boletoData.boleto_url) {
        window.open(boletoData.boleto_url, '_blank');
      }

      alert('Plano contratado com sucesso! O boleto foi aberto em uma nova aba.');
      this.showConfirmacao = false;
      this.planoSelecionado = null;
      this.onPlanoContratado.emit();
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao contratar plano. Tente novamente.');
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
      'Mensal': '📅',
      'Trimestral': '📊',
      'Semestral': '💼',
      'Anual': '🏆',
      'Beta': '🚀'
    };
    return icons[nome] || '📦';
  }

  getCorPlano(nome: string): string {
    const colors: { [key: string]: string } = {
      'Mensal': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      'Trimestral': 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
      'Semestral': 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
      'Anual': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      'Beta': 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
    };
    return colors[nome] || 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)';
  }

  isPlanoPopular(nome: string): boolean {
    return nome === 'Semestral' || nome === 'Beta';
  }
}