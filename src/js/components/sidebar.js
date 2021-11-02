import { createLinkCard } from './kanban2.js';

let store = [];
const $sidebar = document.querySelector('.sidebar');
const $form = document.querySelector('.sidebar__form');
const $cardList = document.querySelector('.sidebar__card-list');
const validUrlRegExp =
  /((((https?\:\/\/)?)((www).)?\.[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

$sidebar.ondragover = e => {
  e.preventDefault();
  if (!e.target.matches('.sidebar *')) return;
  $sidebar.classList.add('active');
};
$sidebar.ondragleave = e => {
  e.preventDefault();
  if (e.target.matches('.sidebar *')) return;
  $sidebar.classList.remove('active');
};

$form.onsubmit = e => {
  e.preventDefault();
  const $input = e.target.querySelector('.sidebar__input');
  if (!validUrlRegExp.test($input.value)) {
    $input.classList.add('sidebar__input--error');
    document.querySelector('.sidebar__error-msg').textContent =
      '유효하지 않은 URL입니다.';
    return;
  }
  $input.classList.remove('sidebar__input--error');
  document.querySelector('.sidebar__error-msg').textContent = '';
  addLink($input.value);
  $input.value = '';
};

const addLink = async url => {
  try {
    const { data: newStore } = await axios.post('/store/link', { url });
    store = newStore;
    renderSidebar();
  } catch (e) {
    console.log(e);
  }
};

export const renderSidebar = async () => {
  const { data: newStore } = await axios.get('/store');
  store = newStore;
  $cardList.innerHTML = store[0].items
    .map(
      ({ title }) => `<div class="kanban__item" draggable data-id="0000">
          <div class="kanban__item-input">${title}</div>
          <div class="kanban__dropzone"></div>
          </div>`
    )
    .join('');
};

window.addEventListener('DOMContentLoaded', renderSidebar);
