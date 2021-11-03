export default (() => {
  const $sidebarCardList = document.querySelector('.sidebar__card-list');

  const renderSidebar = cards => {
    const $domFramgment = document.createDocumentFragment();

    cards.forEach($card => $domFramgment.appendChild($card));

    [...$sidebarCardList.children].forEach(($linkCard, index) => {
      if (index > 0) $linkCard.remove();
    });

    $sidebarCardList.appendChild($domFramgment);
  };

  const renderCategory = (categories, cards) => {
    const $domFramgment = document.createDocumentFragment();

    categories.forEach(($category, index) => {
      cards[index].forEach($card => $category.appendChild($card));
      $domFramgment.appendChild($category);
    });

    document.querySelector('.kanban').innerHTML =
      '<h2 class="kanban__title a11y-hidden">칸반 보드</h2>';

    document.querySelector('.kanban').appendChild($domFramgment);
  };

  const renderMypage = chartDatas => {
    chartDatas.forEach(({ canvas, data }) => new Chart(canvas, data));
  };

  const renderRecommend = async $recommendSiteCard => {
    // TODO: 스피너만들기
    document.querySelector('.recommend').innerHTML = '';
    document.querySelector('.recommend').appendChild($recommendSiteCard);
  };

  return {
    mainPage(categories, cards) {
      renderSidebar(cards[0]);
      renderCategory(categories.slice(1), cards.slice(1));
    },

    myPage(chartDatas, cards) {
      // renderSidebar(cards && cards[0]);
      renderMypage(chartDatas);
    },

    renderTest($recommendSiteCard) {
      renderRecommend($recommendSiteCard);
    }
  };
})();
