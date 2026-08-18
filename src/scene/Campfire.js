import * as THREE from 'three';

export class Campfire {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(-3.0, 0, 0.6); // Left side of the wooden desk

    this.initStones();
    this.initLogs();
    this.initFlames();
    this.initLight();
    this.initEmbers();

    this.scene.add(this.group);
  }

  initStones() {
    // Ring of 8 small campfire rocks
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x1e2430,
      roughness: 0.9,
      flatShading: true
    });

    const count = 8;
    const radius = 0.55;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const rockGeo = new THREE.DodecahedronGeometry(0.12 + Math.random() * 0.04, 0);
      const stone = new THREE.Mesh(rockGeo, stoneMat);
      stone.position.set(Math.cos(angle) * radius, 0.08, Math.sin(angle) * radius);
      stone.rotation.set(Math.random(), Math.random(), Math.random());
      stone.castShadow = true;
      stone.receiveShadow = true;
      this.group.add(stone);
    }
  }

  initLogs() {
    // 3 crossed wooden logs
    const logMat = new THREE.MeshStandardMaterial({
      color: 0x1b110a,
      roughness: 0.95
    });

    for (let i = 0; i < 3; i++) {
      const logGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.7, 6);
      const log = new THREE.Mesh(logGeo, logMat);
      log.position.y = 0.12;
      log.rotation.z = Math.PI * 0.4;
      log.rotation.y = (i / 3) * Math.PI;
      log.castShadow = true;
      this.group.add(log);
    }
  }

  initFlames() {
    // Flame meshes
    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xff5500,
      emissive: 0xff6600,
      emissiveIntensity: 1.0,
      transparent: true,
      opacity: 0.9,
      flatShading: true
    });

    this.flameCone1 = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.75, 5), flameMat);
    this.flameCone1.position.y = 0.45;

    this.flameCone2 = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.6, 5), flameMat);
    this.flameCone2.position.set(0.05, 0.4, -0.05);

    const innerFlameMat = new THREE.MeshStandardMaterial({
      color: 0xffdd00,
      emissive: 0xffcc00,
      emissiveIntensity: 1.2,
      flatShading: true
    });

    this.flameInner = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.45, 5), innerFlameMat);
    this.flameInner.position.y = 0.35;

    this.group.add(this.flameCone1, this.flameCone2, this.flameInner);
  }

  initLight() {
    // Warm campfire light illuminating the forest and left side of desk
    this.fireLight = new THREE.PointLight(0xff7700, 4.5, 12);
    this.fireLight.position.set(0, 0.6, 0);
    this.fireLight.castShadow = true;
    this.fireLight.shadow.mapSize.width = 512;
    this.fireLight.shadow.mapSize.height = 512;
    this.group.add(this.fireLight);
  }

  initEmbers() {
    // Rising fire ember particles
    const emberCount = 35;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(emberCount * 3);
    const speeds = new Float32Array(emberCount);
    const initialY = new Float32Array(emberCount);

    for (let i = 0; i < emberCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.6;
      const y = 0.3 + Math.random() * 1.8;
      positions[i * 3 + 1] = y;
      initialY[i] = y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
      speeds[i] = 0.8 + Math.random() * 1.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 8;
    canvas.height = 8;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffaa00';
    ctx.fillRect(2, 2, 4, 4);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;

    const material = new THREE.PointsMaterial({
      size: 0.12,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.embersMesh = new THREE.Points(geometry, material);
    this.emberInitialY = initialY;
    this.emberSpeeds = speeds;
    this.group.add(this.embersMesh);
  }

  update(time) {
    // 1. Dynamic light flicker
    if (this.fireLight) {
      this.fireLight.intensity = 4.2 + Math.sin(time * 14) * 0.5 + (Math.random() - 0.5) * 0.4;
    }

    // 2. Flame scale wobble
    if (this.flameCone1) {
      this.flameCone1.scale.y = 1 + Math.sin(time * 10) * 0.12;
      this.flameCone1.rotation.y = time * 2;
    }
    if (this.flameCone2) {
      this.flameCone2.scale.y = 1 + Math.cos(time * 12) * 0.15;
    }

    // 3. Embers rising motion
    if (this.embersMesh) {
      const positions = this.embersMesh.geometry.attributes.position.array;
      const count = positions.length / 3;

      for (let i = 0; i < count; i++) {
        const speed = this.emberSpeeds[i];
        positions[i * 3 + 1] += speed * 0.015;

        // Reset ember if it floats too high
        if (positions[i * 3 + 1] > 2.2) {
          positions[i * 3 + 1] = 0.3;
          positions[i * 3] = (Math.random() - 0.5) * 0.6;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
        }

        // Sway slightly
        positions[i * 3] += Math.sin(time * 3 + i) * 0.004;
      }
      this.embersMesh.geometry.attributes.position.needsUpdate = true;
    }
  }
}
