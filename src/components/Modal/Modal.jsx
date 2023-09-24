import React, { useEffect, useRef } from "react";
import s from "./Modal.module.scss";
import { useTaskAnimation } from "components/TaskAnimation/TaskAnimationContext";

const Modal = ({
  dataModalPos = "center",
  title,
  active,
  hideModalWindow,
  children,
  modalWindowBusy,
  modalWindowBusyText,
  ...data
}) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const wrapperRef = useRef(null);
  const wrapperAnimRef = useRef(null);

  const closeRef = useRef(null);

  const animationObj = useTaskAnimation();

  useEffect(() => {
    animationObj.initAnimation([
      modalRef,
      contentRef,
      wrapperRef,
      wrapperAnimRef,
    ]);
  }, []);

  const modalHideWindowHandler = () => {
    hideModalWindow();
  };

  const modalKeyTabHandler = (e) => {
    const KEY_TAB = "Tab";
    if (!active) return null; // когда окно не активно, игнорируем (можем попасть по tab кнопке)
    if (
      e.key === KEY_TAB &&
      e.shiftKey === true &&
      e.target.getAttribute("data-tab-lock") === "start"
    ) {
      e.preventDefault();
    } else if (
      e.key === KEY_TAB &&
      e.shiftKey === false &&
      e.target.getAttribute("data-tab-lock") === "end"
    ) {
      e.preventDefault();
    }
  };

  const modalCloseWindowByKeyHandler = (e) => {
    const KEY_ENTER = "Enter";
    if (e.key === KEY_ENTER) modalHideWindowHandler();
  };

  useEffect(() => {
    // console.log("a")
  }, [wrapperRef.current]);

  return (
    <>
      <div
        className={s.modal}
        onClick={modalHideWindowHandler}
        ref={modalRef}
        data-anim-active={active}
        data-anim-type-fade06={true}
      ></div>
      <div
        className={s.wrapper}
        ref={wrapperRef}
        data-anim-type-fade={true}
        data-anim-active={active}
        data-tab-lock="start"
        onKeyDown={modalKeyTabHandler}
        data-modal-type={dataModalPos}
      >
        <div
          className={s.wrapperAnimation}
          ref={wrapperAnimRef}
          data-anim-type-scale={dataModalPos !== "fullScreen"}
          data-anim-type-fade={dataModalPos === "fullScreen"}
          data-anim-active={active}
          data-anim-time-opening={200}
          data-anim-time-closing={100}
          data-anim-time-open={100}

          // data-anim-force-off={true}
        >
          <div
            className={s.content}
            data-modal-lock={modalWindowBusy}
            // ref={contentRef}
            // data-anim-type-scale={true}

            // data-anim-active={active}

            data-tab-lock="start"
            tabIndex="1"
            onClick={(e) => e.stopPropagation()}
          >
            {modalWindowBusy && <div className="preloader-bg-5"></div>}
            {modalWindowBusy && <div className="preloader-5"></div>}
            {modalWindowBusyText && (
              <p className="preloader-text-5">{modalWindowBusyText}</p>
            )}

            <div
              className={s.windowHeader}
              onClick={(e) => {
                closeRef.current.focus();
              }}
            >
              <div className={s.windowTitle}>{title}</div>
              <div className={s.windowClose}>
                <div
                  className={s.closeBox}
                  onClick={modalHideWindowHandler}
                  ref={closeRef}
                  onKeyPress={modalCloseWindowByKeyHandler}
                  title="закрыть окно"
                  tabIndex="1"
                  data-tab-lock="start"
                ></div>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
      {}
    </>
  );
};

export default Modal;
