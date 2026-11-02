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

const cases = {
  platform: {
    kicker: 'ГЛАВНЫЙ КЕЙС · B2B SAAS · WEB3 · NDA',
    title: 'B2B-платформа аналитики стейкинга',
    summary: 'Продукт вырос из задачи крупного валидатора отслеживать перформанс своих валидаторов в разных сетях — и стал двусторонней платформой для валидаторов-хостеров и стейкеров.',
    sections: [
      ['Моя роль', '<p>Отвечал за стратегию и roadmap, монетизацию и P&amp;L, найм и управление командой. Сам прототипировал ключевые решения и работал с кодом. Команда — <strong>16–20 человек</strong>, прямые подчинённые — <strong>16–20 человек</strong>.</p>'],
      ['Решение 1. Сначала валидаторы, затем стейкеры', '<p>Первая версия решала конкретную задачу заказчика — крупного валидатора в нескольких сетях. Это позволило сфокусировать MVP на понятном сценарии мониторинга перформанса. После проверки этой основы продукт расширился на вторую сторону рынка — стейкеров.</p>'],
      ['Решение 2. Единая модель данных и адаптеры', '<p>Для масштабирования выбрал архитектуру с единой моделью данных и адаптерами отдельных сетей. Новые блокчейны подключались к общему продуктовому ядру, а не превращались в отдельные несовместимые версии платформы. Так продукт вырос до <strong>15+ сетей</strong>.</p>'],
      ['Решение 3. AI-native слой', '<p>Добавил AI-ассистента, MCP-сервер и llms.txt. Аналитика стала доступна не только через интерфейс, но и через машиночитаемые AI-сценарии.</p>'],
      ['Операционный опыт', '<p>Оперировал <strong>testnet-валидаторами</strong> — практическая работа с инфраструктурой в дополнение к продуктовой роли.</p>'],
      ['Результат', '<ul><li>От первой гипотезы до запуска — <strong>7–12 месяцев</strong>.</li><li><strong>1 000–10 000 активных пользователей</strong>.</li><li>Двусторонняя B2B-платформа по <strong>15+ блокчейн-сетям</strong>.</li><li>Стратегия, монетизация, команда и инженерные решения объединены в одной зоне ответственности.</li></ul>']
    ],
    note: 'Название компании скрыто по NDA. Показатели опубликованы диапазонами. Схема на главной показывает архитектуру решения, а не интерфейс продукта.'
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
    summary: 'Работающий SaaS, созданный самостоятельно — от блочного редактора до встроенного AI-ассистента.',
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
let activeCase = null;

function caseFromHash() {
  const match = location.hash.match(/^#case-(platform|marketplace|notara)$/);
  return match ? match[1] : null;
}

function openCase(caseId, updateUrl = true) {
  const item = cases[caseId];
  if (!item || !dialog) return;
  activeCase = caseId;
  dialogKicker.textContent = item.kicker;
  dialogTitle.textContent = item.title;
  dialogContent.innerHTML = `
    <p class="dialog-summary">${item.summary}</p>
    ${item.sections.map(([heading, body]) => `<section><h3>${heading}</h3>${body}</section>`).join('')}
    ${item.note ? `<p class="dialog-note">${item.note}</p>` : ''}
  `;
  dialogExternal.hidden = !item.external;
  if (item.external) dialogExternal.href = item.external;
  if (!dialog.open) dialog.showModal();
  dialog.querySelector('.dialog-shell').scrollTop = 0;
  if (updateUrl) history.replaceState(null, '', `#case-${caseId}`);
}

document.querySelectorAll('[data-case]').forEach((button) => {
  button.addEventListener('click', () => openCase(button.dataset.case));
});
document.querySelector('[data-dialog-close]')?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
dialog?.addEventListener('close', () => {
  activeCase = null;
  if (caseFromHash()) history.replaceState(null, '', '#cases');
});

function syncCaseWithHash() {
  const caseId = caseFromHash();
  if (caseId && activeCase !== caseId) openCase(caseId, false);
  if (!caseId && dialog?.open) dialog.close();
}

window.addEventListener('hashchange', syncCaseWithHash);
syncCaseWithHash();
