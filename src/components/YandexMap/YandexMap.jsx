import React, {useEffect, useRef} from 'react'
import s from "./YandexMap.module.scss"
import {
  Button,
  FullscreenControl, GeolocationControl,
  Map, Panorama,
  Placemark,
  Polygon,
  RulerControl,
  TypeSelector,
  YMaps,
  ZoomControl
} from "react-yandex-maps";

const YandexMap = ({screenSize, ...data}) => {

  const getPointsMapMedia = () => {
    let stateMapMedia = {
      small: {
        y: 57.89971,
        x: 55.93985,
        width: 370
      },
      wide: {
        y: 57.8982,
        x: 55.933,
        width: 1280
      }
    }

    function calcCurrPoint(_width, _small, _wide) {
      return [
        _small.y - (_small.y - _wide.y) * (_width - _small.width) / (_wide.width - _small.width),
        _small.x - (_small.x - _wide.x) * (_width - _small.width) / (_wide.width - _small.width),
      ]
    }

    if (screenSize.width > stateMapMedia.wide.width) return [stateMapMedia.wide.y, stateMapMedia.wide.x]
    if (screenSize.width > stateMapMedia.small.width)
      return calcCurrPoint(screenSize.width, stateMapMedia.small, stateMapMedia.wide)
    return [stateMapMedia.small.y, stateMapMedia.small.x] // первое значение ось Y, втрая ось X
  }

  // return null //!! убрать после

  return (
    <>
      <div className={s.wrapper}>
        <YMaps className={s.wrapperMap}>
          {/*<div style={styleMap}>*/}
          <Map defaultOptions={{nativeFullscreen: true, cursor: "nw-resize"}}

               className={s.wrapperMap} state={{center: getPointsMapMedia(), zoom: 16}}
               defaultState={{center: getPointsMapMedia(), zoom: 16, controls: []}}>

            <Placemark geometry={[57.899731, 55.939138]}
                       defaultOptions={{
                         preset: "islands#redHomeIcon",
                         cursor: "nw-resize"
                       }}
                       properties={{
                         iconCaption: 'Дом, Снежная Сказка'
                       }}
            />


            <RulerControl options={{position: {right: '20px', bottom: '35px'}}}/>
            <TypeSelector options={{float: 'left'}}/>
            {/*<GeolocationControl options={{float: 'left'}}/>*/}
            <ZoomControl options={{position: {left: '10px', top: '50px'}}}/>
            <FullscreenControl options={{position: {right: '20px', top: '10px'}}}/>

            <Polygon
              geometry={[
                [
                  [57.899724, 55.939008],
                  [57.899314, 55.939457],
                  [57.899377, 55.939662],
                  [57.899692, 55.939306],
                  [57.899790, 55.939669],
                  [57.899892, 55.939562],

                ]
              ]}
              options={{
                fillColor: '#902e38',
                strokeColor: '#494949',
                opacity: 0.9,
                strokeWidth: 1,
                strokeStyle: 'shortdash',
              }}
            />


          </Map>

        </YMaps>
      </div>
    </>
  )
}

export default YandexMap
