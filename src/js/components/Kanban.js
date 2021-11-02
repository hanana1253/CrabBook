const createDropZone = () => {
  const $newDropZone = document.createElement('div');
  $newDropZone.className = 'kanban__dropzone';

  ['ondragover', 'ondragleave'].forEach(eventProperty => {
    $newDropZone[eventProperty] = e => {
      e.preventDefault();
      $newDropZone.classList.toggle('active', eventProperty === 'ondragover');
    };
  });

  return $newDropZone;
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

const createLinkCard = ({ description }) => {
  const id = Math.floor(Math.random() * 100);
  const $linkCard = document.createElement('li');
  $linkCard.draggable = true;
  $linkCard.className = 'kanban__item';
  $linkCard.dataset.id = id;
  $linkCard.innerHTML = `<div class="kanban__item-input">${description}</div>`;

  $linkCard.appendChild(createDropZone());

  $linkCard.ondragstart = e => {
    e.dataTransfer.setData('text/plain', id);
  };

  return $linkCard;
};

export { createDropZone, createCategory, createLinkCard };
