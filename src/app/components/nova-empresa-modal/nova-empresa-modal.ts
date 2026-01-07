import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-nova-empresa-modal',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './nova-empresa-modal.html',
  styleUrl: './nova-empresa-modal.css',
})
export class NovaEmpresaModal {
  @Input() show = false;
  @Input() usuarioId = 0;
  @Output() onCloseModal = new EventEmitter<void>();
  @Output() onEmpresaCadastrada = new EventEmitter<void>();

  isSubmitting = false;

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
    cep: '',
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
    { sigla: 'TO', nome: 'Tocantins' },
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
    'Outro',
  ];

  onClose() {
    this.resetForm();
    this.onCloseModal.emit();
  }

  resetForm() {
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
      cep: '',
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
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else if (value.length <= 14) {
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }

    this.novaEmpresa.cpf_cnpj = value;
  }

  async submitNovaEmpresa() {
    if (
      !this.novaEmpresa.user_login ||
      !this.novaEmpresa.senha ||
      !this.novaEmpresa.confirmarSenha
    ) {
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

    if (
      !this.novaEmpresa.estado ||
      !this.novaEmpresa.cidade ||
      !this.novaEmpresa.bairro ||
      !this.novaEmpresa.rua ||
      !this.novaEmpresa.cep
    ) {
      alert('Por favor, preencha todos os campos de endereço obrigatórios!');
      return;
    }

    this.isSubmitting = true;

    const empresaData: NovaEmpresaData = {
      usuario: this.usuarioId,
      user_login: this.novaEmpresa.user_login,
      senha: this.novaEmpresa.senha,
      endereco: {
        pais: this.novaEmpresa.pais,
        estado: this.novaEmpresa.estado,
        cidade: this.novaEmpresa.cidade,
        bairro: this.novaEmpresa.bairro,
        rua: this.novaEmpresa.rua,
        complemento: this.novaEmpresa.complemento,
        cep: this.novaEmpresa.cep.replace(/\D/g, ''),
      },
      nome_fantasia: this.novaEmpresa.nome_fantasia,
      razao_social: this.novaEmpresa.razao_social,
      cpf_cnpj: this.novaEmpresa.cpf_cnpj.replace(/\D/g, ''),
      telefone: this.novaEmpresa.telefone.replace(/\D/g, ''),
      inscricao_estadual: this.novaEmpresa.inscricao_estadual || '0',
      segmento: this.novaEmpresa.segmento,
    };

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
      this.onEmpresaCadastrada.emit();
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao cadastrar empresa. Tente novamente.');
    } finally {
      this.isSubmitting = false;
    }
  }
}
