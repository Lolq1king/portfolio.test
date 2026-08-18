import * as THREE from 'three';

export class DeskObjectRegistry {
  constructor(scene, sceneManager) {
    this.scene = scene;
    this.sceneManager = sceneManager;
    this.interactiveObjects = [];

    this.initDefaultItems();
  }

  initDefaultItems() {
    this.createSpellbook();
    this.createPotionBottle();
    this.createAncientLamp();
  }

  createSpellbook() {
    // Ancient Leather Grimoire / Spellbook on left side of desk
    const bookGroup = new THREE.Group();
    bookGroup.position.set(-1.1, 1.76, 0.25);
    bookGroup.rotation.y = 0.25;

    // Leather Cover
    const coverGeo = new THREE.BoxGeometry(0.55, 0.08, 0.75);
    const coverMat = new THREE.MeshStandardMaterial({
      color: 0x4a1818, // Dark crimson leather
      roughness: 0.8
    });
    const cover = new THREE.Mesh(coverGeo, coverMat);
    cover.castShadow = true;
    bookGroup.add(cover);

    // Gold Corner Accents & Rune Symbol
    const runeGeo = new THREE.BoxGeometry(0.18, 0.09, 0.18);
    const runeMat = new THREE.MeshStandardMaterial({
      color: 0xffb700,
      emissive: 0xffb700,
      emissiveIntensity: 0.5,
      metalness: 0.8
    });
    const rune = new THREE.Mesh(runeGeo, runeMat);
    rune.position.y = 0.01;
    bookGroup.add(rune);

    // Book Pages
    const pagesGeo = new THREE.BoxGeometry(0.5, 0.06, 0.7);
    const pagesMat = new THREE.MeshStandardMaterial({ color: 0xded6b8, roughness: 0.9 });
    const pages = new THREE.Mesh(pagesGeo, pagesMat);
    pages.position.set(0.02, 0, 0);
    bookGroup.add(pages);

    // User Data Metadata
    cover.userData = {
      id: 'spellbook',
      name: 'Księga Zaklęć (Grimoire)',
      desc: 'Symbolizuje nieustanną naukę, studiowanie dokumentacji oraz poszerzanie wiedzy programistycznej.',
      icon: '📜',
      extraInfo: 'Wpis z księgi: "Kto opanuje strukturę danych i asynchroniczność, opanuje świat kodu."'
    };

    this.scene.add(bookGroup);
    this.interactiveObjects.push(cover);
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
    // Vintage Brass Kerosene Oil Lamp (Lampa naftowa) on the desk
    const lampGroup = new THREE.Group();
    lampGroup.position.set(-1.2, 1.72, -0.2);

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xaa771c, // Vintage brass / copper
      metalness: 0.85,
      roughness: 0.35
    });

    const ironMat = new THREE.MeshStandardMaterial({
      color: 0x222833, // Dark iron trim
      metalness: 0.9,
      roughness: 0.4
    });

    // 1. Kerosene Fuel Tank Base (Reservoir)
    const tankGeo = new THREE.CylinderGeometry(0.22, 0.26, 0.22, 12);
    const tank = new THREE.Mesh(tankGeo, brassMat);
    tank.position.y = 0.11;
    tank.castShadow = true;
    tank.receiveShadow = true;
    lampGroup.add(tank);

    // Wick Adjuster Dial Knob on side of fuel tank
    const knobGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.1, 8);
    const knob = new THREE.Mesh(knobGeo, ironMat);
    knob.position.set(0.22, 0.16, 0);
    knob.rotation.z = Math.PI * 0.5;
    lampGroup.add(knob);

    // 2. Metallic Burner Assembly
    const burnerGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.1, 10);
    const burner = new THREE.Mesh(burnerGeo, ironMat);
    burner.position.y = 0.27;
    lampGroup.add(burner);

    // 3. Tapered Glass Chimney (Klosz szklany nafty)
    const glassGeo = new THREE.CylinderGeometry(0.09, 0.16, 0.48, 10);
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xffaa00,
      emissive: 0xff8800,
      emissiveIntensity: 0.7,
      transparent: true,
      opacity: 0.65,
      roughness: 0.1
    });
    const glassChimney = new THREE.Mesh(glassGeo, glassMat);
    glassChimney.position.y = 0.55;
    lampGroup.add(glassChimney);

    // 4. Inner Teardrop Wick Flame
    const flameGeo = new THREE.ConeGeometry(0.07, 0.24, 6);
    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xffdd00,
      emissive: 0xffaa00,
      emissiveIntensity: 1.5
    });
    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.y = 0.44;
    lampGroup.add(flame);

    // 5. Metal Top Vent Cap & Wire Carry Loop Handle
    const capGeo = new THREE.CylinderGeometry(0.1, 0.13, 0.12, 10);
    const topCap = new THREE.Mesh(capGeo, brassMat);
    topCap.position.y = 0.84;
    lampGroup.add(topCap);

    // Loop Handle on top
    const handleGeo = new THREE.TorusGeometry(0.1, 0.02, 6, 12);
    const handle = new THREE.Mesh(handleGeo, ironMat);
    handle.position.y = 0.94;
    handle.rotation.x = Math.PI * 0.5;
    lampGroup.add(handle);

    // Wire Guard Cage Strips
    const wireMat = new THREE.MeshStandardMaterial({ color: 0x11151c, metalness: 0.9 });
    for (let i = 0; i < 2; i++) {
      const wireGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.5, 4);
      const wire = new THREE.Mesh(wireGeo, wireMat);
      const xOffset = (i === 0 ? 1 : -1) * 0.14;
      wire.position.set(xOffset, 0.55, 0);
      lampGroup.add(wire);
    }

    // Attach raycast metadata to the glass chimney
    glassChimney.userData = {
      id: 'lamp',
      name: 'Lampa Naftowa Magii Kolorów',
      desc: 'Klikaj w lampę naftową, aby zmieniać paletę barwną i atmosferę scenerii lasu!',
      icon: '🪔',
      action: () => this.toggleAtmosphere()
    };

    this.scene.add(lampGroup);
    this.interactiveObjects.push(glassChimney);
  }

  toggleAtmosphere() {
    if (!this.sceneManager) return;
    
    // Cycle through 4 vibrant dark fantasy scenery atmospheres
    if (this.atmosphereIndex === undefined) this.atmosphereIndex = 0;
    this.atmosphereIndex = (this.atmosphereIndex + 1) % 4;

    if (this.atmosphereIndex === 0) {
      // 1. Midnight Silvery Full Moon (Srebrzysta Noc)
      this.sceneManager.scene.fog.color.setHex(0x0c0b1a);
      this.sceneManager.scene.background.setHex(0x060913);
      this.sceneManager.moonLight.color.setHex(0xa5c8ff);
      this.sceneManager.ambientLight.color.setHex(0x384a75);
      return '🔮 Kolory Scenerii: Srebrzysta Noc Księżycowa';
    } else if (this.atmosphereIndex === 1) {
      // 2. Crimson Blood Moon (Krwawy Zmierzch)
      this.sceneManager.scene.fog.color.setHex(0x2a0815);
      this.sceneManager.scene.background.setHex(0x15040a);
      this.sceneManager.moonLight.color.setHex(0xff3355);
      this.sceneManager.ambientLight.color.setHex(0x551525);
      return '🔮 Kolory Scenerii: Krwawy Zmierzch';
    } else if (this.atmosphereIndex === 2) {
      // 3. Deep Eldritch Emerald Mist (Szmaragdowa Mgła)
      this.sceneManager.scene.fog.color.setHex(0x061c16);
      this.sceneManager.scene.background.setHex(0x030d0a);
      this.sceneManager.moonLight.color.setHex(0x00ffcc);
      this.sceneManager.ambientLight.color.setHex(0x124235);
      return '🔮 Kolory Scenerii: Szmaragdowa Mgła';
    } else {
      // 4. Royal Violet Eclipse (Fioletowe Zaćmienie)
      this.sceneManager.scene.fog.color.setHex(0x1b0a2a);
      this.sceneManager.scene.background.setHex(0x0e0417);
      this.sceneManager.moonLight.color.setHex(0xb555ff);
      this.sceneManager.ambientLight.color.setHex(0x3b1654);
      return '🔮 Kolory Scenerii: Fioletowe Zaćmienie';
    }
  }

  getInteractiveObjects() {
    return this.interactiveObjects;
  }
}
