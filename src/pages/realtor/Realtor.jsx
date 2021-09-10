import React from 'react'
import s from "./Realtor.module.scss"


const Realtor = ({...data}) => {


    return (
        <>

          <div className={s.container}>
            <div className={s.wrapper}>

              <p className={s.description}>
                Информация риэлторам
              </p>

              <p className={s.textElement}>
                Заключая договор с ООО&nbsp;«Промышленная Буровая Компания», Вы получаете:
              </p>

              <p className={s.list}>
                Квалифицированную поддержку на всех этапах Вашей работы
              </p>
              <p className={s.list}>
                Необходимые для работы информационные материалы
              </p>

              <p className={s.list}>
                Рассылку актуальной информации о наличии квартир, об изменении условий, новых акциях и поступлениях
              </p>

              <p className={s.list}>
                Возможность проведения экскурсий по объектам строительства для Ваших сотрудников и клиентов
              </p>

              <p className={s.list}>
               прикрепление индивидуального менеджера, для каждого партнера, который будет курирует все вопросы
              </p>

              <p className={s.list}>
                Достойный размер вознаграждения за работу
              </p>

            </div>
          </div>
        </>
    )
}

export default Realtor
