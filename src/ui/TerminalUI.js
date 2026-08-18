export class TerminalUI {
  constructor(cameraController) {
    this.cameraController = cameraController;

    this.crtModal = document.getElementById('crt-modal');
    this.btnCloseCrt = document.getElementById('btn-close-crt');
    this.tabButtons = document.querySelectorAll('.crt-tab-btn');
    this.tabContents = document.querySelectorAll('.crt-tab-content');

    this.itemModal = document.getElementById('item-modal');
    this.itemModalIcon = document.getElementById('item-modal-icon');
    this.itemModalTitle = document.getElementById('item-modal-title');
    this.itemModalDesc = document.getElementById('item-modal-desc');
    this.itemModalExtra = document.getElementById('item-modal-extra');
    this.btnCloseItemModal = document.getElementById('btn-close-item-modal');

    this.initTabs();
    this.initEvents();
  }

  initTabs() {
    this.tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');

        // Deactivate all
        this.tabButtons.forEach((b) => b.classList.remove('active'));
        this.tabContents.forEach((c) => c.classList.remove('active'));

        // Activate selected
        btn.classList.add('active');
        const contentEl = document.getElementById(`tab-${targetTab}`);
        if (contentEl) {
          contentEl.classList.add('active');
        }
      });
    });
  }

  initEvents() {
    if (this.btnCloseCrt) {
      this.btnCloseCrt.addEventListener('click', () => {
        this.closeCRTModal();
      });
    }

    if (this.btnCloseItemModal) {
      this.btnCloseItemModal.addEventListener('click', () => {
        this.closeItemModal();
      });
    }

    const contactForm = document.getElementById('contact-form');
    const statusMsg = document.getElementById('contact-status-msg');
    const btnSend = document.getElementById('btn-send-raven');

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameVal = document.getElementById('sender-name')?.value || 'Wędrowiec';

        if (btnSend) {
          btnSend.disabled = true;
          btnSend.innerHTML = '<span>🦅 WYPUSZCZANIE KRUKA...</span>';
        }

        setTimeout(() => {
          if (statusMsg) {
            statusMsg.classList.remove('hidden');
            statusMsg.innerHTML = `🦅 <strong>[KRUK POCZTOWY WYSTARTOWAŁ!]</strong><br/>Dziękuję ${nameVal}! Twoja wiadomość odleciała przez mroczny las do Czarodzieja Lolq. Odpowiedź zostanie przesłana na Twój adres e-mail.`;
          }
          if (btnSend) {
            btnSend.disabled = false;
            btnSend.innerHTML = '<span>🦅 WYŚLIJ PONOWNIE</span>';
          }
          contactForm.reset();
        }, 800);
      });
    }
  }

  openCRTModal() {
    if (this.crtModal) {
      this.crtModal.classList.remove('hidden');
    }
  }

  hideCRTModal() {
    if (this.crtModal) {
      this.crtModal.classList.add('hidden');
    }
  }

  closeCRTModal() {
    this.hideCRTModal();
    if (this.cameraController) {
      this.cameraController.zoomToOverview();
    }
    const cameraLabel = document.getElementById('camera-view-label');
    if (cameraLabel) {
      cameraLabel.textContent = 'SKUPIENIE: LAS';
    }
  }

  openItemModal(data) {
    if (!this.itemModal) return;
    this.itemModalIcon.textContent = data.icon || '🔮';
    this.itemModalTitle.textContent = data.name || 'Przedmiot';
    this.itemModalDesc.textContent = data.desc || '';
    this.itemModalExtra.textContent = data.extraInfo || '';

    this.itemModal.classList.remove('hidden');
  }

  closeItemModal() {
    if (this.itemModal) {
      this.itemModal.classList.add('hidden');
    }
    if (this.cameraController && this.cameraController.mode === 'left-monitor') {
      this.cameraController.zoomToOverview();
      const cameraLabel = document.getElementById('camera-view-label');
      if (cameraLabel) {
        cameraLabel.textContent = 'SKUPIENIE: LAS';
      }
    }
  }
}
