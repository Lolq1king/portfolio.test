import * as THREE from 'three';

export class ForestEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.fireflies = [];
    this.interactiveObjects = [];
    this.initGround();
    this.initTrees();
    this.initRocksAndFungi();
    this.initHangingBranchAndGear();
    this.initFireflies();
  }

  initGround() {
    // Ground circle / clearing
    const groundGeometry = new THREE.CylinderGeometry(14, 16, 0.4, 32);

    // Create dark fantasy grass texture procedurally
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#05120d'; // Darker emerald base for ground
    ctx.fillRect(0, 0, 64, 64);

    // Pixel details
    for (let i = 0; i < 200; i++) {
      const x = Math.floor(Math.random() * 64);
      const y = Math.floor(Math.random() * 64);
      const colors = ['#03100a', '#0a1a13', '#020906', '#0f241a', '#00140e'];
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillRect(x, y, 2, 2);
    }

    const groundTexture = new THREE.CanvasTexture(canvas);
    groundTexture.wrapS = THREE.RepeatWrapping;
    groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set(12, 12);
    groundTexture.magFilter = THREE.NearestFilter;
    groundTexture.minFilter = THREE.NearestFilter;

    const groundMaterial = new THREE.MeshStandardMaterial({
      map: groundTexture,
      color: 0x889988, // Slightly darkened tint for ground surface
      roughness: 0.95,
      metalness: 0.1
    });

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.position.y = -0.2;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  initTrees() {
    // Hand-crafted curated tree layout framing the clearing (zero overlap & guaranteed left/right framing)
    const fixedTrees = [
      // --- Left Flank Trees ---
      { x: -4.8, z: 0.5, scale: 1.1, rot: 0.2 },   // Prominent left pine framing the desk
      { x: -6.2, z: 2.8, scale: 1.2, rot: 1.1 },   // Foreground left pine
      { x: -5.5, z: -2.5, scale: 1.0, rot: 2.3 },  // Midground left pine
      { x: -6.8, z: -5.0, scale: 1.35, rot: 0.8 }, // Background left pine
      { x: -8.5, z: -1.0, scale: 1.25, rot: 1.7 }, // Outer left pine
      { x: -7.8, z: 4.2, scale: 1.15, rot: 2.9 },  // Far front left pine

      // --- Right Flank Trees (Pushed to x >= 8.5 so pine branches NEVER touch the bookshelf at x=4.3) ---
      { x: 8.5, z: 1.8, scale: 1.0, rot: 0.5 },    // Right side pine
      { x: 9.8, z: 4.2, scale: 1.2, rot: 1.9 },    // Outer right front pine
      { x: 8.2, z: -3.5, scale: 1.0, rot: 2.8 },   // Right midground pine
      { x: 9.5, z: -6.2, scale: 1.25, rot: 0.4 },  // Right background pine
      { x: 10.5, z: -1.0, scale: 1.1, rot: 1.3 },  // Outer right pine

      // --- Rear Background Trees Framing Dark Castle Corridor ---
      { x: -3.8, z: -6.8, scale: 1.2, rot: 2.1 },
      { x: -2.2, z: -8.5, scale: 1.4, rot: 0.7 },
      { x: 2.4, z: -8.8, scale: 1.35, rot: 1.5 },
      { x: 4.5, z: -7.2, scale: 1.25, rot: 2.6 }
    ];

    fixedTrees.forEach((pos) => {
      const tree = this.createDarkPineTree(pos.scale);
      tree.position.set(pos.x, 0, pos.z);
      tree.rotation.y = pos.rot;
      this.scene.add(tree);
    });
  }

  createDarkPineTree(scale = 1) {
    const group = new THREE.Group();
    group.scale.set(scale, scale, scale);

    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 4, 8);
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x1c120c, // Dark bark
      roughness: 0.95
    });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 2;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    group.add(trunk);

    // Foliage Layers (Pixelated low-poly cones)
    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x0a1a14, // Dark fantasy emerald/purple shade
      roughness: 0.8,
      flatShading: true
    });

    const layer1 = new THREE.Mesh(new THREE.ConeGeometry(2.2, 3, 7), foliageMat);
    layer1.position.y = 3.5;
    layer1.castShadow = true;

    const layer2 = new THREE.Mesh(new THREE.ConeGeometry(1.7, 2.5, 7), foliageMat);
    layer2.position.y = 4.8;
    layer2.castShadow = true;

    const layer3 = new THREE.Mesh(new THREE.ConeGeometry(1.2, 2, 7), foliageMat);
    layer3.position.y = 6;
    layer3.castShadow = true;

    group.add(layer1, layer2, layer3);
    return group;
  }

  initRocksAndFungi() {
    // 1. Natural mossy boulders
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x1b2333,
      roughness: 0.9,
      flatShading: true
    });

    const boulders = [
      { x: -3.8, y: 0.22, z: 1.6, radius: 0.42 }, // Main left featured boulder in open clearing
      { x: 7.2, y: 0.20, z: 1.6, radius: 0.38 },  // Right flank boulder
      { x: -6.2, y: 0.18, z: -4.0, radius: 0.35 } // Rear left background boulder
    ];

    boulders.forEach((b) => {
      const rockGeo = new THREE.DodecahedronGeometry(b.radius, 1);
      const rock = new THREE.Mesh(rockGeo, rockMat);
      rock.position.set(b.x, b.y, b.z);
      rock.rotation.set(0.4, 0.8, 0.2);
      rock.castShadow = true;
      rock.receiveShadow = true;
      this.scene.add(rock);
    });

    // 2. Bioluminescent Mushrooms (16 mushrooms organically scattered on open mossy soil with 100% collision-free placement)
    const capColors = [0x00f3ff, 0x00e5ff, 0x9333ea, 0x00f3ff, 0x00e5ff, 0x9333ea];
    const mushroomStemMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.4
    });

    // Hand-checked organic scattered coordinates guaranteed clear of rocks, tree trunks, desk & campfire!
    const fixedShroomPositions = [
      // --- Around Main Left Boulder (-3.8, 1.6) ---
      { x: -4.42, z: 1.68, scale: 1.3, rot: 0.4 },
      { x: -3.85, z: 2.25, scale: 1.1, rot: 1.2 },
      { x: -3.15, z: 1.48, scale: 0.95, rot: 2.5 },
      { x: -3.75, z: 0.95, scale: 1.2, rot: 0.8 },
      { x: -4.48, z: 1.12, scale: 1.05, rot: 1.9 },
      { x: -3.22, z: 2.05, scale: 1.15, rot: 2.8 },

      // --- Under Left Pine Trees Clearing ---
      { x: -5.55, z: 0.82, scale: 1.25, rot: 0.6 },
      { x: -5.12, z: -0.15, scale: 1.0, rot: 1.7 },
      { x: -5.92, z: 2.15, scale: 1.35, rot: 2.2 },
      { x: -4.95, z: -1.82, scale: 1.1, rot: 0.3 },
      { x: -5.88, z: -3.12, scale: 1.2, rot: 1.4 },

      // --- Right Forest Clearing ---
      { x: 6.55, z: 1.45, scale: 1.15, rot: 0.9 },
      { x: 7.78, z: 1.25, scale: 1.2, rot: 2.1 },
      { x: 7.22, z: 2.28, scale: 1.0, rot: 1.6 },
      { x: 7.82, z: 2.15, scale: 1.25, rot: 0.5 },
      { x: 6.85, z: 0.92, scale: 1.05, rot: 2.7 }
    ];

    fixedShroomPositions.forEach((pos, idx) => {
      const shroomGroup = new THREE.Group();
      const capColor = capColors[idx % capColors.length];
      const capMat = new THREE.MeshStandardMaterial({
        color: capColor,
        emissive: capColor,
        emissiveIntensity: 1.2,
        roughness: 0.2
      });

      const stemHeight = 0.32 * pos.scale;
      const capRadius = 0.12 * pos.scale;

      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.055, stemHeight, 8), mushroomStemMat);
      stem.position.y = stemHeight / 2;
      stem.castShadow = true;

      const cap = new THREE.Mesh(new THREE.SphereGeometry(capRadius, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), capMat);
      cap.position.y = stemHeight;
      cap.castShadow = true;

      shroomGroup.add(stem, cap);

      shroomGroup.position.set(pos.x, 0, pos.z);
      shroomGroup.rotation.y = pos.rot;
      shroomGroup.rotation.z = Math.sin(idx * 1.5) * 0.14; // Organic slight tilt
      shroomGroup.rotation.x = Math.cos(idx * 1.5) * 0.14;

      this.scene.add(shroomGroup);
    });
  }

  initHangingBranchAndGear() {
    this.hangingBranchGroup = new THREE.Group();

    // 1. Dry, Weathered Gnarled Tree Branch (Sucha sękata gałąź wysoko nad lewym monitorem)
    const branchGeo = new THREE.CylinderGeometry(0.06, 0.16, 4.2, 8);
    const branchMat = new THREE.MeshStandardMaterial({
      color: 0x3d2b1f, // Weathered greyish-brown dry wood
      roughness: 0.98
    });
    const branch = new THREE.Mesh(branchGeo, branchMat);
    branch.rotation.z = Math.PI * 0.47;
    branch.rotation.y = 0.08;
    branch.position.set(-2.8, 4.85, 0.35);
    branch.castShadow = true;
    this.hangingBranchGroup.add(branch);

    // Dry crooked twigs branching out (sękate suche gałązki)
    const twigMat = new THREE.MeshStandardMaterial({ color: 0x2e1f16, roughness: 0.98 });

    const twig1 = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.045, 0.8, 6), twigMat);
    twig1.position.set(-1.2, 4.80, 0.35);
    twig1.rotation.z = -Math.PI * 0.25;
    twig1.rotation.x = 0.3;

    const twig2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.035, 0.6, 6), twigMat);
    twig2.position.set(-3.4, 4.88, 0.35);
    twig2.rotation.z = Math.PI * 0.3;

    this.hangingBranchGroup.add(twig1, twig2);

    // 2. Larger Running Shoes Suspended by Shoelaces (Powiększone buty do biegania na sznurówkach)
    const shoesGroup = new THREE.Group();
    shoesGroup.position.set(-1.80, 4.80, 0.35);

    // Shoelaces tied to the dry branch
    const laceMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xfacc15,
      emissiveIntensity: 0.45,
      roughness: 0.4
    });

    // Tied Shoelace Knot on Branch
    const knotMesh = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.015, 6, 12), laceMat);
    knotMesh.position.set(0, 0, 0);
    shoesGroup.add(knotMesh);

    // Hanging Strings down to shoes
    const stringGeo1 = new THREE.CylinderGeometry(0.008, 0.008, 1.05, 4);
    const string1 = new THREE.Mesh(stringGeo1, laceMat);
    string1.position.set(-0.06, -0.52, 0.02);
    string1.rotation.z = 0.06;

    const stringGeo2 = new THREE.CylinderGeometry(0.008, 0.008, 1.20, 4);
    const string2 = new THREE.Mesh(stringGeo2, laceMat);
    string2.position.set(0.06, -0.60, -0.02);
    string2.rotation.z = -0.06;

    shoesGroup.add(string1, string2);

    // Larger Running Shoe Mesh Generator Function (Powiększony model sneakerów)
    const createRunningShoe = (isLeft) => {
      const shoe = new THREE.Group();

      // White Cushion Sole
      const soleMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 });
      const sole = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.07, 0.40), soleMat);
      sole.position.y = 0.035;
      shoe.add(sole);

      // Electric Blue Mesh Upper Body
      const upperMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.6 });
      const upper = new THREE.Mesh(new THREE.BoxGeometry(0.165, 0.13, 0.35), upperMat);
      upper.position.set(0, 0.12, -0.01);
      shoe.add(upper);

      // Cyan Accent Stripes
      const stripeMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.45 });
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.185, 0.06, 0.18), stripeMat);
      stripe.position.set(0, 0.12, -0.02);
      shoe.add(stripe);

      // Neon Laces Accent
      const shoeLace = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.03, 0.15), laceMat);
      shoeLace.position.set(0, 0.19, 0.04);
      shoe.add(shoeLace);

      shoe.castShadow = true;
      return shoe;
    };

    // Left Shoe (hanging slightly higher)
    const shoeLeft = createRunningShoe(true);
    shoeLeft.position.set(-0.08, -1.05, 0.02);
    shoeLeft.rotation.set(0.3, 0.2, -0.15);

    // Right Shoe (hanging slightly lower)
    const shoeRight = createRunningShoe(false);
    shoeRight.position.set(0.08, -1.20, -0.02);
    shoeRight.rotation.set(0.2, -0.3, 0.2);

    shoesGroup.add(shoeLeft, shoeRight);

    // Raycast Interaction Metadata for Running Shoes
    const shoeMetadata = {
      id: 'running-shoes',
      name: '👟 BUTY DO BIEGANIA (RUNNING SNEAKERS)',
      desc: 'Powiększone buty do biegów długodystansowych i przeszkodowych zawieszone na żółtych sznurówkach na suchej gałęzi sarny. Symbolizują sportową pasję, żelazną dyscyplinę oraz pokonywanie własnych granic przez Czarodzieja Lolq!',
      icon: '👟'
    };
    shoeLeft.children[1].userData = shoeMetadata;
    shoeRight.children[1].userData = shoeMetadata;

    this.hangingBranchGroup.add(shoesGroup);
    this.interactiveObjects.push(shoeLeft.children[1], shoeRight.children[1]);

    this.scene.add(this.hangingBranchGroup);
  }

  getInteractiveObjects() {
    return this.interactiveObjects;
  }

  initFireflies() {
    const fireflyCount = 90;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(fireflyCount * 3);
    const initialY = new Float32Array(fireflyCount);
    const speeds = new Float32Array(fireflyCount);

    for (let i = 0; i < fireflyCount; i++) {
      const radius = 1 + Math.random() * 8;
      const angle = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      const y = 0.5 + Math.random() * 4.5;
      positions[i * 3 + 1] = y;
      initialY[i] = y;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      speeds[i] = 0.5 + Math.random() * 1.5;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Pixel particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#00f3ff';
    ctx.fillRect(4, 4, 8, 8);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(6, 6, 4, 4);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;

    const material = new THREE.PointsMaterial({
      size: 0.18,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.firefliesMesh = new THREE.Points(geometry, material);
    this.fireflyInitialY = initialY;
    this.fireflySpeeds = speeds;
    this.scene.add(this.firefliesMesh);
  }

  update(time) {
    if (!this.firefliesMesh) return;
    const positions = this.firefliesMesh.geometry.attributes.position.array;
    const count = positions.length / 3;

    for (let i = 0; i < count; i++) {
      const speed = this.fireflySpeeds[i];
      const initY = this.fireflyInitialY[i];

      // Bobbing motion
      positions[i * 3 + 1] = initY + Math.sin(time * speed + i) * 0.4;
      // Slight horizontal drift
      positions[i * 3] += Math.cos(time * 0.5 + i) * 0.003;
      positions[i * 3 + 2] += Math.sin(time * 0.5 + i) * 0.003;
    }

    this.firefliesMesh.geometry.attributes.position.needsUpdate = true;
  }
}
