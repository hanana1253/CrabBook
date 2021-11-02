// DOM Nodes
const $kanban = document.querySelector('.kanban');
const $addButton = document.querySelector('.kanban__add-column');

// state
let store = [];

// Functions
const renderCategory = () => {
  $kanban.innerHTML = '<h2 class="kanban__title a11y-hidden">칸반 보드</h2>';

  // categoryData.forEach(eachData => $kanban.appendChild(eachData));
  store.forEach((categoryData, index) => {
    index === 0
      ? document
          .querySelector('.sidebar__card-list')
          .append(createCategory(categoryData))
      : $kanban.appendChild(createCategory(categoryData));
  });
};

const createDropZone = () => {
  const $newDropZone = document.createElement('div');
  $newDropZone.className = 'kanban__dropzone';

  $newDropZone.ondragover = e => {
    e.preventDefault();
    $newDropZone.classList.add('kanban__dropzone--active');
  };

  $newDropZone.ondragleave = e => {
    e.preventDefault();
    $newDropZone.classList.remove('kanban__dropzone--active');
  };

  $newDropZone.ondrop = async e => {
    e.preventDefault();
    $newDropZone.classList.remove('kanban__dropzone--active');

    const $categoryElement = $newDropZone.closest('.kanban__column');

    const droppedIndex = [
      ...$categoryElement.querySelectorAll('.kanban__dropzone')
    ].indexOf($newDropZone);

    const cardId = e.dataTransfer.getData('text/plain');
    const $droppedCard = document.querySelector(`[data-id="${cardId}"]`);

    if ($droppedCard.contains($newDropZone)) return;

    const startId = $droppedCard.closest('.kanban__column').dataset.id;
    const targetId = $categoryElement.dataset.id;

    const startOrder = [
      ...$droppedCard
        .closest('.kanban__column-items')
        .querySelectorAll('.kanban__item')
    ].indexOf($droppedCard);

    const targetOrder = droppedIndex;

    try {
      const { data: newStore } = await axios.patch(
        `/store/${startId}/${startOrder}`,
        { targetId, targetOrder }
      );

      store = newStore;
      renderCategory();
    } catch (e) {
      console.error(e);
    }
  };

  return $newDropZone;
};

export const createLinkCard = ({ description }) => {
  const id = Math.floor(Math.random() * 100);
  const $newCard = document.createElement('div');
  $newCard.draggable = true;
  $newCard.className = 'kanban__item';
  $newCard.dataset.id = id;
  $newCard.innerHTML = `<div class="kanban__item-input">${description}</div>`;

  $newCard.appendChild(createDropZone());

  $newCard.ondragstart = e => {
    e.dataTransfer.setData('text/plain', id);
  };

  return $newCard;
};

const generateCategoryId = () =>
  Math.max(...store.map(category => category.id), 0) + 1;

const fetchCategory = async () => {
  try {
    const { data: newStore } = await axios.get('/store');
    store = newStore;

    store.forEach((categoryData, index) => {
      index === 0
        ? document
            .querySelector('.sidebar__card-list')
            .append(createCategory(categoryData))
        : $kanban.appendChild(createCategory(categoryData));
    });
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

    store = newStore;
    renderCategory();
  } catch (e) {
    console.error(e);
  }
};

const deleteCategory = async id => {
  try {
    const { data: newStore } = await axios.delete(`/store/${id}`);

    store = newStore;
    renderCategory();
  } catch (e) {
    console.error(e);
  }
};

const createCategory = ({ id, title, items }) => {
  const $newCategory = document.createElement('div');
  $newCategory.dataset.id = id;
  $newCategory.className = 'kanban__column';
  $newCategory.innerHTML = `
  <button class="kanban__column-delete" type="button">X</button>
  <h3 class="kanban__column-title">${title}</h3>
  <div class="kanban__column-items"></div>`;
  // <button class="kanban__add-item" type="button">+ Add</button>`;

  $newCategory.querySelector('.kanban__column-delete').onclick = e => {
    deleteCategory(e.target.parentNode.dataset.id);
  };

  $newCategory
    .querySelector('.kanban__column-items')
    .appendChild(createDropZone());

  items.forEach(item => {
    $newCategory
      .querySelector('.kanban__column-items')
      .appendChild(createLinkCard(item));
  });

  return $newCategory;
};

// Event
$addButton.onclick = addCategory;

window.addEventListener('DOMContentLoaded', fetchCategory);
