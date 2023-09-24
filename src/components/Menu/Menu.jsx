import React from "react";
import s from "./Menu.module.scss";
import Wrapper from "components/markup/Wrapper/Wrapper";
import { NavLink } from "react-router-dom";
import HamburgerContainer from "components/Hamburger/HamburgerContainer";

const Menu = ({ ...data }) => {
  let activeMenu = {
    live: "active",
    commerce: "",
    realtor: "",
    ways: "",
  };

  return (
    <>
      <HamburgerContainer />
      <Wrapper className={s.wrapper}>
        <Wrapper className={s.box}>
          <NavLink to={`/live`} className={s.item} activeClassName={s.active}>
            Жилая недвижимость
          </NavLink>
          <NavLink
            to={`/commerce`}
            className={s.item}
            activeClassName={s.active}
          >
            Коммерческая недвижимость
          </NavLink>
        </Wrapper>
        <Wrapper className={s.box}>
          <NavLink
            to={`/realtor`}
            className={s.item}
            activeClassName={s.active}
          >
            Риэлторам
          </NavLink>
          <NavLink
            to={`/ways-buy`}
            className={s.item}
            activeClassName={s.active}
          >
            Способы покупки
          </NavLink>
        </Wrapper>
      </Wrapper>
    </>
  );
};

export default Menu;
