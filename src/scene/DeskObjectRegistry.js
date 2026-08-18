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
    this.createUnderDeskHeadphones();
    this.createUnderDeskController();
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

  createUnderDeskHeadphones() {
    // Under-desk mounted gaming headphones on the left side of tabletop
    const hpGroup = new THREE.Group();
    hpGroup.position.set(-1.4, 1.35, 0.6); // Hanging under left front lip of desk

    // Metallic Under-Desk Hanger Hook
    const hookGeo = new THREE.BoxGeometry(0.04, 0.16, 0.12);
    const hookMat = new THREE.MeshStandardMaterial({ color: 0x1e2430, metalness: 0.8, roughness: 0.3 });
    const hook = new THREE.Mesh(hookGeo, hookMat);
    hook.position.y = 0.10;
    hpGroup.add(hook);

    // Headphones Padded Headband (Arch)
    const bandGeo = new THREE.TorusGeometry(0.14, 0.025, 8, 16, Math.PI);
    const bandMat = new THREE.MeshStandardMaterial({ color: 0x0f141d, roughness: 0.6 });
    const headband = new THREE.Mesh(bandGeo, bandMat);
    headband.rotation.z = Math.PI;
    headband.position.y = 0.04;
    hpGroup.add(headband);

    // Dual Ear Cups (Left & Right)
    const cupMat = new THREE.MeshStandardMaterial({ color: 0x1a202c, roughness: 0.5 });
    const ledMat = new THREE.MeshStandardMaterial({ color: 0x00f3ff, emissive: 0x00f3ff, emissiveIntensity: 0.8 });

    const leftCupGroup = new THREE.Group();
    leftCupGroup.position.set(-0.14, -0.08, 0);

    const cupGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.06, 12);
    const leftCup = new THREE.Mesh(cupGeo, cupMat);
    leftCup.rotation.z = Math.PI * 0.5;
    leftCupGroup.add(leftCup);

    // RGB LED Ring on Ear Cup
    const ledRingGeo = new THREE.TorusGeometry(0.065, 0.008, 6, 16);
    const leftLedRing = new THREE.Mesh(ledRingGeo, ledMat);
    leftLedRing.rotation.y = Math.PI * 0.5;
    leftCupGroup.add(leftLedRing);

    const rightCupGroup = leftCupGroup.clone();
    rightCupGroup.position.set(0.14, -0.08, 0);

    hpGroup.add(leftCupGroup, rightCupGroup);

    // Attached Mic Boom Arm
    const micGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.18, 6);
    const micMat = new THREE.MeshStandardMaterial({ color: 0x0a0e17, roughness: 0.8 });
    const mic = new THREE.Mesh(micGeo, micMat);
    mic.position.set(-0.16, -0.15, 0.08);
    mic.rotation.x = Math.PI * 0.35;
    hpGroup.add(mic);

    // Raycast Interaction Metadata
    headband.userData = {
      id: 'underdesk-headphones',
      name: '🎧 SŁUCHAWKI GAMINGOWE',
      desc: 'Podwieszone pod blatem biurka słuchawki wokółuszne z mikrofonem i podświetleniem cyan LED. Gotowe do gry i rozmów!',
      icon: '🎧'
    };
    leftCup.userData = headband.userData;

    this.scene.add(hpGroup);
    this.interactiveObjects.push(headband, leftCup);
  }

  createUnderDeskController() {
    // Under-desk mounted gamepad / controller on the left side of tabletop
    const padGroup = new THREE.Group();
    padGroup.position.set(-0.75, 1.34, 0.6); // Hanging under front-left edge of desk

    // Metallic Cradle Hanger Bracket
    const bracketGeo = new THREE.BoxGeometry(0.24, 0.12, 0.08);
    const bracketMat = new THREE.MeshStandardMaterial({ color: 0x1e2430, metalness: 0.8, roughness: 0.3 });
    const bracket = new THREE.Mesh(bracketGeo, bracketMat);
    bracket.position.y = 0.10;
    padGroup.add(bracket);

    // Main Gamepad Body (Dual-grip ergonomics)
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x161b26, roughness: 0.6 });
    const padBody = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.12, 0.22), bodyMat);
    padBody.position.y = -0.02;
    padGroup.add(padBody);

    // Left & Right Hand Grips
    const gripGeo = new THREE.CylinderGeometry(0.06, 0.07, 0.22, 10);
    const leftGrip = new THREE.Mesh(gripGeo, bodyMat);
    leftGrip.position.set(-0.18, -0.06, 0.03);
    leftGrip.rotation.z = 0.3;

    const rightGrip = new THREE.Mesh(gripGeo, bodyMat);
    rightGrip.position.set(0.18, -0.06, 0.03);
    rightGrip.rotation.z = -0.3;

    padGroup.add(leftGrip, rightGrip);

    // Dual Analog Sticks
    const stickMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });
    const leftStick = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.025, 0.04, 8), stickMat);
    leftStick.position.set(-0.08, 0.05, 0.03);

    const rightStick = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.025, 0.04, 8), stickMat);
    rightStick.position.set(0.06, 0.05, -0.02);

    padGroup.add(leftStick, rightStick);

    // D-Pad Cross
    const dpadMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 });
    const dpad = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.08), dpadMat);
    dpad.position.set(-0.11, 0.05, -0.02);
    padGroup.add(dpad);

    // Glowing ABXY Action Buttons (RGB Emissive)
    const btnGeo = new THREE.SphereGeometry(0.02, 6, 6);
    const colors = [0xef4444, 0x3b82f6, 0x10b981, 0xf59e0b]; // Red, Blue, Green, Yellow
    const btnPositions = [
      [0.13, 0.05, 0.03],  // A
      [0.16, 0.05, 0.0],   // B
      [0.10, 0.05, 0.0],   // X
      [0.13, 0.05, -0.03]  // Y
    ];

    btnPositions.forEach(([x, y, z], idx) => {
      const btnMat = new THREE.MeshStandardMaterial({
        color: colors[idx],
        emissive: colors[idx],
        emissiveIntensity: 0.8
      });
      const actionBtn = new THREE.Mesh(btnGeo, btnMat);
      actionBtn.position.set(x, y, z);
      padGroup.add(actionBtn);
    });

    // Raycast Interaction Metadata
    padBody.userData = {
      id: 'underdesk-controller',
      name: '🎮 KONTROLER DO GIER (GAMEPAD)',
      desc: 'Podwieszony pod blatem biurka bezprzewodowy pad do gier z podświetleniem RGB i gałkami analogowymi. Gotowy do gry w Warzone i zręcznościówki!',
      icon: '🎮'
    };

    this.scene.add(padGroup);
    this.interactiveObjects.push(padBody);
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
