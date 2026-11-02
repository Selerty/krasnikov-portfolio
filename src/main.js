document.documentElement.classList.add('js');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 16);
}

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Открыть меню');
  navigation.classList.remove('is-open');
  document.body.classList.remove('menu-open');
}

menuButton?.addEventListener('click', () => {
  const willOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(willOpen));
  menuButton.setAttribute('aria-label', willOpen ? 'Закрыть меню' : 'Открыть меню');
  navigation?.classList.toggle('is-open', willOpen);
  document.body.classList.toggle('menu-open', willOpen);
});

navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('click', (event) => {
  if (!navigation?.classList.contains('is-open')) return;
  if (!event.target.closest('.nav-shell')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !document.querySelector('dialog[open]')) closeMenu();
});
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) closeMenu();
});
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

const revealItems = document.querySelectorAll('.reveal');
if (reducedMotion.matches || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const cases = {
  platform: {
    kicker: 'FLAGSHIP · B2B SAAS · WEB3 · NDA',
    title: 'Аналитическая платформа для стейкинга',
    summary: 'Двусторонняя B2B-платформа аналитики по 15+ сетям: одна сторона — валидаторы-хостеры, другая — стейкеры.',
    sections: [
      ['Задача', '<p>Запустить с нуля продукт, который объединяет сложные ончейн-данные и одинаково полезен двум сторонам рынка.</p>'],
      ['Что сделал', '<ul><li>Провёл продукт от первой гипотезы и MVP до партнёрств с протоколами.</li><li>Сам прототипировал ключевые функции и передавал их разработке.</li><li>Собрал распределённую международную команду и выстроил быстрый цикл поставки.</li><li>Добавил AI-ассистента, MCP-сервер и llms.txt для машиночитаемых данных.</li></ul>'],
      ['Результат', '<p>Работающая платформа по 15+ сетям с монетизацией через партнёрства и AI-native-сценариями внутри продукта.</p>']
    ],
    note: 'Название компании и данные скрыты по NDA. Визуал на главной — обезличенная схема, не реальный интерфейс.'
  },
  marketplace: {
    kicker: 'THE ABYSS · TWO-SIDED MARKETPLACE · 2020—2021',
    title: 'Маркетплейс: от концепции до релиза за год',
    summary: 'Запуск двустороннего маркетплейса для The Abyss с интеграцией в существующие онлайн-проекты.',
    sections: [
      ['Задача', '<p>Сформировать концепцию нового маркетплейса, собрать MVP и довести его до полноценного релиза.</p>'],
      ['Что сделал', '<ul><li>Спроектировал продуктовую концепцию и сценарии для двух сторон.</li><li>Организовал путь от MVP до запуска за один год.</li><li>Обеспечил интеграцию маркетплейса с онлайн-проектами.</li><li>Управлял полным циклом: концепция, roadmap, реализация и выпуск.</li></ul>'],
      ['Результат', '<p>Маркетплейс запущен с нуля за год. После запуска команда перешла к следующему аналитическому Web3-проекту.</p>']
    ]
  },
  notara: {
    kicker: 'СОБСТВЕННЫЙ ПРОДУКТ · PRODUCTIVITY SAAS · LIVE',
    title: 'Notara: рабочее пространство с AI',
    summary: 'Облачное рабочее пространство для заметок и документов — от блочного редактора до встроенного AI-ассистента.',
    sections: [
      ['Продукт', '<p>Notara объединяет заметки, иерархию страниц, публичные ссылки и AI-ассистента в одном рабочем пространстве.</p>'],
      ['Что сделано', '<ul><li>Блочный редактор и иерархия страниц.</li><li>Публичные ссылки для распространения документов.</li><li>Встроенный AI-ассистент.</li><li>Облачная инфраструктура в РФ.</li></ul>'],
      ['Почему это важно', '<p>Собственный работающий SaaS показывает не только умение управлять продуктом, но и способность самостоятельно превращать идею в реализацию.</p>']
    ],
    external: 'https://notara.ru'
  }
};

const dialog = document.querySelector('#case-dialog');
const dialogKicker = document.querySelector('#dialog-kicker');
const dialogTitle = document.querySelector('#dialog-title');
const dialogContent = document.querySelector('#dialog-content');
const dialogExternal = document.querySelector('#dialog-external');

function openCase(caseId) {
  const item = cases[caseId];
  if (!item || !dialog) return;
  dialogKicker.textContent = item.kicker;
  dialogTitle.textContent = item.title;
  dialogContent.innerHTML = `
    <p class="dialog-summary">${item.summary}</p>
    ${item.sections.map(([heading, body]) => `<section><h3>${heading}</h3>${body}</section>`).join('')}
    ${item.note ? `<p class="dialog-note">${item.note}</p>` : ''}
  `;
  dialogExternal.hidden = !item.external;
  if (item.external) dialogExternal.href = item.external;
  dialog.showModal();
  dialog.querySelector('.dialog-shell').scrollTop = 0;
}

document.querySelectorAll('[data-case]').forEach((button) => {
  button.addEventListener('click', () => openCase(button.dataset.case));
});
document.querySelector('[data-dialog-close]')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

const caseCursor = document.querySelector('[data-case-cursor]');
if (caseCursor && window.matchMedia('(pointer: fine)').matches && !reducedMotion.matches) {
  document.querySelectorAll('.case-media').forEach((media) => {
    media.addEventListener('pointerenter', () => caseCursor.classList.add('is-visible'));
    media.addEventListener('pointermove', (event) => {
      caseCursor.style.left = `${event.clientX}px`;
      caseCursor.style.top = `${event.clientY}px`;
    });
    media.addEventListener('pointerleave', () => caseCursor.classList.remove('is-visible'));
    media.addEventListener('focus', () => caseCursor.classList.remove('is-visible'));
  });
}

const caseTitles = [...document.querySelectorAll('[data-case-title]')];
let parallaxFrame = 0;
let lastParallaxUpdate = 0;

function updateCaseTitles(now = 0) {
  if (now - lastParallaxUpdate < 30) return;
  lastParallaxUpdate = now;
  caseTitles.forEach((title) => {
    const section = title.closest('.case');
    const rect = section.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const distance = (window.innerHeight / 2) - (rect.top + rect.height / 2);
    const shift = Math.max(-22, Math.min(22, distance * 0.045));
    title.style.setProperty('--case-shift', `${shift.toFixed(2)}px`);
  });
  parallaxFrame = 0;
}

function requestParallax() {
  if (reducedMotion.matches || parallaxFrame) return;
  parallaxFrame = requestAnimationFrame(updateCaseTitles);
}

if (!reducedMotion.matches && caseTitles.length) {
  window.addEventListener('scroll', requestParallax, { passive: true });
  window.addEventListener('resize', requestParallax);
  updateCaseTitles();
}
