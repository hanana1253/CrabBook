// import { state } from "../store/state.js";
import { createLinkCard } from './kanban2.js';

const store = [];

const $form = document.querySelector('.sidebar__form');
const $cardList = document.querySelector('.sidebar__card-list');

$form.onsubmit = e => {
  e.preventDefault();
  addLink(e.target.querySelector('.sidebar__input').value, 'uncategorized');
};

const addLink = async (url, category) => {
  try {
    // const { data: state } = await axios.post('/store/0', { url, category });
    // setState(state);
    $cardList.append(createLinkCard(url)); // state에 반영되는 로직 짜기
    console.log(
      'addLink가 호출되었습니다.' + '/url: ' + url + '/category: ' + category
    );
  } catch (e) {
    console.log(e);
  }
};

export const renderSidebar = () => {
  $cardList.innerHTML = state[0].items
    .map(
      ({ title }) => `<div class="kanban__item" draggable data-id="0000">
          <div class="kanban__item-input">${title}</div>
          <div class="kanban__dropzone"></div>
          </div>`
    )
    .join('');
};

window.addEventListener('DOMContentLoaded', renderSidebar);
