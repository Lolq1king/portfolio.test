import * as THREE from 'three';

export class WoodenDesk {
  constructor(scene) {
    this.scene = scene;
    this.deskGroup = new THREE.Group();
    this.createDesk();
    this.scene.add(this.deskGroup);
  }

  createDesk() {
    // 1. Tabletop (Expanded 4.6m width & 2.0m depth for dual monitors, PC tower & desk lamp)
    const topWidth = 4.6;
    const topHeight = 0.22;
    const topDepth = 2.0;

    const topGeo = new THREE.BoxGeometry(topWidth, topHeight, topDepth);

    // Procedural pixelated oak wood texture (Brightened)
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#5c3720'; // Brightened warm oak wood base
    ctx.fillRect(0, 0, 64, 64);

    // Wood grain lines
    ctx.fillStyle = '#422617';
    for (let y = 0; y < 64; y += 4) {
      ctx.fillRect(0, y + (Math.random() > 0.5 ? 1 : 0), 64, 1);
    }
    // Knots and dark streaks
    ctx.fillStyle = '#2d180d';
    ctx.fillRect(12, 18, 6, 3);
    ctx.fillRect(44, 40, 8, 4);

    const woodTexture = new THREE.CanvasTexture(canvas);
    woodTexture.magFilter = THREE.NearestFilter;
    woodTexture.minFilter = THREE.NearestFilter;
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(2, 1);

    const deskMat = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.7,
      metalness: 0.1
    });

    const tabletop = new THREE.Mesh(topGeo, deskMat);
    tabletop.position.y = 1.6;
    tabletop.castShadow = true;
    tabletop.receiveShadow = true;
    this.deskGroup.add(tabletop);

    // Tabletop Trim (Beveled edge effect)
    const trimGeo = new THREE.BoxGeometry(topWidth + 0.08, 0.08, topDepth + 0.08);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x27140a,
      roughness: 0.8
    });
    const trim = new THREE.Mesh(trimGeo, trimMat);
    trim.position.y = 1.68;
    trim.castShadow = true;
    this.deskGroup.add(trim);

    // 2. Four Wooden Legs
    const legRadiusTop = 0.12;
    const legRadiusBottom = 0.09;
    const legHeight = 1.5;

    const legGeo = new THREE.CylinderGeometry(legRadiusTop, legRadiusBottom, legHeight, 8);
    const legMat = new THREE.MeshStandardMaterial({
      color: 0x2a170c,
      roughness: 0.85
    });

    const legOffsetX = (topWidth / 2) - 0.25;
    const legOffsetZ = (topDepth / 2) - 0.25;
    const legPosY = legHeight / 2;

    const positions = [
      [-legOffsetX, legPosY, -legOffsetZ],
      [legOffsetX, legPosY, -legOffsetZ],
      [-legOffsetX, legPosY, legOffsetZ],
      [legOffsetX, legPosY, legOffsetZ]
    ];

    positions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      leg.receiveShadow = true;
      this.deskGroup.add(leg);
    });

    // 3. Aged Iron Corner Brackets & Screws
    const bracketMat = new THREE.MeshStandardMaterial({
      color: 0x1f242d,
      metalness: 0.8,
      roughness: 0.4
    });

    positions.forEach(([x, y, z]) => {
      const bracket = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.18), bracketMat);
      bracket.position.set(x * 1.05, 1.6, z * 1.05);
      bracket.castShadow = true;
      this.deskGroup.add(bracket);
    });
  }
}
