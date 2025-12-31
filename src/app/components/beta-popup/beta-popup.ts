import { Component, EventEmitter, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beta-popup',
  imports: [CommonModule],
  template: `
    <div class="popup-overlay" (click)="close()" [@fadeIn]>
      <div class="popup-content" (click)="$event.stopPropagation()" [@slideUp]>
        <button class="popup-close" (click)="close()" aria-label="Fechar popup">✕</button>

        <div class="popup-icon">🚀</div>

        <h2>Plano Beta em Desenvolvimento</h2>

        <p class="popup-description">
          Seja um dos primeiros a testar nossa plataforma! Aproveite
          <strong>1 mês totalmente gratuito</strong> do plano Beta.
        </p>

        <div class="beta-features">
          <div class="beta-feature">
            <span class="check">✓</span>
            <span>Acesso completo a todas funcionalidades</span>
          </div>
          <div class="beta-feature">
            <span class="check">✓</span>
            <span>1 mês totalmente grátis</span>
          </div>
          <div class="beta-feature warning">
            <span class="warning-icon">⚠️</span>
            <span>Versão Beta sujeita a bugs e instabilidades</span>
          </div>
          <div class="beta-feature">
            <span class="check">✓</span>
            <span>Suporte prioritário para reportar problemas</span>
          </div>
          <div class="beta-feature">
            <span class="check">✓</span>
            <span>Influencie o desenvolvimento do produto</span>
          </div>
        </div>

        <div class="popup-buttons">
          <button class="btn-primary" (click)="accept()">Quero Participar do Beta</button>
          <button class="btn-secondary" (click)="close()">Talvez Depois</button>
        </div>

        <p class="popup-note">
          * Ao participar do Beta, você concorda em nos ajudar reportando bugs e fornecendo feedback
          para melhorar a plataforma.
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .popup-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
        animation: fadeIn 0.3s ease;
        backdrop-filter: blur(4px);
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .popup-content {
        background: #ffffff;
        border-radius: 20px;
        padding: 40px;
        max-width: 550px;
        width: 100%;
        position: relative;
        animation: slideUp 0.3s ease;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        max-height: 90vh;
        overflow-y: auto;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .popup-close {
        position: absolute;
        top: 16px;
        right: 16px;
        background: #f3f4f6;
        border: none;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        color: #6b7280;
      }

      .popup-close:hover {
        background: #e5e7eb;
        color: #374151;
        transform: rotate(90deg);
      }

      .popup-icon {
        font-size: 64px;
        text-align: center;
        margin-bottom: 20px;
        animation: bounce 1s ease-in-out infinite;
      }

      @keyframes bounce {
        0%,
        100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      h2 {
        font-size: 28px;
        font-weight: 700;
        color: #111827;
        text-align: center;
        margin-bottom: 16px;
      }

      .popup-description {
        font-size: 16px;
        color: #6b7280;
        text-align: center;
        line-height: 1.6;
        margin-bottom: 32px;
      }

      .popup-description strong {
        color: #10b981;
        font-weight: 600;
      }

      .beta-features {
        display: flex;
        flex-direction: column;
        gap: 14px;
        margin-bottom: 32px;
        padding: 24px;
        background: #f9fafb;
        border-radius: 12px;
      }

      .beta-feature {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 15px;
        color: #374151;
      }

      .beta-feature.warning {
        background: #fef3c7;
        padding: 12px;
        border-radius: 8px;
        margin: 8px 0;
        border-left: 4px solid #f59e0b;
      }

      .check {
        width: 24px;
        height: 24px;
        background: #10b981;
        color: #ffffff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: bold;
        flex-shrink: 0;
      }

      .warning-icon {
        font-size: 20px;
        flex-shrink: 0;
      }

      .popup-buttons {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 20px;
      }

      .btn-primary,
      .btn-secondary {
        width: 100%;
        padding: 14px 24px;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        border: none;
      }

      .btn-primary {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: #ffffff;
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
      }

      .btn-secondary {
        background: transparent;
        color: #6b7280;
        border: 2px solid #e5e7eb;
      }

      .btn-secondary:hover {
        background: #f9fafb;
        border-color: #d1d5db;
      }

      .popup-note {
        font-size: 12px;
        color: #9ca3af;
        text-align: center;
        line-height: 1.5;
        margin: 0;
      }

      @media (max-width: 640px) {
        .popup-content {
          padding: 32px 24px;
        }

        h2 {
          font-size: 24px;
        }

        .popup-icon {
          font-size: 48px;
        }

        .beta-features {
          padding: 20px 16px;
        }

        .beta-feature {
          font-size: 14px;
        }
      }
    `,
  ],
})
export class BetaPopup {
  @Output() onAccept = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  @HostListener('document:keydown', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  accept() {
    this.onAccept.emit();
  }

  close() {
    this.onClose.emit();
  }
}
