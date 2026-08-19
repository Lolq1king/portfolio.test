const fs = require('fs');

let js = fs.readFileSync('src/main.js', 'utf8');

// Import i18n
if (!js.includes('import { i18n }')) {
  js = js.replace("import { AudioController } from './ui/AudioController.js';", "import { AudioController } from './ui/AudioController.js';\nimport { i18n } from './utils/i18n.js';");
}

// initHUDControls - add i18n initialization and language button logic
const initHUDFind = 'initHUDControls() {';
const initHUDReplace = `initHUDControls() {
    // Language Toggle Button
    const btnLang = document.getElementById('btn-toggle-lang');
    const langLabel = document.getElementById('lang-label');
    if (btnLang && langLabel) {
      langLabel.textContent = i18n.lang.toUpperCase();
      btnLang.addEventListener('click', () => {
        i18n.toggleLang();
        langLabel.textContent = i18n.lang.toUpperCase();
      });
    }
    i18n.updateDOM();
`;
js = js.replace(initHUDFind, initHUDReplace);

// Update strings in main.js
js = js.replace(/'SKUPIENIE: EKRAN LOGOWANIA CRT'/g, "i18n.t('btn-camera-crt')");
js = js.replace(/'Przybliżono na Ekran Logowania CRT! Kliknij w przycisk \[ 🔑 ZALOGUJ SIĘ \], aby otworzyć Terminal Czarodzieja.'/g, "i18n.t('toast-zoom-crt')");

js = js.replace(/'SKUPIENIE: LAS'/g, "i18n.t('btn-camera-las')");
js = js.replace(/'Powrócono do pełnego widoku panoramy lasu.'/g, "i18n.t('toast-zoom-out')");

js = js.replace(/'SKUPIENIE: MONITOR WARZONE'/g, "i18n.t('btn-camera-warzone')");

js = js.replace(/'SKUPIENIE: BIBLIOTECZKA'/g, "i18n.t('btn-camera-book')");
js = js.replace(/'Przybliżono widok na Bibliotekę Czarodzieja! Kliknij w książkę, aby zobaczyć opis, lub ponownie w regał, aby wrócić.'/g, "i18n.t('toast-zoom-book')");
js = js.replace(/'Przybliżono widok na Bibliotekę Czarodzieja! Kliknij w książkę, aby zobaczyć opis.'/g, "i18n.t('toast-zoom-book')");

fs.writeFileSync('src/main.js', js);
