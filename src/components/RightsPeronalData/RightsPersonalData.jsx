import React from 'react'
import s from "components/RightsPeronalData/RightsPersonalData.module.scss";
import Checkbox from "components/markup/Checkbox/Checkbox";


const MainButton = ({checked, valid, required, used, toggleRightsPersonalData, ...data}) => {

  return (
    <>

      <div className={s.wrapper}>
        <div className={s.checkBoxWrapper}>
          <Checkbox dataTabIndex="1"
                    dataTitle="Для обработки, обязательное поле к заполнению"
                    dataRequired={true}
                    setChecked={toggleRightsPersonalData}
                    checked={checked}
                    label="Вы даете согласие на"
          />
        </div>

        <a
          tabIndex="1"
          data-tab-lock="end"
          className="link" href="https://yandex.ru/" target="_blank" title="прочитать соглашение"
          onClick={(e) => {
            console.log(data)
          }}
        > обработку персональных данных.</a>
      </div>

    </>
  )
}

export default MainButton
