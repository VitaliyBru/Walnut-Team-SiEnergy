const RESOLUTION = {
  desktop: 1366,
  tablet: 767,
  module: 319
};
let currentSize = 0;
let oldSize = 0;
let dataName = ``;

export default (classBg) => {
  const bgElement = document.querySelector(classBg);

  const setResolutionType = () => {
    if (window.innerWidth > RESOLUTION.desktop) {
      currentSize = 1920;
    } else if (window.innerWidth > RESOLUTION.tablet) {
      currentSize = 768;
    } else {
      currentSize = 320
    }
  };

  const onResize = () => {
    setResolutionType();
    if (currentSize === oldSize) {
      return;
    }
    oldSize = currentSize;
    dataName = `bg${currentSize}`;
    if (!bgElement.dataset[dataName]) {
      return;
    }
    bgElement.style.cssText = `background-image: url("${bgElement.dataset[dataName]}")`;
  };

  onResize();
  window.addEventListener(`resize`, onResize);
}
