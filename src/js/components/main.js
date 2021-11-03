// import axios from 'axios';
import render from '../view/render.js';
// import '../../scss/style.scss';
import state from '../store/state.js';
import { createDropZone, createCategory, createLinkCard } from './Kanban.js';

// DOM Nodes
const $sidebar = document.querySelector('.sidebar');
const $form = document.querySelector('.sidebar__form');

// Variables
const validUrlRegExp =
  /((((https?:\/\/)?)((www).)?\.[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/;

// state
// let store = [];

// Functions
const generateCategoryId = () =>
  Math.max(...state.categories.map(category => category.id), 0) + 1;

const generateLinkCardId = () => {};

const setStore = newStore => {
  state.setCategories(newStore);

  const $categories = state.categories.map(categoryData =>
    createCategory(categoryData)
  );
  const $cards = state.categories.map(({ items }) =>
    items.map(cardData => createLinkCard(cardData))
  );

  render.mainPage($categories, $cards);
};

const deleteCategory = async id => {
  try {
    const { data: newStore } = await axios.delete(`/store/${id}`);

    setStore(newStore);
  } catch (e) {
    console.error(e);
  }
};

const fetchCategory = async () => {
  document
    .querySelector('[data-id="0"]')
    .querySelector('.kanban__column-items')
    .appendChild(createDropZone());

  try {
    const { data: newStore } = await axios.get('/store');

    setStore(newStore);
  } catch (e) {
    console.error(e);
  }
};

const addCategory = async () => {
  try {
    const { data: newStore } = await axios.post('/store', {
      id: generateCategoryId(),
      title: 'New Category',
      items: []
    });

    setStore(newStore);
  } catch (e) {
    console.error(e);
  }
};

const addLink = async url => {
  try {
    const { data: newStore } = await axios.post('/store/link', { url });

    setStore(newStore);
  } catch (e) {
    console.error(e);
  }
};

// Event
window.addEventListener('DOMContentLoaded', fetchCategory);

document.querySelector('.kanban__add-column').onclick = addCategory;

window.ondrop = async e => {
  if (!e.target.matches('.kanban__dropzone')) return;
  e.preventDefault();
  e.target.classList.remove('active');

  const cardId = e.dataTransfer.getData('text/plain');
  const $toBePlacedCard = document.querySelector(`[data-id="${cardId}"]`);

  if ($toBePlacedCard.contains(e.target)) return;

  const [$currentCategory, $toBePlacedCategory] = [
    $toBePlacedCard,
    e.target
  ].map(el => el.closest('.kanban__column'));

  const [currentCategoryId, toBePlacedCategoryId] = [
    $currentCategory,
    $toBePlacedCategory
  ].map(el => el.dataset.id);

  const currentCardIndex = [
    ...$currentCategory.querySelectorAll('.kanban__item')
  ].indexOf($toBePlacedCard);

  const toBePlacedCardIndex = [
    ...$toBePlacedCategory.querySelectorAll('.kanban__dropzone')
  ].indexOf(e.target);

  try {
    const { data: newStore } = await axios.patch(
      `/store/${currentCategoryId}/${currentCardIndex}`,
      { toBePlacedCategoryId, toBePlacedCardIndex }
    );

    setStore(newStore);
  } catch (e) {
    console.error(e);
  }
};

window.onclick = e => {
  if (!e.target.matches('.kanban__column-delete')) return;

  deleteCategory(e.target.parentNode.dataset.id);
};

// 사이드바 이벤트
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

// window.addEventListener('paste', e => {
//   // Stop data actually being pasted into div
//   e.stopPropagation();
//   e.preventDefault();

//   // Get pasted data via clipboard API
//   const clipboardData = e.clipboardData || window.clipboardData;
//   const pastedData = clipboardData.getData('Text');

//   if (!validUrlRegExp.test(pastedData)) {
//     alert('유효하지 않은 URL입니다.');
//     return;
//   }

//   // @todo: Do something
//   alert(`붙여 넣은 데이터: ${pastedData}`);
//   // addLink(pastedData);
// });
