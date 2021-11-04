import LinkCard from './LinkCard.js';

const createDropZone = () => {
  const $dropZone = document.createElement('li');
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
    <ul class="kanban__column-items"></ul>
    `;

  const $input = document.createElement('input');
  $input.className = 'edit';
  $input.hidden = true;

  $input.onblur = e => {
    e.target.hidden = true;
  };

  $category.appendChild($input);

  $category
    .querySelector('.kanban__column-items')
    .appendChild(createDropZone());

  return $category;
};

const createLinkCard = data => {
  const $fragment = document.createDocumentFragment();

  const linkCard = new LinkCard(data);
  const $linkCard = linkCard.cardElement;
  $linkCard.draggable = true;
  $linkCard.classList.add('kanban__item');
  $linkCard.dataset.id = data.id;

  $linkCard.ondragstart = e => {
    e.dataTransfer.setData('text/plain', data.id);
  };

  $fragment.appendChild($linkCard);
  if (data.id !== 0) $fragment.appendChild(createDropZone());

  return $fragment;
};

export { createDropZone, createCategory, createLinkCard };
