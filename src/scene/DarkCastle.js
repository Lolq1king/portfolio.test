import * as THREE from 'three';

export class DarkCastle {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.position.set(0, 1.2, -26.0); // Deep background behind the forest clearing

    this.createCliffBase();
    this.createCastleStructure();
    this.createIlluminatedWindows();
    this.createAuraLight();

    this.scene.add(this.group);
  }

  createCliffBase() {
    // Dark jagged cliff base upon which the castle stands
    const cliffGeo = new THREE.DodecahedronGeometry(10, 1);
    const cliffMat = new THREE.MeshStandardMaterial({
      color: 0x090d16, // Dark obsidian stone
      roughness: 0.95,
      flatShading: true
    });

    const cliff = new THREE.Mesh(cliffGeo, cliffMat);
    cliff.scale.set(1.6, 0.4, 1.2);
    cliff.position.set(0, 1.0, 0);
    this.group.add(cliff);
  }

  createCastleStructure() {
    const stoneMat = new THREE.MeshStandardMaterial({
      color: 0x182338, // Gothic obsidian stone catching silvery moonlight
      roughness: 0.65,
      metalness: 0.2,
      flatShading: true
    });

    const roofMat = new THREE.MeshStandardMaterial({
      color: 0x0f1624, // Slate roof tile catching blue moon reflections
      roughness: 0.7,
      metalness: 0.2,
      flatShading: true
    });

    // 1. Central Main Keep (Gothic Tower)
    const keepGeo = new THREE.BoxGeometry(4.2, 7.5, 3.2);
    const mainKeep = new THREE.Mesh(keepGeo, stoneMat);
    mainKeep.position.set(0, 6.2, 0);
    this.group.add(mainKeep);

    // Main Keep Battlements (Crenellations)
    for (let x = -1.8; x <= 1.8; x += 0.9) {
      const merlon = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.6, 0.45), stoneMat);
      merlon.position.set(x, 10.2, 1.4);
      this.group.add(merlon);
    }

    // High Central Spire
    const spireGeo = new THREE.ConeGeometry(1.6, 5.0, 6);
    const spire = new THREE.Mesh(spireGeo, roofMat);
    spire.position.set(0, 12.5, 0);
    this.group.add(spire);

    // 2. Left Watchtower
    const towerGeo = new THREE.CylinderGeometry(1.2, 1.5, 8.5, 8);
    const leftTower = new THREE.Mesh(towerGeo, stoneMat);
    leftTower.position.set(-3.2, 6.5, 0.5);

    const leftRoof = new THREE.Mesh(new THREE.ConeGeometry(1.5, 3.5, 8), roofMat);
    leftRoof.position.set(-3.2, 12.2, 0.5);

    this.group.add(leftTower, leftRoof);

    // 3. Right Watchtower
    const rightTower = new THREE.Mesh(towerGeo, stoneMat);
    rightTower.position.set(3.2, 6.5, 0.5);

    const rightRoof = new THREE.Mesh(new THREE.ConeGeometry(1.5, 3.5, 8), roofMat);
    rightRoof.position.set(3.2, 12.2, 0.5);

    this.group.add(rightTower, rightRoof);

    // 4. Outer Wall Wings
    const wallGeo = new THREE.BoxGeometry(3.5, 4.0, 1.8);
    const leftWall = new THREE.Mesh(wallGeo, stoneMat);
    leftWall.position.set(-5.5, 4.0, -0.5);

    const rightWall = new THREE.Mesh(wallGeo, stoneMat);
    rightWall.position.set(5.5, 4.0, -0.5);

    this.group.add(leftWall, rightWall);
  }

  createIlluminatedWindows() {
    // Array of positions for glowing illuminated windows
    const windowPositions = [
      // Central Keep Windows
      { x: 0, y: 7.5, z: 1.62, w: 0.5, h: 0.9 },
      { x: -1.0, y: 6.0, z: 1.62, w: 0.4, h: 0.7 },
      { x: 1.0, y: 6.0, z: 1.62, w: 0.4, h: 0.7 },
      { x: 0, y: 4.5, z: 1.62, w: 0.6, h: 1.0 },

      // High Spire Window
      { x: 0, y: 10.8, z: 0.7, w: 0.35, h: 0.6 },

      // Left Tower Windows
      { x: -3.2, y: 8.2, z: 1.72, w: 0.35, h: 0.6 },
      { x: -3.2, y: 6.0, z: 1.72, w: 0.35, h: 0.6 },

      // Right Tower Windows
      { x: 3.2, y: 8.2, z: 1.72, w: 0.35, h: 0.6 },
      { x: 3.2, y: 6.0, z: 1.72, w: 0.35, h: 0.6 },

      // Outer Walls Windows
      { x: -5.5, y: 4.2, z: 0.42, w: 0.4, h: 0.6 },
      { x: 5.5, y: 4.2, z: 0.42, w: 0.4, h: 0.6 }
    ];

    const windowMat = new THREE.MeshStandardMaterial({
      color: 0xffaa00,
      emissive: 0xffaa00,
      emissiveIntensity: 1.4,
      roughness: 0.1
    });

    this.windows = [];

    windowPositions.forEach((pos) => {
      const winGeo = new THREE.PlaneGeometry(pos.w, pos.h);
      const windowMesh = new THREE.Mesh(winGeo, windowMat);
      windowMesh.position.set(pos.x, pos.y, pos.z);
      this.group.add(windowMesh);
      this.windows.push(windowMesh);
    });

    // Castle Gate Glow (Arched Entrance)
    const gateGeo = new THREE.PlaneGeometry(1.2, 2.0);
    const gateMat = new THREE.MeshStandardMaterial({
      color: 0xff8800,
      emissive: 0xff7700,
      emissiveIntensity: 1.2
    });
    const gate = new THREE.Mesh(gateGeo, gateMat);
    gate.position.set(0, 3.5, 1.62);
    this.group.add(gate);
  }

  createAuraLight() {
    // 1. Direct Silvery Moonlight Beam illuminating the Castle front
    const castleMoonlight = new THREE.DirectionalLight(0xb8d4ff, 4.5);
    castleMoonlight.position.set(8, 16, 12);
    this.group.add(castleMoonlight);

    // 2. Point light behind castle to create dramatic backdrop silhouette glow
    const castleLight = new THREE.PointLight(0x7397cd, 4.0, 30);
    castleLight.position.set(0, 9.0, -3.0);
    this.group.add(castleLight);

    // 3. Warm glow light emitting from the castle windows
    const windowGlowLight = new THREE.PointLight(0xff9900, 3.5, 18);
    windowGlowLight.position.set(0, 6.5, 2.0);
    this.group.add(windowGlowLight);
    this.windowGlowLight = windowGlowLight;
  }

  update(time) {
    // Subtle window light breathing animation
    if (this.windowGlowLight) {
      this.windowGlowLight.intensity = 2.8 + Math.sin(time * 2.5) * 0.4;
    }
  }
}
