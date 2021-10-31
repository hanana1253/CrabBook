// DOM Nodes
const $kanban = document.querySelector('.kanban');
const $addButton = document.querySelector('.kanban__add-column');

// state, 링크 데이터(임시)
const state = [
  {
    id: 1,
    title: 'Category1'
  },
  {
    id: 2,
    title: 'Category2'
  },
  {
    id: 3,
    title: 'Category3'
  }
];

// Functions
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

  $newDropZone.ondrop = e => {
    e.preventDefault();
    $newDropZone.classList.remove('kanban__dropzone--active');

    const $categoryElement = $newDropZone.closest('.kanban__column');

    const droppedIndex = [
      ...$categoryElement.querySelectorAll('.kanban__dropzone')
    ].indexOf($newDropZone);

    const cardId = e.dataTransfer.getData('text/plain');
    const $droppedCard = document.querySelector(`[data-id="${cardId}"]`);

    const insertAfter = $newDropZone.parentElement.matches('.kanban__item')
      ? $newDropZone.parentElement
      : $newDropZone;

    if ($droppedCard.contains($newDropZone)) return;

    insertAfter.after($droppedCard);

    // console.log($newDropZone.parentElement.classList);
  };

  return $newDropZone;
};

const createLinkCard = () => {
  const id = Math.floor(Math.random() * 100);
  const $newCard = document.createElement('div');
  $newCard.draggable = true;
  $newCard.className = 'kanban__item';
  $newCard.dataset.id = id;
  $newCard.innerHTML = `<div class="kanban__item-input">hihi</div>`;

  $newCard.appendChild(createDropZone());

  $newCard.ondragstart = e => {
    e.dataTransfer.setData('text/plain', id);
  };

  return $newCard;
};

const createCategory = ({ id, title }) => {
  const $newCategory = document.createElement('div');
  $newCategory.dataset.id = id;
  $newCategory.className = 'kanban__column';
  $newCategory.innerHTML = `
  <div class="kanban__column-title">${title}</div>
  <div class="kanban__column-items"></div>
  <button class="kanban__add-item" type="button">+ Add</button>`;

  $newCategory
    .querySelector('.kanban__column-items')
    .appendChild(createDropZone());

  $newCategory
    .querySelector('.kanban__column-items')
    .appendChild(createLinkCard());

  $newCategory
    .querySelector('.kanban__column-items')
    .appendChild(createLinkCard());

  return $newCategory;
};

// Event
let stateNum = 0;
$addButton.onclick = () => {
  stateNum = stateNum > 2 ? stateNum + 1 : 0;
  $kanban.appendChild(createCategory(state[stateNum]));
};
