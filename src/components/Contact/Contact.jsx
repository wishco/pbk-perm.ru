import React from 'react'
import s from "./Contact.module.scss";
import Callback from "components/Callback/Callback";
import {showModalWindowByName} from "redux/tools-reducer";

const Contact = ({showModalWindowByName, telSelf,...data}) => {

  const handleCallMe = () => {
    showModalWindowByName("Callback1") // показать модальное окно, окно Обратной связи
  }

    return (
        <>
          <div className={s.contact}>
            <a className={s.tel} href={"tel:" + telSelf} title="позвонить в СЗ <<ПБК>>">{telSelf}
            </a>
            <div className={s.callMe} title="нажмите, введите свой телефон и мы перезвоним вам..."
                 onClick={handleCallMe}
            >
              <svg className={s.svg} xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="19px"
                   height="19px" version="1.1"
                   shapeRendering="geometricPrecision" textRendering="geometricPrecision"
                   imageRendering="optimizeQuality"
                   fillRule="evenodd" clipRule="evenodd"
                   viewBox="0 0 4.2 4.3">
                <path
                  d="M1.9 0c-1.2,0.2 -1.9,1.1 -1.9,2.2l0.7 0c0,-0.1 0,-0.6 0.1,-0.6 0,-0.2 0.7,-1.1 1.7,-0.8 0.1,0 0.3,0.1 0.4,0.1 0,0 -0.8,0.7 -0.3,0.7 0.4,0 1.4,0.1 1.4,-0.1 0,-0.2 0.1,-1.4 0,-1.5 -0.2,-0.2 -0.6,0.4 -0.6,0.4 -0.1,0 -0.5,-0.4 -1.5,-0.4zm-1.6 4.3c0.1,0 0.3,-0.4 0.5,-0.5 1.5,1 3.4,0.1 3.4,-1.8l-0.7 0c0,1.1 -1,1.8 -2,1.4 -0.1,0 -0.1,-0.1 -0.2,-0.1 0,0 0.8,-0.7 0.3,-0.7 -0.4,0 -1.5,-0.1 -1.5,0.1 0,0.2 0,1.4 0.1,1.5 0,0.1 0,0 0.1,0.1z"/>
              </svg>
              <a>перезвоните мне</a>
            </div>
          </div>
        </>
    )
}

export default Contact
