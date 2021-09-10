import React, {useState} from 'react'
import s from "./Hamburger.module.scss"

const Hamburger = ({showModalWindowByName, ...data}) => {

  const showMenuMobileHandler = () => {
    showModalWindowByName("MenuMobile")
  }

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.pic} onClick={showMenuMobileHandler}>
        </div>
      </div>
    </>
  )
}

export default Hamburger
