import React, { useEffect, useRef, useState } from "react";
import s from "./Site.module.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "components/Header/Header";
import SneshSkazkaLive from "pages/live/SneshSkazkaLive/SneshSkazkaLive";
import Realtor from "pages/realtor/Realtor";
import WaysBuy from "pages/ways/WaysBuy";
import SneshSkazkaCommerce from "pages/commerce/SneshSkazkaCommerce/SneshSkazkaCommerce";
import Footer from "components/Footer/Footer";
import PagePlaceToServer from "pages/Special/PagePlaceToServer/PagePlaceToServer";
import SneshSkazkaCommerceContainer from "pages/commerce/SneshSkazkaCommerce/SneshSkazkaCommerceContainer";
import SneshSkazkaLiveContainer from "pages/live/SneshSkazkaLive/SneshSkazkaLiveContainer";

import ModalContainer from "components/Modal/ModalContainer";
import CallbackContainer from "components/Callback/CallbackContainer";
import Test from "components/Test/Test";
import MenuMobile from "components/MenuMobile/MenuMobile";
import ModalWrapper from "components/markup/ModalWrapper/ModalWrapper";
import {
  AlertProvider,
  useAlert,
} from "components/AlertContextTest/AlertContext";
import Alert from "components/AlertContextTest/Alert";
import AlertMain from "components/AlertContextTest/AlertMain";
import {
  TaskAnimationProvider,
  useTaskAnimation,
} from "components/TaskAnimation/TaskAnimationContext";
import Yyy from "components/YYY/Yyy";
import T1 from "components/T1/T1";
import { updateScreenWidth } from "redux/tools-reducer";
import ImageRoom from "components/ImageRoom/ImageRoom";

const Site = ({
  activeModalWindowName,
  activeModalWindowData,
  showModalWindowByName,
  hideModalWindow,
  updateScreenWidth,
  ...data
}) => {
  const a1 = useTaskAnimation();

  const resizeHandler = (e) => {
    updateScreenWidth();
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <>
      <TaskAnimationProvider value={{ active: true }}>
        <div className={s.wrapperWidth}>
          <div className={s.wrapper}>
            <div className={s.top}>
              <Switch>
                <Route
                  key={`/`}
                  exact
                  path={`/`}
                  render={() => <Redirect to={`/live/snesh-skazka`} />}
                />
                <Route
                  key={`/live`}
                  exact
                  path={`/live`}
                  render={() => <Redirect to={`/live/snesh-skazka`} />}
                />
                <Route
                  key={`/commerce`}
                  exact
                  path={`/commerce`}
                  render={() => <Redirect to={`/commerce/snesh-skazka`} />}
                />
              </Switch>

              <Header pos={"top"} />

              <Route
                exact
                path="/live/snesh-skazka"
                render={() => <SneshSkazkaLiveContainer />}
              />
              <Route
                exact
                path="/commerce/snesh-skazka"
                render={() => <SneshSkazkaCommerceContainer />}
              />
              <Route exact path="/realtor" render={() => <Realtor />} />
              <Route exact path="/ways-buy" render={() => <WaysBuy />} />

              <Route
                exact
                path="/live/snesh-skazka/add"
                render={() => <PagePlaceToServer />}
              />
              <Route
                exact
                path="/commerce/snesh-skazka/add"
                render={() => <PagePlaceToServer />}
              />
            </div>

            <div className={s.bottom}>
              <Header pos={"bottom"} />
              <Footer />
            </div>
          </div>
        </div>

        {/*тут находятся модальные окна НАЧАЛО*/}

        {/*<T1*/}
        {/*  activeModalWindowName={activeModalWindowName}*/}
        {/*  hideModalWindow={hideModalWindow}*/}
        {/*  showModalWindowByName={showModalWindowByName}*/}
        {/*/>*/}

        <ModalContainer
          active={activeModalWindowName === "Callback1"}
          title="форма обратной связи"
        >
          <CallbackContainer />
        </ModalContainer>

        <ModalContainer
          active={activeModalWindowName === "MenuMobile"}
          title="Меню"
          dataModalPos="fullScreen"
        >
          <MenuMobile hideMenu={hideModalWindow} />
        </ModalContainer>

        <ModalContainer
          active={activeModalWindowName === "typeRoomPic"}
          title={`Просмотр планировки. (Квартира №${activeModalWindowData?.roomId})`}
          dataModalPos="fullScreen"
        >
          <ImageRoom data={activeModalWindowData} />
        </ModalContainer>

        {/*тут находятся модальные окна КОНЕЦ*/}

        {/*<Yyy/>*/}

        {/*<div className={s.bottom}>*/}
        {/*  <Footer/>*/}
        {/*</div>*/}

        {/*          <div className={s.top}>*/}

        {/*            <div className={[s.wrapContainer, s.header, ].join(" ")}>*/}
        {/*              <div className={[s.container, s.header, (1?'':s["header_bg"]), (1?'':s.full) ].join(" ")}>*/}
        {/*                <Menu/>*/}
        {/*              </div>*/}

        {/*              <div className={[s.container, s.header, (1?'':s["header_bg"]), (1?'':s.full) ].join(" ")}>*/}
        {/*                <Header/>*/}
        {/*              </div>*/}
        {/*            </div>*/}

        {/*            <div className={[s.wrapContainer, s.section].join(" ")}>*/}
        {/*              <div className={[s.container, s.bigImage, (0?'':s["bigImage_bg"]), (0?'':s.full) ].join(" ")}>*/}
        {/*3123123123p <div>deweqweqweqwe</div>*/}
        {/*              </div>*/}
        {/*            </div>*/}

        {/*          </div>*/}

        {/*          <div className={s.bottom}>*/}

        {/*            <div className={[s.wrapContainer, s.footer].join(" ")}>*/}
        {/*              <div className={s.container}>*/}
        {/*                <div className={s.h3}>Footer</div>*/}
        {/*              </div>*/}
        {/*            </div>*/}

        {/*          </div>*/}
      </TaskAnimationProvider>
    </>
  );
};

export default Site;
