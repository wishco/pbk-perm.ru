import React, { useEffect } from "react";
import "template/globals.scss"; // подключам для сайта глобальные классы стилей
import s from "./app.module.scss";
import Preloader from "components/Preloader/Preloader";
import SiteContainer from "components/Site/SiteContainer";

function App({ theme, initialized, initializeApp }) {
  // запуск функции при запуске приложения (один раз)
  useEffect(() => {
    // setTimeout(() => initializeApp(), 15);
    initializeApp();
  }, []);

  // мониторим изменение темы сайта
  useEffect(() => {});

  if (initialized === false) {
    // пока приложение не инициализированно запускаем прелоадер
    return (
      <React.StrictMode>
        <Preloader />
      </React.StrictMode>
    );
  } else {
    return (
      <React.StrictMode>
        {/*<div className={s.siteArea}>*/}
        {/*</div>*/}

        <div className={s.wrapSite} theme={theme}>
          <SiteContainer />
        </div>
      </React.StrictMode>
    );
  }
}

export default App;
