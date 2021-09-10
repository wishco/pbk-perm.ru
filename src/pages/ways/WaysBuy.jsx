import React, {useEffect, useState} from 'react'
import s from "./WaysBuy.module.scss"
import Container from "components/markup/Container/Container";

import w1 from "images/ways1.jpg"
import w2 from "images/ways2.jpg"
import w3 from "images/ways3.jpg"
import w4 from "images/ways4.jpg"
import w5 from "images/ways5.jpg"
import Wrapper from "components/markup/Wrapper/Wrapper";
import Hypothec from "components/ways/Hypothec/Hypothec";
import {default as UUID} from "node-uuid";
import DelayPay from "components/ways/DelayPay/DelayPay";
import MothersCapital from "components/ways/MothersCapital/MothersCapital";
import Certificates from "components/ways/Certificates/Certificates";
import HouseChange from "components/ways/HouseChange/HouseChange";
import HypothecContainer from "components/ways/Hypothec/HypothecContainer";
import {idWays} from "lib/js/ids";

const WaysBuy = ({...data}) => {
  const [wayBuy, setWayBuy] = useState(1)
  const [idBox, setIdBox] = useState(idWays)

  const arrBoxImages = [
    {imgAlt: "Ипотека", textImage: "Ипотека", srcImage: w1},
    {imgAlt: "Доступная рассрочка", textImage: "Доступная рассрочка", srcImage: w2},
    {imgAlt: "Материнский капитал", textImage: "Материнский капитал", srcImage: w3},
    {imgAlt: "Сертификаты", textImage: "Сертификаты", srcImage: w4},
    {imgAlt: "Обмен старого жилья, на новое", textImage: "Обмен старого жилья, на\u{00A0}новое", srcImage: w5},
  ]
  const boxImages = () => {
    return arrBoxImages.map((_item, _index, _array) => {
      return (
        <a key={_index} className={s.boxImage} href={`#${idBox}`} data-num-way={wayBuy}
           data-box-active={wayBuy === _index + 1} data-curr-el={_index + 1}
           onClick={() => {
             setWayBuy(_index + 1)
           }}
        >
          <img className={s.image} src={_item.srcImage} alt={_item.imgAlt}/>
          <p className={s.textImage}>{_item.textImage}</p>
        </a>
      )
    })
  }

  return (
    <>
      <Wrapper className={s.wrapBox}>
        <Container className={s.container}>

          <h1 className={s.h1}>Способы покупки</h1>
          <div className={s.wrapper}>

            <p data-num-way={wayBuy} className={s.comment}>Выберите, что подходит именно&nbsp;вам:</p>
            <div className={s.wrapperImage}>
              {boxImages()}
            </div>

            <div className={s.contentWays} data-num-way={wayBuy} id={idBox}>
              <div className={s.contentItem} data-curr-el={1}><HypothecContainer/></div>
              <div className={s.contentItem} data-curr-el={2}><DelayPay/></div>
              <div className={s.contentItem} data-curr-el={3}><MothersCapital/></div>
              <div className={s.contentItem} data-curr-el={4}><Certificates/></div>
              <div className={s.contentItem} data-curr-el={5}><HouseChange/></div>
              <a className={s.toUp} href={`#${idBox}`}>&#8593; вверх</a>
            </div>

          </div>

        </Container>
      </Wrapper>
    </>
  )
}

export default WaysBuy
