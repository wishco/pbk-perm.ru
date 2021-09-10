import React, {useEffect, useState} from 'react'
import s from "./FbsTable.module.scss"
import {constPlaces} from "lib/js/constants";

const FbsTable = ({
                    nameBuild,places,buildSelect,placesStructureStandard,
                    ...data
}) => {
  const [arrayActiveRoomInfo, setArrayActiveRoomInfo] = useState(null) // активная комната

  useEffect(()=> {
   let _result = places[nameBuild].filter((item)=>{
      if (String(item[constPlaces.roomId]) === String(buildSelect[nameBuild].room)) return true
    })
     if (_result) {
       setArrayActiveRoomInfo(_result[0])
     }
    else {
       setArrayActiveRoomInfo(null)
     }
  },[buildSelect])

  const modifierAreaString = (num) => {
    return num.split('').map((item, index, array) =>{
      if (item === ",") return "."
      return item
    })
  } // при выводе заменить все символы "," на "."

  const numberTrunc = (num) => {
    let _res = num.split(",")[0] + " 000" // обрезаем дробную часть у числа и из увеличиваем цифру на тыс 000
    return _res.split('').map(item=>{
      return (item === " ") ? "\u{00A0}" : item // заменяем пробелы на неразрывные пробелы
    })
  } // при выводе отбросим дробную часть


  const getHeaderText = (val) => {
    let _val = val.split("-")[0]
    if (_val === "П1") return "Однокомнатная"
    if (_val === "П2") return "Двухкомнатная"
    if (_val === "П3") return "Трёхкомнатная"
    if (_val === "П2s") return "Евродвушка"
    return null
  } // получить заголовок Header

    return (
        <>
          <div className={s.wrapper}>
            <table className={s.table}>
              <thead>
              <tr className={s.tableHeadRowWrapper}>
                <td colSpan="2" className={s.tableHeadItem}>Выбранная&nbsp;квартира<br/>
                  {
                    arrayActiveRoomInfo ?
                      <span>{getHeaderText(arrayActiveRoomInfo[constPlaces.typeRoom])}</span>
                    :
                    <span className={s.headerErr}>отсутствует!</span>
                  }
                </td>
              </tr>

              </thead>
              <tbody>
              <tr className={s.tableRow}>
                <td className={s.tableItem + " active"}>Номер квартиры<br/><span>(в доме 186 квартир)</span></td>
                {
                  arrayActiveRoomInfo && <td className={s.tableItem}>{arrayActiveRoomInfo[constPlaces.roomId]}</td>
                }
              </tr>
              <tr className={s.tableRow}>
                <td className={s.tableItem}>Тип планировки</td>
                {
                  arrayActiveRoomInfo && <td className={s.tableItem}>{arrayActiveRoomInfo[constPlaces.typeRoom]}</td>
                }
              </tr>
              <tr className={s.tableRow}>
                <td className={s.tableItem}>Кол-во комнат<br/><span>(в евродвушках, кухня совмещается с комнатой)</span></td>
                {
                  arrayActiveRoomInfo && <td className={s.tableItem}>{arrayActiveRoomInfo[constPlaces.areaLiveCount]}</td>
                }
              </tr>
              <tr className={s.tableRow}>
                <td className={s.tableItem}>Подъезд<br/><span>(нумерация справа налево)</span></td>
                {
                  arrayActiveRoomInfo && <td className={s.tableItem}>{arrayActiveRoomInfo[constPlaces.entrance]}</td>
                }
              </tr>
              <tr className={s.tableRow}>
                <td className={s.tableItem}>Этаж<br/><span>(есть лифт)</span></td>
                {
                  arrayActiveRoomInfo &&  <td className={s.tableItem}>{arrayActiveRoomInfo[constPlaces.floor]}</td>
                }
              </tr>
              <tr className={s.tableRow}>
                <td className={s.tableItem}>Площадь, общая<br/><span>(м<sup>2</sup>)</span></td>
                {
                  arrayActiveRoomInfo && <td className={s.tableItem}>{modifierAreaString(arrayActiveRoomInfo[constPlaces.areaFull])} м<sup>2</sup></td>
                }
              </tr>
              <tr className={s.tableRow}>
                <td className={s.tableItem}>Площадь, жилая<br/><span>(м<sup>2</sup>)</span></td>
                {
                  arrayActiveRoomInfo &&  <td className={s.tableItem}>{modifierAreaString(arrayActiveRoomInfo[constPlaces.areaLive])} м<sup>2</sup></td>
                }
              </tr>
              <tr className={s.tableRow}>
                <td className={s.tableItem}>Площадь, кухня<br/><span>(м<sup>2</sup>)</span></td>
                {
                  arrayActiveRoomInfo && <td className={s.tableItem}>{modifierAreaString(arrayActiveRoomInfo[constPlaces.areaKitchen])} м<sup>2</sup></td>
                }
              </tr>
              <tr className={s.tableRow}>
                <td className={s.tableItem}>Цена м<sup>2</sup>,<br/><span>(ипотека или 100% оплата)</span></td>
                {
                  arrayActiveRoomInfo && <td className={s.tableItem}>{modifierAreaString(arrayActiveRoomInfo[constPlaces.pay100ForM2])} тыс.м<sup>2</sup></td>
                }
              </tr>
              <tr className={s.tableRow}>
                <td className={s.tableItem}>Полная стоимость,<br/><span>(стоимость в руб.)</span></td>
                {
                  arrayActiveRoomInfo && <td className={s.tableItem}>{numberTrunc(arrayActiveRoomInfo[constPlaces.pay100ForRoom])}&nbsp;руб.</td>
                }
              </tr>


              </tbody>
            </table>
          </div>

        </>
    )
}

export default FbsTable
