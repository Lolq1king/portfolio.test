import * as THREE from 'three';
import { gsap } from 'gsap';

export class CameraController {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;

    this.mode = 'overview'; // 'overview' | 'monitor' | 'bookshelf'

    // Preset positions
    this.overviewPos = new THREE.Vector3(0, 5.2, 13.0);
    this.overviewTarget = new THREE.Vector3(0, 2.2, -1.0);

    this.monitorPos = new THREE.Vector3(0, 2.65, 2.6);
    this.monitorTarget = new THREE.Vector3(0, 2.46, 0.51);

    // Bookshelf close-up view position (angled directly at the bookshelf frame & shelves)
    this.bookshelfPos = new THREE.Vector3(1.8, 2.5, 5.6);
    this.bookshelfTarget = new THREE.Vector3(3.5, 2.0, 0.8);

    this.currentTarget = this.overviewTarget.clone();

    // Mouse parallax variables for Overview mode
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    window.addEventListener('mousemove', (e) => this.onMouseMove(e));
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && (this.mode === 'monitor' || this.mode === 'bookshelf')) {
        this.zoomToOverview();
      }
    });
  }

  onMouseMove(event) {
    if (this.mode !== 'overview') return;
    this.targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    this.targetMouseY = (event.clientY / window.innerHeight - 0.5) * 2;
  }

  zoomToMonitor(onComplete) {
    this.mode = 'monitor';

    gsap.to(this.camera.position, {
      x: this.monitorPos.x,
      y: this.monitorPos.y,
      z: this.monitorPos.z,
      duration: 1.4,
      ease: 'power3.inOut'
    });

    gsap.to(this.currentTarget, {
      x: this.monitorTarget.x,
      y: this.monitorTarget.y,
      z: this.monitorTarget.z,
      duration: 1.4,
      ease: 'power3.inOut',
      onUpdate: () => {
        this.camera.lookAt(this.currentTarget);
      },
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
  }

  zoomToBookshelf(onComplete) {
    this.mode = 'bookshelf';

    gsap.to(this.camera.position, {
      x: this.bookshelfPos.x,
      y: this.bookshelfPos.y,
      z: this.bookshelfPos.z,
      duration: 1.4,
      ease: 'power3.inOut'
    });

    gsap.to(this.currentTarget, {
      x: this.bookshelfTarget.x,
      y: this.bookshelfTarget.y,
      z: this.bookshelfTarget.z,
      duration: 1.4,
      ease: 'power3.inOut',
      onUpdate: () => {
        this.camera.lookAt(this.currentTarget);
      },
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
  }

  zoomToOverview(onComplete) {
    this.mode = 'overview';

    gsap.to(this.camera.position, {
      x: this.overviewPos.x,
      y: this.overviewPos.y,
      z: this.overviewPos.z,
      duration: 1.4,
      ease: 'power3.inOut'
    });

    gsap.to(this.currentTarget, {
      x: this.overviewTarget.x,
      y: this.overviewTarget.y,
      z: this.overviewTarget.z,
      duration: 1.4,
      ease: 'power3.inOut',
      onUpdate: () => {
        this.camera.lookAt(this.currentTarget);
      },
      onComplete: () => {
        if (onComplete) onComplete();
      }
    });
  }

  toggleView(onMonitorCallback, onOverviewCallback, onBookshelfCallback) {
    if (this.mode === 'overview') {
      this.zoomToMonitor(onMonitorCallback);
      return 'monitor';
    } else if (this.mode === 'monitor') {
      this.zoomToBookshelf(onBookshelfCallback);
      return 'bookshelf';
    } else {
      this.zoomToOverview(onOverviewCallback);
      return 'overview';
    }
  }

  update() {
    if (this.mode === 'overview') {
      // Smooth parallax interpolation
      this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
      this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

      this.camera.position.x = this.overviewPos.x + this.mouseX * 1.5;
      this.camera.position.y = this.overviewPos.y - this.mouseY * 0.8;
      this.camera.lookAt(this.currentTarget);
    }
  }
}
