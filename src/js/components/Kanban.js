import LinkCard from './LinkCard.js';

const createDropZone = () => {
  const $dropZone = document.createElement('div');
  $dropZone.className = 'kanban__dropzone';

  ['ondragover', 'ondragleave'].forEach(eventProperty => {
    $dropZone[eventProperty] = e => {
      e.preventDefault();
      $dropZone.classList.toggle('active', eventProperty === 'ondragover');
    };
  });

  return $dropZone;
};

const createCategory = ({ id, title }) => {
  const $category = document.createElement('div');
  $category.dataset.id = id;
  $category.className = 'kanban__column';
  $category.innerHTML = `
    <button class="kanban__column-delete" type="button">X</button>
    <h3 class="kanban__column-title">${title}</h3>
    <ul class="kanban__column-items"></ul>`;

  $category
    .querySelector('.kanban__column-items')
    .appendChild(createDropZone());

  return $category;
};

const createLinkCard = data => {
  const id = Math.floor(Math.random() * 100);
  const $fragment = document.createDocumentFragment();

  const linkCard = new LinkCard(data);
  const $linkCard = linkCard.cardElement;
  $linkCard.draggable = true;
  $linkCard.classList.add('kanban__item');
  $linkCard.dataset.id = id;

  $linkCard.ondragstart = e => {
    e.dataTransfer.setData('text/plain', id);
  };

  $fragment.appendChild($linkCard);
  $fragment.appendChild(createDropZone());

  return $fragment;
};

export { createDropZone, createCategory, createLinkCard };
