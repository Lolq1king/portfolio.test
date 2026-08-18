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

    // Procedural Phosphor CRT Dark Fantasy Login Screen Canvas
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 384;
    const ctx = canvas.getContext('2d');
    
    this.drawDarkFantasyLoginScreen(ctx, 512, 384);

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

  drawDarkFantasyLoginScreen(ctx, width, height) {
    // 1. Dark Gothic Radial Gradient Background
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 40, width / 2, height / 2, width * 0.7);
    bgGrad.addColorStop(0, '#1c0b2b'); // Deep warlock purple core
    bgGrad.addColorStop(0.6, '#0b0614');
    bgGrad.addColorStop(1, '#030206');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Ornate Gothic Border Frame
    ctx.strokeStyle = '#d97706'; // Gold trim
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.strokeStyle = '#7c2d12'; // Crimson inner accent line
    ctx.lineWidth = 2;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    // Corner Ornaments (Golden Diamonds)
    const drawDiamond = (cx, cy, r) => {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx + r, cy);
      ctx.lineTo(cx, cy + r);
      ctx.lineTo(cx - r, cy);
      ctx.closePath();
      ctx.fill();
    };
    drawDiamond(20, 20, 6);
    drawDiamond(width - 20, 20, 6);
    drawDiamond(20, height - 20, 6);
    drawDiamond(width - 20, height - 20, 6);

    // 3. Header Crest & Title
    ctx.textAlign = 'center';
    
    // Magic Rune Crest Icon
    ctx.fillStyle = '#a855f7';
    ctx.font = 'bold 22px monospace';
    ctx.fillText('⚡  🔮 WARLOCK GUILD 🔮  ⚡', width / 2, 45);

    // Main Title
    ctx.fillStyle = '#fbbf24'; // Glowing Gold
    ctx.font = 'bold 20px monospace';
    ctx.fillText('ELDRITCH OS v3.8 (DARK FANTASY)', width / 2, 75);

    ctx.fillStyle = '#38bdf8'; // Cyan Subtitle
    ctx.font = '12px monospace';
    ctx.fillText('SYSTEM LOGOWANIA CZARODZIEJA LOLQ', width / 2, 95);

    // 4. Central Gothic Login Container
    const boxX = 64;
    const boxY = 110;
    const boxW = width - 128;
    const boxH = 210;

    // Translucent Container Box
    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.fillRect(boxX, boxY, boxW, boxH);

    ctx.strokeStyle = '#9333ea'; // Purple arcane outline
    ctx.lineWidth = 2;
    ctx.strokeRect(boxX, boxY, boxW, boxH);

    ctx.textAlign = 'left';

    // --- Input Field 1: UŻYTKOWNIK ---
    ctx.fillStyle = '#c084fc';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('🔮 UŻYTKOWNIK (USERNAME):', boxX + 24, boxY + 32);

    // Field 1 Box
    ctx.fillStyle = '#020617';
    ctx.fillRect(boxX + 24, boxY + 40, boxW - 48, 32);
    ctx.strokeStyle = '#3b82f6';
    ctx.strokeRect(boxX + 24, boxY + 40, boxW - 48, 32);

    ctx.fillStyle = '#00f3ff';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('LOLQ_WIZARD_LVL28', boxX + 36, boxY + 61);

    // --- Input Field 2: HASŁO ASTRALNE ---
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('🔑 HASŁO ASTRALNE (ANCIENT RUNES):', boxX + 24, boxY + 98);

    // Field 2 Box
    ctx.fillStyle = '#020617';
    ctx.fillRect(boxX + 24, boxY + 106, boxW - 48, 32);
    ctx.strokeStyle = '#ef4444';
    ctx.strokeRect(boxX + 24, boxY + 106, boxW - 48, 32);

    ctx.fillStyle = '#f43f5e';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('ᚱ ᚢ ᚾ ᛖ ᛋ ✦ ✶ ⚡ 🔮 ⚡', boxX + 36, boxY + 127);

    // --- Interactive "ZALOGUJ SIĘ" Button ---
    const btnX = boxX + 32;
    const btnY = boxY + 150;
    const btnW = boxW - 64;
    const btnH = 40;

    const btnGrad = ctx.createLinearGradient(btnX, btnY, btnX, btnY + btnH);
    btnGrad.addColorStop(0, '#d97706');
    btnGrad.addColorStop(0.5, '#b45309');
    btnGrad.addColorStop(1, '#78350f');
    ctx.fillStyle = btnGrad;
    ctx.fillRect(btnX, btnY, btnW, btnH);

    ctx.strokeStyle = '#fef08a'; // Bright gold rim
    ctx.lineWidth = 2;
    ctx.strokeRect(btnX, btnY, btnW, btnH);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px monospace';
    ctx.fillText('🔑 [ ZALOGUJ SIĘ DO TERMINALA ] ▶', width / 2, btnY + 25);

    // 5. Bottom Interactive Prompt
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 12px monospace';
    ctx.fillText('KLIKNIJ PRZYCISK ZALOGUJ, ABY OTWORZYĆ SYSTEM', width / 2, height - 26);

    // 6. Scanlines Overlay
    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    for (let y = 0; y < height; y += 4) {
      ctx.fillRect(0, y, width, 2);
    }
  }
}
