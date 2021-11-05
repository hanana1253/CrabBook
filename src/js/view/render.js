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

  const renderChart = chartData => {
    const $allChartContainer = [
      ...document.querySelectorAll('.chart-container')
    ];

    const className = [
      'profil__chart',
      'jandi__chart scrap',
      'read__chart--week'
    ];

    $allChartContainer.forEach(($chartContainer, index) => {
      $chartContainer.innerHTML = `<canvas class="${className[index]}"></canvas>`;
    });

    chartData.forEach(
      ({ data }, index) =>
        new Chart($allChartContainer[index].firstElementChild, data)
    );
  };

  const renderRecentLinks = cards => {
    const $cards = document.createDocumentFragment();
    cards.forEach(cardData => {
      cardData.firstElementChild.draggable = false;
      $cards.appendChild(cardData.firstElementChild);
    });

    document.querySelector('.links__ul').innerHTML = '';
    document.querySelector('.links__ul').appendChild($cards);
  };

  return {
    mainPage(categories, cards) {
      renderSidebar(cards[0]);
      renderCategory(categories.slice(1), cards.slice(1));
    },

    myPage(chartData, cards) {
      renderChart(chartData);
      renderRecentLinks(cards);
    }
  };
})();
