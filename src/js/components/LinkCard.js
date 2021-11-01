const bindEvent = $target => {
  $target.onclick = e => {
    if (
      e.target.matches('.linkcard__thumbnail') ||
      e.target.matches('.linkcard__content__title')
    )
      return;
    $target.classList.toggle('linkcard--active');
  };
  return $target;
};

export default class LinkCard {
  constructor(linkData) {
    this._id = linkData.id;
    this._title = linkData.title;
    this._description = linkData.description;
    this._url = linkData.url;
    this._img = linkData.img;
    this._tags = linkData.tags;
    this._createDate = linkData.createDate;
    this._readStatus = linkData.readStatus;
    this._clickCount = linkData.clickCount;
    this._memo = linkData.memo;
  }

  get memo() {
    return this._memo;
  }

  set memo(newMemo) {
    this._memo = newMemo;
  }

  get cardElement() {
    const $linkCard = this.createLinkCard();
    return bindEvent($linkCard);
  }

  createLinkCard() {
    const $linkCard = document.createElement('article');
    $linkCard.classList.add('linkcard');

    const $thumbnail = document.createElement('figure');
    $thumbnail.classList.add('linkcard__thumbnail');
    $thumbnail.onclick = () => window.open(this._url, '_blank');
    $thumbnail.innerHTML = `
      <img class="linkcard__thumbnail--img"
          src="${this._img.url}"
          alt="${this._title}"
      />`;
    $linkCard.appendChild($thumbnail);

    const $linkInfo = document.createElement('div');
    $linkInfo.classList.add('linkcard__content');
    $linkInfo.innerHTML = `
      <a href="${this._url}" target="_blank" class="linkcard__content__title">
        ${this._title}
      </a>
      <div class="linkcard__content__tag__container">
        ${this._tags.map(tag => `<button class="badge">${tag}</button>`)}
      </div>
      <div class="linkcard__content__description">
        ${this._description}
      </div>
      <div class="linkcard__content__memo">
        <div><i>memo</i></div>
        <textarea class="linkcard__content__memo__textarea">${
          this._memo
        }</textarea>
      </div>
      <button class="toggle-card">
        <i class="bx bx-dots-vertical-rounded"></i>
        <div class="tooltipMenu">
          <ul>
            <li>Delete</li>
            <li>Favarite</li>
          </ul>
        </div>
      </button>
      
    `;
    $linkCard.appendChild($linkInfo);

    return $linkCard;
  }
}
