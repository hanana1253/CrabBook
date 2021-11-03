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
    // @todo: request post to server
    // this.updateMemo();
  }

  async updateMemo() {
    const response = await axios.post('/url', {
      id: this._id,
      memo: this._memo
    });
    if (response.status === 200) return;
    // @todo: error handling
  }

  /**
   * Get card DOM Element
   * @returns {DOMElement}
   */
  get cardElement() {
    return this.createLinkCard();
  }

  /**
   * Create link card's Thumbnail
   * @returns {DOMElement}
   */
  createLinkThumbnail() {
    const $thumbnail = document.createElement('figure');
    $thumbnail.classList.add('linkcard__thumbnail');
    $thumbnail.innerHTML = `
      <img class="linkcard__thumbnail__img"
          src="${this._img.url || '/images/thumbnail.png'}"
          alt="${this._title}"
      />`;
    // Add Event linstener
    $thumbnail.onclick = () => window.open(this._url, '_blank');
    return $thumbnail;
  }

  /**
   * Create link card's Details
   * @param {DOMElement} $targetCard
   * @returns {DOMElement}
   */
  createLinkDetail($targetCard) {
    const $linkInfo = document.createElement('div');
    $linkInfo.classList.add('linkcard__content');
    $linkInfo.innerHTML = `
      <a href="${this._url}" target="_blank" class="linkcard__content__title">
        ${this._title}
      </a>
      <div class="linkcard__content__tag__container">
        ${this._tags.map(tag => `<button class="badge">${tag}</button>`)}
        <button class="badge add-badge">+</button>
      </div>
      <div class="linkcard__content__description">
        ${this._description}
      </div>
      <button class="toggle-card">
        <i class="bx bx-dots-vertical-rounded"></i>
        <div class="tooltipMenu">
          <ul>
            <li class="linkcard__show-all">Show All</li>
            <li class="linkcard__delete">Delete</li>
          </ul>
        </div>
      </button>
    `;

    $linkInfo
      .querySelector('.linkcard__show-all')
      .addEventListener('click', e => {
        const isActive = $targetCard.classList.toggle('linkcard--active');
        isActive
          ? (e.target.textContent = 'Hide')
          : (e.target.textContent = 'Show All');
      });
    $linkInfo
      .querySelector('.linkcard__delete')
      .addEventListener('click', () => {
        $targetCard.remove();
      });
    return $linkInfo;
  }

  /**
   * Create link card's memo
   * @param {DOMElement} $targetCard
   * @returns {DOMElement}
   */
  createLinkMemo($targetCard) {
    const $linkMemo = document.createElement('div');
    $linkMemo.classList.add('linkcard__content__memo');
    $linkMemo.innerHTML = `<div class="linkcard__content__memo__title"><i>memo</i></div>`;

    const $textarea = document.createElement('textarea');
    $textarea.setAttribute('readonly', true);
    $textarea.classList.add('linkcard__content__memo__textarea');
    $textarea.value = this.memo;
    $linkMemo.appendChild($textarea);

    const $editButton = document.createElement('button');
    $editButton.classList.add('edit__button');
    $editButton.innerHTML = `<i class="bx bx-edit"></i>edit`;
    $linkMemo.appendChild($editButton);

    // Add Event linstener
    let isShift = false;
    $textarea.onkeyup = e => {
      if (e.key === 'Shift') isShift = false;
    };

    $textarea.onkeydown = e => {
      if (e.key === 'Shift') isShift = true;
      if (e.key === 'Enter' && isShift) {
        this.memo = $textarea.value;
        $targetCard
          .querySelector('.linkcard__show-all')
          .dispatchEvent(new Event('click'));
        $editButton.innerHTML = '<i class="bx bx-edit"></i>edit';
      }
    };

    $editButton.onclick = () => {
      $textarea.toggleAttribute('readonly');
      if ($textarea.getAttribute('readonly') === null) {
        $editButton.innerHTML = '<i class="bx bx-edit"></i>done';
        $textarea.focus();
      } else {
        this.memo = $textarea.value;
        $targetCard
          .querySelector('.linkcard__show-all')
          .dispatchEvent(new Event('click'));
        $editButton.innerHTML = '<i class="bx bx-edit"></i>edit';
      }
    };

    return $linkMemo;
  }

  /**
   * Create Link Card Element
   * @returns {DOMElement}
   */
  createLinkCard() {
    const $linkCard = document.createElement('article');
    $linkCard.classList.add('linkcard');

    // Add Thumbnail
    $linkCard.appendChild(this.createLinkThumbnail());
    // Add Details
    $linkCard.appendChild(this.createLinkDetail($linkCard));
    // Add Memo
    $linkCard.appendChild(this.createLinkMemo($linkCard));

    return $linkCard;
  }
}
