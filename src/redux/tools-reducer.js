const SHOW_MODAL_BY_NAME = "SHOW_MODAL_BY_NAME"; // Показать модальное окно по значению
const HIDE_MODAL = "HIDE_MODAL"; // Скрыть модальное окно
const TOGGLE_RIGHT_PERSONAL_DATA = "TOGGLE_RIGHT_PERSONAL_DATA"; // разрешение передачи персональных данных
const SET_MODAL_WINDOW_BUSY = "SET_MODAL_WINDOW_BUSY"; // установить флаг - модальное окно занято, отправляется письмо например
const UNSET_MODAL_WINDOW_BUSY = "UNSET_MODAL_WINDOW_BUSY"; // сбросить флаг - модальное окно занято, когда отправили письмо например
const SET_TEXT_MODAL_WINDOW_BUSY = "SET_TEXT_MODAL_WINDOW_BUSY"; // текст, когда флаг BUSY

const UPDATE_SCREEN_SIZE = "UPDATE_SCREEN_SIZE"; // обновить данные, ширины сайта (размер экрана)

// Установить данные поля ввода в формах с телефоном пользователя
// Номер, начальное и конечное положение символа ввода
const SET_FORM_TEL = "SET_FORM_TEL";

let initialState = {
  activeModalWindowName: "", // "" - модальные окна все скрыты "MenuMobile Callback1"
  activeModalWindowData: {},
  modalWindowBusy: false,
  modalWindowBusyText: "",
  screenSize: {
    // размер сайта
    width: typeof window === "object" ? window.innerWidth : null,
    height: typeof window === "object" ? window.innerWidth : null,
  },
  userForm: {
    formTel: {
      number: "",
      posStart: 0,
      posEnd: 0,
    },
    rightsPersonalData: {
      checked: true,
      valid: true,
      required: true,
      used: false,
    },
  },
};

const toolsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL_BY_NAME:
      return {
        ...state,
        activeModalWindowName: action.newModalWindowName,
        activeModalWindowData: action?.data,
      };
    case SET_MODAL_WINDOW_BUSY:
      return {
        ...state,
        modalWindowBusy: true,
      };
    case UNSET_MODAL_WINDOW_BUSY:
      return {
        ...state,
        modalWindowBusy: false,
      };
    case SET_TEXT_MODAL_WINDOW_BUSY:
      return {
        ...state,
        modalWindowBusyText: action.modalWindowBusyText,
      };
    case UPDATE_SCREEN_SIZE:
      return {
        ...state,
        screenSize: action.screenSize,
      };

    case HIDE_MODAL:
      return {
        ...state,
        activeModalWindowName: "",
      };
    case SET_FORM_TEL:
      return {
        ...state,
        userForm: { ...state.userForm, formTel: action.formTel },
      };
    case TOGGLE_RIGHT_PERSONAL_DATA:
      let currentChecked = state.userForm.rightsPersonalData.checked;
      let newRightsPersonalData = {
        checked: !currentChecked,
        valid: !currentChecked,
        required: state.userForm.rightsPersonalData.required,
        used: true,
      };
      return {
        ...state,
        userForm: {
          ...state.userForm,
          rightsPersonalData: newRightsPersonalData,
        },
      };
    default:
      return state;
  }
};

export const showModalWindowByName = (newModalWindowName, data) => ({
  type: SHOW_MODAL_BY_NAME,
  newModalWindowName,
  data,
});
export const hideModalWindow = () => ({ type: HIDE_MODAL });

export const setModalWindowBusy = () => ({ type: SET_MODAL_WINDOW_BUSY });
export const unsetModalWindowBusy = () => ({ type: UNSET_MODAL_WINDOW_BUSY });
export const setTextModalWindowBusy = (modalWindowBusyText) => ({
  type: SET_TEXT_MODAL_WINDOW_BUSY,
  modalWindowBusyText,
});

export const toggleRightsPersonalData = () => ({
  type: TOGGLE_RIGHT_PERSONAL_DATA,
});

export const updateScreenWidth = () => ({
  type: UPDATE_SCREEN_SIZE,
  screenSize: {
    width: typeof window === "object" ? window.innerWidth : null,
    height: typeof window === "object" ? window.innerHeight : null,
  },
});

// export const fnShow_modal_Call = (modalWindowName) => (dispatch) => {
//     dispatch(fnShow_modal(modalWindowName)); //!!! инициализировать данные программы (в будущем брать с сервера нужные данные)
// };

export default toolsReducer;
