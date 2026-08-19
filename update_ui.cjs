const fs = require('fs');

function updateFile(file, replacer) {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = replacer(content);
  fs.writeFileSync(file, newContent);
}

// 1. TerminalUI.js
updateFile('src/ui/TerminalUI.js', (content) => {
  if (!content.includes('import { i18n }')) {
    content = "import { i18n } from '../utils/i18n.js';\n" + content;
  }
  
  content = content.replace(
    "this.itemModalTitle.textContent = data.name || 'Przedmiot';",
    "const nKey = data.id + '-name';\n    const nT = i18n.t(nKey);\n    this.itemModalTitle.textContent = (nT !== nKey ? nT : data.name) || 'Przedmiot';"
  );
  
  content = content.replace(
    "this.itemModalDesc.textContent = data.desc || '';",
    "const dKey = data.id + '-desc';\n    const dT = i18n.t(dKey);\n    this.itemModalDesc.textContent = (dT !== dKey ? dT : data.desc) || '';"
  );
  
  content = content.replace(
    "this.itemModalExtra.textContent = data.extraInfo || '';",
    "const eKey = data.id + '-extra';\n    const eT = i18n.t(eKey);\n    this.itemModalExtra.textContent = (eT !== eKey ? eT : data.extraInfo) || '';"
  );
  
  content = content.replace(
    "btnSend.innerHTML = '<span>🦅 WYPUSZCZANIE KRUKA...</span>';",
    "btnSend.innerHTML = '<span>🦅 ' + (i18n.lang === 'en' ? 'RELEASING RAVEN...' : 'WYPUSZCZANIE KRUKA...') + '</span>';"
  );
  
  content = content.replace(
    "statusMsg.innerHTML = `🦅 <strong>[KRUK POCZTOWY WYSTARTOWAŁ!]</strong><br/>Dziękuję ${nameVal}! Twoja wiadomość odleciała przez mroczny las do Czarodzieja Lolq. Odpowiedź zostanie przesłana na Twój adres e-mail.`;",
    "statusMsg.innerHTML = i18n.lang === 'en' ? `🦅 <strong>[POSTAL RAVEN DISPATCHED!]</strong><br/>Thank you \${nameVal}! Your message flew through the dark forest to Wizard Lolq. A reply will be sent to your email.` : `🦅 <strong>[KRUK POCZTOWY WYSTARTOWAŁ!]</strong><br/>Dziękuję \${nameVal}! Twoja wiadomość odleciała przez mroczny las do Czarodzieja Lolq. Odpowiedź zostanie przesłana na Twój adres e-mail.`;"
  );
  
  content = content.replace(
    "btnSend.innerHTML = '<span>🦅 WYŚLIJ PONOWNIE</span>';",
    "btnSend.innerHTML = '<span>' + i18n.t('btn-send-again') + '</span>';"
  );
  
  content = content.replace(
    /cameraLabel\.textContent = 'SKUPIENIE: LAS';/g,
    "cameraLabel.textContent = i18n.t('btn-camera-las');"
  );
  
  return content;
});

// 2. RaycastInteraction.js
updateFile('src/utils/RaycastInteraction.js', (content) => {
  if (!content.includes('import { i18n }')) {
    content = "import { i18n } from './i18n.js';\n" + content;
  }
  
  content = content.replace(
    "this.tooltipTitle.textContent = data.name || 'Przedmiot';",
    "const nKey = data.id + '-name';\n    const nT = i18n.t(nKey);\n    this.tooltipTitle.textContent = (nT !== nKey ? nT : data.name) || i18n.t('tooltip-title');"
  );
  
  content = content.replace(
    "this.tooltipDesc.textContent = data.desc || '';",
    "const dKey = data.id + '-desc';\n    const dT = i18n.t(dKey);\n    this.tooltipDesc.textContent = (dT !== dKey ? dT : data.desc) || '';"
  );
  
  return content;
});
