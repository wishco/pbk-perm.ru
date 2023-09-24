import React, { useEffect, useState } from "react";
import s from "./FbsTable.module.scss";
import { constPlaces } from "lib/js/constants";
import { showModalWindowByName } from "redux/tools-reducer";
import { useDispatch } from "react-redux";

const FbsTable = (props) => {
  const { nameBuild, places, buildSelect, placesStructureStandard, ...data } =
    props;
  const dispatch = useDispatch();
  const [arrayActiveRoomInfo, setArrayActiveRoomInfo] = useState(null); // активная комната

  useEffect(() => {
    let _result = places[nameBuild].filter((item) => {
      if (
        String(item[constPlaces.roomId]) === String(buildSelect[nameBuild].room)
      )
        return true;
    });
    if (_result) {
      setArrayActiveRoomInfo(_result[0]);
    } else {
      setArrayActiveRoomInfo(null);
    }
  }, [buildSelect]);

  const modifierAreaString = (num) => {
    return num.split("").map((item, index, array) => {
      if (item === ",") return ".";
      return item;
    });
  }; // при выводе заменить все символы "," на "."

  const numberTrunc = (num) => {
    let _res = num.split(",")[0] + " 000"; // обрезаем дробную часть у числа и из увеличиваем цифру на тыс 000
    return _res.split("").map((item) => {
      return item === " " ? "\u{00A0}" : item; // заменяем пробелы на неразрывные пробелы
    });
  }; // при выводе отбросим дробную часть

  const getHeaderText = (val) => {
    let _val = val.split("-")[0];
    if (_val === "П1") return "Однокомнатная";
    if (_val === "П2") return "Двухкомнатная";
    if (_val === "П3") return "Трёхкомнатная";
    if (_val === "П2s") return "Евродвушка";
    return null;
  }; // получить заголовок Header

  return (
    <>
      <div className={s.wrapper}>
        <table className={s.table}>
          <thead>
            <tr className={s.tableHeadRowWrapper}>
              <td colSpan="2" className={s.tableHeadItem}>
                Выбранная&nbsp;квартира
                <br />
                {arrayActiveRoomInfo ? (
                  <span>
                    {getHeaderText(arrayActiveRoomInfo[constPlaces.typeRoom])}
                  </span>
                ) : (
                  <span className={s.headerErr}>отсутствует!</span>
                )}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className={s.tableRow}>
              <td className={s.tableItem + " active"}>
                Номер квартиры
                <br />
                <span>(в доме 186 квартир)</span>
              </td>
              {arrayActiveRoomInfo && (
                <td className={s.tableItem}>
                  {arrayActiveRoomInfo[constPlaces.roomId]}
                </td>
              )}
            </tr>
            <tr className={s.tableRow}>
              <td className={s.tableItem}>Тип планировки</td>
              {arrayActiveRoomInfo && (
                <td className={s.tableItem}>
                  {arrayActiveRoomInfo[constPlaces.typeRoom]}
                </td>
              )}
            </tr>
            <tr className={s.tableRow}>
              <td className={s.tableItem}>
                Кол-во комнат
                <br />
                <span>(в евродвушках, кухня совмещается с комнатой)</span>
              </td>
              {arrayActiveRoomInfo && (
                <td className={s.tableItem}>
                  {arrayActiveRoomInfo[constPlaces.areaLiveCount]}
                </td>
              )}
            </tr>
            <tr className={s.tableRow}>
              <td className={s.tableItem}>
                Подъезд
                <br />
                <span>(нумерация справа налево)</span>
              </td>
              {arrayActiveRoomInfo && (
                <td className={s.tableItem}>
                  {arrayActiveRoomInfo[constPlaces.entrance]}
                </td>
              )}
            </tr>
            <tr className={s.tableRow}>
              <td className={s.tableItem}>
                Этаж
                <br />
                <span>(есть лифт)</span>
              </td>
              {arrayActiveRoomInfo && (
                <td className={s.tableItem}>
                  {arrayActiveRoomInfo[constPlaces.floor]}
                </td>
              )}
            </tr>
            <tr className={s.tableRow}>
              <td className={s.tableItem}>
                Площадь, общая
                <br />
                <span>
                  (м<sup>2</sup>)
                </span>
              </td>
              {arrayActiveRoomInfo && (
                <td className={s.tableItem}>
                  {modifierAreaString(
                    arrayActiveRoomInfo[constPlaces.areaFull]
                  )}{" "}
                  м<sup>2</sup>
                </td>
              )}
            </tr>
            <tr className={s.tableRow}>
              <td className={s.tableItem}>
                Площадь, жилая
                <br />
                <span>
                  (м<sup>2</sup>)
                </span>
              </td>
              {arrayActiveRoomInfo && (
                <td className={s.tableItem}>
                  {modifierAreaString(
                    arrayActiveRoomInfo[constPlaces.areaLive]
                  )}{" "}
                  м<sup>2</sup>
                </td>
              )}
            </tr>
            <tr className={s.tableRow}>
              <td className={s.tableItem}>
                Площадь, кухня
                <br />
                <span>
                  (м<sup>2</sup>)
                </span>
              </td>
              {arrayActiveRoomInfo && (
                <td className={s.tableItem}>
                  {modifierAreaString(
                    arrayActiveRoomInfo[constPlaces.areaKitchen]
                  )}{" "}
                  м<sup>2</sup>
                </td>
              )}
            </tr>
            <tr className={s.tableRow}>
              <td className={s.tableItem}>
                Цена м<sup>2</sup>,<br />
                <span>(ипотека или 100% оплата)</span>
              </td>
              {arrayActiveRoomInfo && (
                <td className={s.tableItem}>
                  {modifierAreaString(
                    arrayActiveRoomInfo[constPlaces.pay100ForM2]
                  )}{" "}
                  тыс.м<sup>2</sup>
                </td>
              )}
            </tr>
            <tr className={s.tableRow}>
              <td className={s.tableItem}>
                Полная стоимость,
                <br />
                <span>(стоимость в руб.)</span>
              </td>
              {arrayActiveRoomInfo && (
                <td className={s.tableItem}>
                  {numberTrunc(arrayActiveRoomInfo[constPlaces.pay100ForRoom])}
                  &nbsp;руб.
                </td>
              )}
            </tr>
            <tr className={s.tableRow}>
              <td className={s.tableItem}>
                Посмотреть планировку,
                <br />
                <span>(чертёж планировки)</span>
              </td>
              {arrayActiveRoomInfo && (
                <td className={s.tableItem}>
                  <svg
                    onClick={() => {
                      dispatch(
                        showModalWindowByName("typeRoomPic", {
                          activePicId:
                            arrayActiveRoomInfo[constPlaces.typeRoomPic],
                          roomId: arrayActiveRoomInfo[constPlaces.roomId],
                        })
                      );
                    }}
                    data-style="room-banner-svg"
                    style={{ position: "static" }}
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    width="50px"
                    height="50px"
                    version="1.1"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    viewBox="0 0 940 940"
                  >
                    <path
                      data-style="room-banner-path"
                      d="M360 80c160,0 280,130 280,280 0,160 -120,280 -280,280 -150,0 -280,-120 -280,-280 0,-150 130,-280 280,-280zm570 790c0,0 10,10 10,20 0,30 -20,50 -50,50 0,0 -10,-10 -20,-10 0,0 0,0 0,0 -20,0 -40,-10 -50,-20l0 0 -140 -150c-10,0 -10,-10 -20,-20l0 0 0 0c0,-10 -10,-20 -10,-30 0,0 0,0 0,0l-60 -60 0 0c-60,50 -140,80 -230,80 -200,0 -360,-170 -360,-370 0,-200 160,-360 360,-360 200,0 360,160 360,360 0,90 -20,170 -70,230l60 60c0,0 0,0 0,0 20,0 40,10 50,20l0 0 160 150 0 0c0,10 10,20 10,40 0,0 0,0 0,10zm-660 -370l190 0 0 -150 -190 0 0 150zm0 -150l190 0 -100 -80 -90 80zm100 -160l130 110c10,10 30,10 30,30 0,10 -10,20 -20,20 -10,0 -30,-20 -40,-30l-90 -70c-20,-20 -10,-20 -40,0l-90 70c-10,10 -20,30 -30,30 -10,0 -20,-10 -20,-20 0,-20 10,-20 20,-30l130 -110c10,0 10,0 20,0zm-60 160l40 0 0 40 -40 0 0 -40zm0 60l40 0 0 40 -40 0 0 -40zm100 -60l-40 0 0 40 40 0 0 -40zm0 60l-40 0 0 40 40 0 0 -40z"
                    />
                  </svg>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FbsTable;
