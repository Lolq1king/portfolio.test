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
      {
        id: 'szaman-1',
        title: 'Droga Szamana. Etap 1: Początek',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: -0.48,
        thickness: 0.11,
        color: 0x0d9488,
        icon: '🔮',
        desc: 'Tom 1 popularnej serii LitRPG. Skazany Mahan trafia do wirtualnego świata Barliony jako Szaman i rozpoczyna walkę o przetrwanie.',
        extraInfo: 'Cykl: Droga Szamana (Tom 1 z 7)'
      },
      {
        id: 'szaman-2',
        title: 'Droga Szamana. Etap 2: Gambit Kartosa',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: -0.32,
        thickness: 0.11,
        color: 0xbe123c,
        icon: '♟️',
        desc: 'Tom 2. Rozwój unikalnej klasy Szamana, intrygi w kopalniach Pryzmy oraz rywalizacja z gildiami Barliony.',
        extraInfo: 'Cykl: Droga Szamana (Tom 2 z 7)'
      },
      {
        id: 'szaman-3',
        title: 'Droga Szamana. Etap 3: Tajemnica Mrocznego Lasu',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: -0.16,
        thickness: 0.11,
        color: 0x15803d,
        icon: '🌲',
        desc: 'Tom 3. Wyprawa w niebezpieczne rejony Mrocznego Lasu, poszukiwanie rzadkich składników i potężnych duchów.',
        extraInfo: 'Cykl: Droga Szamana (Tom 3 z 7)'
      },
      {
        id: 'szaman-4',
        title: 'Droga Szamana. Etap 4: Zamek Widmo',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: 0.00,
        thickness: 0.11,
        color: 0x7e22ce,
        icon: '🏰',
        desc: 'Tom 4. Epickie rajdy, oblężenia twierdz i walka o kontrolę nad strategicznymi zasobami świata gry.',
        extraInfo: 'Cykl: Droga Szamana (Tom 4 z 7)'
      },
      {
        id: 'szaman-5',
        title: 'Droga Szamana. Etap 5: Szachy Karmadonta',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: 0.16,
        thickness: 0.11,
        color: 0xd97706,
        icon: '♚',
        desc: 'Tom 5. Złożone rozgrywki polityczne najwyższego szczebla, gdzie każdy ruch może zaważyć o losie Barliony.',
        extraInfo: 'Cykl: Droga Szamana (Tom 5 z 7)'
      },
      {
        id: 'szaman-6',
        title: 'Droga Szamana. Etap 6: Nowy początek',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: 0.32,
        thickness: 0.11,
        color: 0x4338ca,
        icon: '✨',
        desc: 'Tom 6. Próba odbudowania pozycji, pokonanie własnych ograniczeń i ponowne sięgnięcie po potęgę Szamana.',
        extraInfo: 'Cykl: Droga Szamana (Tom 6 z 7)'
      },
      {
        id: 'szaman-7',
        title: 'Droga Szamana. Etap 7: Na tropie stwórcy',
        author: 'Wasilij Machanienko',
        shelf: 3,
        xOffset: 0.48,
        thickness: 0.11,
        color: 0x0284c7,
        icon: '☸️',
        desc: 'Tom 7. Kulminacja i wielki finał siedmiotomowej serii LitRPG o przygodach Mahana w świecie Barliony.',
        extraInfo: 'Cykl: Droga Szamana (Tom 7 z 7)'
      },
      // --- Serie 2: Świat Przeistoczonych (Półka 2) ---
      {
        id: 'przeistoczeni-1',
        title: 'Świat Przeistoczonych. Tom 1: Bez prawa do błędu',
        author: 'Wasilij Machanienko',
        shelf: 2,
        xOffset: -0.24,
        thickness: 0.11,
        color: 0x991b1b,
        icon: '⚠️',
        desc: 'Tom 1 serii Świat Przeistoczonych. Ziemia zostaje włączona w obszar gry obcych, a ludzie muszą walczyć o przetrwanie w nowej, brutalnej rzeczywistości.',
        extraInfo: 'Cykl: Świat Przeistoczonych (Tom 1 z 3)'
      },
      {
        id: 'przeistoczeni-2',
        title: 'Świat Przeistoczonych. Tom 2: Perła południa',
        author: 'Wasilij Machanienko',
        shelf: 2,
        xOffset: -0.08,
        thickness: 0.11,
        color: 0xd97706,
        icon: '💎',
        desc: 'Tom 2. Mark Cather kontynuuje zmagania w przekształconym świecie, dążąc do opanowania kluczowych przyczółków i unikalnych zdolności.',
        extraInfo: 'Cykl: Świat Przeistoczonych (Tom 2 z 3)'
      },
      {
        id: 'przeistoczeni-3',
        title: 'Świat Przeistoczonych. Tom 3: Spersonifikowane noa',
        author: 'Wasilij Machanienko',
        shelf: 2,
        xOffset: 0.08,
        thickness: 0.11,
        color: 0x581c87,
        icon: '⚡',
        desc: 'Tom 3. Kulminacja walki z najeźdźcami, odkrywanie tajemnic wyższej energii Noa oraz ostateczna próba przetrwania ludzkości.',
        extraInfo: 'Cykl: Świat Przeistoczonych (Tom 3 z 3)'
      },
      // --- Serie 3: Level Up (Półka 1) ---
      {
        id: 'levelup-1',
        title: 'Level Up. Tom 1: Re-start',
        author: 'Dan Sugralinow',
        shelf: 1,
        xOffset: -0.24,
        thickness: 0.11,
        color: 0x06b6d4,
        icon: '🎮',
        desc: 'Tom 1 serii Level Up. Trzydziestoletni Phil otrzymuje niezwykły interfejs rzeczywistości z paskami statystyk i poziomów doświadczenia.',
        extraInfo: 'Cykl: Level Up (Tom 1 z 3)'
      },
      {
        id: 'levelup-2',
        title: 'Level Up. Tom 2: Bohater',
        author: 'Dan Sugralinow',
        shelf: 1,
        xOffset: -0.08,
        thickness: 0.11,
        color: 0x16a34a,
        icon: '🆙',
        desc: 'Tom 2. Rozwijanie umiejętności w prawdziwym świecie, pokonywanie kolejnych poziomów trudności i stawianie czoła nowym wyzwaniom.',
        extraInfo: 'Cykl: Level Up (Tom 2 z 3)'
      },
      {
        id: 'levelup-3',
        title: 'Level Up. Tom 3: Próba',
        author: 'Dan Sugralinow',
        shelf: 1,
        xOffset: 0.08,
        thickness: 0.11,
        color: 0xdc2626,
        icon: '🏆',
        desc: 'Tom 3. Ostateczny test możliwości Phila, wielkie starcie oraz próba zrozumienia natury tajemniczego interfejsu.',
        extraInfo: 'Cykl: Level Up (Tom 3 z 3)'
      }
    ];

    this.createBookshelfFrame();
    this.createBooks();

    this.scene.add(this.group);
  }

  addBook(bookInfo) {
    this.booksData.push(bookInfo);
    this.createSingleBook(bookInfo);
  }

  createBookshelfFrame() {
    // Enlarged width (1.65) to easily accommodate full book series on a single shelf
    const width = 1.65;
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

    this.shelfYPositions.forEach((y) => {
      const shelf = new THREE.Mesh(shelfGeo, woodMat);
      shelf.position.set(0, y, 0);
      shelf.castShadow = true;
      shelf.receiveShadow = true;
      this.group.add(shelf);
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

  createBooks() {
    this.booksData.forEach((bookInfo) => this.createSingleBook(bookInfo));
  }

  createSingleBook(bookInfo) {
    const shelfIndex = Math.min(Math.max((bookInfo.shelf || 1) - 1, 0), this.shelfYPositions.length - 1);
    const shelfY = this.shelfYPositions[shelfIndex] + 0.035;

    const bookThickness = bookInfo.thickness || (0.09 + Math.random() * 0.03);
    const bookHeight = bookInfo.height || (0.42 + Math.random() * 0.08);
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
