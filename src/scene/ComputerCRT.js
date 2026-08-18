import * as THREE from 'three';

export class ComputerCRT {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.interactiveObjects = [];

    this.createComputerTower();
    this.createMonitor();
    this.createLeftMonitor();
    this.createKeyboardAndMouse();

    this.scene.add(this.group);
  }

  createComputerTower() {
    // Desktop Tower placed on the right side of the expanded 5.2m desk
    const towerGeo = new THREE.BoxGeometry(0.7, 1.1, 0.9);
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0x1f2533, // Dark beige-grey retro plastic
      roughness: 0.6,
      metalness: 0.2
    });

    const tower = new THREE.Mesh(towerGeo, towerMat);
    tower.position.set(2.0, 1.71 + 0.55, 0.1);
    tower.castShadow = true;
    tower.receiveShadow = true;
    this.group.add(tower);

    // Disk Drive Bays
    const driveGeo = new THREE.BoxGeometry(0.55, 0.12, 0.05);
    const driveMat = new THREE.MeshStandardMaterial({ color: 0x0f1420, roughness: 0.8 });
    
    const drive1 = new THREE.Mesh(driveGeo, driveMat);
    drive1.position.set(2.0, 2.6, 0.53);
    const drive2 = new THREE.Mesh(driveGeo, driveMat);
    drive2.position.set(2.0, 2.42, 0.53);
    this.group.add(drive1, drive2);

    // Power Button with glowing green LED
    const btnGeo = new THREE.BoxGeometry(0.1, 0.1, 0.05);
    const btnMat = new THREE.MeshStandardMaterial({
      color: 0x39ff14,
      emissive: 0x39ff14,
      emissiveIntensity: 0.8
    });
    const powerBtn = new THREE.Mesh(btnGeo, btnMat);
    powerBtn.position.set(2.2, 2.0, 0.53);
    this.group.add(powerBtn);
  }

  createMonitor() {
    // CRT Monitor in the center of the desk
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(0, 1.71, 0);

    // Monitor Base Stand
    const standGeo = new THREE.BoxGeometry(0.7, 0.1, 0.6);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x1a202c, roughness: 0.7 });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.y = 0.05;
    stand.castShadow = true;
    monitorGroup.add(stand);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.12, 0.15, 0.2, 8);
    const neck = new THREE.Mesh(neckGeo, standMat);
    neck.position.y = 0.15;
    monitorGroup.add(neck);

    // Monitor Body (Heavy CRT Casing)
    const bodyGeo = new THREE.BoxGeometry(1.4, 1.1, 1.0);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1e2433,
      roughness: 0.6
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.75;
    body.castShadow = true;
    body.receiveShadow = true;
    monitorGroup.add(body);

    // Curved CRT Screen Frame
    const screenGeo = new THREE.PlaneGeometry(1.15, 0.85);

    // Procedural Phosphor CRT Screen Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 192;
    const ctx = canvas.getContext('2d');
    
    // Dark CRT background
    ctx.fillStyle = '#0a0f1d';
    ctx.fillRect(0, 0, 256, 192);
    
    // Pixelated terminal text preview
    ctx.fillStyle = '#00f3ff';
    ctx.font = '16px monospace';
    ctx.fillText('> ELDRITCH OS v1.0.4', 15, 30);
    ctx.fillStyle = '#39ff14';
    ctx.fillText('STATUS: ONLINE', 15, 55);
    ctx.fillText('USER: LVL 1 APPRENTICE', 15, 80);
    
    ctx.fillStyle = '#ffb700';
    ctx.fillText('[ CLICK MONITOR TO ENTER ]', 10, 140);

    // CRT Scanlines on texture
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    for (let y = 0; y < 192; y += 4) {
      ctx.fillRect(0, y, 256, 2);
    }

    const screenTexture = new THREE.CanvasTexture(canvas);
    screenTexture.magFilter = THREE.NearestFilter;
    screenTexture.minFilter = THREE.NearestFilter;

    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTexture,
      emissiveMap: screenTexture,
      emissive: 0xffffff,
      emissiveIntensity: 0.8,
      roughness: 0.2
    });

    this.screenMesh = new THREE.Mesh(screenGeo, screenMat);
    this.screenMesh.position.set(0, 0.75, 0.51); // Slightly in front of body
    
    // User data tag for raycasting & identification
    this.screenMesh.userData = {
      id: 'computer-crt',
      name: 'Komputer CRT (Eldritch OS)',
      desc: 'Centralny komputer z interaktywnym terminalem. Przechowuje statystyki postaci, wykonane projekty oraz zakłady umiejętności.',
      icon: '🖥️'
    };

    monitorGroup.add(this.screenMesh);
    this.interactiveObjects.push(this.screenMesh);

    this.group.add(monitorGroup);
  }

  createLeftMonitor() {
    // Second CRT Gaming Monitor on the left side of the expanded 5.2m desk, angled inward
    const leftMonitorGroup = new THREE.Group();
    leftMonitorGroup.position.set(-1.55, 1.71, 0.1);
    leftMonitorGroup.rotation.y = 0.28; // Angled elegantly towards the center

    // Monitor Base Stand
    const standGeo = new THREE.BoxGeometry(0.65, 0.1, 0.55);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x1a202c, roughness: 0.7 });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.y = 0.05;
    stand.castShadow = true;
    leftMonitorGroup.add(stand);

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.11, 0.14, 0.2, 8);
    const neck = new THREE.Mesh(neckGeo, standMat);
    neck.position.y = 0.15;
    leftMonitorGroup.add(neck);

    // Monitor Body
    const bodyGeo = new THREE.BoxGeometry(1.35, 1.05, 0.95);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1a202e,
      roughness: 0.6
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.75;
    body.castShadow = true;
    body.receiveShadow = true;
    leftMonitorGroup.add(body);

    // Curved Screen Plane
    const screenGeo = new THREE.PlaneGeometry(1.15, 0.85);

    // Load Call of Duty Warzone screen texture
    const textureLoader = new THREE.TextureLoader();
    const codTexture = textureLoader.load('cod_warzone_screen.jpg');
    codTexture.magFilter = THREE.NearestFilter;
    codTexture.minFilter = THREE.LinearFilter;

    const screenMat = new THREE.MeshStandardMaterial({
      map: codTexture,
      emissiveMap: codTexture,
      emissive: 0xffffff,
      emissiveIntensity: 0.9,
      roughness: 0.25
    });

    const leftScreenMesh = new THREE.Mesh(screenGeo, screenMat);
    leftScreenMesh.position.set(0, 0.75, 0.485);

    leftScreenMesh.userData = {
      id: 'computer-left-warzone',
      name: '🎮 CALL OF DUTY: WARZONE',
      desc: 'Drugi monitor Czarodzieja Lolq z odpaloną grą Call of Duty: Warzone w klimacie 16-BIT Pixel Art z widokiem na Verdansk!',
      icon: '🎯',
      extraInfo: 'Stanowisko Bojowe | Gra: Call of Duty: Warzone'
    };

    leftMonitorGroup.add(leftScreenMesh);
    this.interactiveObjects.push(leftScreenMesh);

    this.group.add(leftMonitorGroup);
  }

  createKeyboardAndMouse() {
    // Mechanical Keyboard
    const kbGeo = new THREE.BoxGeometry(1.2, 0.06, 0.45);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x161b26, roughness: 0.7 });
    const keyboard = new THREE.Mesh(kbGeo, kbMat);
    keyboard.position.set(-0.1, 1.74, 0.5);
    keyboard.castShadow = true;
    this.group.add(keyboard);

    // Keyboard Keycaps Accent
    const keyGeo = new THREE.BoxGeometry(0.06, 0.03, 0.06);
    const keyMat = new THREE.MeshStandardMaterial({ color: 0x00f3ff, emissive: 0x00f3ff, emissiveIntensity: 0.4 });
    const enterKey = new THREE.Mesh(keyGeo, keyMat);
    enterKey.position.set(0.35, 1.78, 0.55);
    this.group.add(enterKey);

    // Pixel Mouse
    const mouseGeo = new THREE.BoxGeometry(0.18, 0.08, 0.28);
    const mouseMat = new THREE.MeshStandardMaterial({ color: 0x1e2433, roughness: 0.6 });
    const mouse = new THREE.Mesh(mouseGeo, mouseMat);
    mouse.position.set(0.75, 1.75, 0.5);
    mouse.castShadow = true;
    this.group.add(mouse);
  }
}
