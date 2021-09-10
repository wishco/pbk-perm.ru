import React from 'react'
import s from "./MainButton.module.scss"
import {getFullClassName} from "lib/js/jsMic";



const MainButton = ({buttonData = "", href, className, tabIndex, onClick, onKeyPress, disabled, title, dataTabLock, ...data}) => {

  const buttonStyle = buttonData.style && buttonData.style || "userinput"
  let classNameButton = getFullClassName(s.button, s[buttonStyle + "_modification"])
  if (className) classNameButton = classNameButton + " " + className

    return (
        <>
            <a href={href} className={classNameButton} onClick={onClick} onKeyPress={onKeyPress}
                 tabIndex={!disabled && tabIndex || ""}
                 data-tab-lock={dataTabLock} data-disabled={disabled} title={title}
            >
              {
                buttonData.style === "userinput"
                  ? (buttonData.text ? buttonData.text : "Жду звонка!") // если кнопка ПЕРЕЗВОНИТЬ
                  : (buttonData.text ? buttonData.text : "Позвонить") // если кнопка ПОЗВОНИТЬ
              }
            </a>

        </>
    )
}

export default MainButton
