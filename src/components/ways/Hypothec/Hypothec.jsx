import React, { useEffect, useRef, useState } from "react";
import s from "./Hypothec.module.scss";
import MainButton from "components/MainButton/MainButton";
import InputMask from "react-input-mask";
import { updateFormHypothec } from "redux/forms-values-reducer";

const Hypothec = ({ formHypothec, updateFormHypothec, ...data }) => {
  const costHypothecRef = useRef(null);
  const timeHypothecRef = useRef(null);
  const payHypothecRef = useRef(null);
  const rateHypothecRef = useRef(null);

  const [cost, setCost] = useState(formHypothec?.cost);
  const [time, setTime] = useState(formHypothec?.time);
  const [pay, setPay] = useState(formHypothec?.pay);
  const [rate, setRate] = useState(formHypothec?.rate);
  const [timeUnit, setTimeUnit] = useState("");

  const [cost_result, setCost_result] = useState("");
  const [time_result, setTime_result] = useState("");
  const [pay_result, setPay_result] = useState("");
  const [rate_result, setRate_result] = useState("");
  const [timeUnit_result, setTimeUnit_result] = useState("");
  const [payMonth, setPayMonth] = useState("");

  const [showResult, setShowResult] = useState(false);

  const mortgage = (s, p, n) => {
    // сколько нужно платить в месяц, за кредит
    // A = s * p / (1 - степень ( 1 + p ; -n))
    // s - кредит
    // p - процентная ставка в долях за период
    // n - кол-во платежных периодов
    // A - платёж за период
    p /= 1200;
    n *= 12;
    const out = Math.trunc((s * p) / (1 - Math.pow(1 + p, -n)));
    return out !== out || out === Infinity ? "" : out; // если на выходе NaN или Infinity то возвращаем пустую строку
  };

  const getMortgage = () => {
    function getNumFomValue(val) {
      if (val === undefined) return "";
      return Number(val.replace(/[^\d]/g, ""));
    }
    const _cost =
      getNumFomValue(cost) - (getNumFomValue(cost) * getNumFomValue(pay)) / 100;
    const _time = getNumFomValue(time);
    const _rate = getNumFomValue(rate);

    return mortgage(_cost, _rate, _time);
  }; // значение ипотеки в месяц, по: _cost - сумма кредита / _rate - процент по кредиту в месяц / _time кол-во лет кредита

  const calcHandler = () => {
    let valMortgage = getMortgage();
    if (valMortgage === "") {
      setShowResult(false);
      return;
    }
    setShowResult(true);
    setCost_result(cost);
    setTime_result(time);
    setPay_result(pay);
    setRate_result(rate);
    setTimeUnit_result(timeUnit);
    setPayMonth(valMortgage);
    updateFormHypothec({
      cost: cost,
      time: time,
      pay: pay,
      rate: rate,
    });
  };

  const setFocusInputByRef = (ref) => {
    ref.current.focus();
  };

  const changeInputValueIntegerHandler = (e, fnChanging) => {
    const currVal = e.target.value.replace(/[^\d]/g, "");
    const currValNumber = Number(currVal);
    fnChanging(currValNumber.toLocaleString("ru-RU"));
  }; // получить строку из integer, но с пробелами после каждых 3х цифр

  const getLabel = (text) => {
    let m = text.split("").map((el) => {
      return el === " " ? "\u00A0" : el;
    });
    return m.join("");
  }; // получить lable, но все пробелы заменить "Неразрывным пробелом"

  useEffect(() => {
    const _mod10 = time % 10;
    const _time = Number(time);

    if (_mod10 === 1 && _time !== 11) {
      setTimeUnit("год");
      return;
    }
    if (_mod10 > 1 && _mod10 < 5 && (_time < 10 || _time > 20)) {
      setTimeUnit("года");
      return;
    }
    setTimeUnit("лет");
  }, [time]);

  const getItemsHypothec = () => {
    const objBox = [
      {
        title: "введите стоимость квартиры",
        ref: costHypothecRef,
        label: "Стоимость квартиры",
        maxLength: 11,
        value: cost,
        setValue: setCost,
        unit: "руб",
      },
      {
        title: "введите длительность ипотеки в годах",
        ref: timeHypothecRef,
        label: "Срок ипотеки",
        maxLength: 2,
        value: time,
        setValue: setTime,
        unit: timeUnit,
      },
      {
        title: "введите % от стоимости квартиры",
        ref: payHypothecRef,
        label: "Первый взнос",
        maxLength: 2,
        value: pay,
        setValue: setPay,
        unit: "%",
      },
      {
        title: "введите процентную ставку одобренного кредита",
        ref: rateHypothecRef,
        label: "Процентная ставка",
        maxLength: 2,
        value: rate,
        setValue: setRate,
        unit: "%",
      },
    ];
    const out = objBox.map((_item, index) => {
      return (
        <div key={index} className={s.containerInput} title={_item.title}>
          <label
            onClick={() => {
              setFocusInputByRef(_item.ref);
            }}
            className={s.labelInput}
          >
            {getLabel(_item.label)}
          </label>
          <div className={s.boxInput}>
            <div className={s.wrapInput}>
              <input
                ref={_item.ref}
                type="text"
                maxLength={_item.maxLength}
                className={s.input}
                tabIndex={1}
                value={_item.value}
                onKeyPress={(e) => {
                  if (e.key.replace(/[^\d]/g, "").length === 0)
                    e.preventDefault();
                }}
                onChange={(e) =>
                  changeInputValueIntegerHandler(e, _item.setValue)
                }
              />
            </div>
            <p
              className={s.unitInput}
              onClick={() => {
                setFocusInputByRef(_item.ref);
              }}
            >
              {_item.unit}
            </p>
          </div>
        </div>
      );
    });
    return out;
  };

  return (
    <>
      <p className={s.title}>Рассчитайте стоимость ипотеки</p>
      <div className={s.container}>
        <div className={s.wrapper}>{getItemsHypothec()}</div>

        <div className={s.resultContainer} data-result-active={showResult}>
          <div className={s.resultWrapper}>
            <p className={s.textCalc}>Стоимость&nbsp;квартиры</p>
            <p className={s.valCalc}>
              {cost_result}
              <span>руб.</span>
            </p>
            <div className={s.itemResultWrapper}>
              <div className={s.itemResultBox}>
                <p className={s.textCalc}>Срок ипотеки</p>
                <p className={s.valCalc}>
                  {time_result}
                  <span>{timeUnit_result}</span>
                </p>
              </div>
              <div className={s.itemResultBox}>
                <p className={s.textCalc}>Первый взнос</p>
                <p className={s.valCalc}>
                  {pay_result}
                  <span>%</span>
                </p>
              </div>
              <div className={s.itemResultBox}>
                <p className={s.textCalc}>Процент в год</p>
                <p className={s.valCalc}>
                  {rate_result}
                  <span>%</span>
                </p>
              </div>
            </div>

            <p className={s.textCalc}>Оплата по</p>
            <p className={s.valCalc}>
              {payMonth}
              <span>руб.мес.</span>
            </p>
          </div>
        </div>

        <MainButton
          className={s.button}
          buttonData={{
            text: "Рассчитать",
          }}
          onClick={calcHandler}
          onKeyPress={(e) => {
            if (e.key === "Enter") calcHandler();
          }}
          tabIndex={1}
        />
      </div>
    </>
  );
};

export default Hypothec;
