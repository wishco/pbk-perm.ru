import React from 'react'
import s from "./Logo.module.scss";
import {getFullClassName} from "lib/js/jsMic";

const Logo = ({...data}) => {

  const STYLE_NAME = data["data-style"]
  const STYLE_NAME_DEFAULT = "logo-header"
  const CURRENT_STYLE_NAME = STYLE_NAME ? ("logo-" + STYLE_NAME) : STYLE_NAME_DEFAULT
  const dataStyleLogo = CURRENT_STYLE_NAME
  const dataStyleSvg = CURRENT_STYLE_NAME + "-svg"
  const dataStylePath = CURRENT_STYLE_NAME + "-path"
  const dataStyleP = CURRENT_STYLE_NAME + "-p"

  return (
    <>
      <div data-style={dataStyleLogo} className={s.logo}
           title="Общество с ограниченной ответственностью «Специализированный Застройщик «Промышленная Буровая Компания»">
        <svg data-style={dataStyleSvg}
             xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve"
             width="68px" height="56px"
             version="1.1" shapeRendering="geometricPrecision" textRendering="geometricPrecision"
             imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd"
             viewBox="0 0 3.36 2.76">
          <path data-style={dataStylePath}
                d="M3.04 1.45c0.05,0.01 0.09,0.01 0.14,0.01l0 0.27 -0.16 0 0 -0.28 0.02 0zm-0.37 -0.02c0.05,0 0.13,0.01 0.18,0.01l0 0.29 -0.19 0 0.01 -0.3zm-0.42 -0.03c0.04,0.01 0.18,0.02 0.21,0.02l0 0.31 -0.21 0 0 -0.33zm0.78 -0.38c0.02,0 0.13,0.02 0.15,0.02l0 0.27c-0.03,-0.01 -0.13,-0.02 -0.16,-0.02l0 -0.28 0.01 0.01zm-0.35 -0.06l0.16 0.03 0.01 0.29c-0.05,-0.01 -0.14,-0.02 -0.19,-0.02l0 -0.3 0.02 0zm-0.42 -0.07c0.04,0.01 0.17,0.03 0.2,0.03l0 0.32c-0.06,-0.01 -0.15,-0.02 -0.21,-0.02l0 -0.33 0.01 0zm0.76 -0.31c0.02,0 0.14,0.04 0.16,0.04l0 0.27c-0.03,-0.01 -0.14,-0.03 -0.16,-0.03l0 -0.28zm-0.2 0.24l-0.01 -0.01 -0.02 0 -0.02 0 -0.02 -0.01 -0.03 0 -0.02 -0.01 -0.01 0 -0.02 0c-0.02,-0.01 0,-0.31 0,-0.31 0.02,0.01 0.16,0.05 0.18,0.05l0 0.29c-0.01,0 -0.01,0 -0.03,0zm-0.53 -0.43c0.04,0.01 0.14,0.04 0.17,0.04l0 0.32c-0.03,-0.01 -0.19,-0.05 -0.21,-0.05l0 -0.33c0.01,0.01 0.03,0.01 0.04,0.02zm-0.95 0.48l0.19 0 0 -0.4 0.01 0c0.01,0 0.44,-0.22 0.48,-0.25l0 2.51 1.34 0 0 -2.3c-0.01,-0.01 -0.96,-0.31 -1.07,-0.35 -0.03,-0.01 -0.26,-0.08 -0.27,-0.08 -0.01,0 -0.47,0.25 -0.53,0.27 -0.03,0.02 -0.11,0.06 -0.14,0.08 0,0.01 -0.01,0.01 -0.01,0.01l0 0.51zm-0.61 -0.14c-0.07,0.02 -0.43,0.2 -0.52,0.25 0,0.07 0.01,0.58 -0.01,0.61 -0.02,0.01 -0.2,0.22 -0.2,0.22l0 0.95 0.2 0 0 -0.87c0.01,-0.02 0.21,-0.24 0.21,-0.24l0 -0.56c0.01,0 0.3,-0.13 0.33,-0.14l0 1.78 0.98 0 0 -1.69c0,0 -0.97,-0.32 -0.99,-0.31zm0.19 0.28c0.02,0 0.13,0.03 0.14,0.03l0 0.23c-0.02,0 -0.14,-0.03 -0.16,-0.03l0 -0.24 0.02 0.01zm-0.01 0.37l0.15 0.03 0 0.23c-0.04,-0.01 -0.11,-0.02 -0.16,-0.02l0 -0.24 0.01 0zm0 0.38c0.06,0 0.1,0.01 0.15,0.01l0 0.23 -0.16 0 0 -0.25 0.01 0.01zm0.32 -0.67c0.01,0.01 0.11,0.03 0.12,0.03l0 0.2c-0.02,0 -0.12,-0.02 -0.14,-0.02l0.01 -0.21 0.01 0z"/>
        </svg>
        <p data-style={dataStyleP}>
          СЗ&nbsp;«ПБК»
        </p>
      </div>
    </>
  )
}

export default Logo
