import Inputmask from "inputmask/lib/inputmask";

export default (initParam = {}) => {
  if (!initParam.formName || !initParam.inputName) {
    return;
  }

  Inputmask({"mask": `+7 (999) 999-99-99`}).mask(document.forms[initParam.formName][initParam.inputName]);
}
