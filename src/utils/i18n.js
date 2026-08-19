export class I18n {
  constructor() {
    // Check local storage for saved language or default to 'pl'
    this.lang = localStorage.getItem('lang') || 'pl';
    this.listeners = [];
    this.initTranslations();
  }

  initTranslations() {
    this.translations = {
      pl: {
        // HUD
        'hud-badge': 'LVL 28 CZARODZIEJ',
        'hud-title': 'PORTFOLIO CZARODZIEJA LOLQ',
        'btn-pixel': 'TRYB: CRISP HD',
        'btn-pixel-on': 'TRYB: PIXEL ART',
        'btn-audio-off': 'AUDIO: OFF',
        'btn-audio-on': 'AUDIO: ON',
        'btn-camera-las': 'SKUPIENIE: LAS',
        'btn-camera-crt': 'SKUPIENIE: EKRAN LOGOWANIA CRT',
        'btn-camera-book': 'SKUPIENIE: BIBLIOTECZKA',
        'btn-camera-warzone': 'SKUPIENIE: MONITOR WARZONE',
        
        // Tooltip
        'tooltip-title': 'Przedmiot',
        'tooltip-desc': 'Kliknij, aby zbadać.',
        'tooltip-hint': '[ Kliknij myszką ]',
        
        // Toast
        'toast-intro': '🌲 Przesuwaj myszą, aby rozglądać się po mrocznym lesie Czarodzieja Lolq. Klikaj przedmioty, aby je zbadać!',
        'toast-zoom-crt': 'Przybliżono na Ekran Logowania CRT! Kliknij w przycisk [ 🔑 ZALOGUJ SIĘ ], aby otworzyć Terminal Czarodzieja.',
        'toast-zoom-book': 'Przybliżono widok na Bibliotekę Czarodzieja! Kliknij w książkę, aby zobaczyć opis, lub ponownie w regał, aby wrócić.',
        'toast-zoom-out': 'Powrócono do pełnego widoku panoramy lasu.',
        
        // CRT Modal
        'crt-sys-info': '● LOLQ OS v1.0.4 - [TERMINAL CZARODZIEJA LOLQ]',
        'crt-close': '[ X ] ZAMKNIJ',
        'crt-tab-1': '[1] STATUS POSTACI',
        'crt-tab-2': '[2] KSIĘGA UMIEJĘTNOŚCI',
        'crt-tab-3': '[3] KRUK POCZTOWY',
        
        // Tab Status
        'status-class': 'CZARODZIEJ LOLQ (LVL 28)',
        'status-title': 'OPIS GŁÓWNYCH UMIEJĘTNOŚCI CZARODZIEJA',
        'skill-1-title': 'PISANIE PROMPTÓW AI',
        'skill-1-desc': 'Mistrzowskie tworzenie zaawansowanych dyrektyw i inżynieria konwersacyjna z modelami AI. Umiejętność precyzyjnego kierowania sztuczną inteligencją do budowania złożonych aplikacji, refaktoryzacji kodu oraz szybkiego rozwiązywania trudnych problemów.',
        'skill-2-title': 'CIERPLIWOŚĆ',
        'skill-2-desc': 'Anielska cierpliwość i opanowanie podczas śledzenia błędów, dokładnej analizy logów systemowych oraz dopracowywania detali interfejsu. Spokój w najtrudniejszych momentach procesu deweloperskiego.',
        'skill-3-title': 'CHĘĆ DO POZNAWANIA I NAUKI',
        'skill-3-desc': 'Nieugaszony apetyt na nową wiedzę, pasja w odkrywaniu nieznanych technologii, frameworków oraz stałe podnoszenie swoich kwalifikacji i eksperymentowanie z innowacjami webowymi.',
        'skill-4-title': 'NIEBYWAŁA WYTRWAŁOŚĆ',
        'skill-4-desc': 'Żelazna wola i bezkompromisowa determinacja. Niezłomne pokonywanie wszelkich przeszkód programistycznych oraz konsekwentne doprowadzanie każdego wyzwania i projektu do perfekcyjnego końca.',
        
        // Tab Skills
        'skills-title': 'KSIĘGA UMIEJĘTNOŚCI CZARODZIEJA',
        'skill-rune-1-desc': 'Precyzyjne formułowanie poleceń dla sztucznej inteligencji, inżynieria promptów, efektywna współpraca z modelami LLM i optymalizacja zadań.',
        'skill-rune-2-desc': 'Opanowanie przy analizie i poszukiwaniu błędów w kodzie, konsekwentne dążenie do celu bez pośpiechu oraz dbałość o każdy detal.',
        'skill-rune-3-desc': 'Niegasnąca ciekawość technologiczna, gotowość do stałego odkrywania nowych narzędzi, bibliotek oraz rozwiązywania nieznanych problemów.',
        'skill-rune-4-desc': 'Żelazna wola i determinacja. Niezłomne pokonywanie trudności programistycznych oraz doprowadzanie każdego projektu do perfekcyjnego końca.',
        
        // Tab Contact
        'contact-title': 'WYŚLIJ KRUKA POCZTOWEGO (KONTAKT)',
        'contact-label-1': 'TWOJE IMIĘ / ALIAS:',
        'contact-placeholder-1': 'Wpisz imię wędrowca...',
        'contact-label-2': 'TWÓJ EMAIL / ADRES GOŁĘBIA:',
        'contact-label-3': 'TREŚĆ WIADOMOŚCI:',
        'contact-placeholder-3': 'Napisz swoją wiadomość do programisty...',
        'btn-send': '🦅 WYŚLIJ KRUKA',
        'btn-send-again': '🦅 WYŚLIJ PONOWNIE',
        
        // CRT Footer
        'crt-footer-1': '[UP/DOWN] Nawigacja',
        'crt-footer-2': '[TAB] Zmień Zakładkę',
        'crt-footer-3': 'SYSTEM READY.',

        // CRT Canvas
        'crt-canvas-user': '🔮 UŻYTKOWNIK (USERNAME):',
        'crt-canvas-pass': '🔑 HASŁO ASTRALNE (ANCIENT RUNES):',
        'crt-canvas-login': '🔑 [ ZALOGUJ SIĘ DO TERMINALA ] ▶',
        'crt-canvas-hint': 'KLIKNIJ PRZYCISK ZALOGUJ, ABY OTWORZYĆ SYSTEM',
        
        // Objects
        'potion-name': 'Flakon Eliksiru Many (Energy Fuel)',
        'potion-desc': 'Symbolizuje pasję, zapał i niewyczerpaną energię potrzebną do rozwijania złożonych aplikacji.',
        'potion-extra': 'Właściwości: +50 do skupienia, zamienia kofeinę na czysty kod.',
        'lamp-name': '🪔 KLASYCZNA LAMPA BIURKOWA',
        'lamp-desc': 'Ciepła mosiężna lampa rozświetlająca stanowisko Czarodzieja Lolq. Klikaj w lampę, aby zmieniać paletę oświetlenia lasu i nastroju!',
        'underdesk-headphones-name': '🎧 SŁUCHAWKI GAMINGOWE',
        'underdesk-headphones-desc': 'Podwieszone pod blatem biurka słuchawki wokółuszne z mikrofonem i podświetleniem cyan LED. Gotowe do gry i rozmów!',
        'underdesk-controller-name': '🎮 KONTROLER DO GIER (GAMEPAD)',
        'underdesk-controller-desc': 'Podwieszony pod blatem biurka bezprzewodowy pad do gier z podświetleniem RGB i gałkami analogowymi. Gotowy do gry w Warzone i zręcznościówki!',
        'computer-crt-name': 'Komputer CRT (Eldritch OS)',
        'computer-crt-desc': 'Centralny komputer z interaktywnym terminalem. Przechowuje statystyki postaci, wykonane projekty oraz zakłady umiejętności.',
        'computer-left-warzone-name': '🎮 CALL OF DUTY: WARZONE',
        'computer-left-warzone-desc': 'Drugi monitor Czarodzieja Lolq z odpaloną grą Call of Duty: Warzone w klimacie 16-BIT Pixel Art z widokiem na Verdansk!',
        'computer-left-warzone-extra': 'Stanowisko Bojowe | Gra: Call of Duty: Warzone',
        'shoe-name': '👟 ZAGUBIONE SNEAKERSY',
        'shoe-desc': 'Powiększone buty do biegów długodystansowych i przeszkodowych zawieszone na żółtych sznurówkach na suchej gałęzi sarny. Symbolizują sportową pasję, żelazną dyscyplinę oraz pokonywanie własnych granic przez Czarodzieja Lolq!',
        'shoe-extra': 'Pasja: Biegi Długodystansowe i OCR'
      },
      en: {
        // HUD
        'hud-badge': 'LVL 28 WIZARD',
        'hud-title': 'WIZARD LOLQ PORTFOLIO',
        'btn-pixel': 'MODE: CRISP HD',
        'btn-pixel-on': 'MODE: PIXEL ART',
        'btn-audio-off': 'AUDIO: OFF',
        'btn-audio-on': 'AUDIO: ON',
        'btn-camera-las': 'FOCUS: FOREST',
        'btn-camera-crt': 'FOCUS: CRT LOGIN SCREEN',
        'btn-camera-book': 'FOCUS: BOOKSHELF',
        'btn-camera-warzone': 'FOCUS: WARZONE MONITOR',
        
        // Tooltip
        'tooltip-title': 'Item',
        'tooltip-desc': 'Click to examine.',
        'tooltip-hint': '[ Click mouse ]',
        
        // Toast
        'toast-intro': '🌲 Move your mouse to look around Wizard Lolq\'s dark forest. Click objects to examine them!',
        'toast-zoom-crt': 'Zoomed in to CRT Login Screen! Click the [ 🔑 LOGIN ] button to open the Wizard Terminal.',
        'toast-zoom-book': 'Zoomed in to the Wizard Library! Click a book to see its description, or click the shelf to return.',
        'toast-zoom-out': 'Returned to the full forest panorama view.',
        
        // CRT Modal
        'crt-sys-info': '● LOLQ OS v1.0.4 - [WIZARD LOLQ TERMINAL]',
        'crt-close': '[ X ] CLOSE',
        'crt-tab-1': '[1] CHARACTER STATUS',
        'crt-tab-2': '[2] SKILL BOOK',
        'crt-tab-3': '[3] POSTAL RAVEN',
        
        // Tab Status
        'status-class': 'WIZARD LOLQ (LVL 28)',
        'status-title': 'MAIN WIZARD SKILLS DESCRIPTION',
        'skill-1-title': 'AI PROMPT WRITING',
        'skill-1-desc': 'Masterful creation of advanced directives and conversational engineering with AI models. The ability to precisely guide artificial intelligence to build complex applications, refactor code, and quickly solve difficult problems.',
        'skill-2-title': 'PATIENCE',
        'skill-2-desc': 'Angelic patience and composure while tracking bugs, thoroughly analyzing system logs, and refining interface details. Calmness in the most difficult moments of the development process.',
        'skill-3-title': 'DESIRE TO LEARN AND EXPLORE',
        'skill-3-desc': 'An unquenchable appetite for new knowledge, passion in discovering unknown technologies, frameworks, constantly improving skills, and experimenting with web innovations.',
        'skill-4-title': 'INCREDIBLE PERSEVERANCE',
        'skill-4-desc': 'Iron will and uncompromising determination. Steadfastly overcoming all programming obstacles and consistently bringing every challenge and project to a perfect end.',
        
        // Tab Skills
        'skills-title': 'WIZARD SKILL BOOK',
        'skill-rune-1-desc': 'Precise formulation of commands for artificial intelligence, prompt engineering, effective collaboration with LLM models, and task optimization.',
        'skill-rune-2-desc': 'Composure when analyzing and finding bugs in code, consistently striving for the goal without rush, and attention to every detail.',
        'skill-rune-3-desc': 'Unfading technological curiosity, readiness to constantly discover new tools, libraries, and solve unknown problems.',
        'skill-rune-4-desc': 'Iron will and determination. Unyielding overcoming of programming difficulties and bringing every project to a perfect end.',
        
        // Tab Contact
        'contact-title': 'SEND A POSTAL RAVEN (CONTACT)',
        'contact-label-1': 'YOUR NAME / ALIAS:',
        'contact-placeholder-1': 'Enter traveler name...',
        'contact-label-2': 'YOUR EMAIL / PIGEON ADDRESS:',
        'contact-label-3': 'MESSAGE CONTENT:',
        'contact-placeholder-3': 'Write your message to the developer...',
        'btn-send': '🦅 SEND RAVEN',
        'btn-send-again': '🦅 SEND AGAIN',
        
        // CRT Footer
        'crt-footer-1': '[UP/DOWN] Navigate',
        'crt-footer-2': '[TAB] Change Tab',
        'crt-footer-3': 'SYSTEM READY.',

        // CRT Canvas
        'crt-canvas-user': '🔮 USERNAME (USERNAME):',
        'crt-canvas-pass': '🔑 ASTRAL PASSWORD (ANCIENT RUNES):',
        'crt-canvas-login': '🔑 [ LOGIN TO TERMINAL ] ▶',
        'crt-canvas-hint': 'CLICK THE LOGIN BUTTON TO OPEN THE SYSTEM',
        
        // Objects
        'potion-name': 'Flask of Mana Potion (Energy Fuel)',
        'potion-desc': 'Symbolizes passion, enthusiasm, and inexhaustible energy needed to develop complex applications.',
        'potion-extra': 'Properties: +50 to focus, converts caffeine into clean code.',
        'lamp-name': '🪔 CLASSIC DESK LAMP',
        'lamp-desc': 'A warm brass lamp illuminating Wizard Lolq\'s workstation. Click the lamp to change the lighting palette of the forest and mood!',
        'underdesk-headphones-name': '🎧 GAMING HEADPHONES',
        'underdesk-headphones-desc': 'Over-ear headphones with microphone and cyan LED backlight suspended under the desk top. Ready for gaming and chatting!',
        'underdesk-controller-name': '🎮 GAME CONTROLLER (GAMEPAD)',
        'underdesk-controller-desc': 'Wireless gamepad with RGB backlight and analog sticks suspended under the desk top. Ready to play Warzone and arcade games!',
        'computer-crt-name': 'CRT Computer (Eldritch OS)',
        'computer-crt-desc': 'The central computer with an interactive terminal. It stores character stats, completed projects, and skill tabs.',
        'computer-left-warzone-name': '🎮 CALL OF DUTY: WARZONE',
        'computer-left-warzone-desc': 'Wizard Lolq\'s second monitor running Call of Duty: Warzone in 16-BIT Pixel Art vibe with a view of Verdansk!',
        'computer-left-warzone-extra': 'Battle Station | Game: Call of Duty: Warzone',
        'shoe-name': '👟 LOST SNEAKERS',
        'shoe-desc': 'Enlarged long-distance and obstacle course running shoes suspended by yellow laces on a dry roe deer branch. They symbolize sports passion, iron discipline, and overcoming own limits by Wizard Lolq!',
        'shoe-extra': 'Passion: Long-Distance and OCR Running',
        'bookshelf-frame-name': "📜 WIZARD LIBRARY",
        'bookshelf-frame-desc': "Reading is one of Wizard Lolq's main interests. The collection contains his favorite book series from LitRPG, Fantasy & Sci-Fi, and Self-Development genres.",
        'bookshelf-frame-extra': "Wizard Lolq's Interests: LitRPG, Fantasy & Sci-Fi, Self-Dev",
        'bookshelf-main-header-name': "📜 WIZARD LIBRARY",
        'bookshelf-main-header-desc': "Reading is one of Wizard Lolq's main interests. The collection contains his favorite book series.",
        'bookshelf-main-header-extra': "Wizard Lolq's Interests: LitRPG, Fantasy & Sci-Fi",
        'shelf-series-tag-3-0-name': "🔮 SERIES: THE WAY OF THE SHAMAN (Vol 1-7)",
        'shelf-series-tag-3-0-desc': "Top LitRPG Shelf – \"The Way of the Shaman\" series (Vasily Mahanenko, 7 volumes)",
        'shelf-series-tag-3-1-name': "⚠️ SERIES: THE DARK HERBALIST (Vol 1-3)",
        'shelf-series-tag-3-1-desc': "Top LitRPG Shelf – \"World of the Changed\" series (Vasily Mahanenko, 3 volumes)",
        'shelf-series-tag-3-2-name': "🎮 SERIES: LEVEL UP (Vol 1-3)",
        'shelf-series-tag-3-2-desc': "Top LitRPG Shelf – \"Level Up\" series (Dan Sugralinov, 3 volumes)",
        'shelf-series-tag-3-3-name': "🐱 DUNGEON CRAWLER CARL",
        'shelf-series-tag-3-3-desc': "Top LitRPG Shelf – \"Dungeon Crawler Carl\" series (Matt Dinniman, 2 volumes)",
        'shelf-series-tag-3-4-name': "🏹 PRIMAL HUNTER",
        'shelf-series-tag-3-4-desc': "Top LitRPG Shelf – \"Primal Hunter\" (Zogarth, Vol 1)",
        'shelf-series-tag-2-0-name': "🐺 SERIES: THE WITCHER (Vol 1-8)",
        'shelf-series-tag-2-0-desc': "Middle Fantasy Shelf – The Witcher Saga (Andrzej Sapkowski, 8 volumes)",
        'shelf-series-tag-2-1-name': "⚡ SERIES: HARRY POTTER (Vol 1-7)",
        'shelf-series-tag-2-1-desc': "Middle Fantasy Shelf – Harry Potter series (J.K. Rowling, 7 volumes)",
        'shelf-series-tag-2-2-name': "🚀 STAR WANDERER",
        'shelf-series-tag-2-2-desc': "Middle Sci-Fi Shelf – \"Star Wanderer\" (Rafaello Morgan)",
        'shelf-series-tag-1-0-name': "🤖 BIOGRAPHIES & TECHNOLOGY",
        'shelf-series-tag-1-0-desc': "Bottom Shelf – Biographies and tech history (Stephen Witt, Jens Andersen)",
        'shelf-series-tag-1-1-name': "💰 FINANCE & INVESTING",
        'shelf-series-tag-1-1-desc': "Bottom Shelf – Finance and investing (Kiyosaki, Graham)",
        'shelf-series-tag-1-2-name': "⚡ SELF-DEV & PSYCHOLOGY",
        'shelf-series-tag-1-2-desc': "Bottom Shelf – Self-development and psychology (Walkiewicz, Peterson)",
        'szaman-1-name': "The Way of the Shaman. Book 1: Survival Quest",
        'szaman-1-desc': "Book 1 of The Way of the Shaman (LitRPG). Convicted Mahan enters the virtual world of Barliona as a Shaman and begins his fight for survival.",
        'szaman-2-name': "The Way of the Shaman. Book 2: The Kartoss Gambit",
        'szaman-2-desc': "Book 2. Development of the unique Shaman class, intrigues in the Prisma mines and rivalry with Barliona guilds.",
        'szaman-3-name': "The Way of the Shaman. Book 3: The Secret of the Dark Forest",
        'szaman-3-desc': "Book 3. Expedition into the dangerous regions of the Dark Forest, searching for rare ingredients and powerful spirits.",
        'szaman-4-name': "The Way of the Shaman. Book 4: The Phantom Castle",
        'szaman-4-desc': "Book 4. Epic raids, fortress sieges, and the fight for control over strategic game resources.",
        'szaman-5-name': "The Way of the Shaman. Book 5: The Karmadont Chess Set",
        'szaman-5-desc': "Book 5. Complex high-level political games where every move can decide the fate of Barliona.",
        'szaman-6-name': "The Way of the Shaman. Book 6: Everybody Hates Large Chests",
        'szaman-6-desc': "Book 6. An attempt to rebuild position, overcome own limitations, and reach for the Shaman's power again.",
        'szaman-7-name': "The Way of the Shaman. Book 7: Clan War",
        'szaman-7-desc': "Book 7. The culmination and grand finale of the seven-volume LitRPG series about Mahan's adventures in Barliona.",
        'przeistoczeni-1-name': "World of the Changed. Book 1: No Mistakes",
        'przeistoczeni-1-desc': "Book 1. Earth is included in the alien game area, and humans must fight for survival.",
        'przeistoczeni-2-name': "World of the Changed. Book 2: Pearl of the South",
        'przeistoczeni-2-desc': "Book 2. Mark Cather continues his struggles in the transformed world, striving to master key footholds.",
        'przeistoczeni-3-name': "World of the Changed. Book 3: Personified Noa",
        'przeistoczeni-3-desc': "Book 3. The culmination of the fight against invaders, discovering the secrets of higher Noa energy.",
        'levelup-1-name': "Level Up. Book 1: Re-start",
        'levelup-1-desc': "Book 1 of Level Up (LitRPG/GameLit). Phil receives an extraordinary reality interface with stats and level bars.",
        'levelup-2-name': "Level Up. Book 2: Hero",
        'levelup-2-desc': "Book 2. Developing skills in the real world, overcoming further difficulty levels and new challenges.",
        'levelup-3-name': "Level Up. Book 3: Trial",
        'levelup-3-desc': "Book 3. The ultimate test of Phil's abilities, a great clash and an attempt to understand the interface.",
        'dungeon-1-name': "Dungeon Crawler Carl. Book 1",
        'dungeon-1-desc': "Book 1. Carl and his cat Princess Donut are dragged into a murderous cosmic reality show dungeon.",
        'dungeon-2-name': "Dungeon Crawler Carl. Book 2: Carl's Doomsday",
        'dungeon-2-desc': "Book 2. Further fight of Carl and Donut on the 2nd level of the dungeon, where game rules get even crazier.",
        'primal-1-name': "Primal Hunter. Book 1",
        'primal-1-desc': "Book 1. Jake and his coworkers enter the Tutorial, where he discovers his talent as a born hunter.",
        'wiedzmin-1-name': "The Witcher. Book 1: The Last Wish",
        'wiedzmin-1-desc': "Short story collection introducing the witcher's world. The story of Geralt of Rivia's first contracts.",
        'wiedzmin-2-name': "The Witcher. Book 2: Sword of Destiny",
        'wiedzmin-2-desc': "Second collection. Geralt meets Ciri in Brokilon and learns the inevitability of the Law of Surprise.",
        'wiedzmin-3-name': "The Witcher. Book 3: Blood of Elves (Saga 1)",
        'wiedzmin-3-desc': "First volume of the Saga. Ciri trains in Kaer Morhen while the world heads towards war.",
        'wiedzmin-4-name': "The Witcher. Book 4: Time of Contempt (Saga 2)",
        'wiedzmin-4-desc': "Second volume. The coup on Thanedd island destroys the Chapter of Wizards.",
        'wiedzmin-5-name': "The Witcher. Book 5: Baptism of Fire (Saga 3)",
        'wiedzmin-5-desc': "Third volume. Geralt sets out with Dandelion, Milva, Cahir, and Regis to find Ciri.",
        'wiedzmin-6-name': "The Witcher. Book 6: The Tower of the Swallow (Saga 4)",
        'wiedzmin-6-desc': "Fourth volume. Ciri heals at Vysogota's hermitage and faces the ruthless killer Bonhart.",
        'wiedzmin-7-name': "The Witcher. Book 7: The Lady of the Lake (Saga 5)",
        'wiedzmin-7-desc': "Grand finale of the Saga. Climactic battles at Stygga castle, the Battle of Brenna.",
        'wiedzmin-8-name': "The Witcher. Book 8: Season of Storms",
        'wiedzmin-8-desc': "Standalone novel set before the Saga. Theft of witcher swords and wizard intrigues.",
        'harry-1-name': "Harry Potter and the Sorcerer's Stone",
        'harry-1-desc': "Book 1. Eleven-year-old Harry discovers his magical heritage and begins his education at Hogwarts.",
        'harry-2-name': "Harry Potter and the Chamber of Secrets",
        'harry-2-desc': "Book 2. A mysterious monster attacks Hogwarts students.",
        'harry-3-name': "Harry Potter and the Prisoner of Azkaban",
        'harry-3-desc': "Book 3. Fugitive Sirius Black escapes from Azkaban prison.",
        'harry-4-name': "Harry Potter and the Goblet of Fire",
        'harry-4-desc': "Book 4. The Triwizard Tournament at Hogwarts leads to the rebirth of Lord Voldemort.",
        'harry-5-name': "Harry Potter and the Order of the Phoenix",
        'harry-5-desc': "Book 5. Formation of the underground Order of the Phoenix and Dumbledore's Army.",
        'harry-6-name': "Harry Potter and the Half-Blood Prince",
        'harry-6-desc': "Book 6. Harry and Dumbledore uncover the secrets of Voldemort's Horcruxes.",
        'harry-7-name': "Harry Potter and the Deathly Hallows",
        'harry-7-desc': "The final book. The quest for Horcruxes and the great Battle of Hogwarts.",
        'gwiezdny-1-name': "Star Wanderer",
        'gwiezdny-1-desc': "Sci-Fi novel by Rafaello Morgan. Martian freighter pilot Sven Ante gets drawn into a galactic conflict.",
        'samorozwoj-1-name': "The Thinking Machine. Jensen Huang and Nvidia",
        'samorozwoj-1-desc': "Biography of Jensen Huang and the history of Nvidia. Evolution from GPU maker to AI giant.",
        'samorozwoj-2-name': "The LEGO Story",
        'samorozwoj-2-desc': "Comprehensive biography of the Ole Kirk Christiansen family who built the global LEGO empire.",
        'samorozwoj-3-name': "Rich Dad Poor Dad",
        'samorozwoj-3-desc': "Bestselling financial education guide. The classic of building financial independence and assets.",
        'samorozwoj-4-name': "Cashflow Quadrant",
        'samorozwoj-4-desc': "Guide to financial freedom. Analysis of the 4 groups: Employee, Self-employed, Business owner, Investor.",
        'samorozwoj-5-name': "Jacek Walkiewicz's Musings",
        'samorozwoj-5-desc': "Reflections on courage, dreams, decision making, and building your own life path.",
        'samorozwoj-6-name': "Full Power of Life",
        'samorozwoj-6-desc': "Cult book about unleashing your potential, crossing comfort zones, and boldly pursuing passions.",
        'samorozwoj-7-name': "The Intelligent Investor",
        'samorozwoj-7-desc': "The bible of value investing, considered by Warren Buffett as the best finance book ever written.",
        'samorozwoj-8-name': "12 Rules for Life",
        'samorozwoj-8-desc': "Philosophical and psychological guide. 12 practical rules to organize life and face challenges.",
      }
    };
  }

  t(key) {
    if (this.translations[this.lang] && this.translations[this.lang][key]) {
      return this.translations[this.lang][key];
    }
    return key;
  }

  setLang(lang) {
    if (lang === 'pl' || lang === 'en') {
      this.lang = lang;
      localStorage.setItem('lang', lang);
      this.updateDOM();
      this.notifyListeners();
    }
  }

  toggleLang() {
    this.setLang(this.lang === 'pl' ? 'en' : 'pl');
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  notifyListeners() {
    this.listeners.forEach(cb => cb(this.lang));
  }

  updateDOM() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = this.t(key);
      } else {
        // preserve child elements like icons if needed, but for now mostly text
        if (el.dataset.keepIcon) {
           el.innerHTML = `<span class="btn-icon">${el.dataset.keepIcon}</span> ${this.t(key)}`;
        } else if (el.dataset.keepIconStart) {
            el.innerHTML = `${el.dataset.keepIconStart} ${this.t(key)}`;
        } else {
            // Wait, for complex elements we should target inner spans
            el.textContent = this.t(key);
        }
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = this.lang;
  }
}

export const i18n = new I18n();
