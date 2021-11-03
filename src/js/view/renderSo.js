const $sidebarCardList = document.querySelector('.sidebar__card-list');
const profilChart = document.querySelector('.profil__chart').getContext('2d');
const timeWeekChart = document
  .querySelector('.time__chart--week')
  .getContext('2d');
const jandiChart = document.querySelector('.jandi__chart').getContext('2d');

// TODO: statistics 부분은 render.js에 합칠 예정
export default (categories, cards) => {
  const $domFramgment = document.createDocumentFragment();

  cards[0].forEach($card => $domFramgment.appendChild($card));

  [...$sidebarCardList.children].forEach(($linkCard, index) => {
    if (index > 0) $linkCard.remove();
  });

  $sidebarCardList.appendChild($domFramgment);
};
