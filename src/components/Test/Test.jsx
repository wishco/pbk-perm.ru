import React from 'react'
import s from "./Test.module.scss"

const Test = ({...data}) => {
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.el1}></div>
        <div className={s.el2}></div>
        <div className={s.el3}>
          Привет лунатикам от нас!!!

        </div>
      </div>

    </>
  )
}

export default Test
