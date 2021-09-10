import React from 'react'
import s from './SneshSkazkaCommerce.module.scss'

const SneshSkazkaCommerce = () => {

  return (
    <>
      {/*<div className="off">*/}
      {/*  Информация, по Коммерческой недвижимости, пока не внесена на сайт...*/}
      {/*</div>*/}

      <div className={s.container}>
        <div className={s.wrapper}>

          <p className={s.description}>
            Информация, по Коммерческой недвижимости
          </p>

          <p className={s.textElement}>
            Данная информация, пока не внесена на сайт. За данной информацией вы можете обратиться к нам
          </p>

        </div>
      </div>
    </>
  )

}

export default SneshSkazkaCommerce
