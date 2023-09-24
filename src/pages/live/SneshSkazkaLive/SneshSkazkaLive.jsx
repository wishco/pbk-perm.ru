import React, { useEffect, useRef, useState } from "react";
import s from "./SneshSkazkaLive.module.scss";
import Wrapper from "components/markup/Wrapper/Wrapper";
import DoCall from "components/Do/DoCall/DoCall";

import imageTopBig from "images/sneshskazka/home-front-1920.jpg";
import Container from "components/markup/Container/Container";
import RoomBanner from "components/RoomBanner/RoomBanner";
import WaysBuy from "pages/ways/WaysBuy";
import YandexMap from "components/YandexMap/YandexMap";
import YandexMapContainer from "components/YandexMap/YandexMapContainer";
import BuildSneshSkazkaContainer from "components/buildings/BuildSneshSkazka/BuildSneshSkazkaContainer";
import RoomBannerContainer from "components/RoomBanner/RoomBannerContainer";
import { idInfo } from "lib/js/ids";
import MainButton from "components/MainButton/MainButton";
import { HIDE_SECTIONS_BY_DEVELOP } from "lib/js/jsMic";

//-----------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------
const SneshSkazkaLive = ({ placeSneshSkazka, ...props }) => {
  useEffect(() => {}, [placeSneshSkazka]);
  return (
    <>
      {/*<h1 className={s.title}>Информация по квартирам</h1>*/}

      <div className={s.wrapperImage}>
        <div>
          <img className={s.image} src={imageTopBig} alt="" />
        </div>

        <div className={s.containerText}>
          <div className={s.wrapperText}>
            {/*<p className={s.textImageUp}>название дома</p>*/}
            <p className={s.textImageTitle}>ЖК СНЕЖНАЯ 15</p>
            <div className={s.textBg}></div>
          </div>
        </div>
        <div className={s.containerButton}>
          <div className={s.wrapperButton}>
            {/*<div className={s.button}>Подробнее</div>*/}

            <MainButton
              className={s.button}
              href={`#${idInfo}`}
              onClick={() => {}}
              buttonData={{
                text: "Подробнее",
              }}
            />
          </div>
        </div>
      </div>

      <Wrapper>
        <Container className={s.containerRooms}>
          <RoomBannerContainer
            href={`#${idInfo}`}
            nameBuild="snesh-skazka"
            styleElements={{
              rooms: 1,
              text1: "Однокомнатные",
              text2: "от 3 млн.руб.",
              text3: "площадь от 30 кв.м.",
              filterRoom: "П1",
            }}
          />
          <RoomBannerContainer
            href={`#${idInfo}`}
            nameBuild="snesh-skazka"
            styleElements={{
              rooms: 2,
              text1: "Двухкомнатные",
              text2: "от 4.2 млн.руб.",
              text3: "площадь от 48 кв.м.",
              filterRoom: "П2-",
            }}
          />
          <RoomBannerContainer
            href={`#${idInfo}`}
            nameBuild="snesh-skazka"
            styleElements={{
              rooms: 2,
              text1: "Евро-двушка",
              text2: "от 4.5 млн.руб.",
              text3: "площадь от 54 кв.м.",
              filterRoom: "П2s-",
            }}
          />
          <RoomBannerContainer
            href={`#${idInfo}`}
            nameBuild="snesh-skazka"
            styleElements={{
              rooms: 3,
              text1: "Трёхкомнатные",
              text2: "от 5.9 млн.руб.",
              text3: "площадь от 66 кв.м.",
              filterRoom: "П3",
            }}
          />
        </Container>
      </Wrapper>

      {/*<Wrapper>*/}
      {/*  <DoCall*/}
      {/*    styleElements={{*/}
      {/*      numbers: "+7(902)801-05-94",*/}
      {/*      style: "add1"*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <DoCall*/}
      {/*    styleElements={{*/}
      {/*      numbers: "+7(___)___-__-__",*/}
      {/*      style: "userinput"*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</Wrapper>*/}

      <BuildSneshSkazkaContainer />
      <WaysBuy />

      {!HIDE_SECTIONS_BY_DEVELOP && (
        <Wrapper>
          <Container>
            <YandexMapContainer />
          </Container>
        </Wrapper>
      )}
    </>
  );
};

export default SneshSkazkaLive;
