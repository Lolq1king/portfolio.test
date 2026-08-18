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

    this.checkIntersections(event.clientX, event.clientY);
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
    this.tooltipTitle.textContent = data.name || 'Przedmiot';
    this.tooltipDesc.textContent = data.desc || '';
    this.tooltipEl.classList.remove('hidden');
    this.updateTooltipPos(screenX, screenY);
  }

  updateTooltipPos(screenX, screenY) {
    if (!this.tooltipEl) return;
    this.tooltipEl.style.left = `${screenX}px`;
    this.tooltipEl.style.top = `${screenY}px`;
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
