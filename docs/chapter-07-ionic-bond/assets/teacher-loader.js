async function loadText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}`);
  return res.text();
}

function renderSimpleMarkdown(md) {
  const lines = md.split(/\r?\n/);
  let html = '';
  let inList = false;

  for (const line of lines) {
    if (/^###\s+/.test(line)) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h3>${line.replace(/^###\s+/, '')}</h3>`;
    } else if (/^##\s+/.test(line)) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h2>${line.replace(/^##\s+/, '')}</h2>`;
    } else if (/^#\s+/.test(line)) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h1>${line.replace(/^#\s+/, '')}</h1>`;
    } else if (/^-\s+/.test(line)) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${line.replace(/^-\s+/, '')}</li>`;
    } else if (/^\d+\.\s+/.test(line)) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<p>${line}</p>`;
    } else if (line.trim() === '') {
      if (inList) { html += '</ul>'; inList = false; }
    } else {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<p>${line}</p>`;
    }
  }

  if (inList) html += '</ul>';
  return html;
}

async function hydrateSlot(targetId, filePath, type = 'md') {
  const el = document.getElementById(targetId);
  if (!el) return;
  try {
    const text = await loadText(filePath);
    if (type === 'md') {
      el.innerHTML = `<div class="markdown-rendered">${renderSimpleMarkdown(text)}</div>`;
    } else {
      el.innerHTML = text;
    }
  } catch (err) {
    el.innerHTML = `<p style="color:#b91c1c;">無法載入內容：${filePath}</p>`;
  }
}

function restartRutherford() {
  const stage = document.querySelector('.rutherford-stage');
  if (!stage) return;
  stage.querySelectorAll('.alpha').forEach(node => {
    node.style.animation = 'none';
    void node.offsetWidth;
    node.style.animation = '';
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    hydrateSlot('slot-md-intro', './content/md-intro.md', 'md'),
    hydrateSlot('slot-md-concept-notes', './content/md-concept-notes.md', 'md'),
    hydrateSlot('slot-md-review', './content/md-review.md', 'md'),
    hydrateSlot('slot-md-quick-questions', './content/md-quick-questions.md', 'md'),
    hydrateSlot('slot-html-quiz-cards', './embeds/html-quiz-cards.html', 'html'),
    hydrateSlot('slot-html-misconception-check', './embeds/html-misconception-check.html', 'html'),
    hydrateSlot('slot-html-rutherford-demo', './embeds/html-rutherford-demo.html', 'html'),
    hydrateSlot('slot-html-ion-demo', './embeds/html-ion-demo.html', 'html')
  ]);

  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'rerun-rutherford') {
      restartRutherford();
    }
  });
});