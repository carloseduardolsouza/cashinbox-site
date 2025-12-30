import { Component } from '@angular/core';
import { NavHeader } from '../../components/nav-header/nav-header';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-download',
  imports: [NavHeader, CommonModule],
  templateUrl: './download.html',
  styleUrl: './download.css',
})
export class Download {
  apps = [
    {
      platform: 'Windows',
      icon: '🪟',
      version: 'v2.5.1',
      size: '85 MB',
      requirements: 'Windows 10 ou superior',
      downloadUrl: '#',
      color: '#0078d4'
    },
    {
      platform: 'macOS',
      icon: '🍎',
      version: 'v2.5.1',
      size: '92 MB',
      requirements: 'macOS 11.0 ou superior',
      downloadUrl: '#',
      color: '#000000'
    },
    {
      platform: 'Linux',
      icon: '🐧',
      version: 'v2.5.1',
      size: '78 MB',
      requirements: 'Ubuntu 20.04 ou superior',
      downloadUrl: '#',
      color: '#dd4814'
    },
    {
      platform: 'iOS',
      icon: '📱',
      version: 'v2.5.0',
      size: '65 MB',
      requirements: 'iOS 14.0 ou superior',
      downloadUrl: '#',
      color: '#007aff',
      storeLink: 'App Store'
    },
    {
      platform: 'Android',
      icon: '🤖',
      version: 'v2.5.0',
      size: '58 MB',
      requirements: 'Android 8.0 ou superior',
      downloadUrl: '#',
      color: '#3ddc84',
      storeLink: 'Google Play'
    }
  ];

  features = [
    {
      icon: '🔄',
      title: 'Sincronização Automática',
      description: 'Seus dados sempre atualizados em todos os dispositivos'
    },
    {
      icon: '📴',
      title: 'Modo Offline',
      description: 'Continue trabalhando mesmo sem conexão com internet'
    },
    {
      icon: '🔔',
      title: 'Notificações Push',
      description: 'Receba alertas importantes em tempo real'
    },
    {
      icon: '🎨',
      title: 'Interface Nativa',
      description: 'Design otimizado para cada plataforma'
    },
    {
      icon: '⚡',
      title: 'Performance',
      description: 'Aplicativo rápido e otimizado para seu dispositivo'
    },
    {
      icon: '🔒',
      title: 'Segurança',
      description: 'Dados criptografados e protegidos localmente'
    }
  ];

  systemRequirements = {
    windows: [
      'Windows 10 (64-bit) ou superior',
      'Processador Intel Core i3 ou equivalente',
      '4 GB de RAM',
      '500 MB de espaço livre em disco',
      'Conexão com internet'
    ],
    mac: [
      'macOS 11.0 Big Sur ou superior',
      'Processador Intel ou Apple Silicon (M1/M2)',
      '4 GB de RAM',
      '500 MB de espaço livre em disco',
      'Conexão com internet'
    ],
    mobile: [
      'iOS 14.0+ ou Android 8.0+',
      '2 GB de RAM mínimo',
      '200 MB de espaço livre',
      'Conexão 3G/4G/5G ou Wi-Fi'
    ]
  };

  selectedPlatform: 'windows' | 'mac' | 'mobile' = 'windows';

  downloadApp(platform: string) {
    console.log(`Downloading ${platform} app`);
    // Implementar lógica de download
  }

  selectPlatform(platform: 'windows' | 'mac' | 'mobile') {
    this.selectedPlatform = platform;
  }
}