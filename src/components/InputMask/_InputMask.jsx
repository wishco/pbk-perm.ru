import React, {useEffect, useRef, useState} from 'react'
import s from "./_InputMask.module.scss"

const _InputMask = ({dataPlaceholder="", dataCaption="", dataMask, dataTabIndex="1", dataMaskOn = true, ...props}) => {
  const inputRef = useRef();

  const [currMask, setCurrMask] = useState(
    {
      mask: "",
      maskElement: "",
      maskHelpVisible: true, // отображать маску подсказки при вводе
      maxLength: "", // максимальное кол-во символов мы не знаем"
      regExp: ""
    }
  )

  const [tel, setTel] = useState(
    {
      formTel: {
        value: "",
        valueCalc: "",
        selectionStart: 0,
        selectionEnd: 0
      }
    }
  )
  //-----------------------------------------
  useEffect(() => {
    inputRef.current.focus()
  }, [])
//-----------------------------------------
  useEffect(() => {
    inputRef.current.selectionStart = tel.formTel.selectionStart
    inputRef.current.selectionEnd = tel.formTel.selectionEnd
  }, [tel])

//-----------------------------------------
  const handler_onSelect = (e) => {
    e.preventDefault()
    setTel({
      formTel: {
        value: tel.formTel.value,
        valueCalc: tel.formTel.value,
        selectionStart: e.target.selectionStart,
        selectionEnd: e.target.selectionEnd
      }
    })
  }
//-----------------------------------------
  const handlerChange = (e) => {
    e.preventDefault()
    setTel(
      getStructureChanger({
        mask: dataMask,
        maskOn: dataMaskOn,

        value_before: tel.formTel.value,
        selectionStart_before: tel.formTel.selectionStart,
        selectionEnd_before: tel.formTel.selectionEnd,
        value_user: e.target.value,
        selectionStart_user: e.target.selectionStart,
        selectionEnd_user: e.target.selectionEnd,

      })
    )
  }

  //-----------------------------------------

  function getStructureChanger({
                                 value_before,
                                 value_before_mask, selectionStart_before, selectionEnd_before,
                                 value_user, selectionStart_user, selectionEnd_user,
                                 mask, dataMaskOn, maxLength = 15
                               }) {

    let selectionStart_before_calc = selectionStart_before
    let selectionEnd_user_calc = selectionEnd_user

    if (dataMaskOn) {

    }


    if (selectionStart_before_calc > selectionEnd_user_calc) { // если удаляем символ и смещаемся влево, т.е. нажимаем Backspace
      // console.log("!!!!!!!!!!!!!")
      // console.log("before v-ss-se: " + value_before + " " + selectionStart_before_calc + " " + selectionEnd_before)
      // console.log("user v-ss-se: " + value_user + " " + selectionStart_user + " " + selectionEnd_user)
      // console.log("!!!!!!!!!!!!!")
      return {
        formTel: {
          value: value_user.slice(0, selectionStart_before) + value_user.slice(selectionStart_before, value_user.length),
          valueCalc: value_user.slice(0, selectionStart_before) + value_user.slice(selectionStart_before, value_user.length),
          selectionStart: selectionEnd_user_calc,
          selectionEnd: selectionEnd_user_calc
        }
      }
    }

    const partLeft = value_user.slice(0, selectionStart_before_calc)
    const partRight = value_user.slice(selectionEnd_user_calc, value_user.length)
    const partMiddle = value_user.slice(selectionStart_before_calc, selectionEnd_user_calc)
    let newPartMiddle = ""
    let newValue = ""


    let meText= "Assdaффв ВАЫывйй012345678990"
    let m = /[^A-Za-z0-9А-Яа-я]/g
    // let pattern = new RegExp( m, '')

    let out = meText.replace(m, "")
    console.log("!!!!!!!!!!")
    // console.log("pattern: " + pattern)
   console.log("out: "+ out)


    if (currMask.regExp === "") { //  если тип инпута, ввод только чисел
      newPartMiddle = partMiddle.replace(/\D+/g, "")
    } else {
      newPartMiddle = partMiddle.replace(/\D+/g, "")
      // newPartMiddle = partMiddle.replace(/[^A-Za-z0-9А-Яа-я\s!?]/g, "")
    }


    //   if (type === "string") { //  если тип инпута, ввод чисел + английских и русских символов
    //   newPartMiddle = partMiddle.replace(/[^A-Za-z0-9А-Яа-я\s!?]/g, "")
    // } else if (type === "stringRu") { //  если тип инпута, ввод чисел и русских символов
    //   newPartMiddle = partMiddle.replace(/[^0-9А-Яа-я\s!?]/g, "")
    // } else if (type === "stringEn") { //  если тип инпута, ввод чисел и английских символов
    //   newPartMiddle = partMiddle.replace(/[^A-Za-z0-9\s!?]/g, "")
    // }

    newValue = `${partLeft}${newPartMiddle}${partRight}`

    if (newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength)
    }

    return {
      formTel: {
        value: newValue,
        valueCalc: newValue,
        selectionStart: selectionStart_before_calc + newPartMiddle.length,
        selectionEnd: selectionStart_before_calc + newPartMiddle.length
      }
    }

  }



  //-----------------------------------------
  // JSX OUT
  //-----------------------------------------
  return (
    <>

      <div className={s.telWrapper} >
        <p className={s.caption}>{dataCaption}</p>

        <div className={s.box}>

          <input className={s.input} tabIndex={dataTabIndex}
                 type={currMask.regExp === "" ? "tel" : "text"}
                 ref={inputRef}
                 value={tel.formTel.valueCalc}
            // value="8-902-80"
                 onChange={handlerChange}
                 onSelect={handler_onSelect}
            placeholder={dataPlaceholder}
          />

          {/*<div className={s.inputMaskWrap}>*/}
          {/*  <p className={s.labelSprite}>1234</p>*/}
          {/*  <p className={s.labelMask}>51-0594</p>*/}
          {/*</div>*/}

        </div>


      </div>


    </>
  )


}

export default _InputMask
