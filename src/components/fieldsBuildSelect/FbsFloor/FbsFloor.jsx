import React from 'react'
import s from "./FbsEntrance.module.scss"
import imgMainPart1 from "images/sneshskazka/600/home-front.png";

const FbsFloor = ({
                    nameBuild, changeFieldOfBuildSelect, buildOptions, buildSelect,
                        ...data}) => {
  const fieldName = "floor"


  const changeFieldOfBuildSelectHandler = (fieldValue) => {
    changeFieldOfBuildSelect({nameBuild, fieldName, fieldValue})
  }

  function getFloors() {
    return buildOptions[nameBuild].floorArrayExists.map((_item, _index, _array) => {
      return (
        <p key={_index} className={s.floor} data-active={buildSelect[nameBuild][fieldName] === _index + 1}
           onClick={
             () => {
               changeFieldOfBuildSelectHandler(_index + 1)
             }
           }
        >{_item}</p>
      )
    })
  }



  return (
    <>
      <div className={s.box}>
        {getFloors()}
      </div>
    </>
  )
}

export default FbsFloor
