import {
  getAllDataFromLocalStorage,
  saveFormCallBackLocalStorage,
  saveFormHypothecLocalStorage
} from "localStorage/localStorage";

const SAVE_FORM_CALL_BACK = "SAVE_FORM_CALL_BACK"; // сохранить данные формы CALL_BACK
const SAVE_FORM_HYPOTHEC = "SAVE_FORM_HYPOTHEC"; // сохранить данные формы HYPOTHEC
const UPDATE_DATA_FROM_LOCAL_STORAGE = "UPDATE_DATA_FROM_LOCAL_STORAGE"; // обновить данные формы если есть данные в localStorage

let initialState = {
  formCallBack: {
    telNum: "",
    timeStamp: "",
    dateText: "",
    telText: ""
  },
  formHypothec: {
    cost: "",
    time: "",
    pay: "",
    rate: "",
  }
}

const formsValuesReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DATA_FROM_LOCAL_STORAGE: {
     return {
       ...state,
       ...action.localStorage
     }
    }
    case SAVE_FORM_CALL_BACK:
      return {
        ...state, formCallBack: action.formCallBack
      }
    case SAVE_FORM_HYPOTHEC:
      return {
        ...state, formHypothec: action.formHypothec
      }
    default:
      return state
  }
}

export const saveFormCallBack = (formCallBack) => ({type: SAVE_FORM_CALL_BACK, formCallBack})
export const saveFormHypothec = (formHypothec) => ({type: SAVE_FORM_HYPOTHEC, formHypothec})

export const updateFormCallBack = (dataForm) => (dispatch) => {
  saveFormCallBackLocalStorage(dataForm) // сохранить данные в LocalStorage
  dispatch(saveFormCallBack(dataForm))
}

export const updateFormHypothec = (dataForm) => (dispatch) => {
  saveFormHypothecLocalStorage(dataForm) // сохранить данные в LocalStorage
  dispatch(saveFormHypothec(dataForm))
}

export const updateDataFromLocalStorage = () => (dispatch) => {
  const localStorage = getAllDataFromLocalStorage() // получить все данные из LocalStorage
  dispatch({type: UPDATE_DATA_FROM_LOCAL_STORAGE, localStorage})
}

export default formsValuesReducer
