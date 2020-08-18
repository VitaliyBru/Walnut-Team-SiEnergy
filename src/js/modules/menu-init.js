export default (configData = {}) => {
  if (!configData.baseLayer || !configData.menuButton || !configData.closeButton
      || !configData.openingClass) {
    console.log(`Сандвич меню не активировано не заданы необходимые классы объектов`);
    return;
  }
  const baseLayer = document.querySelector(configData.baseLayer);
  const menuButton = baseLayer.querySelector(configData.menuButton);
  const closeButton = baseLayer.querySelector(configData.closeButton);

  const openMenu = () => {
    baseLayer.classList.add(configData.openingClass);
    menuButton.removeEventListener(`click`, onMenuButtonClick);
    closeButton.addEventListener(`click`, onCloseButtonClick);
    baseLayer.addEventListener(`click`, onOverlayClick);
  };
  const closeMenu =() => {
    baseLayer.classList.remove(configData.openingClass);
    menuButton.addEventListener(`click`, onMenuButtonClick);
    closeButton.removeEventListener(`click`, onCloseButtonClick);
    baseLayer.removeEventListener(`click`, onOverlayClick);
  };

  const onMenuButtonClick = (evt) => {
    evt.stopPropagation();
    openMenu();
  };
  const onCloseButtonClick = () => {
    closeMenu();
  };
  const onOverlayClick = (evt) => {
    if (evt.currentTarget === evt.target) {
      evt.stopPropagation();
      closeMenu();
    }
  };

  menuButton.addEventListener(`click`, onMenuButtonClick);
}
