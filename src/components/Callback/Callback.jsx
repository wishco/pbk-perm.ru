import React, { useEffect, useRef, useState } from "react";
import s from "./Callback.module.scss";
import Wrapper from "components/markup/Wrapper/Wrapper";
import Container from "components/markup/Container/Container";
import MainButton from "components/MainButton/MainButton";
import InputMask from "react-input-mask";
import RightsPersonalDataContainer from "components/RightsPeronalData/RightsPersonalDataContainer";
import { sendDataToUrl } from "api/api";
import { saveDataCallBack } from "localStorage/localStorage";
import { updateFormCallBack } from "redux/forms-values-reducer";
import {
  setModalWindowBusy,
  setTextModalWindowBusy,
  unsetModalWindowBusy,
} from "redux/tools-reducer";
import { sleep } from "lib/js/jsMic";

const Callback = ({
  formCallBack,
  checkedRights,
  modalWindow,
  hideModalWindow,
  updateFormCallBack,
  setModalWindowBusy,
  unsetModalWindowBusy,
  setTextModalWindowBusy,
  ...props
}) => {
  const telRef = useRef(null);
  const [disabledButton, setDisabledButton] = useState(false);
  const [sendedFlug, setSendedFlug] = useState(false); // флаг, что заявка уже отправленна

  const [sendError, setSendError] = useState(false); // флаг, что при отправке сообщения, произошла ошибка
  const [valTel, setValTel] = useState(formCallBack?.telNum || "9");
  const [reRender, setReRender] = useState(Symbol("RE_RENDER"));

  // const [sendedTooLongTimeAgo, setSendedTooLongTimeAgo] = useState(false)

  async function sendDataToServer(_data) {
    await sleep(700); // делаем задержку, показать визуально, что сообщение отправляется

    function getPrefix(date) {
      return (
        (date.getFullYear() + (date.getMonth() + 1) * 5) * date.getDate() * 41
      );
    }

    let promise = new Promise((resolve, reject) => {
      let _timeOut = setTimeout(
        () => reject("долго, нет ответа от сервера!"),
        2000
      );
      let _prefix = getPrefix(new Date());
      let b2 = sendDataToUrl({
        data: _data,
        url: "https://api.pbk-perm.ru/mail/send/" + _prefix,
      });
      b2.then((res) => {
        clearTimeout(_timeOut); // снимаем таймер, (таймер - длительность времени на запрос)
        console.log("MESS TO SERVER OK!: " + res + _prefix);
        resolve(true);
      }).catch((err) => {
        console.log("MESS TO SERVER ERR!: " + err);
        reject(false);
      });
    });

    try {
      let resultSend = await promise; // resultSend BOOL отправленно или нет
      setSendError(!resultSend); // устанавливаем/сбрасываем флаг ошибки
      setSendedFlug(resultSend); // устанавливаем/сбрасываем флаг нормальной отправки письма
      if (resultSend) {
        updateFormCallBack(_data); // если отправка успешна, сохраняем данные формы в localStorage
      }
      unsetModalWindowBusy(); // сбросить не активность окна
      setTextModalWindowBusy(""); // сбросить текст, при неактивности окна
    } catch {
      setSendError(true); // устанавливаем/сбрасываем флаг ошибки
      setSendedFlug(false); // устанавливаем/сбрасываем флаг нормальной отправки письма
      unsetModalWindowBusy(); // сбросить не активность окна
      setTextModalWindowBusy(""); // сбросить текст, при неактивности окна
    }
  }

  const sendToServerHandler = () => {
    let _tel = telRef.current.value;
    let _telNumbers = _tel.replace(/[^\d]/g, "");
    let _text = `<a href="tel:+${_telNumbers}">${_tel}</a>`;
    let _now = new Date();
    let _data = {
      tel: _tel,
      telNum: _telNumbers,
      timeStamp: Math.floor(Date.now() / 1000),
      dateText: `<p>Дата и время заявки: ${_now.toLocaleDateString()} ${_now.toLocaleTimeString()}</p>`,
      telText: `<p>Надо позвонить по телефону:</p> ${_text}`,
    };
    setModalWindowBusy(); // установить не активность окна
    setTextModalWindowBusy("Идёт отправка сообщения..."); // установить текст, при неактивности окна
    sendDataToServer(_data);
  };

  const inputChangeHandler = (e) => {
    setValTel(e.target.value);
  };

  useEffect(() => {
    // telRef.current.focus()
  }, []);

  useEffect(() => {
    let _length = telRef.current?.value.replace(/[^\d]/g, "").length;
    const MAX_LENGTH = 11;
    // отключить кнопку если: не ввели телефон полностью, чекбокс норма, и сообщение отправляется
    setDisabledButton(_length !== MAX_LENGTH || !checkedRights);
  }, [checkedRights, valTel]);

  useEffect(() => {
    const timeStampNow = Math.floor(Date.now() / 1000);
    const timeStampLast = formCallBack?.timeStamp;
    // const TIME_WAIT = 2 // !! для теста сколько ждем времени, на отправку нового сообщения, (в секундах)
    const TIME_WAIT = 599; // сколько ждем времени, на отправку нового сообщения, (в секундах)
    // const TIME_INTERVAL = 2 //!! для теста
    const TIME_INTERVAL = 60; // как часто проверять, много или нет, врошло времени с отправки сообщения (в секундах)
    const isLongTime = timeStampLast
      ? timeStampNow - formCallBack?.timeStamp > TIME_WAIT
      : true;
    setTimeout(() => {
      setReRender(Symbol("RE_RENDER"));
    }, TIME_INTERVAL * 1000);
    setSendedFlug(!isLongTime);
  }, [reRender, sendedFlug]); // делаем интервал, для возможности отправки нового сообщения

  return (
    <>
      {!sendedFlug ? (
        <div className={s.wrapper} data-disabled={true}>
          <p className={s.title}>Уточните всю информацию&nbsp;у&nbsp;нас!</p>
          <p className={s.text}>
            Оставьте свой номер телефона и
            наш&nbsp;менеджер&nbsp;свяжется&nbsp;с&nbsp;Вами.
          </p>

          <InputMask
            className={s.input}
            ref={telRef}
            maskChar={"_"}
            tabIndex={1}
            onKeyPress={(e) => {
              if (e.key.replace(/[^\d]/g, "").length === 0) e.preventDefault();
            }}
            placeholder="Введите ваш телефон"
            mask="+7 (999) 999 99 99"
            onChange={(e) => {
              inputChangeHandler(e);
            }}
            value={valTel}
          />

          {sendError && (
            <p
              title="В данный моммент, письмо не может быть отправленно..."
              className={s.textErr}
            >
              При отправке письма, произошла ошибка...
            </p>
          )}

          {/*<InputMask*/}

          {/*  dataMask={*/}
          {/*    [*/}
          {/*      {*/}
          {/*        mask: "+X(XXX)XXX-XXXX",*/}
          {/*        maskElement: "X",*/}
          {/*        defaultValue: "79",*/}
          {/*        firstSymbols: [7, 9],*/}
          {/*        maskHelpVisible: true,*/}
          {/*        maxLength: "11"*/}
          {/*      },*/}
          {/*      {*/}
          {/*        mask: "+xxxx_xxx_xxxx_xxxx_xxxx",*/}
          {/*        maskElement: "x",*/}
          {/*        defaultValue: "",*/}
          {/*        firstSymbols: ["+"],*/}
          {/*        maskHelpVisible: false,*/}
          {/*        maxLength: "" // максимальное кол-во символов мы не знаем"*/}
          {/*      },*/}
          {/*      {*/}
          {/*        mask: "****_***_****_****_****",*/}
          {/*        maskElement: "*",*/}
          {/*        defaultValue: "",*/}
          {/*        firstSymbols: [1, 2, 4, 5, 6, 8],*/}
          {/*        maskHelpVisible: false*/}
          {/*      },*/}
          {/*      {*/}
          {/*        mask: "~_~~_~~~~_~~_~~~~",*/}
          {/*        maskElement: "*",*/}
          {/*        defaultValue: "3",*/}
          {/*        firstSymbols: [3],*/}
          {/*        maskHelpVisible: true,*/}
          {/*        regexp: /[^A-Za-z0-9А-Яа-я\s!?]/g*/}
          {/*      }*/}
          {/*    ]*/}
          {/*  }*/}
          {/*  dataCaption="Ваш номер телефона"*/}
          {/*  dataTabIndex="1"*/}
          {/*  // dataPlaceholder = "Введите телефон"*/}
          {/*/>*/}

          <MainButton
            className={s.button}
            buttonData={{
              style: "userinput",
            }}
            disabled={disabledButton}
            onClick={sendToServerHandler}
            tabIndex={1}
          />

          <RightsPersonalDataContainer />
        </div>
      ) : (
        // sendedFlug

        <div className={s.wrapper}>
          <p className={s.title}>Ваша заявка принята!</p>
          <p className={s.textOut}>
            Наш менеджер с Вами свяжется в&nbsp;ближайшее&nbsp;время.
          </p>

          <MainButton
            className={s.button}
            buttonData={{
              style: "userinput",
              text: "Ок",
            }}
            dataTabLock="end"
            onClick={hideModalWindow}
            tabIndex={1}
          />
        </div>
      )}
    </>
  );
};

export default Callback;
