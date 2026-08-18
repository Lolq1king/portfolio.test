import { SceneManager } from './scene/SceneManager.js';
import { ForestEnvironment } from './scene/ForestEnvironment.js';
import { WoodenDesk } from './scene/WoodenDesk.js';
import { ComputerCRT } from './scene/ComputerCRT.js';
import { DeskObjectRegistry } from './scene/DeskObjectRegistry.js';
import { Campfire } from './scene/Campfire.js';
import { DarkCastle } from './scene/DarkCastle.js';
import { Bookshelf } from './scene/Bookshelf.js';

import { CameraController } from './utils/CameraController.js';
import { RaycastInteraction } from './utils/RaycastInteraction.js';
import { TerminalUI } from './ui/TerminalUI.js';
import { AudioController } from './ui/AudioController.js';

class Application {
  constructor() {
    this.container = document.getElementById('canvas-container');

    // 1. Initialize Scene Engine & Shaders
    this.sceneManager = new SceneManager(this.container);

    // 2. Build 3D World Components
    this.forest = new ForestEnvironment(this.sceneManager.scene);
    this.castle = new DarkCastle(this.sceneManager.scene);
    this.desk = new WoodenDesk(this.sceneManager.scene);
    this.computer = new ComputerCRT(this.sceneManager.scene);
    this.campfire = new Campfire(this.sceneManager.scene);
    this.bookshelf = new Bookshelf(this.sceneManager.scene);
    this.deskRegistry = new DeskObjectRegistry(this.sceneManager.scene, this.sceneManager);

    // 3. Combine Interactive Objects
    const allInteractiveObjects = [
      ...this.computer.interactiveObjects,
      ...this.deskRegistry.getInteractiveObjects(),
      ...this.bookshelf.interactiveObjects,
      ...this.forest.getInteractiveObjects()
    ];

    // 4. Initialize Camera & Interaction Controllers
    this.cameraController = new CameraController(
      this.sceneManager.camera,
      this.sceneManager.renderer.domElement
    );

    this.terminalUI = new TerminalUI(this.cameraController);
    this.audioController = new AudioController();

    this.raycaster = new RaycastInteraction(
      this.sceneManager.camera,
      this.sceneManager.scene,
      this.sceneManager.renderer.domElement,
      (clickedObject) => this.handleObjectClick(clickedObject)
    );
    this.raycaster.setInteractiveObjects(allInteractiveObjects);

    this.initHUDControls();

    // 5. Start Render Loop
    this.clock = new THREE_Clock();
    this.animate();
  }

  handleObjectClick(object) {
    const data = object.userData;
    if (!data) return;

    if (data.id === 'computer-crt') {
      if (this.cameraController.mode !== 'monitor') {
        // 1st click: Zoom camera directly to central CRT monitor screen
        this.cameraController.zoomToMonitor();
        const cameraLabel = document.getElementById('camera-view-label');
        if (cameraLabel) cameraLabel.textContent = 'SKUPIENIE: EKRAN LOGOWANIA CRT';

        const toast = document.getElementById('instruction-toast');
        if (toast) {
          toast.querySelector('p span').textContent = 'Przybliżono na Ekran Logowania CRT! Kliknij w przycisk [ 🔑 ZALOGUJ SIĘ ], aby otworzyć Terminal Czarodzieja.';
        }
      } else {
        // 2nd click (while zoomed in): Enter wizard terminal modal!
        this.terminalUI.openCRTModal();
      }
    } else if (data.id === 'computer-left-warzone') {
      if (this.cameraController.mode === 'left-monitor') {
        // Re-clicking left monitor while zoomed in returns camera back to initial overview state!
        this.cameraController.zoomToOverview();
        const cameraLabel = document.getElementById('camera-view-label');
        if (cameraLabel) cameraLabel.textContent = 'SKUPIENIE: LAS';
      } else {
        // Zoom camera directly to left gaming monitor
        this.cameraController.zoomToLeftMonitor();
        const cameraLabel = document.getElementById('camera-view-label');
        if (cameraLabel) cameraLabel.textContent = 'SKUPIENIE: MONITOR WARZONE';
      }
    } else if (
      data.id === 'bookshelf-frame' ||
      data.id === 'bookshelf-main-header' ||
      (data.id && data.id.startsWith('shelf-series-tag-')) ||
      (data.id && (data.id.startsWith('szaman-') || data.id.startsWith('przeistoczeni-') || data.id.startsWith('levelup-') || data.id.startsWith('dungeon-') || data.id.startsWith('primal-') || data.id.startsWith('wiedzmin-') || data.id.startsWith('harry-') || data.id.startsWith('gwiezdny-')))
    ) {
      const cameraLabel = document.getElementById('camera-view-label');
      const isBook = data.id && (data.id.startsWith('szaman-') || data.id.startsWith('przeistoczeni-') || data.id.startsWith('levelup-') || data.id.startsWith('dungeon-') || data.id.startsWith('primal-') || data.id.startsWith('wiedzmin-') || data.id.startsWith('harry-') || data.id.startsWith('gwiezdny-'));

      // If camera is not yet zoomed in to the bookshelf, first zoom in!
      if (this.cameraController.mode !== 'bookshelf') {
        this.cameraController.zoomToBookshelf();
        if (cameraLabel) cameraLabel.textContent = 'SKUPIENIE: BIBLIOTECZKA';
        
        const toast = document.getElementById('instruction-toast');
        if (toast) {
          toast.querySelector('p span').textContent = 'Przybliżono widok na Bibliotekę Czarodzieja! Kliknij w książkę, aby zobaczyć opis, lub ponownie w regał, aby wrócić.';
        }
      } else {
        // If already in bookshelf close-up mode:
        if (isBook) {
          // Clicking an individual book opens its detail modal
          this.terminalUI.openItemModal(data);
        } else {
          // Clicking the bookshelf frame, header or shelf tag zooms back out to overview mode!
          this.cameraController.zoomToOverview();
          if (cameraLabel) cameraLabel.textContent = 'SKUPIENIE: LAS';

          const toast = document.getElementById('instruction-toast');
          if (toast) {
            toast.querySelector('p span').textContent = 'Powrócono do pełnego widoku panoramy lasu.';
          }
        }
      }
    } else {
      // Execute item specific action if defined (e.g., lamp atmosphere color change)
      if (typeof data.action === 'function') {
        const msg = data.action();
        if (msg) {
          const toast = document.getElementById('instruction-toast');
          if (toast) toast.querySelector('p span').textContent = msg;
        }
        return;
      }
      // Open generic detail modal for other desk items
      this.terminalUI.openItemModal(data);
    }
  }

  initHUDControls() {
    // Pixel Scale Toggle Button
    const btnPixel = document.getElementById('btn-toggle-pixel');
    const pixelLabel = document.getElementById('pixel-scale-label');
    if (btnPixel && pixelLabel) {
      btnPixel.addEventListener('click', () => {
        const newLabel = this.sceneManager.togglePixelScale();
        pixelLabel.textContent = newLabel;
      });
    }

    // Camera View Toggle Button (Cycles: Las -> Ekran CRT -> Biblioteczka -> Las)
    const btnCamera = document.getElementById('btn-camera-view');
    const cameraLabel = document.getElementById('camera-view-label');
    if (btnCamera && cameraLabel) {
      btnCamera.addEventListener('click', () => {
        const newMode = this.cameraController.toggleView(
          () => this.terminalUI.openCRTModal(),
          () => this.terminalUI.closeCRTModal(),
          () => this.terminalUI.closeCRTModal()
        );

        if (newMode === 'monitor') {
          cameraLabel.textContent = 'SKUPIENIE: EKRAN CRT';
        } else if (newMode === 'bookshelf') {
          cameraLabel.textContent = 'SKUPIENIE: BIBLIOTECZKA';
        } else {
          cameraLabel.textContent = 'SKUPIENIE: LAS';
        }
      });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = performance.now() * 0.001;

    // Update particles, fireflies, campfire, castle and camera
    this.forest.update(time);
    this.campfire.update(time);
    this.castle.update(time);
    this.cameraController.update();
    this.sceneManager.render(time);
  }
}

// Clock polyfill helper for time
class THREE_Clock {
  constructor() {
    this.startTime = performance.now();
  }
  getElapsedTime() {
    return (performance.now() - this.startTime) * 0.001;
  }
}

// Launch app when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  new Application();
});
