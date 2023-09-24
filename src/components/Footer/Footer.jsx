import React from "react";
import s from "./Footer.module.scss";
import Wrapper from "components/markup/Wrapper/Wrapper";
import Container from "components/markup/Container/Container";
import { NavLink } from "react-router-dom";

const Footer = ({ ...data }) => {
  return (
    <>
      <Wrapper className={s.wrapper_logo}>
        <Container className={s.container_bottom}>
          <nav className={s.nav}>
            <p>
              <NavLink to={`/realtor`} className={s.navItem}>
                Риэлторам
              </NavLink>
            </p>
            <p>
              <NavLink to={`/live`} className={s.navItem}>
                Жилая недвижимость
              </NavLink>
            </p>
            <p>
              <NavLink to={`/commerce`} className={s.navItem}>
                Коммерческая недвижимость
              </NavLink>
            </p>
          </nav>

          <div className={s.textWrapper}>
            <p className={s.text1}>
              Ваши персональные данные обрабатываются на сайте в целях его
              функционирования, если Вы&nbsp;не&nbsp;согласны, то Вы должны
              покинуть сайт. В&nbsp;противном случае это будет являться
              согласием на обработку Ваших&nbsp;персональных&nbsp;данных.
            </p>
            <p className={s.text2}>
              Любая информация представленная на данном сайте, носит
              исключительно информационный характер и ни при каких условиях не
              является публичной офертой, определяемой положениями
              статьи&nbsp;437&nbsp;ГК&nbsp;РФ.
            </p>
          </div>
        </Container>
      </Wrapper>
    </>
  );
};

export default Footer;
