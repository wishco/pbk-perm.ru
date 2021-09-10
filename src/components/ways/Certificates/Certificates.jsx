import React from 'react'
import s from "./Certificates.module.scss"

const Certificates = ({...data}) => {


  return (
    <>
      <p className={s.title}>Сертификаты</p>
      <div className={s.container}>
        <div className={s.wrapper}>

          <p className={s.description}>Как купить квартиру используя сертификат</p>

          <p className={s.textElement}>
            Пермский застройщик ООО&nbsp;«Промышленная Буровая Компания» активно участвует в государственных программах
            по реализации безвозмездных субсидий на улучшение жилищных условий.
          </p>

          <p className={s.textElement}>
            Жилищные субсидии (Сертификаты) предоставляются на строительство жилья взамен имеющейся площади, либо в
            дополнение к ней.
            Субсидии (Сертификаты) выдаются на всех членов семьи, которые стоят в очереди на улучшение жилищных условий.
            <br/>Применение данных программ – процесс достаточно непростой, существуют нюансы.
            <br/>Поэтому, для решения данного вопроса, советуем обратиться к нам и мы поможем найти отличное решение.
          </p>

        </div>
      </div>
    </>
  )
}

export default Certificates
