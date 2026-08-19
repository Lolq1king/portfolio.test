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
import { i18n } from './utils/i18n.js';

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
        if (cameraLabel) cameraLabel.textContent = i18n.t('btn-camera-crt');

        const toast = document.getElementById('instruction-toast');
        if (toast) {
          toast.querySelector('p span').textContent = i18n.t('toast-zoom-crt');
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
        if (cameraLabel) cameraLabel.textContent = i18n.t('btn-camera-las');
      } else {
        // Zoom camera directly to left gaming monitor
        this.cameraController.zoomToLeftMonitor();
        const cameraLabel = document.getElementById('camera-view-label');
        if (cameraLabel) cameraLabel.textContent = i18n.t('btn-camera-warzone');
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
        if (cameraLabel) cameraLabel.textContent = i18n.t('btn-camera-book');
        
        const toast = document.getElementById('instruction-toast');
        if (toast) {
          toast.querySelector('p span').textContent = i18n.t('toast-zoom-book');
        }
      } else {
        // If already in bookshelf close-up mode:
        if (isBook) {
          // Clicking an individual book opens its detail modal
          this.terminalUI.openItemModal(data);
        } else {
          // Clicking the bookshelf frame, header or shelf tag zooms back out to overview mode!
          this.cameraController.zoomToOverview();
          if (cameraLabel) cameraLabel.textContent = i18n.t('btn-camera-las');

          const toast = document.getElementById('instruction-toast');
          if (toast) {
            toast.querySelector('p span').textContent = i18n.t('toast-zoom-out');
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
    // Language Toggle Button
    const btnLang = document.getElementById('btn-toggle-lang');
    const langLabel = document.getElementById('lang-label');
    if (btnLang && langLabel) {
      langLabel.textContent = i18n.lang.toUpperCase();
      btnLang.addEventListener('click', () => {
        i18n.toggleLang();
        langLabel.textContent = i18n.lang.toUpperCase();
      });
    }
    i18n.updateDOM();

    // Pixel Scale Toggle Button
    const btnPixel = document.getElementById('btn-toggle-pixel');
    const pixelLabel = document.getElementById('pixel-scale-label');
    if (btnPixel && pixelLabel) {
      btnPixel.addEventListener('click', () => {
        const newLabel = this.sceneManager.togglePixelScale();
        pixelLabel.textContent = newLabel;
      });
    }

    // Camera View Toggle Button (Cycles: Las -> Ekran Logowania CRT -> Biblioteczka -> Las)
    const btnCamera = document.getElementById('btn-camera-view');
    const cameraLabel = document.getElementById('camera-view-label');
    if (btnCamera && cameraLabel) {
      btnCamera.addEventListener('click', () => {
        const newMode = this.cameraController.toggleView(
          null, // Do NOT automatically open modal; show CRT login screen zoom first!
          () => this.terminalUI.hideCRTModal(),
          () => this.terminalUI.hideCRTModal()
        );

        const toast = document.getElementById('instruction-toast');

        if (newMode === 'monitor') {
          cameraLabel.textContent = i18n.t('btn-camera-crt');
          if (toast) {
            toast.querySelector('p span').textContent = i18n.t('toast-zoom-crt');
          }
        } else if (newMode === 'bookshelf') {
          cameraLabel.textContent = i18n.t('btn-camera-book');
          if (toast) {
            toast.querySelector('p span').textContent = i18n.t('toast-zoom-book');
          }
        } else {
          cameraLabel.textContent = i18n.t('btn-camera-las');
          if (toast) {
            toast.querySelector('p span').textContent = i18n.t('toast-zoom-out');
          }
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
