import React, {useEffect, useMemo, useRef, useState} from 'react'
import s from "./T1.module.scss"
import T2 from "components/T2/T2";
import {TaskAnimationProvider, useTaskAnimation} from "components/TaskAnimation/TaskAnimationContext";
import {sleep} from "lib/js/jsMic";

const T1 = ({showModalWindowByName, hideModalWindow, activeModalWindowName, active = false, ...data}) => {
  const animationRef1 = useRef(null)
  const animationRef2 = useRef(null)
  const animationObj = useTaskAnimation()

  useEffect(()=>{
    animationObj.initAnimation([animationRef1, animationRef2])
  },[])


  return (
    <>
      <TaskAnimationProvider
        value={{
          // type: "anim-fade",
          // animationOff: false,
          timeClosing: 777,
          timeOpening: 888,
          active: activeModalWindowName === "Callback1"
        }}
      >
        <div

        >
          <p onClick={() => {
            hideModalWindow()
          }}>---------hideModalWindow-----------</p>
          <p onClick={() => {
            showModalWindowByName("Callback1")
          }}>**********showModalWindowByName***********</p>

          <p
            ref={animationRef1}
            data-anim-active={activeModalWindowName === "Callback1"}
            data-anim-type="anim-fade"

          >ddddddddddddd</p>

          <p
            ref={animationRef2}
            data-anim-active={activeModalWindowName === "Callback1"}
            data-anim-type="anim-fade"
            data-anim-time-opening={3717}
            data-anim-time-closing={3516}
            // data-anim-off="true"
            // data-anim-force-open-off
            // data-anim-force-close-off
          >ttttttttttttttttttt</p>

          <div>
            <T2
              active={activeModalWindowName === "Callback1"}
            />
          </div>

        </div>
      </TaskAnimationProvider>
    </>
  )
}

export default T1
