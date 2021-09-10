import React, {useRef, useState} from 'react'
import s from "./PlaceToServer.module.scss"
import Wrapper from "components/markup/Wrapper/Wrapper";
import {getStructureFromClipboard} from "lib/js/textTools";
import {sendDataToUrl} from "api/api";

const PlaceToServer = ({placesStructureStandard, ...props}) => {
  const SEND_NOT = 0
  const SEND_GOOD = 1
  const SEND_ERROR = 2

  const [txtVal, setTxtVal] = useState("")
  const [goodStructure, setGoodStructure] = useState(null)
  const place = useRef({})
  const [password, setPassword] = useState("")
  const [sendStatus, setSendStatus] = useState(SEND_NOT)


  // обработчик текстового поля(вставки таблицы)
  async function txtHandler(e) {
    const structureFromClipboard = await getStructureFromClipboard(placesStructureStandard)
    if (structureFromClipboard) // если структура соответствует в буфере обмена,
    {
      place.current = {...structureFromClipboard.data}
      setTxtVal(structureFromClipboard.clipboard)  // текст выводим в текстовое поле
    } else {
      setTxtVal("")
    }
  }

  // обработчик отправки данных на сервер
  async function sendToServerHandler(e) {
    sendDataToUrl({
      data: { // данные для передачи
        password: password, // какой пароль ввели в поле
        structurePlace: place.current.structurePlace, // структура данных
        dataPlace: place.current.dataPlace // массив данных
      },
      url: "https://api.pbk-perm.ru/add/snesh-skazka"
    })
      .then((res2) => {
        console.log("NORM!:")
        console.log(res2)
        setSendStatus(SEND_GOOD)
        console.log(sendStatus)
      })
      .catch((err) => {
        console.log("ERR!: " + err)
        setSendStatus(SEND_ERROR)
      })
  }

  return (
    <>
      <div>

        <Wrapper>
        <textarea className={s.textarea} value={txtVal} name="" id="" cols="30" rows="10" onChange={() => {
        }} onPaste={txtHandler}>
        </textarea>
        </Wrapper>
        <Wrapper>
          <a className={s.passCaption}>Пароль:</a>
          <input className={s.input} value={password} name="password" type="password" onChange={(e) => {
            setPassword(e.target.value)
          }}/>
          <button className={[s.submit, txtVal && s.goodStructure].join(' ')} onClick={sendToServerHandler}>Отправить
            данные на сервер
          </button>
        </Wrapper>

        <Wrapper>
          <p className={[s.sendStatusOff, (sendStatus === SEND_ERROR) && s.sendStatusError].join(' ')}>Данные не отправлены на сервер, пароль не
            верен...</p>
          <p className={[s.sendStatusOff, (sendStatus === SEND_GOOD) && s.sendStatusGood].join(' ')}>Данные отправлены на сервер...</p>
        </Wrapper>

      </div>
    </>
  )
}

export default PlaceToServer
