import React, {useEffect, useRef, useState} from 'react'
import s from "./MenuMobile.module.scss";
import {NavLink} from "react-router-dom";

const MenuMobile = ({hideMenu, ...data}) => {

  const act1Ref = useRef(null)
  const act2Ref = useRef(null)
  const act3Ref = useRef(null)
  const act4Ref = useRef(null)

  const [tab1, setTab1] = useState(false)
  const [tab2, setTab2] = useState(false)
  const [tab3, setTab3] = useState(false)
  const [tab4, setTab4] = useState(false)


  const activeLink2 = useRef()

  function changeActiveLink(match, linkRef) {
    if (match) {
      activeLink2.current = linkRef

    }
    return match
  }

  const hideMenuHandler = () => hideMenu()

  useEffect(()=> {
    setTab1((activeLink2.current !== 1))
    setTab2((activeLink2.current !== 2))
    setTab3((activeLink2.current !== 3))
    setTab4((activeLink2.current !== 4))
  },[activeLink2])

  return (
    <>
      <div className={s.wrapper}>

        <div>


          <NavLink data-id="1" ref={act1Ref} tabIndex={tab1  && "1" || ""} to={`/live`}
                   isActive={(match) => changeActiveLink(match, "1")}
                   className={s.item} activeClassName={s.active}
                   onClick={hideMenuHandler}
          >Жилая недвижимость</NavLink>

          <NavLink data-id="2" ref={act2Ref} tabIndex={tab2  && "1"  || ""} to={`/commerce`}
                   isActive={(match) => changeActiveLink(match, "2")}
                   className={s.item} activeClassName={s.active}
                   onClick={hideMenuHandler}
          >Коммерческая&nbsp;недвижимость</NavLink>

          <NavLink data-id="3" ref={act3Ref} tabIndex={tab3  && "1"  || ""} to={`/realtor`}
                   isActive={(match) => changeActiveLink(match, "3")}
                   data-tab-lock={!tab4 && "end" || ""} // блокируем фокус TAB если последний Link не активен
                   className={s.item} activeClassName={s.active}
                   onClick={hideMenuHandler}
          >Риэлторам</NavLink>

          <NavLink data-id="4" ref={act4Ref} tabIndex={tab4  && "1" || ""} to={`/ways-buy`}
                   isActive={(match) => changeActiveLink(match, "4")}
                   data-tab-lock="end"
                   className={s.item} activeClassName={s.active}
                   onClick={hideMenuHandler}
          >Способы покупки</NavLink>

        </div>

      </div>
    </>
  )
}

export default MenuMobile
