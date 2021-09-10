import React, {useEffect, useRef, useState} from 'react'
import s from "./Checkbox.module.scss"

const Checkbox = ({
                    label = false, dataRequired = false, checked, setChecked,
                    dataTabIndex, dataTitle, ...props
                  }) => {

  const checkUsed = useRef(false) // флаг - изменяли чекбокс

  function getRequiredStatus() {
    if (dataRequired === false || checkUsed.current === false) return false
    return !checked
  }

  // класс обертка для нормального состояния или для Required состояния
  let wrapperCheckBoxClasses = (getRequiredStatus() === false) && s.wrapperCheckBox || (s.wrapperCheckBox + " " + s.badValue)

  // изменилось значение чекбокса
  useEffect(() => {
    if (!checkUsed.current) checkUsed.current = true
  }, [checked])

  // чекнули чекбокс
  const checkedHandler = () => {
    setChecked()
  }

  //-----------------------------------------
  return (
    <>

      <div className={s.wrapper}>
        <div className={wrapperCheckBoxClasses} title={dataTitle}
             tabIndex={dataTabIndex}
             onClick={() => {
               checkedHandler()
             }}
             onKeyPress={(e) => {
               const KEY_ENTER = 13
               if (e.charCode === KEY_ENTER) checkedHandler()
             }}
             data-form-item-valid={checked}
        >

          {
            (checked) &&
            <svg className={s.svg} xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="100px"
                 height="100px" version="1.1"
                 shapeRendering="geometricPrecision" textRendering="geometricPrecision"
                 imageRendering="optimizeQuality"
                 fillRule="evenodd" clipRule="evenodd"
                 viewBox="0 0 28.5 28.5">
              <path className={s.path}
                    d="M9.9 18.4l13.7 -18.4 4.9 4.1c-6,8.2 -12,16.3 -18.1,24.4l-10.4 -11.1 4.4 -5 5.5 6z"/>
            </svg>
          }

        </div>

        {
          label &&
          <p className={s.text} onClick={() => {
            checkedHandler()
          }}>{label}</p>
        }

      </div>

    </>
  )


}

export default Checkbox
