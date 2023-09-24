import React from "react";
import s from "./DoCall.module.scss";
import MainButton from "components/MainButton/MainButton";
import { getFullClassName } from "lib/js/jsMic";

const DoCall = ({ styleElements = {} }) => {
  const classNameTitle = getFullClassName(
    s.title,
    s[styleElements.style + "_modification_title"]
  );
  const classNameNumbers = getFullClassName(
    s.numbers,
    s[styleElements.style + "_modification_numbers"]
  );

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.box}>
          {!styleElements.titleHide && (
            <p className={classNameTitle}>
              {
                styleElements.style === "userinput"
                  ? styleElements.title
                    ? styleElements.title
                    : "или мы перезвоним вам:" // если кнопка ПЕРЕЗВОНИТЬ
                  : styleElements.title
                  ? styleElements.title
                  : "позвоните нам" // если кнопка ПОЗВОНИТЬ
              }
            </p>
          )}

          {!styleElements.numbersHide && (
            <p className={classNameNumbers}>
              {styleElements.numbers
                ? styleElements.numbers
                : "Номер не задан!"}
            </p>
          )}
        </div>

        {!styleElements.buttonHide && (
          <MainButton
            buttonData={{
              text: styleElements.button,
              style: styleElements.style,
              userInput: styleElements.userInput,
            }}
          />
        )}
      </div>
    </>
  );
};

export default DoCall;
