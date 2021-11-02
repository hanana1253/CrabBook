import { createLinkCard } from './kanban2.js';

let store = [];
const $form = document.querySelector('.sidebar__form');
const $cardList = document.querySelector('.sidebar__card-list');

$form.onsubmit = e => {
  e.preventDefault();
  addLink(e.target.querySelector('.sidebar__input').value);
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
