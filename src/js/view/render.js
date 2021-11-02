const $sidebarCardList = document.querySelector('.sidebar__card-list');

export default (categories, cards) => {
  const $domFramgment = document.createDocumentFragment();

  cards[0].forEach($card => $domFramgment.appendChild($card));

  [...$sidebarCardList.children].forEach(($linkCard, index) => {
    if (index > 0) $linkCard.remove();
  });

  $sidebarCardList.appendChild($domFramgment);

  const $domFramgment2 = document.createDocumentFragment();

  categories.forEach(($category, index) => {
    cards[index + 1].forEach($card => $category.appendChild($card));
    $domFramgment2.appendChild($category);
  });

  document.querySelector('.kanban').innerHTML =
    '<h2 class="kanban__title a11y-hidden">칸반 보드</h2>';
  document.querySelector('.kanban').appendChild($domFramgment2);
};
