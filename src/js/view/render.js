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
      cards[index].forEach($card =>
        $category.querySelector('ul').appendChild($card)
      );
      $domFramgment.appendChild($category);
    });

    // Append category button
    const $addbutton = document.createElement('button');
    $addbutton.classList.add('kanban__add-button');
    $addbutton.innerHTML = `<i class="bx bx-plus-circle"></i>`;
    $domFramgment.appendChild($addbutton);

    document.querySelector('.kanban').innerHTML =
      '<h2 class="kanban__title a11y-hidden">칸반 보드</h2>';

    document.querySelector('.kanban').appendChild($domFramgment);
  };

  const renderMypage = chartDatas => {
    chartDatas.forEach(({ canvas, data }) => {
      new Chart(canvas, data);
    });
  };

  const renderRecommend = async $recommendSiteCard => {
    // TODO: 스피너만들기
    document.querySelector('.recommend').innerHTML = '';
    document.querySelector('.recommend').appendChild($recommendSiteCard);
  };

  const recentScraps = data => {
    document.querySelector('.links__ul').innerHTML = data
      .map(
        ({ createDate, title, description }) => `
    <li class="links__item">
      <div class="links__item--date">${createDate}</div>
      <div class="links__item--title">${title}</div>
      <div class="links__item--description">${description}</div>
    </li>`
      )
      .join('');
  };

  return {
    mainPage(categories, cards) {
      renderSidebar(cards[0]);
      renderCategory(categories.slice(1), cards.slice(1));
    },

    myPage(chartDatas, scrapData) {
      // renderSidebar(cards && cards[0]);
      recentScraps(scrapData);
      renderMypage(chartDatas);
    },

    renderTest($recommendSiteCard) {
      renderRecommend($recommendSiteCard);
    }
  };
})();
