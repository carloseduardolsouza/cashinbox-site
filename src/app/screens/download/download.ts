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
  systemRequirements = {
    windows: [
      'Windows 7 (32-bit) ou superior',
      'Processador Intel Celeron ou equivalente',
      '2 GB de RAM',
      '500 MB de espaço livre em disco',
      'Conexão com internet',
    ],
  };

  selectedPlatform: 'windows' = 'windows';

  features = [
    {
      icon: '🔄',
      title: 'Sincronização Automática',
      description: 'Seus dados sempre atualizados e seguros na nuvem',
    },
    {
      icon: '📴',
      title: 'Modo Offline',
      description: 'Continue trabalhando mesmo sem conexão com internet',
    },
    {
      icon: '🔔',
      title: 'Notificações Push',
      description: 'Receba alertas importantes em tempo real',
    },
    {
      icon: '🎨',
      title: 'Interface Nativa',
      description: 'Design otimizado para Windows',
    },
    {
      icon: '⚡',
      title: 'Performance',
      description: 'Aplicativo rápido e otimizado para seu dispositivo',
    },
    {
      icon: '🔒',
      title: 'Segurança',
      description: 'Dados criptografados e protegidos localmente',
    },
  ];

  downloadApp() {
    const url =
      'https://release-assets.githubusercontent.com/github-production-release-asset/1107716256/323a0530-a0af-4fe8-910a-13f604bb44d5?sp=r&sv=2018-11-09&sr=b&spr=https&se=2025-12-30T22%3A12%3A26Z&rscd=attachment%3B+filename%3DCashInBox-Setup-1.5.0.exe&rsct=application%2Foctet-stream&skoid=96c2d410-5711-43a1-aedd-ab1947aa7ab0&sktid=398a6654-997b-47e9-b12b-9515b896b4de&skt=2025-12-30T21%3A11%3A57Z&ske=2025-12-30T22%3A12%3A26Z&sks=b&skv=2018-11-09&sig=qbD%2FIRgUfnUCx8k%2BsEANZ1xJzTPkZFlT%2FfKhj8WmhKA%3D&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmVsZWFzZS1hc3NldHMuZ2l0aHVidXNlcmNvbnRlbnQuY29tIiwia2V5Ijoia2V5MSIsImV4cCI6MTc2NzEzMjcxOCwibmJmIjoxNzY3MTI5MTE4LCJwYXRoIjoicmVsZWFzZWFzc2V0cHJvZHVjdGlvbi5ibG9iLmNvcmUud2luZG93cy5uZXQifQ.h9yW6hZNlrn3-wtCy_JqM3zZ9ZkcQBhnU9svvkqudn8&response-content-disposition=attachment%3B%20filename%3DCashInBox-Setup-1.5.0.exe&response-content-type=application%2Foctet-stream';

    const link = document.createElement('a');
    link.href = url;
    link.download = 'CashInBox-Setup.exe';
    link.click();
  }
}
