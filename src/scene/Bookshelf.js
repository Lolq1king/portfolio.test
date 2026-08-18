import * as THREE from 'three';

export class Bookshelf {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    // Positioned prominently to the right of the desk, 100% visible and unobstructed
    this.group.position.set(3.5, 0, 0.8);
    this.group.rotation.y = -0.42; // Angled elegantly towards the camera

    this.interactiveObjects = [];
    this.booksData = [
      // =========================================================================
      // --- SERIA 1: DROGA SZAMANA (Wasilij Machanienko) - 7 Tomów na Półce 3 (Górna) ---
      // =========================================================================
      {
        id: 'szaman-1',
        title: 'Droga Szamana. Etap 1: Początek',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: -0.85,
        thickness: 0.085,
        color: 0x0f766e,
        icon: '🔮',
        desc: 'Tom 1 serii Droga Szamana (LitRPG). Skazany Mahan trafia do wirtualnego świata Barliony jako Szaman i rozpoczyna walkę o przetrwanie.',
        extraInfo: 'Gatunek: LitRPG ⚔️ | Cykl: Droga Szamana (Tom 1 z 7)'
      },
      {
        id: 'szaman-2',
        title: 'Droga Szamana. Etap 2: Gambit Kartosa',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: -0.75,
        thickness: 0.085,
        color: 0x0d9488,
        icon: '♟️',
        desc: 'Tom 2. Rozwój unikalnej klasy Szamana, intrygi w kopalniach Pryzmy oraz rywalizacja z gildiami Barliony.',
        extraInfo: 'Gatunek: LitRPG ⚔️ | Cykl: Droga Szamana (Tom 2 z 7)'
      },
      {
        id: 'szaman-3',
        title: 'Droga Szamana. Etap 3: Tajemnica Mrocznego Lasu',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: -0.65,
        thickness: 0.085,
        color: 0x14b8a6,
        icon: '🌲',
        desc: 'Tom 3. Wyprawa w niebezpieczne rejony Mrocznego Lasu, poszukiwanie rzadkich składników i potężnych duchów.',
        extraInfo: 'Gatunek: LitRPG ⚔️ | Cykl: Droga Szamana (Tom 3 z 7)'
      },
      {
        id: 'szaman-4',
        title: 'Droga Szamana. Etap 4: Zamek Widmo',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: -0.55,
        thickness: 0.085,
        color: 0x0284c7,
        icon: '🏰',
        desc: 'Tom 4. Epickie rajdy, oblężenia twierdz i walka o kontrolę nad strategicznymi zasobami świata gry.',
        extraInfo: 'Gatunek: LitRPG ⚔️ | Cykl: Droga Szamana (Tom 4 z 7)'
      },
      {
        id: 'szaman-5',
        title: 'Droga Szamana. Etap 5: Szachy Karmadonta',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: -0.45,
        thickness: 0.085,
        color: 0x2563eb,
        icon: '♚',
        desc: 'Tom 5. Złożone rozgrywki polityczne najwyższego szczebla, gdzie każdy ruch może zaważyć o losie Barliony.',
        extraInfo: 'Gatunek: LitRPG ⚔️ | Cykl: Droga Szamana (Tom 5 z 7)'
      },
      {
        id: 'szaman-6',
        title: 'Droga Szamana. Etap 6: Nowy początek',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: -0.35,
        thickness: 0.085,
        color: 0x7c3aed,
        icon: '✨',
        desc: 'Tom 6. Próba odbudowania pozycji, pokonanie własnych ograniczeń i ponowne sięgnięcie po potęgę Szamana.',
        extraInfo: 'Gatunek: LitRPG ⚔️ | Cykl: Droga Szamana (Tom 6 z 7)'
      },
      {
        id: 'szaman-7',
        title: 'Droga Szamana. Etap 7: Na tropie stwórcy',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: -0.25,
        thickness: 0.085,
        color: 0x4338ca,
        icon: '☸️',
        desc: 'Tom 7. Kulminacja i wielki finał siedmiotomowej serii LitRPG o przygodach Mahana w świecie Barliony.',
        extraInfo: 'Gatunek: LitRPG ⚔️ | Cykl: Droga Szamana (Tom 7 z 7)'
      },

      // =================================================================================
      // --- SERIA 2: ŚWIAT PRZEISTOCZONYCH (Wasilij Machanienko) - 3 Tomy na Półce 3 (Górna) ---
      // =================================================================================
      {
        id: 'przeistoczeni-1',
        title: 'Świat Przeistoczonych. Tom 1: Bez prawa do błędu',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: -0.04,
        thickness: 0.085,
        color: 0x991b1b,
        icon: '⚠️',
        desc: 'Tom 1 serii Świat Przeistoczonych (LitRPG). Ziemia zostaje włączona w obszar gry obcych, a ludzie muszą walczyć o przetrwanie.',
        extraInfo: 'Gatunek: LitRPG ⚔️ | Cykl: Świat Przeistoczonych (Tom 1 z 3)'
      },
      {
        id: 'przeistoczeni-2',
        title: 'Świat Przeistoczonych. Tom 2: Perła południa',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: 0.06,
        thickness: 0.085,
        color: 0xbe123c,
        icon: '💎',
        desc: 'Tom 2. Mark Cather kontynuuje zmagania w przekształconym świecie, dążąc do opanowania kluczowych przyczółków i zdolności.',
        extraInfo: 'Gatunek: LitRPG ⚔️ | Cykl: Świat Przeistoczonych (Tom 2 z 3)'
      },
      {
        id: 'przeistoczeni-3',
        title: 'Świat Przeistoczonych. Tom 3: Spersonifikowane noa',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: 0.16,
        thickness: 0.085,
        color: 0x881337,
        icon: '⚡',
        desc: 'Tom 3. Kulminacja walki z najeźdźcami, odkrywanie tajemnic wyższej energii Noa oraz ostateczna próba przetrwania.',
        extraInfo: 'Gatunek: LitRPG ⚔️ | Cykl: Świat Przeistoczonych (Tom 3 z 3)'
      },

      // ========================================================================
      // --- SERIA 3: LEVEL UP (Dan Sugralinow) - 3 Tomy na Półce 3 (Górna) ---
      // ========================================================================
      {
        id: 'levelup-1',
        title: 'Level Up. Tom 1: Re-start',
        author: 'Dan Sugralinow',
        shelf: 3,
        xOffset: 0.37,
        thickness: 0.085,
        color: 0x06b6d4,
        icon: '🎮',
        desc: 'Tom 1 serii Level Up (LitRPG/GameLit). Phil otrzymuje niezwykły interfejs rzeczywistości z paskami statystyk i poziomów.',
        extraInfo: 'Gatunek: LitRPG 🎮 | Cykl: Level Up (Tom 1 z 3)'
      },
      {
        id: 'levelup-2',
        title: 'Level Up. Tom 2: Bohater',
        author: 'Dan Sugralinow',
        shelf: 3,
        xOffset: 0.47,
        thickness: 0.085,
        color: 0x16a34a,
        icon: '🆙',
        desc: 'Tom 2. Rozwijanie umiejętności w prawdziwym świecie, pokonywanie kolejnych poziomów trudności i nowe wyzwania.',
        extraInfo: 'Gatunek: LitRPG 🎮 | Cykl: Level Up (Tom 2 z 3)'
      },
      {
        id: 'levelup-3',
        title: 'Level Up. Tom 3: Próba',
        author: 'Dan Sugralinow',
        shelf: 3,
        xOffset: 0.57,
        thickness: 0.085,
        color: 0xdc2626,
        icon: '🏆',
        desc: 'Tom 3. Ostateczny test możliwości Phila, wielkie starcie oraz próba zrozumienia natury tajemniczego interfejsu.',
        extraInfo: 'Gatunek: LitRPG 🎮 | Cykl: Level Up (Tom 3 z 3)'
      }
    ];

    this.createBookshelfFrame();
    this.createLitRPGHeaderPlaque();
    this.createSeriesDividers();
    this.createBooks();

    this.scene.add(this.group);
  }

  addBook(bookInfo) {
    this.booksData.push(bookInfo);
    this.createSingleBook(bookInfo);
  }

  createBookshelfFrame() {
    // Extra wide width (2.05) to accommodate ALL 13 LitRPG books together on Shelf 3 with distinct series sections!
    const width = 2.05;
    const height = 3.4;
    const depth = 0.55;

    // Dark Oak Wood Material
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x2b180d,
      roughness: 0.8,
      metalness: 0.1
    });

    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x1c0f08,
      roughness: 0.9
    });

    // 1. Two Tall Side Panels
    const sideGeo = new THREE.BoxGeometry(0.08, height, depth);
    const leftSide = new THREE.Mesh(sideGeo, woodMat);
    leftSide.position.set(-width / 2, height / 2, 0);
    leftSide.castShadow = true;
    leftSide.receiveShadow = true;

    const rightSide = new THREE.Mesh(sideGeo, woodMat);
    rightSide.position.set(width / 2, height / 2, 0);
    rightSide.castShadow = true;
    rightSide.receiveShadow = true;

    this.group.add(leftSide, rightSide);

    // 2. Top Crown Cap & Bottom Base
    const topCapGeo = new THREE.BoxGeometry(width + 0.12, 0.14, depth + 0.08);
    const topCap = new THREE.Mesh(topCapGeo, trimMat);
    topCap.position.set(0, height + 0.07, 0);
    topCap.castShadow = true;

    const baseGeo = new THREE.BoxGeometry(width + 0.1, 0.16, depth + 0.06);
    const base = new THREE.Mesh(baseGeo, trimMat);
    base.position.set(0, 0.08, 0);
    base.castShadow = true;

    this.group.add(topCap, base);

    // 3. Wooden Back Panel
    const backGeo = new THREE.BoxGeometry(width, height, 0.04);
    const backPanel = new THREE.Mesh(backGeo, trimMat);
    backPanel.position.set(0, height / 2, -depth / 2 + 0.02);
    backPanel.receiveShadow = true;
    this.group.add(backPanel);

    // 4. Three Horizontal Shelves
    const shelfGeo = new THREE.BoxGeometry(width, 0.07, depth - 0.04);
    this.shelfYPositions = [0.85, 1.75, 2.65];

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.85,
      roughness: 0.35
    });

    this.shelfYPositions.forEach((y, idx) => {
      const shelf = new THREE.Mesh(shelfGeo, woodMat);
      shelf.position.set(0, y, 0);
      shelf.castShadow = true;
      shelf.receiveShadow = true;
      this.group.add(shelf);

      // On Shelf 3 (Top Shelf, idx === 2), add 3 distinct front brass series plaques!
      if (idx === 2) {
        const shelfPlaques = [
          { name: '🔮 CYKL: DROGA SZAMANA (Tom 1-7)', x: -0.55, w: 0.64, desc: 'Górna Półka LitRPG – Cykl "Droga Szamana" (Wasilij Machanienko, 7 tomów)' },
          { name: '⚠️ CYKL: ŚWIAT PRZEISTOCZONYCH (Tom 1-3)', x: 0.06, w: 0.34, desc: 'Górna Półka LitRPG – Cykl "Świat Przeistoczonych" (Wasilij Machanienko, 3 tomy)' },
          { name: '🎮 CYKL: LEVEL UP (Tom 1-3)', x: 0.47, w: 0.34, desc: 'Górna Półka LitRPG – Cykl "Level Up" (Dan Sugralinow, 3 tomy)' }
        ];

        shelfPlaques.forEach((tag, tIdx) => {
          const plateGeo = new THREE.BoxGeometry(tag.w, 0.045, 0.015);
          const plate = new THREE.Mesh(plateGeo, brassMat);
          plate.position.set(tag.x, y, depth / 2 - 0.01);
          plate.userData = {
            id: `shelf-series-tag-${tIdx}`,
            name: tag.name,
            desc: tag.desc,
            icon: '⚔️',
            extraInfo: 'Kategoria: Górna Półka Powieści z Gatunku LitRPG'
          };
          this.group.add(plate);
          this.interactiveObjects.push(plate);
        });
      }
    });

    // 5. Iron Corner Brackets Accent
    const ironMat = new THREE.MeshStandardMaterial({ color: 0x1f242d, metalness: 0.8, roughness: 0.4 });
    const bracketGeo = new THREE.BoxGeometry(0.12, 0.12, 0.12);

    [-width / 2, width / 2].forEach((x) => {
      const b1 = new THREE.Mesh(bracketGeo, ironMat);
      b1.position.set(x, height, depth / 2);
      this.group.add(b1);
    });
  }

  createSeriesDividers() {
    // Golden Metallic Bookend Dividers separating the series on Top Shelf 3 (y = 2.65)
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.25
    });

    const shelfY = 2.65 + 0.035;

    [-0.15, 0.26].forEach((xPos, i) => {
      const dividerGroup = new THREE.Group();
      dividerGroup.position.set(xPos, shelfY, 0.02);

      // Vertical Plate Divider
      const plateGeo = new THREE.BoxGeometry(0.02, 0.48, 0.36);
      const plate = new THREE.Mesh(plateGeo, goldMat);
      plate.position.y = 0.24;
      plate.castShadow = true;
      dividerGroup.add(plate);

      // Base Support
      const baseGeo = new THREE.BoxGeometry(0.08, 0.04, 0.38);
      const base = new THREE.Mesh(baseGeo, goldMat);
      base.position.y = 0.02;
      dividerGroup.add(base);

      this.group.add(dividerGroup);
    });
  }

  createLitRPGHeaderPlaque() {
    // Elegant Golden Arch Header Plaque at the top of the bookshelf
    const plaqueGeo = new THREE.BoxGeometry(1.4, 0.22, 0.05);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.25
    });
    const plaque = new THREE.Mesh(plaqueGeo, goldMat);
    plaque.position.set(0, 3.58, 0.24);
    plaque.castShadow = true;

    // Glowing Rune Gem in the center of top plaque
    const gemGeo = new THREE.DodecahedronGeometry(0.08, 0);
    const gemMat = new THREE.MeshStandardMaterial({
      color: 0x00f3ff,
      emissive: 0x00f3ff,
      emissiveIntensity: 0.9,
      roughness: 0.1
    });
    const gem = new THREE.Mesh(gemGeo, gemMat);
    gem.position.set(0, 0, 0.035);
    plaque.add(gem);

    plaque.userData = {
      id: 'litrpg-shelf-header',
      name: '⚔️ GATUNEK: KOLEKCJA LITRPG ⚔️',
      desc: 'Wszystkie powieści z gatunku LitRPG (Literary Role Playing Game) zostały zebrane na jednej głównej półce z wyraźnym podziałem na poszczególne cykle autorskie.',
      icon: '🎮',
      extraInfo: 'Półka LitRPG zawiera 3 serie (13 tomów):\n1. Droga Szamana (7 tomów)\n2. Świat Przeistoczonych (3 tomy)\n3. Level Up (3 tomy)'
    };

    this.group.add(plaque);
    this.interactiveObjects.push(plaque);
  }

  createBooks() {
    this.booksData.forEach((bookInfo) => this.createSingleBook(bookInfo));
  }

  createSingleBook(bookInfo) {
    const shelfIndex = Math.min(Math.max((bookInfo.shelf || 1) - 1, 0), this.shelfYPositions.length - 1);
    const shelfY = this.shelfYPositions[shelfIndex] + 0.035;

    const bookThickness = bookInfo.thickness || 0.085;
    const bookHeight = bookInfo.height || 0.44;
    const bookDepth = 0.38;

    const bookGeo = new THREE.BoxGeometry(bookThickness, bookHeight, bookDepth);
    const bookMat = new THREE.MeshStandardMaterial({
      color: bookInfo.color || 0x3b82f6,
      roughness: 0.6,
      metalness: 0.1
    });

    const bookMesh = new THREE.Mesh(bookGeo, bookMat);
    bookMesh.position.set(bookInfo.xOffset || 0, shelfY + bookHeight / 2, 0.02);
    bookMesh.castShadow = true;
    bookMesh.receiveShadow = true;

    // Golden Spine Accent
    const spineGeo = new THREE.BoxGeometry(bookThickness + 0.005, bookHeight * 0.25, 0.01);
    const spineMat = new THREE.MeshStandardMaterial({
      color: 0xffb700,
      metalness: 0.8,
      roughness: 0.3
    });
    const spine = new THREE.Mesh(spineGeo, spineMat);
    spine.position.set(0, 0, bookDepth / 2 + 0.005);
    bookMesh.add(spine);

    // User Metadata for interaction
    bookMesh.userData = {
      id: bookInfo.id || `book-${Date.now()}`,
      name: bookInfo.title || 'Książka',
      desc: bookInfo.author ? `Autor: ${bookInfo.author}\n\n${bookInfo.desc || ''}` : (bookInfo.desc || ''),
      icon: bookInfo.icon || '📚',
      extraInfo: bookInfo.extraInfo || ''
    };

    this.group.add(bookMesh);
    this.interactiveObjects.push(bookMesh);
  }
}
