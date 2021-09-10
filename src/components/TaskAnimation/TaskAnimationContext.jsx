import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {sleep} from "lib/js/jsMic";
import PropTypes from 'prop-types'

const ATTRS = {
  active: "data-anim-active", // активность элемента, BOOL
  timeOpen: "data-anim-time-open",
  timeOpening: "data-anim-time-opening", // длительность открытия анимации
  timeOpened: "data-anim-time-opened",
  timeClose: "data-anim-time-close",
  timeClosing: "data-anim-time-closing", // длительность закрытия анимации
  timeClosed: "data-anim-time-closed",
  forceOpenOff: "data-anim-force-open-off", // отменят анимацию открытия, если пропала активность, BOOL
  forceCloseOff: "data-anim-force-close-off", // отменят анимацию закрытия, если пропала активность, BOOL
  forceOff: "data-anim-force-off", // отменять анимацию открытия и закрытия, если пропала активность, BOOL
  animationOff: "data-anim-off" // выключить анимацию
}

const ATTRS_TASK = {
  taskWorking: "data-anim-working", // Task работает - атрубут управляется только из Task, BOOL
  value: "data-anim-value"  // значение анимации - атрубут управляется только из Task
}

const OPEN = "open"
const OPENING = "opening"
const OPENED = "opened"
const CLOSE = "close"
const CLOSING = "closing"
const CLOSED = "closed"

let iteratorEntries = function () {
  let currentIndex = 0
  let nextIndex = 0
  const allAtr = Object.entries(this)
  return {
    next: function () {
      currentIndex = nextIndex
      nextIndex++
      return currentIndex < allAtr.length ?
        {value: {fieldName: allAtr[currentIndex][0], value: allAtr[currentIndex][1]}, done: false} :
        {value: void 0, done: true}
    }
  }
}

// пустой объект - {} так как при вызове этого хука с не обёрнутым TaskAnimationProvider,
// при Деструктуризации объекта, объекта не будет, но тут мы подставим пустой объект
// ({} - не будет ошибок при Деструктуризации объекта)
const TaskAnimationContext = React.createContext({})
export const useTaskAnimation = () => {
  return useContext(TaskAnimationContext)
}

export const TaskAnimationProvider = (props) => {
  const {children, value, ...propsData} = props
  ATTRS[Symbol.iterator] = iteratorEntries.bind(ATTRS) // добавим ИТЕРАТОР для объекта с константами атрубутов
  const [mounting, setMounting] = useState(null) // флаг, что произошло монтирование
  const [dataProvider, setDataProvider] = useState(null)  // данные из провайдера
  const [arrayElementsAnimation, setArrayElementsAnimation] = useState(() => []) // данные всех элементов(объектов ) анимации (массив элементов)
  const [refreshArray, setRefreshArray] = useState(useMemo(() => {
    Symbol("refreshArray")
  }))

  // Инициализация элементов анимации
  function initAnimation(elementLinks) {
    const addNewElementAnimationToArray = (elLink) => {
      setArrayElementsAnimation(prev => {
        return [...prev, {
          elLink: elLink,
          dataElement: null,
          dataMixed: null,
          abortController: new AbortController(),
          abortStatus: false,
          taskWorking: false,
          value: CLOSED
        }]
      })
    }

    if (elementLinks) {
      if (elementLinks.current) { // если передается на инициализацию один элемент
        addNewElementAnimationToArray(elementLinks)

      } else if (elementLinks instanceof Array) {  // если передается на инициализацию массив элементов
        elementLinks.forEach(function (elLink) {
          if (elLink.current) { // если это именно ссылка на элемент
            addNewElementAnimationToArray(elLink)
          }
        })
      }
    }

  }

  // получить тип по fieldName
  function getTypeFieldByName(fieldName) {
    return TaskAnimationProvider.propTypesObj[fieldName]
  }

  // чтение value по типу данных value(field Element)
  function getValueFromValueAndFieldName(value, fieldName) {
    const _ERR = "" // если значение не соответствует типу
    if ((value === null) || (value === void 0) || (value === Infinity)) return _ERR // данные пустые

    const typeName = getTypeFieldByName(fieldName)
    switch (typeName) {
      case 'bool':
        if (typeof value === "boolean") return value
        if (value === "true") return true
        if (value === "false") return false
        return _ERR
      case 'string':
        if (typeof value === "string") return value
        if (typeof value === "function") return _ERR
        if (typeof value === "object") return _ERR
        return String(value)
      case 'number':
        if (typeof value === "function") return _ERR
        if (typeof value === "object") return _ERR
        if (!isNaN(Number(value)) && (typeof Number(value) === "number")) return Number(value)
        return _ERR
    }
    return _ERR
  }

  // получить данные элемента
  function getDataElement(element) {
    const outObj = {}
    for (const {fieldName, value} of ATTRS) {
      const _val = (element.current.getAttribute(value)) // получить данные из поля элемента
      const valNorm = getValueFromValueAndFieldName(_val, fieldName) // получаем value по имени поля
      if (valNorm !== "") outObj[fieldName] = valNorm // добавляем данные в объект
    }
    return {...outObj}
  }

  // получить данные по анимации элемента
  function getDataObj_ByATTR(val) {
    const outObj = {}
    for (const {fieldName, value} of ATTRS) {
      const _val = (val[fieldName]) // получить данные
      const valNorm = getValueFromValueAndFieldName(_val, fieldName) // получаем value по имени
      if (valNorm !== "") outObj[fieldName] = valNorm // добавляем данные в объект
    }
    return {...outObj} // соединяем данные по умолчанию и данные элемента
  }

  // обновить данные провайдера
  const updateProviderData = () => {
    const dataBeforeCalc = {...TaskAnimationProvider.defaultProps, ...value} // данные из провайдера по умолчанию + данные провайдера из Value
    setDataProvider(getDataObj_ByATTR(dataBeforeCalc)) // getDataObj_ByATTR - приводим поля к соответствию типа и отбросывает все что не содержится в перечне ATTRS
  }
  useEffect(() => {
    updateProviderData()
  }, [value]) // при изменении входящего Value в провайдер, обновим данные провайдера

  const getDataFieldIfProviderMain = ({providerFieldVal, childFieldVal}) => {
    if (providerFieldVal !== undefined) return providerFieldVal
    if (childFieldVal !== undefined) return childFieldVal
    return undefined
  } // получить значение filed, при условии, что сначала ищем значение у Provider, а затем элемента, если значение не задавали вернем undefined

  const FLAG_ALL = "FLAG_ALL"

  function updateDataElement(elLink = FLAG_ALL) {
    if (!mounting) return

    setArrayElementsAnimation(prev => {
      return (
        prev.map((_el, index, array) => {
          if ((_el.elLink === elLink) || (elLink === FLAG_ALL)) { // обновляем данные только если TRUE -> для обновленного элемента
            const _dataElement = getDataElement(_el.elLink)

            // debugger

            return {
              ..._el,
              dataElement: _dataElement,
              dataMixed: {...dataProvider, ..._dataElement},
              animationOff: getDataFieldIfProviderMain({
                providerFieldVal: dataProvider.animationOff,
                childFieldVal: _dataElement.animationOff
              })
            }
          }
          return _el // у элемента данные не трогаем
        })
      )
    })

  }

  useEffect(() => {
    updateDataElement() // запускаем без параметров, значит надо обновить все данные во всех элементах
  }, [dataProvider]) //

  function abortAnimationElement(el, taskCurrent) {
    // ! вставить сигнал, что abort
    changeElementDynamicAnimation(el.elLink.current, "abortStatus", true)
    if (taskCurrent === "OPEN_task") {
      changeElementDynamicAnimation(el.elLink.current, "value", CLOSED)
    }
    if (taskCurrent === "CLOSE_task") {
      changeElementDynamicAnimation(el.elLink.current, "value", OPENED)
    }
    el.abortController.abort()
  }

  useEffect(() => { // [dataProvider])

    function abortAction(el) {
      const _value = el.value
      const _isOpen = (_value === OPEN) || (_value === OPENING) || (_value === OPENED)
      const _isClose = (_value === CLOSE) || (_value === CLOSING) || (_value === CLOSED)
      const _isTaskWorking = el.taskWorking && el.taskWorking || false
      const _active = el.dataMixed.active
      const _abortStatus = el.abortStatus && el.abortStatus || false
      const _forceOpenOff = el.dataMixed.forceOpenOff || el.dataMixed.forceOff
      const _forceCloseOff = el.dataMixed.forceCloseOff || el.dataMixed.forceOff

      if (_isTaskWorking && _isOpen && !_active && !_forceOpenOff && !_abortStatus) {
        abortAnimationElement(el, "OPEN_task")
      }
      if (_isTaskWorking && _isClose && _active && !_forceCloseOff && !_abortStatus) {
        abortAnimationElement(el, "CLOSE_task")
      }
    }

    if (!mounting) return

    arrayElementsAnimation.forEach(function (elementArray, index) {
      if (elementArray.dataMixed === null) return
      if (elementArray.animationOff === true) { // если элемент отключен
        if (elementArray.animationOffFlag === true) return // и кстановлен флаг что все по анимации отключено, то никаких действий по анимации не делаем и выходим
        // иначе снимаем данные по анимации и отключаем анимацию, если она работает
        elementArray.elLink.current.removeAttribute(ATTRS_TASK.value)
        changeElementDynamicAnimation(elementArray.elLink.current, "animationOffFlag", true)
        if (elementArray.taskWorking === true) {
          changeElementDynamicAnimation(elementArray.elLink.current, "abortStatus", true)
          elementArray.abortController.abort()
        }
        return
      } else { // elementArray.animationOff === false
        if (elementArray.animationOffFlag === true) changeElementDynamicAnimation(elementArray.elLink.current, "animationOffFlag", false)
      }

      elementArray.elLink.current.setAttribute(ATTRS_TASK.taskWorking, elementArray.taskWorking && elementArray.taskWorking || false)       // индикация working
      elementArray.elLink.current.setAttribute(ATTRS_TASK.value, elementArray.value)       // индикация value

      const _active = elementArray.dataMixed.active
      const _working = elementArray.taskWorking
      const _value = elementArray.value
      const canOpen = _value ? (_value !== OPENED) : true
      const canClose = _value ? (_value !== CLOSED) : true

      if (elementArray.taskWorking === true) {
        abortAction(elementArray)
        return
      }


      if (_active && !_working && canOpen) {
        taskAnimation({
          elLink: elementArray.elLink.current,
          taskName: OPEN,
          dataMixed: elementArray.dataMixed,
          abortController: elementArray.abortController

        })
      }

      if (!_active && !_working && canClose) {
        taskAnimation({
          elLink: elementArray.elLink.current,
          taskName: CLOSE,
          dataMixed: elementArray.dataMixed,
          abortController: elementArray.abortController
        })
      }

    })

  }, [arrayElementsAnimation, initAnimation])
// }, [arrayElementsAnimation, mounting, refreshArray, initAnimation, dataProvider])

  async function taskAnimation({elLink, taskName, dataMixed, abortController}) { // старт ассинхронной функции открытия анимации переход состояний OPEN->OPENING->OPENED

    function setCurrentTimeStyle(_el, time) {
      time !== "" ? elLink.setAttribute("style", `transition-duration: ${time}ms`) : _el.removeAttribute("style")
    }

    function* generateOpen() {
      yield {value: OPEN, fnStepBefore: task_OPEN, time: dataMixed.timeOpen}
      yield {value: OPENING, time: dataMixed.timeOpening}
      yield {value: OPENED, fnStepAfter: task_OPENED, time: dataMixed.timeOpened}
    }

    function* generateClose() {
      yield {value: CLOSE, fnStepBefore: task_CLOSE, time: dataMixed.timeClose}
      yield {value: CLOSING, time: dataMixed.timeClosing}
      yield {value: CLOSED, fnStepAfter: task_CLOSED, time: dataMixed.timeClosed}
    }

    let _generator = (taskName === OPEN) ? generateOpen() : generateClose() // выбираем генератор по типу TaskName

    async function fn_step({elLink, abortController, time, value}) {
      let ourJob = new Promise((resolve, reject) => { // наша задача
        setTimeout(() => {
          abortController.signal.removeEventListener('abort', resolve)
          resolve("OK")
        }, time)
        abortController.signal.addEventListener('abort', resolve);
      })
      await ourJob.then(
        result => {
          // console.log(result)
        }
      )
    }

    for (let _v of _generator) {
      if (typeof _v.fnStepBefore === "function") _v.fnStepBefore(elLink) // если функция, для запуска перед выполнением шага, объявленна в генераторе, то вызовем её

      setCurrentTimeStyle(elLink, _v.time)
      changeElementDynamicAnimation(elLink, "value", _v.value)
      await fn_step({elLink, abortController: abortController, time: _v.time, value: _v.value})
      if (abortController.signal.aborted) { // если сработал aborted, то выходим из цикла анимации
        changeElementDynamicAnimation(elLink, "abortController", new AbortController())
        exitFromTask() // потчисть перед выходом
        changeElementDynamicAnimation(elLink, "abortStatus", false)
        break // прервать цикл FOR
      }

      if (typeof _v.fnStepAfter === "function") {
        _v.fnStepAfter(elLink)
      } // если функция, для запуска после выполнения шага, объявленна в генераторе, то вызовем её
    }

    function task_OPEN(elLink) {
      changeTaskWorking(elLink, true)
    }

    function task_OPENED() {
      changeTaskWorking(elLink, false)
      exitFromTask()
    }

    function task_CLOSE() {
      changeTaskWorking(elLink, true)
    }

    function task_CLOSED() {
      changeTaskWorking(elLink, false)
      exitFromTask()
    }

    function changeTaskWorking(elLink, val) {
      changeElementDynamicAnimation(elLink, "taskWorking", val)
      elLink.setAttribute(ATTRS_TASK.taskWorking, val)
    }

    function exitFromTask() {
      setCurrentTimeStyle(elLink, "")
      changeTaskWorking(elLink, false)
      // setRefreshArray(Symbol("refreshArray")) // принудительно обновить, что бы проверить условия анимации
    }
  }

  function changeElementDynamicAnimation(elLink, name, val) {

    setArrayElementsAnimation(prev => {
      return (
        prev.map((_el, index, array) => {
          if (_el.elLink.current === elLink) { // обновляем данные только если TRUE -> для обновленного элемента
            return {..._el, [name]: val}
          }
          return _el // у элемента данные не трогаем
        })
      )
    })
  }

  useEffect(() => {
    // Эффект из первого рендера
    setMounting(true)
    // Очистка для эффекта из первого рендера
    return () => {
      console.log("OUT!!!!!!!!!!!!!!!!")
    }
  }, [])

  return (
    <TaskAnimationContext.Provider
      value={{
        initAnimation: initAnimation,
        updateDataElement: updateDataElement
        // updateAnimationByActive: updateAnimationByActive,
        // initElementAnimation: initElementAnimation
      }}
    >
      {children}
    </TaskAnimationContext.Provider>

  )
}

TaskAnimationProvider.propTypesObj = {
  active: "bool",
  timeOpen: "number",
  timeOpening: "number",
  timeOpened: "number",
  timeClose: "number",
  timeClosing: "number",
  timeClosed: "number",
  forceOpenOff: "bool",
  forceCloseOff: "bool",
  forceOff: "bool",
  animationOff: "bool",

  // так же надо задать типы, которые идут программно анимацией
  value: "string", // значение Task анимации (open opening opened close closing closed)
  taskWorking: "bool",

}

TaskAnimationProvider.propTypes = {
  value: PropTypes.shape({
    active: PropTypes[TaskAnimationProvider.propTypesObj.active].isRequired,
    timeOpen: PropTypes[TaskAnimationProvider.propTypesObj.timeOpen],
    timeOpening: PropTypes[TaskAnimationProvider.propTypesObj.timeOpening],
    timeOpened: PropTypes[TaskAnimationProvider.propTypesObj.timeOpened],
    timeClose: PropTypes[TaskAnimationProvider.propTypesObj.timeClose],
    timeClosing: PropTypes[TaskAnimationProvider.propTypesObj.timeClosing],
    timeClosed: PropTypes[TaskAnimationProvider.propTypesObj.timeClosed],
    forceOpenOff: PropTypes[TaskAnimationProvider.propTypesObj.forceOpenOff],
    forceCloseOff: PropTypes[TaskAnimationProvider.propTypesObj.forceCloseOff],
    forceOff: PropTypes[TaskAnimationProvider.propTypesObj.forceOff],
    animationOff: PropTypes[TaskAnimationProvider.propTypesObj.animationOff]
  }).isRequired
}

TaskAnimationProvider.defaultProps = {
  timeOpen: 0,
  timeOpening: 500,
  timeOpened: 0,
  timeClose: 0,
  timeClosing: 500,
  timeClosed: 0,
  forceOpenOff: false,
  forceCloseOff: false,
  forceOff: false
}

