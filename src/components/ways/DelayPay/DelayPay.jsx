import React from 'react'
import s from "./DelayPay.module.scss"

const DelayPay = ({...data}) => {


  return (
    <>

      <p className={s.title}>Доступная рассрочка</p>
      <div className={s.container}>
        <div className={s.wrapper}>

          <p className={s.description}>Условия</p>
            <ul>
              <li className={s.row}>
                <p className={s.itemText}>Первоначальный&nbsp;взнос:</p>
                <p className={s.itemComment}>50%</p>
              </li>
              <li className={s.row}>
                <p className={s.itemText}>Платежи:</p>
                <p className={s.itemComment}>Равными ежемесячными или ежеквартальными платежами</p>
              </li>
              <li className={s.row}>
                <p className={s.itemText}>Срок:</p>
                <p className={s.itemComment}>В течение 12 месяцев, последний платеж не более чем за один календарный месяц до срока окончания строительства</p>
              </li>
            </ul>


        </div>
      </div>

    </>
  )
}

export default DelayPay
