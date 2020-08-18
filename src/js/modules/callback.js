import PopupController from "../classes/popup-controller";

export default () => {
  const feedbackPopup = new PopupController(
    {
      'open-button': `.js-callback-open`,
      'close-button': `.js-callback-close`,
      'popup-overlay': `.js-callback-overlay`,
      'form-name': `callback`
    },
    [`phone`, `user`, `permission`]
  );
  feedbackPopup.initPopup();
}
