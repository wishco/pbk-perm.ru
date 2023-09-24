import React from "react";
import s from "./Header.module.scss";
import Wrapper from "components/markup/Wrapper/Wrapper";
import Container from "components/markup/Container/Container";
import Menu from "components/Menu/Menu";
import Logo from "components/Logo/Logo";
import BreadCrumbs from "components/BreadCrumbs/BreadCrumbs";
import { NavLink } from "react-router-dom";
import ContactContainer from "components/Contact/ContactContainer";

const Header = ({ pos, ...data }) => {
  const isShowHeaderMenu = () => pos === "top";

  return (
    <>
      <Wrapper>
        {isShowHeaderMenu() && (
          <Wrapper className={s.wrapper_menu}>
            <Container className={s.container_menu}>
              <Menu /> {/* МЕНЮ */}
            </Container>
          </Wrapper>
        )}

        <Wrapper className={s.wrapper_logo}>
          <Container className={s.container_logo}>
            {/*<div>*/}
            <NavLink to={`/live`}>
              <Logo /> {/* Картинка(логотип) + Название фирмы */}
              {/* Картинка(логотип) + Название фирмы */}
            </NavLink>
            <BreadCrumbs /> {/* хлебные крошки (путь текущей страницы)*/}
            {/*</div>*/}
            <ContactContainer /> {/* Контакт - телефон и перезвоните мне */}
          </Container>
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default Header;
