import Swiper, {Pagination} from "swiper";

Swiper.use([Pagination]);
const swiper = new Swiper(`.hero__swiper`, {
  speed: 450,
  pagination: {
    el: `.hero__pagination`,
    clickable: true
  }});

export default () => swiper;
