import * as THREE from 'three';

export class Bookshelf {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    // Positioned to the right of the desk behind the bioluminescent mushrooms
    this.group.position.set(3.4, 0, 0.4);
    this.group.rotation.y = -0.35; // Angled slightly towards the camera

    this.interactiveObjects = [];
    this.booksData = []; // Empty bookshelf ready for user-specified books

    this.createBookshelfFrame();
    this.createBooks();

    this.scene.add(this.group);
  }

  addBook(bookInfo) {
    this.booksData.push(bookInfo);
    this.createSingleBook(bookInfo);
  }

  createBookshelfFrame() {
    const width = 1.3;
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
