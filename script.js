// Korrekte Antworten — update wenn die echten Zahlen bekannt sind
const CORRECT = {
  cursor: 8,
  tomate: 24,
};

const elInputCursor = document.getElementById('input-cursor');
const elInputTomate = document.getElementById('input-tomate');
const elSubmit      = document.getElementById('submit-btn');
const elResult      = document.getElementById('result');
const elLoopFill    = document.querySelector('#loadbar-loop .loadbar-fill');

elSubmit.addEventListener('click', validate);
elInputCursor.addEventListener('keydown', e => { if (e.key === 'Enter') validate(); });
elInputTomate.addEventListener('keydown', e => { if (e.key === 'Enter') validate(); });

function validate() {
  const c = parseInt(elInputCursor.value, 10);
  const t = parseInt(elInputTomate.value, 10);

  if (isNaN(c) || isNaN(t)) {
    showResult('> fehler: bitte beide felder ausfüllen.', false);
    return;
  }

  const lines = [];
  let allCorrect = true;

  if (c === CORRECT.cursor) {
    lines.push('> cursor:  korrekt ✓');
  } else {
    lines.push(`> cursor:  falsch — zu ${c > CORRECT.cursor ? 'hoch ▲' : 'niedrig ▼'}`);
    allCorrect = false;
  }

  if (t === CORRECT.tomate) {
    lines.push('> tomaten: korrekt ✓');
  } else {
    lines.push(`> tomaten: falsch — zu ${t > CORRECT.tomate ? 'hoch ▲' : 'niedrig ▼'}`);
    allCorrect = false;
  }

  if (allCorrect) {
    lines.push('');
    lines.push('> auswertung: ALLE KORREKT! :)');
    elLoopFill.style.animation = 'none';
    elLoopFill.style.width     = '100%';
  }

  showResult(lines.join('\n'), allCorrect);
}

function showResult(text, success) {
  elResult.className = 'term-result ' + (success ? 'result--ok' : 'result--error');
  elResult.style.display = 'block';
  elResult.textContent = '';
  typewrite(text, 0);
}

function typewrite(text, i) {
  if (i < text.length) {
    elResult.textContent += text[i];
    setTimeout(() => typewrite(text, i + 1), 22);
  }
}
