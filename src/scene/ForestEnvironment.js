import * as THREE from 'three';

export class ForestEnvironment {
  constructor(scene) {
    this.scene = scene;
    this.fireflies = [];
    this.initGround();
    this.initTrees();
    this.initRocksAndFungi();
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
    ctx.fillStyle = '#0a1a14'; // Dark emerald base
    ctx.fillRect(0, 0, 64, 64);
    
    // Pixel details
    for (let i = 0; i < 200; i++) {
      const x = Math.floor(Math.random() * 64);
      const y = Math.floor(Math.random() * 64);
      const colors = ['#082218', '#122e23', '#06130e', '#1a3c2c', '#002b1f'];
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
      roughness: 0.9,
      metalness: 0.1
    });

    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.position.y = -0.2;
    ground.receiveShadow = true;
    this.scene.add(ground);
  }

  initTrees() {
    // Generate a ring of dark fantasy pine trees around the clearing
    const treeCount = 28;
    const radius = 10.5;

    for (let i = 0; i < treeCount; i++) {
      const angle = (i / treeCount) * Math.PI * 2 + (Math.random() * 0.2);
      const dist = radius + (Math.random() * 3.5 - 1.5);
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      const scale = 0.8 + Math.random() * 0.5;
      const tree = this.createDarkPineTree(scale);
      tree.position.set(x, 0, z);
      tree.rotation.y = Math.random() * Math.PI;
      this.scene.add(tree);
    }
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
    // Cluster of rocks near the bioluminescent fungi
    const rockMat = new THREE.MeshStandardMaterial({
      color: 0x1b2333,
      roughness: 0.9,
      flatShading: true
    });

    for (let i = 0; i < 8; i++) {
      const rockGeo = new THREE.DodecahedronGeometry(0.4 + Math.random() * 0.4, 1);
      const rock = new THREE.Mesh(rockGeo, rockMat);
      const angle = 0.8 + (i * 0.3);
      const r = 2.2 + Math.random() * 0.8;
      rock.position.set(Math.cos(angle) * r, 0.2, Math.sin(angle) * r);
      rock.rotation.set(Math.random(), Math.random(), Math.random());
      rock.scale.set(1, 0.6 + Math.random() * 0.5, 1);
      rock.castShadow = true;
      rock.receiveShadow = true;
      this.scene.add(rock);
    }

    // Bioluminescent Mushrooms
    const mushroomCapMat = new THREE.MeshStandardMaterial({
      color: 0x00f3ff,
      emissive: 0x00f3ff,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const mushroomStemMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.5
    });

    for (let i = 0; i < 6; i++) {
      const shroomGroup = new THREE.Group();
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.3, 6), mushroomStemMat);
      stem.position.y = 0.15;
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.5), mushroomCapMat);
      cap.position.y = 0.3;

      shroomGroup.add(stem, cap);
      shroomGroup.position.set(2.2 + Math.random() * 0.8, 0, 1.8 + Math.random() * 0.6);
      shroomGroup.scale.setScalar(0.8 + Math.random() * 0.6);
      this.scene.add(shroomGroup);
    }
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
