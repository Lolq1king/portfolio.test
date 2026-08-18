import * as THREE from 'three';

export class DeskObjectRegistry {
  constructor(scene, sceneManager) {
    this.scene = scene;
    this.sceneManager = sceneManager;
    this.interactiveObjects = [];

    this.initDefaultItems();
  }

  initDefaultItems() {
    this.createPotionBottle();
    this.createAncientLamp();
  }

  createPotionBottle() {
    // Glass Mana/Energy Potion Bottle
    const potionGroup = new THREE.Group();
    potionGroup.position.set(-0.6, 1.74, -0.4);

    // Glass Base
    const glassGeo = new THREE.SphereGeometry(0.14, 12, 12);
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x00f3ff,
      emissive: 0x00f3ff,
      emissiveIntensity: 0.7,
      transparent: true,
      opacity: 0.8,
      roughness: 0.1
    });
    const bottle = new THREE.Mesh(glassGeo, glassMat);
    bottle.position.y = 0.14;
    bottle.castShadow = true;
    potionGroup.add(bottle);

    // Cork Stopper
    const corkGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.1, 8);
    const corkMat = new THREE.MeshStandardMaterial({ color: 0x5a3d28, roughness: 0.9 });
    const cork = new THREE.Mesh(corkGeo, corkMat);
    cork.position.y = 0.3;
    potionGroup.add(cork);

    bottle.userData = {
      id: 'potion',
      name: 'Flakon Eliksiru Many (Energy Fuel)',
      desc: 'Symbolizuje pasję, zapał i niewyczerpaną energię potrzebną do rozwijania złożonych aplikacji.',
      icon: '🧪',
      extraInfo: 'Właściwości: +50 do skupienia, zamienia kofeinę na czysty kod.'
    };

    this.scene.add(potionGroup);
    this.interactiveObjects.push(bottle);
  }

  createAncientLamp() {
    // Prominent Vintage Brass & Copper Kerosene Desk Lamp in the gap between main monitor and PC tower on the right
    const lampGroup = new THREE.Group();
    lampGroup.position.set(1.15, 1.71, 0.25);

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd97706, // Polished golden brass
      metalness: 0.85,
      roughness: 0.25
    });

    const ironMat = new THREE.MeshStandardMaterial({
      color: 0x222833,
      metalness: 0.9,
      roughness: 0.4
    });

    // 1. Kerosene Fuel Tank Base
    const tankGeo = new THREE.CylinderGeometry(0.25, 0.30, 0.24, 12);
    const tank = new THREE.Mesh(tankGeo, brassMat);
    tank.position.y = 0.12;
    tank.castShadow = true;
    tank.receiveShadow = true;
    lampGroup.add(tank);

    // 2. Metallic Burner Assembly
    const burnerGeo = new THREE.CylinderGeometry(0.14, 0.18, 0.12, 10);
    const burner = new THREE.Mesh(burnerGeo, ironMat);
    burner.position.y = 0.30;
    lampGroup.add(burner);

    // 3. Glowing Glass Chimney
    const glassGeo = new THREE.CylinderGeometry(0.11, 0.18, 0.52, 10);
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xffaa00,
      emissive: 0xff8800,
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0.75,
      roughness: 0.1
    });
    const glassChimney = new THREE.Mesh(glassGeo, glassMat);
    glassChimney.position.y = 0.62;
    lampGroup.add(glassChimney);

    // 4. Inner Teardrop Flame
    const flameGeo = new THREE.ConeGeometry(0.08, 0.26, 6);
    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xffe500,
      emissive: 0xffaa00,
      emissiveIntensity: 2.5
    });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = 0.52;
    lampGroup.add(flame);

    // 5. Dedicated Warm Desk Light (Spotlight effect illuminating desk & COD monitor)
    const lampLight = new THREE.PointLight(0xffaa44, 4.5, 6.0);
    lampLight.position.set(0, 0.65, 0);
    lampLight.castShadow = true;
    lampGroup.add(lampLight);

    // 6. Metal Top Cap & Loop Handle
    const capGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.14, 10);
    const topCap = new THREE.Mesh(capGeo, brassMat);
    topCap.position.y = 0.94;
    lampGroup.add(topCap);

    const handleGeo = new THREE.TorusGeometry(0.12, 0.025, 6, 12);
    const handle = new THREE.Mesh(handleGeo, ironMat);
    handle.position.y = 1.06;
    handle.rotation.x = Math.PI * 0.5;
    lampGroup.add(handle);

    // Attach raycasting metadata to glass chimney and tank
    const lampUserData = {
      id: 'lamp',
      name: '🪔 KLASYCZNA LAMPA BIURKOWA',
      desc: 'Ciepła mosiężna lampa rozświetlająca stanowisko Czarodzieja Lolq. Klikaj w lampę, aby zmieniać paletę oświetlenia lasu i nastroju!',
      icon: '🪔',
      action: () => this.toggleAtmosphere()
    };
    glassChimney.userData = lampUserData;
    tank.userData = lampUserData;

    this.scene.add(lampGroup);
    this.interactiveObjects.push(glassChimney, tank);
  }

  toggleAtmosphere() {
    if (!this.sceneManager) return;
    
    // Cycle through 4 vibrant dark fantasy scenery atmospheres
    if (this.atmosphereIndex === undefined) this.atmosphereIndex = 0;
    this.atmosphereIndex = (this.atmosphereIndex + 1) % 4;

    if (this.atmosphereIndex === 0) {
      // 1. Midnight Silvery Full Moon (Srebrzysta Noc)
      this.sceneManager.scene.fog.color.setHex(0x18243e);
      this.sceneManager.scene.background.setHex(0x141f38);
      this.sceneManager.moonLight.color.setHex(0xcde0ff);
      this.sceneManager.ambientLight.color.setHex(0x7896d8);
      return '🔮 Kolory Scenerii: Srebrzysta Noc Księżycowa';
    } else if (this.atmosphereIndex === 1) {
      // 2. Crimson Blood Moon (Krwawy Zmierzch)
      this.sceneManager.scene.fog.color.setHex(0x3d1424);
      this.sceneManager.scene.background.setHex(0x280d17);
      this.sceneManager.moonLight.color.setHex(0xff5577);
      this.sceneManager.ambientLight.color.setHex(0x882844);
      return '🔮 Kolory Scenerii: Krwawy Zmierzch';
    } else if (this.atmosphereIndex === 2) {
      // 3. Deep Eldritch Emerald Mist (Szmaragdowa Mgła)
      this.sceneManager.scene.fog.color.setHex(0x12362c);
      this.sceneManager.scene.background.setHex(0x0c241d);
      this.sceneManager.moonLight.color.setHex(0x33ffe6);
      this.sceneManager.ambientLight.color.setHex(0x246654);
      return '🔮 Kolory Scenerii: Szmaragdowa Mgła';
    } else {
      // 4. Royal Violet Eclipse (Fioletowe Zaćmienie)
      this.sceneManager.scene.fog.color.setHex(0x2c1540);
      this.sceneManager.scene.background.setHex(0x1e0e2c);
      this.sceneManager.moonLight.color.setHex(0xc877ff);
      this.sceneManager.ambientLight.color.setHex(0x602b85);
      return '🔮 Kolory Scenerii: Fioletowe Zaćmienie';
    }
  }

  getInteractiveObjects() {
    return this.interactiveObjects;
  }
}
