const THROTTLE_TIME = 900;

export default (selectClass, selectOpeningClass) => {
  const customSelectEls = document.querySelectorAll(`.${selectClass}`);

  [].forEach.call(customSelectEls, (it) => {
    let counter = 0;
    let timeStamp = 0;
    const onEscPress = (evt) => {
      const btnPress = evt.key.toLowerCase();
      if (btnPress === `esc` || btnPress === `escape`) {
        it.classList.remove(selectOpeningClass);
        evt.target.blur();
      }
    };
    const onClick = (evt) => {
      if (THROTTLE_TIME < (evt.timeStamp - timeStamp)) {
        evt.target.blur();
      }
    };

    it.addEventListener(`focusin`, (evt) => {
      counter++;
      if (counter === 1) {
        timeStamp = evt.timeStamp;
        it.classList.add(selectOpeningClass);
        it.addEventListener(`click`, onClick);
        document.addEventListener(`keydown`, onEscPress);
      }
    });
    it.addEventListener(`focusout`, () => {
      setTimeout(() => {
        counter--;
        if (!counter) {
          it.classList.remove(selectOpeningClass);
          it.removeEventListener(`click`, onClick);
          document.removeEventListener(`keydown`, onEscPress);
        }
      }, 40);
    });
  });
}
