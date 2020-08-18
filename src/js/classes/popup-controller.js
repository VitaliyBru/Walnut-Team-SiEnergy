export default class PopupController {
  constructor(initialData = {}, requiredFields = []) {
    this.openBtn = initialData['open-button']
        ? document.querySelector(initialData['open-button'])
        : null;
    this.closeBtn = initialData['close-button']
        ? document.querySelector(initialData['close-button'])
        : null;
    this.popupOverlay = initialData['popup-overlay']
        ? document.querySelector(initialData['popup-overlay'])
        : null;
    this.formEl = initialData['form-name']
        ? document.forms[initialData['form-name']]
        : null;

    this.yScrollPosition = null;
    this.isSuccess = false;
    this.requiredFields = requiredFields;

    this._onOpenBtnClick = this._onOpenBtnClick.bind(this);
    this._onCloseBtnClick = this._onCloseBtnClick.bind(this);
    this._onOverlayClick = this._onOverlayClick.bind(this);
    this._onEscBtnPress = this._onEscBtnPress.bind(this);
    this._onInvalid = this._onInvalid.bind(this);
    this._setRequired = this._setRequired.bind(this);
    this._sendForm = this._sendForm.bind(this);
  }

  initPopup () {
    this.openBtn ? this.openBtn.addEventListener(`click`, this._onOpenBtnClick)
        : console.log(`Кнопка открытия попапа не задана`);

    !this.closeBtn && console.log(`Кнопка закрытия попапа не задана`);
    !this.popupOverlay && console.log(`Класс оверлея не задан`);
    !this.formEl && console.log(`Имя формы не задано`);
  }

  _onOpenBtnClick () {
    this._openPopup();
  }

  _onCloseBtnClick (evt) {
    evt.stopPropagation();
    this._closePopup();
  }

  _onOverlayClick (evt) {
    evt.stopPropagation();
    if (evt.target === this.popupOverlay) {
      this._closePopup();
    }
  }

  _onEscBtnPress (evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      this._closePopup();
    }
  }

  _openPopup () {
    this.yScrollPosition = window.scrollY;
    document.body.classList.add(`js-callback`);
    this.openBtn.removeEventListener(`click`, this._onOpenBtnClick);
    this.closeBtn.addEventListener(`click`, this._onCloseBtnClick);
    this.popupOverlay.addEventListener(`click`, this._onOverlayClick);
    document.addEventListener(`keydown`, this._onEscBtnPress);
    this.formEl.addEventListener(`submit`, this._sendForm);
    this.formEl.addEventListener(`invalid`, this._onInvalid, true);
    document.body.style.top = `-${this.yScrollPosition}px`;
  }

  _closePopup () {
    document.body.removeAttribute(`style`);
    document.body.classList.remove(`js-callback`);
    this.openBtn.addEventListener(`click`, this._onOpenBtnClick);
    this.closeBtn.removeEventListener(`click`, this._onCloseBtnClick);
    this.popupOverlay.removeEventListener(`click`, this._onOverlayClick);
    this.isSuccess && this.popupOverlay.classList.remove(`js-success`);
    document.removeEventListener(`keydown`, this._onEscBtnPress);
    this.formEl.removeEventListener(`submit`, this._sendForm);
    this.formEl.removeEventListener(`invalid`, this._onInvalid, true);
    this.formEl.reset();
    window.scroll(0, this.yScrollPosition);
    this.isSuccess = false;
  }

  _showSuccess () {
    this.popupOverlay.classList.add(`js-success`);
    this.isSuccess = true;
  }

  _onInvalid (evt) {
    evt.preventDefault();
  }

  _setRequired (inputName) {
    this.formEl[inputName].setAttribute(`required`, ``);
  }

  _sendForm (evt) {
    evt.preventDefault();
    this.requiredFields.forEach(this._setRequired);
    if (this.formEl.checkValidity()) {
      fetch(this.formEl.action, {
        method: this.formEl.method,
        // Строка закоментирована для создания симуляции т.к. тестовый сервер не поддерживает метод POST
        // body: new FormData(this.formEl)
      })
        .then(response => {
          if (response.ok) {
            this._showSuccess();
          }
        })
        .catch(err => {console.log(err.message)});
    }
  }
}
