import React, {useRef, useState} from 'react'
import s from "./FbsRoom.module.scss"
import {constPlaces} from "lib/js/constants";

const FbsRoom = ({
                   nameBuild, buildOptions, buildSelect, changeFieldOfBuildSelect, places,
                   ...data
                 }) => {
  const fieldName = "room"
  const MAX_FILTER_INDEXES_COUNT = 60
  let arrayIndexesOfFilter = []

  const countIndexesOfFilter = useRef(0)


  const changeFieldOfBuildSelectHandler = (fieldValue) => {
    changeFieldOfBuildSelect({nameBuild, fieldName, fieldValue})
  }

  function getIndexesOfFilter() {
    places[nameBuild].map((_item, _index, _array) => {
      function itemEqual(__item) {
        function elNoEqualWithFnFirstSymbol(___item, ___name) {
          function FnFirstSymbol(_elArray, _elForFilter) {
            let goodFilterStatus = true
            _elArray.map( (item) => {
              if (String(item) === String(_elForFilter[0])) goodFilterStatus = false
            })
            return goodFilterStatus
          }

          let elArray = buildSelect[nameBuild][___name]
          if (elArray === null) return false // значение фильтра еще не задан, ищем след фильтр (польз не кликал еще на элементе фильтра)
          if (FnFirstSymbol(elArray, ___item[constPlaces[___name]])) return false // поле нор, продолжаем фильтр
          return true // true - убрать поле из фильтрации
        }

        function elNoEqualWithFn(___item, ___name) {
          function fnSplitBySymbol(_elNeed, _elForFilter, _symbol) {
            if (!!_elForFilter.indexOf(_elNeed)) return false
            return true
          }

          let elSel = buildSelect[nameBuild][___name]
          if (elSel === null) return false // значение фильтра еще не задан, ищем след фильтр (польз не кликал еще на элементе фильтра)
          if (fnSplitBySymbol(elSel, ___item[constPlaces[___name]])) return false // поле нор, продолжаем фильтр
          return true // true - убрать поле из фильтрации
        }

        function elNoEqual(___item, ___name) {
          let elSel = buildSelect[nameBuild][___name]
          if (elSel === null) return false // значение фильтра еще не задан, ищем след фильтр (польз не кликал еще на элементе фильтра)
          if (String(elSel) === String(___item[constPlaces[___name]])) return false // поле нор, продолжаем фильтр
          return true // true - убрать поле из фильтрации
        }

        //!! Переписать elNoEqualWithFn и elNoEqual должна быть одна функция, передаем в качестве параметра функцию сравнения

        if (elNoEqualWithFnFirstSymbol(__item, "status")) return false
        if (elNoEqualWithFn(__item, "typeRoom")) return false
        if (elNoEqual(__item, "entrance")) return false
        if (elNoEqual(__item, "floor")) return false
        return true
      }

      function badItem(_val) {
        let _elArr0 = _val[constPlaces.roomId]
        if (_elArr0 === "") return true // если в поле, нет номера квартиры -> полхое поле
        if ((Number(_elArr0)) !== Number(_elArr0)) return true // если в поле не цифра -> полхое поле (NaN)
        return false
      }

      if (badItem(_item)) return null // если в поле не число, игнорируем значение
      if (buildOptions[nameBuild].filterOn) { // если фильтр включен, то проверяем условия на фильтрацию
        if (itemEqual(_item)) return arrayIndexesOfFilter.push(_index)
        return null // если не один фильтр не отработал, то значение поле не подходим, отбрасываем
      }
      return arrayIndexesOfFilter.push(_index)
    })
    return arrayIndexesOfFilter
  }

  getIndexesOfFilter()

  // console.log("arrayIndexesOfFilter")
  // console.log(arrayIndexesOfFilter)

  countIndexesOfFilter.current = arrayIndexesOfFilter.length

  function getRoomsJsx() {

    if (arrayIndexesOfFilter.length > MAX_FILTER_INDEXES_COUNT) {

      return (
        <>
          <div className={s.roomsManyWrap}>
            <p className={s.roomsManyTitle}>В поиск попадает слишком <i>много&nbsp;квартир</i>, сократите результат.</p>
            <p className={s.roomsManyText}>Вы можете добавить в фильтр:</p>
            <ul className={s.filterItems}>
              <li><span>тип квартиры</span></li>
              <li><span>подъезд</span></li>
              <li><span>этаж</span></li>
            </ul>
          </div>
        </>
      )
    } else if (arrayIndexesOfFilter.length === 0) {
      return (
        <>
          <div className={s.roomsManyWrap}>
            <p className={s.roomsManyTitle}>В поиске <i>нет&nbsp;квартир</i>, необходимо расширить&nbsp;поиск.</p>
            <p className={s.roomsManyText}>Вам нужно убрать что&#8209;то&nbsp;из&nbsp;фильтра:</p>
            <ul className={s.filterItems}>
              <li><span>тип квартиры</span></li>
              <li><span>подъезд</span></li>
              <li><span>этаж</span></li>
            </ul>
          </div>
        </>
      )
    } else {
      return arrayIndexesOfFilter.map((_item, _index) => {
        return (
          <p key={_index} className={s.room}
             data-active={buildSelect[nameBuild][fieldName] === places[nameBuild][_item][constPlaces.roomId]}
             onClick={
               () => {
                 changeFieldOfBuildSelectHandler(places[nameBuild][_item][constPlaces.roomId])
               }
             }
          >{places[nameBuild][_item][constPlaces.roomId]}</p>

          // <p key={_index} className={s.room} data-active={buildSelect[nameBuild][fieldName] === _item[0]}
          //    onClick={
          //      () => {
          //        changeFieldOfBuildSelectHandler(_item[constPlaces.roomId])
          //      }
          //    }
          // >{_item[constPlaces.roomId]}</p>
          // places[nameBuild][_item]

          // places[nameBuild].map(
        )
      })
    }



  }


  return (
    <>
      <div className={s.box} data-warning={(countIndexesOfFilter.current > MAX_FILTER_INDEXES_COUNT) || (countIndexesOfFilter.current === 0)}>
        <p data-warning={countIndexesOfFilter.current}> </p>
        {getRoomsJsx()}

        {/*<p className={s.room}  data-active={buildSelect[nameBuild][fieldName] === "255"}*/}
        {/*   onClick={()=> {*/}
        {/*     changeFieldOfBuildSelectHandler("255")*/}
        {/*   }}*/}
        {/*>255</p>*/}
      </div>
    </>
  )
}

export default FbsRoom
