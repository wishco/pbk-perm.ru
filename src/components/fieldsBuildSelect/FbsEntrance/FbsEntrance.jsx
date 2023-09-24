import React from "react";
import s from "./FbsEntrance.module.scss";
import imgMainPart1 from "images/sneshskazka/600/home-front.png";

const FbsEntrance = ({
  nameBuild,
  changeFieldOfBuildSelect,
  selectorEntrance,
  buildOptions,
  ...data
}) => {
  const fieldName = "entrance";

  // .sneshSkazka.entrance

  const changeFieldOfBuildSelectHandler = (fieldValue) => {
    changeFieldOfBuildSelect({ nameBuild, fieldName, fieldValue });
  };

  const getButtons = () => {
    let _out = [];
    for (let i = 1; i < buildOptions[nameBuild].entranceCount + 1; i++) {
      const _entranceNum = buildOptions[nameBuild]?.entranceRightToLeft
        ? buildOptions[nameBuild].entranceCount + 1 - i
        : i; // номера подъезда,
      if (
        buildOptions[nameBuild].entranceArrayExists?.indexOf(_entranceNum) ===
        -1
      )
        continue; // если данный номер подъезда не нужен, пропускаем
      _out.push(
        <p
          key={i}
          data-active={selectorEntrance[nameBuild].entrance === i}
          className={s.selItem}
          data-entry={i}
          onClick={() => {
            changeFieldOfBuildSelectHandler(i);
          }}
        >
          Подъезд&nbsp;{_entranceNum}
        </p>
      );
    }
    return _out;
  };

  const getImages = () => {
    let _out = [];
    for (let i = 1; i < buildOptions[nameBuild].entranceCount + 1; i++) {
      const _entranceNum = buildOptions[nameBuild]?.entranceRightToLeft
        ? buildOptions[nameBuild].entranceCount + 1 - i
        : i;
      if (
        buildOptions[nameBuild].entranceArrayExists?.indexOf(_entranceNum) ===
        -1
      )
        continue; // если данный номер подъезда не нужен, пропускаем
      _out.push(
        <img
          key={i}
          className={s.imgMain}
          src={imgMainPart1}
          data-entry={i}
          alt=""
          data-active={selectorEntrance[nameBuild].entrance === i}
          onClick={() => {
            changeFieldOfBuildSelectHandler(i);
          }}
        />
      );
    }
    return _out;
  };

  return (
    <>
      <div className={s.imgBox}>
        {getButtons()}
        <img className={s.imgMainBg} src={imgMainPart1} alt="" />
        {/*<img className={s.imgCompass} src={imgCompass} alt=""/>*/}
        {getImages()}
      </div>
    </>
  );
};

export default FbsEntrance;
