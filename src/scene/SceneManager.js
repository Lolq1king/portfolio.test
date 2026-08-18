import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { RenderPixelatedPass } from 'three/examples/jsm/postprocessing/RenderPixelatedPass.js';

export class SceneManager {
  constructor(container) {
    this.container = container;

    // Pixel scale locked exclusively to Crisp HD (pixel size 1) as requested
    this.pixelScales = [1];
    this.currentPixelIndex = 0;

    this.initScene();
    this.initLights();
    this.initPostProcessing();

    window.addEventListener('resize', () => this.onWindowResize());
  }

  initScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x060913); // Deep night navy
    this.scene.fog = new THREE.FogExp2(0x0c0b1a, 0.035); // Dark purple fantasy fog

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    // Initial camera placement viewing the clearing & desk
    this.camera.position.set(0, 3.8, 9.2);
    this.camera.lookAt(0, 2.0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    this.container.appendChild(this.renderer.domElement);
  }

  initLights() {
    // 1. Ambient Moonlight
    this.ambientLight = new THREE.AmbientLight(0x232946, 1.5);
    this.scene.add(this.ambientLight);

    // 2. Moonlight Directional
    this.moonLight = new THREE.DirectionalLight(0x7397cd, 2.2);
    this.moonLight.position.set(10, 20, -10);
    this.moonLight.castShadow = true;
    this.moonLight.shadow.mapSize.width = 1024;
    this.moonLight.shadow.mapSize.height = 1024;
    this.moonLight.shadow.camera.near = 0.5;
    this.moonLight.shadow.camera.far = 40;
    this.moonLight.shadow.camera.left = -10;
    this.moonLight.shadow.camera.right = 10;
    this.moonLight.shadow.camera.top = 10;
    this.moonLight.shadow.camera.bottom = -10;
    this.scene.add(this.moonLight);

    // 3. Warm Desk Lamp / Lantern Light
    this.lampLight = new THREE.PointLight(0xff9933, 3.5, 8);
    this.lampLight.position.set(-1.2, 2.8, 0.2);
    this.lampLight.castShadow = true;
    this.scene.add(this.lampLight);

    // 4. CRT Monitor Glowing Light (Cyan/Phosphor Green)
    this.monitorLight = new THREE.PointLight(0x00f3ff, 2.8, 6);
    this.monitorLight.position.set(0, 2.5, 0.4);
    this.scene.add(this.monitorLight);

    // 5. Bioluminescent Mushroom Light
    this.shroomLight = new THREE.PointLight(0x00ffcc, 1.8, 5);
    this.shroomLight.position.set(2.5, 0.5, 2.0);
    this.scene.add(this.shroomLight);
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
    this.currentPixelIndex = 0;
    this.pixelPass.setPixelSize(1);
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
