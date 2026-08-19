import { i18n } from './i18n.js';
import * as THREE from 'three';

export class RaycastInteraction {
  constructor(camera, scene, domElement, onObjectClick) {
    this.camera = camera;
    this.scene = scene;
    this.domElement = domElement;
    this.onObjectClick = onObjectClick;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.interactiveObjects = [];
    this.hoveredObject = null;

    this.tooltipEl = document.getElementById('object-tooltip');
    this.tooltipIcon = document.getElementById('tooltip-icon');
    this.tooltipTitle = document.getElementById('tooltip-title');
    this.tooltipDesc = document.getElementById('tooltip-desc');

    this.enabled = true;
    this.lastRaycastTime = 0;
    this.lastScreenX = 0;
    this.lastScreenY = 0;

    window.addEventListener('mousemove', (e) => this.onPointerMove(e));
    window.addEventListener('click', (e) => this.onPointerClick(e));
  }

  setInteractiveObjects(objects) {
    this.interactiveObjects = objects;
  }

  onPointerMove(event) {
    if (!this.enabled || (event && event.target && event.target.closest('#crt-modal, #item-modal, .hud-header'))) {
      this.hideTooltip();
      return;
    }

    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.lastScreenX = event.clientX;
    this.lastScreenY = event.clientY;

    const now = performance.now();
    if (now - this.lastRaycastTime > 30) { // Max ~30Hz raycasting rate
      this.lastRaycastTime = now;
      this.checkIntersections(this.lastScreenX, this.lastScreenY);
    }
  }

  checkIntersections(screenX, screenY) {
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.interactiveObjects, true);

    if (intersects.length > 0) {
      let hitObj = intersects[0].object;

      // Climb up to mesh with userData if hit a child
      while (hitObj && !hitObj.userData.id && hitObj.parent) {
        hitObj = hitObj.parent;
      }

      if (hitObj && hitObj.userData && hitObj.userData.id) {
        if (this.hoveredObject !== hitObj) {
          this.hoveredObject = hitObj;
          this.domElement.style.cursor = 'pointer';
          this.showTooltip(hitObj.userData, screenX, screenY);
        } else {
          this.updateTooltipPos(screenX, screenY);
        }
        return;
      }
    }

    if (this.hoveredObject) {
      this.hoveredObject = null;
      this.domElement.style.cursor = 'default';
      this.hideTooltip();
    }
  }

  showTooltip(data, screenX, screenY) {
    if (!this.tooltipEl) return;
    this.tooltipIcon.textContent = data.icon || '🔮';
    const nKey = data.id + '-name';
    const nT = i18n.t(nKey);
    this.tooltipTitle.textContent = (nT !== nKey ? nT : data.name) || i18n.t('tooltip-title');
    const dKey = data.id + '-desc';
    const dT = i18n.t(dKey);
    this.tooltipDesc.textContent = (dT !== dKey ? dT : data.desc) || '';
    this.tooltipEl.classList.remove('hidden');
    this.updateTooltipPos(screenX, screenY);
  }

  updateTooltipPos(screenX, screenY) {
    if (!this.tooltipEl) return;

    // Get actual dimensions of the rendered tooltip box
    const rect = this.tooltipEl.getBoundingClientRect();
    const tooltipWidth = rect.width || 340;
    const tooltipHeight = rect.height || 140;

    let posX = screenX;
    let posY = screenY;

    // Clamp X so tooltip never overflows left or right edge of screen
    const minX = tooltipWidth / 2 + 15;
    const maxX = window.innerWidth - tooltipWidth / 2 - 15;
    posX = Math.max(minX, Math.min(posX, maxX));

    // Flip vertical direction: if tooltip would overflow top of screen, flip it below cursor!
    if (screenY - tooltipHeight - 20 < 15) {
      this.tooltipEl.style.transform = 'translate(-50%, 25px)';
    } else {
      this.tooltipEl.style.transform = 'translate(-50%, -120%)';
    }

    this.tooltipEl.style.left = `${posX}px`;
    this.tooltipEl.style.top = `${posY}px`;
  }

  hideTooltip() {
    if (this.tooltipEl) {
      this.tooltipEl.classList.add('hidden');
    }
  }

  onPointerClick(event) {
    if (!this.enabled || !this.hoveredObject) return;

    // Do NOT trigger 3D raycast click if user clicked an HTML UI button or modal overlay
    if (event && event.target && event.target.closest('#crt-modal, #item-modal, .hud-header, button')) {
      return;
    }

    if (this.onObjectClick) {
      this.onObjectClick(this.hoveredObject);
    }
  }
}
