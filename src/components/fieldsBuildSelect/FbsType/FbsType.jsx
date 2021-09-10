import React from 'react'
import s from "./FbsType.module.scss"
import imgMainPart1 from "images/sneshskazka/600/home-front.png";

const FbsType = ({
                   nameBuild, buildOptions, buildSelect, changeFieldOfBuildSelect,
                   ...data
                 }) => {
  const fieldName = "typeRoom"

  const changeFieldOfBuildSelectHandler = (fieldValue) => {
    changeFieldOfBuildSelect({nameBuild, fieldName, fieldValue})
  }

  const getTextRoom = (_typeRoomTypical) => {
    return buildOptions[nameBuild].typesRoomTypicalAll.filter((_val) => {
      return (_val.type === _typeRoomTypical)
    })[0].text1
  }

  function getTypes() {
    return buildOptions[nameBuild].typesRoomTypicalFilter.map((_item, _index, _array) => {
      return (
        <p key={_index} className={s.type} data-active={buildSelect[nameBuild][fieldName] === _item}
           onClick={
             () => {
               changeFieldOfBuildSelectHandler(_item)
             }
           }
        >{getTextRoom(_item)}</p>
      )
    })
  }

  return (
    <>
      <div className={s.box}>
        {getTypes()}
      </div>
    </>
  )
}

export default FbsType
