import React from 'react'
import s from "./RoomBanner.module.scss"
import Wrapper from "components/markup/Wrapper/Wrapper";

import MainButton from "components/MainButton/MainButton";

const RoomBanner = ({
                      nameBuild, href, styleElements, buildOptions, buildSelect, changeFieldOfBuildSelect,
                      ...data
                    }) => {
  const fieldName = "typeRoom"
  // styleElements.filterRoom

  const changeFieldOfBuildSelectHandler = (fieldValue, toggleOff) => {
    changeFieldOfBuildSelect({nameBuild, fieldName, fieldValue, toggleOff})
  }

  return (
    <>
      <div className={s.wrapper}>

        <div className={s.box}>
          <div className={s.textsWrapper}>
            <div className={s.texts}>
              <p className={s.text1}>{styleElements.text1}</p>
              <p className={s.text2}>{styleElements.text2}</p>
              <p className={s.text3}>{styleElements.text3}</p>
            </div>
            <svg
              onClick={() => {
                changeFieldOfBuildSelectHandler(styleElements.filterRoom, true)
              }}
              data-style="room-banner-svg"
              xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"
              width="100px" height="100px"
              version="1.1" shapeRendering="geometricPrecision" textRendering="geometricPrecision"
              imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd"
              viewBox="0 0 940 940">
              <path data-style="room-banner-path"
                    d="M360 80c160,0 280,130 280,280 0,160 -120,280 -280,280 -150,0 -280,-120 -280,-280 0,-150 130,-280 280,-280zm570 790c0,0 10,10 10,20 0,30 -20,50 -50,50 0,0 -10,-10 -20,-10 0,0 0,0 0,0 -20,0 -40,-10 -50,-20l0 0 -140 -150c-10,0 -10,-10 -20,-20l0 0 0 0c0,-10 -10,-20 -10,-30 0,0 0,0 0,0l-60 -60 0 0c-60,50 -140,80 -230,80 -200,0 -360,-170 -360,-370 0,-200 160,-360 360,-360 200,0 360,160 360,360 0,90 -20,170 -70,230l60 60c0,0 0,0 0,0 20,0 40,10 50,20l0 0 160 150 0 0c0,10 10,20 10,40 0,0 0,0 0,10zm-660 -370l190 0 0 -150 -190 0 0 150zm0 -150l190 0 -100 -80 -90 80zm100 -160l130 110c10,10 30,10 30,30 0,10 -10,20 -20,20 -10,0 -30,-20 -40,-30l-90 -70c-20,-20 -10,-20 -40,0l-90 70c-10,10 -20,30 -30,30 -10,0 -20,-10 -20,-20 0,-20 10,-20 20,-30l130 -110c10,0 10,0 20,0zm-60 160l40 0 0 40 -40 0 0 -40zm0 60l40 0 0 40 -40 0 0 -40zm100 -60l-40 0 0 40 40 0 0 -40zm0 60l-40 0 0 40 40 0 0 -40z"/>
            </svg>
          </div>

          <MainButton
            href={href}
            onClick={() => {
              changeFieldOfBuildSelectHandler(styleElements.filterRoom, true)
            }}
            buttonData={{
              text: "Подробнее"
            }}/>

        </div>

      </div>
    </>
  )
}

export default RoomBanner
