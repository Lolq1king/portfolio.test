const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace HUD headers
html = html.replace('<span class="hud-badge">', '<span class="hud-badge" data-i18n="hud-badge">');
html = html.replace('<h1 class="hud-title">', '<h1 class="hud-title" data-i18n="hud-title">');

// Add Language toggle button
const langBtn = `<button id="btn-toggle-lang" class="hud-btn" title="Zmień język / Change language">
          <span class="btn-icon">🌍</span> <span id="lang-label">EN</span>
        </button>
        <button id="btn-toggle-pixel"`;
html = html.replace('<button id="btn-toggle-pixel"', langBtn);

// HUD labels
html = html.replace('<span id="pixel-scale-label">', '<span id="pixel-scale-label" data-i18n="btn-pixel">');
html = html.replace('<span id="audio-label">', '<span id="audio-label" data-i18n="btn-audio-off">');
html = html.replace('<span id="camera-view-label">', '<span id="camera-view-label" data-i18n="btn-camera-las">');

// Tooltips
html = html.replace('<span id="tooltip-title">', '<span id="tooltip-title" data-i18n="tooltip-title">');
html = html.replace('<div id="tooltip-desc" class="tooltip-body">', '<div id="tooltip-desc" class="tooltip-body" data-i18n="tooltip-desc">');
html = html.replace('<div class="tooltip-hint">', '<div class="tooltip-hint" data-i18n="tooltip-hint">');

// Toast
html = html.replace('<p>🌲 <span>', '<p>🌲 <span data-i18n="toast-intro">');

// CRT header
html = html.replace('<div class="crt-system-info">', '<div class="crt-system-info" data-i18n="crt-sys-info" data-keep-icon-start="<span class=\'crt-blinking-dot\'>●</span>">');
html = html.replace('<button id="btn-close-crt" class="crt-close-btn" title="Zamknij Terminal (ESC)">', '<button id="btn-close-crt" class="crt-close-btn" title="Zamknij Terminal (ESC)" data-i18n="crt-close">');

// CRT tabs
html = html.replace('<button class="crt-tab-btn active" data-tab="status">', '<button class="crt-tab-btn active" data-tab="status" data-i18n="crt-tab-1" data-keep-icon-start="<span class=\'tab-num\'>[1]</span>">');
html = html.replace('<button class="crt-tab-btn" data-tab="skills">', '<button class="crt-tab-btn" data-tab="skills" data-i18n="crt-tab-2" data-keep-icon-start="<span class=\'tab-num\'>[2]</span>">');
html = html.replace('<button class="crt-tab-btn" data-tab="contact">', '<button class="crt-tab-btn" data-tab="contact" data-i18n="crt-tab-3" data-keep-icon-start="<span class=\'tab-num\'>[3]</span>">');

// Status Class
html = html.replace('<div class="class-title">', '<div class="class-title" data-i18n="status-class">');
html = html.replace('<h2 class="section-title">OPIS', '<h2 class="section-title" data-i18n="status-title">OPIS');

// Skills
html = html.replace('<span class="skill-title">PISANIE PROMPTÓW AI', '<span class="skill-title" data-i18n="skill-1-title">PISANIE PROMPTÓW AI');
html = html.replace('<p class="status-skill-desc">Mistrzowskie', '<p class="status-skill-desc" data-i18n="skill-1-desc">Mistrzowskie');

html = html.replace('<span class="skill-title">CIERPLIWOŚĆ', '<span class="skill-title" data-i18n="skill-2-title">CIERPLIWOŚĆ');
html = html.replace('<p class="status-skill-desc">Anielska', '<p class="status-skill-desc" data-i18n="skill-2-desc">Anielska');

html = html.replace('<span class="skill-title">CHĘĆ DO POZNAWANIA', '<span class="skill-title" data-i18n="skill-3-title">CHĘĆ DO POZNAWANIA');
html = html.replace('<p class="status-skill-desc">Nieugaszony', '<p class="status-skill-desc" data-i18n="skill-3-desc">Nieugaszony');

html = html.replace('<span class="skill-title">NIEBYWAŁA', '<span class="skill-title" data-i18n="skill-4-title">NIEBYWAŁA');
html = html.replace('<p class="status-skill-desc">Żelazna wola', '<p class="status-skill-desc" data-i18n="skill-4-desc">Żelazna wola');

html = html.replace('<h2 class="section-title">KSIĘGA', '<h2 class="section-title" data-i18n="skills-title">KSIĘGA');
html = html.replace('<p>Precyzyjne', '<p data-i18n="skill-rune-1-desc">Precyzyjne');
html = html.replace('<p>Opanowanie przy', '<p data-i18n="skill-rune-2-desc">Opanowanie przy');
html = html.replace('<p>Niegasnąca ciekawość', '<p data-i18n="skill-rune-3-desc">Niegasnąca ciekawość');
html = html.replace('<p>Żelazna wola i', '<p data-i18n="skill-rune-4-desc">Żelazna wola i');

html = html.replace('<h2 class="section-title">WYŚLIJ KRUKA', '<h2 class="section-title" data-i18n="contact-title">WYŚLIJ KRUKA');

html = html.replace('<label for="sender-name">TWOJE IMIĘ', '<label for="sender-name" data-i18n="contact-label-1">TWOJE IMIĘ');
html = html.replace('id="sender-name" required placeholder="Wpisz imię', 'id="sender-name" required data-i18n="contact-placeholder-1" placeholder="Wpisz imię');

html = html.replace('<label for="sender-email">TWÓJ EMAIL', '<label for="sender-email" data-i18n="contact-label-2">TWÓJ EMAIL');

html = html.replace('<label for="sender-msg">TREŚĆ WIADOMOŚCI', '<label for="sender-msg" data-i18n="contact-label-3">TREŚĆ WIADOMOŚCI');
html = html.replace('id="sender-msg" rows="4" required placeholder="Napisz', 'id="sender-msg" rows="4" required data-i18n="contact-placeholder-3" placeholder="Napisz');

html = html.replace('<button type="submit" id="btn-send-raven" class="crt-btn-submit">\\r\\n                <span>', '<button type="submit" id="btn-send-raven" class="crt-btn-submit" data-i18n="btn-send" data-keep-icon="🦅">\\n                <span class="btn-icon">🦅</span> ');

// CRT Footer
html = html.replace('<span>[UP/DOWN] Nawigacja</span>', '<span data-i18n="crt-footer-1">[UP/DOWN] Nawigacja</span>');
html = html.replace('<span>[TAB] Zmień Zakładkę</span>', '<span data-i18n="crt-footer-2">[TAB] Zmień Zakładkę</span>');
html = html.replace('<span>SYSTEM READY.</span>', '<span data-i18n="crt-footer-3">SYSTEM READY.</span>');

fs.writeFileSync('index.html', html);
