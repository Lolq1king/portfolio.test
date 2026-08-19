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
        'shoe-extra': 'Passion: Long-Distance and OCR Running'
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
