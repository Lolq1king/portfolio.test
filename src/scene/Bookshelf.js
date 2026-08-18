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
        xOffset: -1.04,
        thickness: 0.072,
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
        xOffset: -0.955,
        thickness: 0.072,
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
        xOffset: -0.87,
        thickness: 0.072,
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
        xOffset: -0.785,
        thickness: 0.072,
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
        xOffset: -0.70,
        thickness: 0.072,
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
        xOffset: -0.615,
        thickness: 0.072,
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
        xOffset: -0.53,
        thickness: 0.072,
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
        xOffset: -0.35,
        thickness: 0.072,
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
        xOffset: -0.265,
        thickness: 0.072,
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
        xOffset: -0.18,
        thickness: 0.072,
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
        xOffset: 0.00,
        thickness: 0.072,
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
        xOffset: 0.085,
        thickness: 0.072,
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
        xOffset: 0.17,
        thickness: 0.072,
        color: 0xdc2626,
        icon: '🏆',
        desc: 'Tom 3. Ostateczny test możliwości Phila, wielkie starcie oraz próba zrozumienia natury tajemniczego interfejsu.',
        extraInfo: 'Gatunek: LitRPG 🎮 | Cykl: Level Up (Tom 3 z 3)'
      },

      // ==================================================================================
      // --- SERIA 4: DUNGEON CRAWLER CARL (Matt Dinniman) - 2 Tomy na Półce 3 (Górna) ---
      // ==================================================================================
      {
        id: 'dungeon-1',
        title: 'Dungeon Crawler Carl. Tom 1: Dungeon Crawler Carl',
        author: 'Matt Dinniman',
        shelf: 3,
        xOffset: 0.35,
        thickness: 0.072,
        color: 0xec4899,
        icon: '🐱',
        desc: 'Tom 1 słynnej serii LitRPG Matta Dinnimana. Carl i jego kotka Księżniczka Pączuś zostają wciągnięci do morderczego lochu kosmicznego reality show.',
        extraInfo: 'Gatunek: LitRPG 🐱 | Cykl: Dungeon Crawler Carl (Tom 1 z 2)'
      },
      {
        id: 'dungeon-2',
        title: 'Dungeon Crawler Carl. Tom 2: Sądny dzień Carla',
        author: 'Matt Dinniman',
        shelf: 3,
        xOffset: 0.435,
        thickness: 0.072,
        color: 0xe11d48,
        icon: '💣',
        desc: 'Tom 2 (Sądny dzień Carla). Dalsza walka Carla i Pączka na II poziomie lochu, gdzie zasady gry stają się jeszcze bardziej szalone.',
        extraInfo: 'Gatunek: LitRPG 💣 | Cykl: Dungeon Crawler Carl (Tom 2 z 2)'
      },

      // ==================================================================================
      // --- SERIA 5: PRIMAL HUNTER (Zogarth) - 1 Tom na Półce 3 (Górna) ---
      // ==================================================================================
      {
        id: 'primal-1',
        title: 'Primal Hunter. Tom 1',
        author: 'Zogarth',
        shelf: 3,
        xOffset: 0.61,
        thickness: 0.072,
        color: 0x047857,
        icon: '🏹',
        desc: 'Tom 1 słynnej serii LitRPG Zogartha. Jake trafia wraz z współpracownikami do Tutorialu i odkrywa w sobie talent urodzonego łowcy.',
        extraInfo: 'Gatunek: LitRPG 🏹 | Cykl: Primal Hunter (Tom 1)'
      },

      // ======================================================================================
      // --- KATEGORIA: FANTASY & SCI-FI ---
      // --- SERIA 6: WIEDŹMIN (Andrzej Sapkowski) - 8 Tomów na Półce 2 (Środkowa) ---
      // ======================================================================================
      {
        id: 'wiedzmin-1',
        title: 'Wiedźmin. Tom 1: Ostatnie życzenie',
        author: 'Andrzej Sapkowski',
        shelf: 2,
        xOffset: -1.04,
        thickness: 0.072,
        color: 0x1e3a29,
        icon: '📜',
        desc: 'Zbiór opowiadań wprowadzający w wiedźmiński świat. Historia pierwszych zleceń Geralta z Rivii i jego przeznaczenia.',
        extraInfo: 'Gatunek: Fantasy 🐺 | Cykl: Wiedźmin (Zbiór Opowiadań 1)'
      },
      {
        id: 'wiedzmin-2',
        title: 'Wiedźmin. Tom 2: Miecz przeznaczenia',
        author: 'Andrzej Sapkowski',
        shelf: 2,
        xOffset: -0.955,
        thickness: 0.072,
        color: 0x155e75,
        icon: '⚔️',
        desc: 'Drugi zbiór opowiadań. Geralt spotyka Ciri w Brokilonie i poznaje nieuchronność Prawa Niespodzianki.',
        extraInfo: 'Gatunek: Fantasy 🐺 | Cykl: Wiedźmin (Zbiór Opowiadań 2)'
      },
      {
        id: 'wiedzmin-3',
        title: 'Wiedźmin. Tom 3: Krew elfów (Saga Tom 1)',
        author: 'Andrzej Sapkowski',
        shelf: 2,
        xOffset: -0.87,
        thickness: 0.072,
        color: 0x991b1b,
        icon: '🩸',
        desc: 'Pierwszy tom pięciotomowej Sagi o Wiedźminie. Ciri szkoli się w Kaer Morhen, podczas gdy świat zmierza ku wojnie.',
        extraInfo: 'Gatunek: Fantasy 🐺 | Cykl: Wiedźmin (Saga Tom 1)'
      },
      {
        id: 'wiedzmin-4',
        title: 'Wiedźmin. Tom 4: Czas pogardy (Saga Tom 2)',
        author: 'Andrzej Sapkowski',
        shelf: 2,
        xOffset: -0.785,
        thickness: 0.072,
        color: 0x854d0e,
        icon: '⏳',
        desc: 'Drugi tom Sagi. przewrót na wyspie Thanedd niszczy Radę Czarodziejów i rozdziela Geralta, Yennefer oraz Ciri.',
        extraInfo: 'Gatunek: Fantasy 🐺 | Cykl: Wiedźmin (Saga Tom 2)'
      },
      {
        id: 'wiedzmin-5',
        title: 'Wiedźmin. Tom 5: Chrzest ognia (Saga Tom 3)',
        author: 'Andrzej Sapkowski',
        shelf: 2,
        xOffset: -0.70,
        thickness: 0.072,
        color: 0x9a3412,
        icon: '🔥',
        desc: 'Trzeci tom Sagi. Geralt wyrusza w kompanii Jaskra, Milvy, Cahira, Regisa i Angoulême na poszukiwanie Ciri.',
        extraInfo: 'Gatunek: Fantasy 🐺 | Cykl: Wiedźmin (Saga Tom 3)'
      },
      {
        id: 'wiedzmin-6',
        title: 'Wiedźmin. Tom 6: Wieża Jaskółki (Saga Tom 4)',
        author: 'Andrzej Sapkowski',
        shelf: 2,
        xOffset: -0.615,
        thickness: 0.072,
        color: 0x374151,
        icon: '🏰',
        desc: 'Czwarty tom Sagi. Ciri leczy rany u pustelnika Vysogoty i stawia czoła bezwzględnemu zabójcy Bonhartowi.',
        extraInfo: 'Gatunek: Fantasy 🐺 | Cykl: Wiedźmin (Saga Tom 4)'
      },
      {
        id: 'wiedzmin-7',
        title: 'Wiedźmin. Tom 7: Pani Jeziora (Saga Tom 5)',
        author: 'Andrzej Sapkowski',
        shelf: 2,
        xOffset: -0.53,
        thickness: 0.072,
        color: 0x1e40af,
        icon: '🌊',
        desc: 'Wielki finał Sagi o Wiedźminie. Kulminacyjne walki w zamku Stygga, bitwa pod Brenną i dopełnienie losów bohaterów.',
        extraInfo: 'Gatunek: Fantasy 🐺 | Cykl: Wiedźmin (Saga Tom 5)'
      },
      {
        id: 'wiedzmin-8',
        title: 'Wiedźmin. Tom 8: Sezon burz',
        author: 'Andrzej Sapkowski',
        shelf: 2,
        xOffset: -0.445,
        thickness: 0.072,
        color: 0x065f46,
        icon: '⚡',
        desc: 'Powieść osadzona w czasie przygód Geralta sprzed wydarzeń Sagi. Kradzież mieczy wiedźmińskich i intrygi czarodziejów.',
        extraInfo: 'Gatunek: Fantasy 🐺 | Cykl: Wiedźmin (Powieść Samodzielna)'
      },

      // ======================================================================================
      // --- SERIA 7: HARRY POTTER (J.K. Rowling) - 7 Tomów na Półce 2 (Środkowa) ---
      // ======================================================================================
      {
        id: 'harry-1',
        title: 'Harry Potter i Kamień Filozoficzny (Tom 1)',
        author: 'J.K. Rowling',
        shelf: 2,
        xOffset: -0.27,
        thickness: 0.072,
        color: 0xb91c1c,
        icon: '💎',
        desc: 'Tom 1 słynnej serii. Jedenastoletni Harry odkrywa swoje czarodziejskie pochodzenie i rozpoczyna naukę w Hogwarcie.',
        extraInfo: 'Gatunek: Fantasy / Magia ⚡ | Cykl: Harry Potter (Tom 1 z 7)'
      },
      {
        id: 'harry-2',
        title: 'Harry Potter i Komnata Tajemnic (Tom 2)',
        author: 'J.K. Rowling',
        shelf: 2,
        xOffset: -0.185,
        thickness: 0.072,
        color: 0x047857,
        icon: '🐍',
        desc: 'Tom 2. Tajemniczy potwór z Komnaty Tajemnic atakuje uczniów Hogwartu. Harry odkrywa mroczne tajemnice przeszłości Szkoły Magii.',
        extraInfo: 'Gatunek: Fantasy / Magia ⚡ | Cykl: Harry Potter (Tom 2 z 7)'
      },
      {
        id: 'harry-3',
        title: 'Harry Potter i Więzień Azkabanu (Tom 3)',
        author: 'J.K. Rowling',
        shelf: 2,
        xOffset: -0.10,
        thickness: 0.072,
        color: 0x6b21a8,
        icon: '🐺',
        desc: 'Tom 3. Z więzienia Azkaban ucieka zbieg Sirius Black. Harry poznaje prawdę o swoich rodzicach i tajemniczych Syriuszu oraz Remusie Lupinie.',
        extraInfo: 'Gatunek: Fantasy / Magia ⚡ | Cykl: Harry Potter (Tom 3 z 7)'
      },
      {
        id: 'harry-4',
        title: 'Harry Potter i Czara Ognia (Tom 4)',
        author: 'J.K. Rowling',
        shelf: 2,
        xOffset: -0.015,
        thickness: 0.072,
        color: 0xc2410c,
        icon: '🏆',
        desc: 'Tom 4. Turniej Trójmagiczny w Hogwarcie. Nieoczekiwany wybór czwartego reprezentanta prowadzi do odrodzenia Lorda Voldemorta.',
        extraInfo: 'Gatunek: Fantasy / Magia ⚡ | Cykl: Harry Potter (Tom 4 z 7)'
      },
      {
        id: 'harry-5',
        title: 'Harry Potter i Zakon Feniksa (Tom 5)',
        author: 'J.K. Rowling',
        shelf: 2,
        xOffset: 0.07,
        thickness: 0.072,
        color: 0x1e3a8a,
        icon: '🦅',
        desc: 'Tom 5. Formowanie podziemnego Zakonu Feniksa, opór przeciwko Ministerstwu Magii oraz powołanie Gwardii Dumbledore’a.',
        extraInfo: 'Gatunek: Fantasy / Magia ⚡ | Cykl: Harry Potter (Tom 5 z 7)'
      },
      {
        id: 'harry-6',
        title: 'Harry Potter i Książę Półkrwi (Tom 6)',
        author: 'J.K. Rowling',
        shelf: 2,
        xOffset: 0.155,
        thickness: 0.072,
        color: 0x854d0e,
        icon: '🧪',
        desc: 'Tom 6. Harry i Dumbledore odkrywają tajemnice Horkruksów Voldemorta. Mroczne zdarzenia w wieży astronomicznej.',
        extraInfo: 'Gatunek: Fantasy / Magia ⚡ | Cykl: Harry Potter (Tom 6 z 7)'
      },
      {
        id: 'harry-7',
        title: 'Harry Potter i Insygnia Śmierci (Tom 7)',
        author: 'J.K. Rowling',
        shelf: 2,
        xOffset: 0.24,
        thickness: 0.072,
        color: 0x4c1d95,
        icon: '💀',
        desc: 'Kulminacja i ostatni tom serii. Wyprawa w poszukiwaniu Horkruksów oraz wielka Bitwa o Hogwart dająca finał całej opowieści.',
        extraInfo: 'Gatunek: Fantasy / Magia ⚡ | Cykl: Harry Potter (Tom 7 z 7)'
      },

      // ======================================================================================
      // --- SERIA 8: GWIEZDNY WĘDROWIEC (Rafaello Morgan) - 1 Tom na Półce 2 (Środkowa) ---
      // ======================================================================================
      {
        id: 'gwiezdny-1',
        title: 'Gwiezdny wędrowiec',
        author: 'Rafaello Morgan',
        shelf: 2,
        xOffset: 0.41,
        thickness: 0.072,
        color: 0x0284c7,
        icon: '🚀',
        desc: 'Powieść Sci-Fi autorstwa Rafaello Morgana. Pilot marsjańskiego frachtowca Sven Ante zostaje wciągnięty w galaktyczny konflikt między Ligą Planet a Imperium.',
        extraInfo: 'Gatunek: Sci-Fi 🚀 | Powieść: Gwiezdny wędrowiec (Rafaello Morgan)'
      },

      // ======================================================================================
      // --- KATEGORIA: SAMOROZWÓJ, BIOGRAFIE & FINANSE (PÓŁKA 1 - DOLNA) ---
      // ======================================================================================
      {
        id: 'samorozwoj-1',
        title: 'Maszyna myśląca. Jensen Huang, Nvidia i najbardziej pożądany chip na świecie',
        author: 'Stephen Witt',
        shelf: 1,
        xOffset: -0.75,
        thickness: 0.08,
        color: 0x15803d,
        icon: '🤖',
        desc: 'Biografia Jensena Huanga oraz historia firmy Nvidia. Ewolucja od producenta kart graficznych do giganta sztucznej inteligencji.',
        extraInfo: 'Gatunek: Biografia / Technologia 🤖 | Maszyna myśląca (Stephen Witt)'
      },
      {
        id: 'samorozwoj-2',
        title: 'Historia LEGO. Opowieść o rodzinie, która stworzyła najsłynniejszą zabawkę na świecie',
        author: 'Jens Andersen',
        shelf: 1,
        xOffset: -0.64,
        thickness: 0.08,
        color: 0xd97706,
        icon: '🧱',
        desc: 'Obszerna biografia i historia rodziny Ole Kirka Christiansena, która zbudowała globalne imperium LEGO z drewnianych klocków.',
        extraInfo: 'Gatunek: Biografia / Biznes 🧱 | Historia LEGO (Jens Andersen)'
      },
      {
        id: 'samorozwoj-3',
        title: 'Bogaty ojciec, biedny ojciec',
        author: 'Robert T. Kiyosaki',
        shelf: 1,
        xOffset: -0.38,
        thickness: 0.08,
        color: 0x7c3aed,
        icon: '💰',
        desc: 'Bestsellerowy poradnik edukacji finansowej. Klasyka budowania niezależności finansowej, aktywów i świadomości pieniądza.',
        extraInfo: 'Gatunek: Finanse / Samorozwój 💰 | Bogaty ojciec, biedny ojciec'
      },
      {
        id: 'samorozwoj-4',
        title: 'Kwadrant przepływu pieniędzy',
        author: 'Robert T. Kiyosaki',
        shelf: 1,
        xOffset: -0.27,
        thickness: 0.08,
        color: 0x4338ca,
        icon: '📊',
        desc: 'Przewodnik ojca do wolności finansowej. Analiza 4 grup ludzi tworzących świat biznesu: Pracownik, Samozatrudniony, Biznesmen, Inwestor.',
        extraInfo: 'Gatunek: Finanse / Biznes 📊 | Kwadrant przepływu pieniędzy'
      },
      {
        id: 'samorozwoj-5',
        title: 'Rozmyślnik Jacka Walkiewicza',
        author: 'Jacek Walkiewicz',
        shelf: 1,
        xOffset: 0.10,
        thickness: 0.08,
        color: 0x0284c7,
        icon: '💡',
        desc: 'Przemyślenia i refleksje Jacka Walkiewicza o odwadze, marzeniach, podejmowaniu decyzji oraz budowaniu własnej drogi życiowej.',
        extraInfo: 'Gatunek: Samorozwój / Psychologia 💡 | Rozmyślnik Jacka Walkiewicza'
      },
      {
        id: 'samorozwoj-6',
        title: 'Pełna moc życia. O uwalnianiu własnego potencjału',
        author: 'Jacek Walkiewicz',
        shelf: 1,
        xOffset: 0.21,
        thickness: 0.08,
        color: 0xe11d48,
        icon: '⚡',
        desc: 'Kultowa książka o uwalnianiu własnego potencjału, przekraczaniu strefy komfortu i odważnym realizowaniu pasji.',
        extraInfo: 'Gatunek: Samorozwój / Motywacja ⚡ | Pełna moc życia'
      },
      {
        id: 'samorozwoj-7',
        title: 'Inteligentny inwestor. Najlepsza książka o inwestowaniu wartościowym',
        author: 'Benjamin Graham',
        shelf: 1,
        xOffset: -0.16,
        thickness: 0.08,
        color: 0x065f46,
        icon: '📈',
        desc: 'Biblia inwestowania wartościowego uznawana przez Warrena Buffetta za najlepszą książkę o finansach, jaką kiedykolwiek napisano.',
        extraInfo: 'Gatunek: Finanse / Inwestowanie 📈 | Inteligentny inwestor'
      },
      {
        id: 'samorozwoj-8',
        title: '12 życiowych zasad. Antidotum na chaos',
        author: 'Jordan B. Peterson',
        shelf: 1,
        xOffset: 0.32,
        thickness: 0.08,
        color: 0xb91c1c,
        icon: '⚖️',
        desc: 'Poradnik filozoficzno-psychologiczny. 12 praktycznych i głębokich reguł pomagających uporządkować życie i stawić czoła wyzwaniom.',
        extraInfo: 'Gatunek: Samorozwój / Filozofia ⚖️ | 12 życiowych zasad'
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
    // Wide width (2.45) to accommodate ALL LitRPG, Fantasy/Sci-Fi & Self-Dev books with clear series sections!
    const width = 2.45;
    const height = 3.4;
    const depth = 0.55;

    // Warm Oak Wood Material (Brightened for crisp visibility)
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x4a2c1b,
      roughness: 0.7,
      metalness: 0.1
    });

    const trimMat = new THREE.MeshStandardMaterial({
      color: 0x2e190f,
      roughness: 0.8
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

      // On Shelf 3 (Top Shelf, idx === 2, LitRPG Category), add 5 distinct front brass series plaques!
      if (idx === 2) {
        const shelf3Plaques = [
          { name: '🔮 CYKL: DROGA SZAMANA (Tom 1-7)', x: -0.785, w: 0.58, desc: 'Górna Półka LitRPG – Cykl "Droga Szamana" (Wasilij Machanienko, 7 tomów)' },
          { name: '⚠️ CYKL: ŚWIAT PRZEISTOCZONYCH (Tom 1-3)', x: -0.265, w: 0.30, desc: 'Górna Półka LitRPG – Cykl "Świat Przeistoczonych" (Wasilij Machanienko, 3 tomy)' },
          { name: '🎮 CYKL: LEVEL UP (Tom 1-3)', x: 0.085, w: 0.28, desc: 'Górna Półka LitRPG – Cykl "Level Up" (Dan Sugralinow, 3 tomy)' },
          { name: '🐱 DUNGEON CRAWLER CARL', x: 0.39, w: 0.22, desc: 'Górna Półka LitRPG – Cykl "Dungeon Crawler Carl" (Matt Dinniman, 2 tomy)' },
          { name: '🏹 PRIMAL HUNTER', x: 0.61, w: 0.18, desc: 'Górna Półka LitRPG – "Primal Hunter" (Zogarth, Tom 1)' }
        ];

        shelf3Plaques.forEach((tag, tIdx) => {
          const plateGeo = new THREE.BoxGeometry(tag.w, 0.045, 0.015);
          const plate = new THREE.Mesh(plateGeo, brassMat);
          plate.position.set(tag.x, y, depth / 2 - 0.01);
          plate.userData = {
            id: `shelf-series-tag-3-${tIdx}`,
            name: tag.name,
            desc: tag.desc,
            icon: '⚔️',
            extraInfo: 'Kategoria: Górna Półka Powieści z Gatunku LitRPG'
          };
          this.group.add(plate);
          this.interactiveObjects.push(plate);
        });
      }

      // On Shelf 2 (Middle Shelf, idx === 1, Fantasy & Sci-Fi Category), add 3 distinct front brass series plaques!
      if (idx === 1) {
        const shelf2Plaques = [
          { name: '🐺 CYKL: WIEDŹMIN (Tom 1-8)', x: -0.7425, w: 0.64, desc: 'Środkowa Półka Fantasy – Saga o Wiedźminie (Andrzej Sapkowski, 8 tomów)' },
          { name: '⚡ CYKL: HARRY POTTER (Tom 1-7)', x: -0.015, w: 0.58, desc: 'Środkowa Półka Fantasy – Cykl Harry Potter (J.K. Rowling, 7 tomów)' },
          { name: '🚀 GWIEZDNY WĘDROWIEC', x: 0.41, w: 0.22, desc: 'Środkowa Półka Sci-Fi – "Gwiezdny wędrowiec" (Rafaello Morgan)' }
        ];

        shelf2Plaques.forEach((tag, tIdx) => {
          const plateGeo = new THREE.BoxGeometry(tag.w, 0.045, 0.015);
          const plate = new THREE.Mesh(plateGeo, brassMat);
          plate.position.set(tag.x, y, depth / 2 - 0.01);
          plate.userData = {
            id: `shelf-series-tag-2-${tIdx}`,
            name: tag.name,
            desc: tag.desc,
            icon: '🪄',
            extraInfo: 'Kategoria: Środkowa Półka Powieści z Gatunku Fantasy & Sci-Fi'
          };
          this.group.add(plate);
          this.interactiveObjects.push(plate);
        });
      }

      // On Shelf 1 (Bottom Shelf, idx === 0, Samorozwój, Biografie & Finanse Category), add 3 distinct front brass series plaques!
      if (idx === 0) {
        const shelf1Plaques = [
          { name: '🤖 BIOGRAFIE & TECHNOLOGIA', x: -0.695, w: 0.38, desc: 'Dolna Półka – Biografie i historia technologii (Stephen Witt, Jens Andersen)' },
          { name: '💰 FINANSE & INWESTOWANIE', x: -0.27, w: 0.44, desc: 'Dolna Półka – Finanse i inwestowanie (Kiyosaki, Graham)' },
          { name: '⚡ SAMOROZWÓJ & PSYCHOLOGIA', x: 0.21, w: 0.44, desc: 'Dolna Półka – Samorozwój i psychologia (Walkiewicz, Peterson)' }
        ];

        shelf1Plaques.forEach((tag, tIdx) => {
          const plateGeo = new THREE.BoxGeometry(tag.w, 0.045, 0.015);
          const plate = new THREE.Mesh(plateGeo, brassMat);
          plate.position.set(tag.x, y, depth / 2 - 0.01);
          plate.userData = {
            id: `shelf-series-tag-1-${tIdx}`,
            name: tag.name,
            desc: tag.desc,
            icon: '🧠',
            extraInfo: 'Kategoria: Dolna Półka Książek o Samorozwoju, Biografiach i Finansach'
          };
          this.group.add(plate);
          this.interactiveObjects.push(plate);
        });
      }
    });

    // Frame UserData for click-to-zoom interaction
    const frameUserData = {
      id: 'bookshelf-frame',
      name: '📜 BIBLIOTEKA CZARODZIEJA',
      desc: 'Czytelnictwo to jedno z głównych zainteresowań Czarodzieja Lolq. Kolekcja mieści jego ulubione serie książkowe z gatunków LitRPG, Fantasy & Sci-Fi oraz Samorozwoju & Finansów.',
      icon: '📚',
      extraInfo: 'Zainteresowania Czarodzieja Lolq: Literatura LitRPG, Fantasy & Sci-Fi, Samorozwój & Finanse'
    };
    leftSide.userData = frameUserData;
    rightSide.userData = frameUserData;
    topCap.userData = frameUserData;
    base.userData = frameUserData;
    backPanel.userData = frameUserData;
    this.interactiveObjects.push(leftSide, rightSide, topCap, base, backPanel);

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
    // Golden Metallic Bookend Dividers separating series
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.25
    });

    // Dividers for Shelf 3 (Top Shelf - LitRPG)
    [-0.44, -0.09, 0.26, 0.52].forEach((xPos) => {
      this.createSingleDivider(xPos, 2.65 + 0.035, goldMat);
    });

    // Dividers for Shelf 2 (Middle Shelf - Fantasy & Sci-Fi)
    [-0.36, 0.325].forEach((xPos) => {
      this.createSingleDivider(xPos, 1.75 + 0.035, goldMat);
    });

    // Dividers for Shelf 1 (Bottom Shelf - Samorozwój, Biografie & Finanse)
    [-0.52, -0.04].forEach((xPos) => {
      this.createSingleDivider(xPos, 0.85 + 0.035, goldMat);
    });
  }

  createSingleDivider(xPos, shelfY, goldMat) {
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
  }

  createLitRPGHeaderPlaque() {
    // Elegant Golden Arch Header Plaque at the top of the bookshelf
    const plaqueGeo = new THREE.BoxGeometry(1.5, 0.22, 0.05);
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
      id: 'bookshelf-main-header',
      name: '📜 BIBLIOTEKA CZARODZIEJA',
      desc: 'Czytelnictwo to jedno z głównych zainteresowań Czarodzieja Lolq. Kolekcja mieści jego ulubione serie książkowe.',
      icon: '📚',
      extraInfo: 'Zainteresowania Czarodzieja Lolq: Literatura LitRPG, Fantasy & Sci-Fi'
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
