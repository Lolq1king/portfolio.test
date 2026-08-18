import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass.js';

export class SceneManager {
  constructor(container) {
    this.container = container;

    // Available Pixel Scales: Crisp HD (size 1) and 16-bit Retro (size 3)
    this.pixelScales = [1, 3];
    this.currentPixelIndex = 0;

    this.initScene();
    this.initLights();
    this.initPostProcessing();

    window.addEventListener('resize', () => this.onWindowResize());
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x141f38); // Brightened twilight night sky
    this.scene.fog = new THREE.FogExp2(0x18243e, 0.016); // Lighter, thinner fantasy fog

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    // Initial camera placement viewing the clearing, desk, campfire & distant castle
    this.camera.position.set(0, 5.2, 13.0);
    this.camera.lookAt(0, 2.2, -1.0);

    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.85; // Significantly brightened exposure

    this.container.appendChild(this.renderer.domElement);
  }

  initLights() {
    // 1. Ambient Full Moonlight Fill (Bright silvery blue fill)
    this.ambientLight = new THREE.AmbientLight(0x7896d8, 4.8);
    this.scene.add(this.ambientLight);

    // 2. Soft Sky & Ground Hemisphere Light (Darker ground bounce)
    this.hemiLight = new THREE.HemisphereLight(0xbde0ff, 0x1f2b1c, 1.8);
    this.scene.add(this.hemiLight);

    // 3. Full Moonlight Beam
    this.moonLight = new THREE.DirectionalLight(0xcde0ff, 6.8);
    this.moonLight.position.set(12, 22, -10);
    this.moonLight.castShadow = true;
    this.moonLight.shadow.mapSize.width = 1024;
    this.moonLight.shadow.mapSize.height = 1024;
    this.moonLight.shadow.camera.near = 0.5;
    this.moonLight.shadow.camera.far = 40;
    this.moonLight.shadow.camera.left = -12;
    this.moonLight.shadow.camera.right = 12;
    this.moonLight.shadow.camera.top = 12;
    this.moonLight.shadow.camera.bottom = -12;
    this.scene.add(this.moonLight);

    // 4. Glowing Full Moon Disc in the sky
    this.initFullMoon();

    // 5. Warm Desk Lamp Light
    this.lampLight = new THREE.PointLight(0xffb347, 5.5, 12);
    this.lampLight.position.set(-1.2, 2.8, 0.2);
    this.lampLight.castShadow = true;
    this.scene.add(this.lampLight);

    // 6. CRT Monitor Glowing Light
    this.monitorLight = new THREE.PointLight(0x38f5ff, 4.5, 10);
    this.monitorLight.position.set(0, 2.5, 0.4);
    this.scene.add(this.monitorLight);

    // 7. Bioluminescent Mushroom Light under forest trees
    this.shroomLight = new THREE.PointLight(0x55ffdd, 2.2, 6);
    this.shroomLight.position.set(-3.8, 0.5, 1.6);
    this.scene.add(this.shroomLight);

    // 8. Dedicated Warm Bookshelf Illumination
    this.bookshelfLight = new THREE.PointLight(0xffe5b4, 5.8, 12);
    this.bookshelfLight.position.set(4.3, 3.2, 2.5);
    this.scene.add(this.bookshelfLight);
  }

  initFullMoon() {
    // 3D Glowing Full Moon high in the night sky
    const moonGeo = new THREE.SphereGeometry(2.4, 20, 20);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xe6f2ff,
      emissive: 0xd9ecff,
      emissiveIntensity: 1.6,
      roughness: 0.2
    });

    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(6.5, 14.5, -21.0);
    this.scene.add(moonMesh);

    // Soft moon glow point light
    const moonGlow = new THREE.PointLight(0x99ccff, 3.5, 45);
    moonGlow.position.set(6.5, 14.5, -19.0);
    this.scene.add(moonGlow);
  }

  initPostProcessing() {
    this.composer = new EffectComposer(this.renderer);

    this.renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(this.renderPass);

    // RenderPixelatedPass gives the signature pixel art look to 3D graphics
    const pixelSize = this.pixelScales[this.currentPixelIndex];
    this.pixelPass = new RenderPixelatedPass(pixelSize, this.scene, this.camera);
    this.pixelPass.normalEdgeStrength = 0.15;
    this.pixelPass.depthEdgeStrength = 0.25;
    this.composer.addPass(this.pixelPass);
  }

  togglePixelScale() {
    this.currentPixelIndex = (this.currentPixelIndex + 1) % this.pixelScales.length;
    const newSize = this.pixelScales[this.currentPixelIndex];
    this.pixelPass.setPixelSize(newSize);

    if (newSize === 3) return 'TRYB: 16-BIT';
    return 'TRYB: CRISP HD';
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.composer.setSize(window.innerWidth, window.innerHeight);
  }

  render(deltaTime) {
    // Subtle flickering on monitor and lamp light for realism
    if (this.monitorLight) {
      this.monitorLight.intensity = 2.8 + Math.sin(Date.now() * 0.008) * 0.3;
    }
    if (this.lampLight) {
      this.lampLight.intensity = 3.5 + (Math.random() - 0.5) * 0.2;
    }

    this.composer.render();
  }
}
