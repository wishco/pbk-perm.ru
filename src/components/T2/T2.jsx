import React, {useEffect, useMemo, useRef, useState} from 'react'
import s from "./T2.module.scss"
import {TaskAnimationProvider, useTaskAnimation} from "components/TaskAnimation/TaskAnimationContext";
import {sleep} from "lib/js/jsMic";

const T2 = ({active = false, ...data}) => {
  const animationRef3 = useRef(null)
  const animationRef4 = useRef(null)
  const animationRef5 = useRef(null)
  const animationObj = useTaskAnimation()

  useEffect(()=>{
    animationObj.initAnimation([animationRef3, animationRef4, animationRef5])
  },[])

    return (
        <>

            <div

            >

              <p
                ref={animationRef3}
                data-anim-active={active}
                data-anim-type="anim-fade"
              >вложенность 2-01</p>

              <p
                ref={animationRef4}
                data-anim-active={active}
                data-anim-type="anim-fade"
              >вложенность 2-02</p>
              <p
                ref={animationRef5}
                data-anim-active={active}
                data-anim-type="anim-fade"
              >вложенность 2-03</p>
            </div>

        </>
    )
}

export default T2
