import "../scss/style.scss";

import customSelect from "./modules/custom-select";
import getSwiper from "./modules/hero-swiper";
import callback from "./modules/callback";
import setSliderBackground from "./modules/slider-background";
import menuInit from "./modules/menu-init";
import inputMaskInit from "./modules/input-mask-init";

customSelect(`header__lang`, `header__lang--open`);
getSwiper();
callback();
setSliderBackground(`.hero__swiper`);
menuInit({
  baseLayer: `.header__content`,
  menuButton: `.header__sandwich`,
  closeButton: `.header__close-menu`,
  openingClass: `js-open-menu`
});
inputMaskInit({formName: `callback`, inputName: `phone`});
