const DATA_CALL_BACK = 'formCallBack'
const DATA_HYPOTHEC = 'formHypothec'

function saveValueToLocalStorage(stringName, value) {
  localStorage.setItem(stringName, JSON.stringify(value))
}

function loadValueFromLocalStorage(stringName) {
  return {
    [stringName]: JSON.parse(localStorage.getItem(stringName))
  }
}

export function saveFormCallBackLocalStorage({telNum, timeStamp, ...prop}) {
  let _data = {
    telNum: telNum,
    timeStamp: timeStamp
  }
  saveValueToLocalStorage(DATA_CALL_BACK, _data)
}

export function saveFormHypothecLocalStorage(data) {
  saveValueToLocalStorage(DATA_HYPOTHEC, data)
}



export function loadDataCallBack() {
  return loadValueFromLocalStorage(DATA_CALL_BACK)
}

export function loadDataHypothec() {
  return loadValueFromLocalStorage(DATA_HYPOTHEC)
}



export function getAllDataFromLocalStorage() {
  let _obj = {
    ...loadDataCallBack(),
    ...loadDataHypothec()
  }
  return _obj
}
