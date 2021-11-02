import render from '../view/render.js';
import { createDropZone, createCategory, createLinkCard } from './Kanban.js';

// state
let store = [];

// Functions
const generateCategoryId = () =>
  Math.max(...store.map(category => category.id), 0) + 1;

const setStore = newStore => {
  store = newStore;

  const $categories = store.map(categoryData => createCategory(categoryData));
  const $cards = store.map(({ items }) =>
    items.map(cardData => createLinkCard(cardData))
  );

  render($categories.slice(1), $cards);
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
  try {
    document.querySelector('[data-id="0"]').appendChild(createDropZone());
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
