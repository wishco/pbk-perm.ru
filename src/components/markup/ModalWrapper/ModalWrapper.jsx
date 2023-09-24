import React, { useEffect, useRef, useState } from "react";
import s from "./ModalWrapper.module.scss";
import ModalContainer from "components/Modal/ModalContainer";

const ModalWrapper = ({
  title,
  active,
  showModalWindowByName,
  hideModalWindow,
  animation = true,
  children,
  ...data
}) => {
  const [taskModal, setTaskModal] = useState("mounting");
  const [modalShow, setModalShow] = useState(false);

  const OPEN = "open";
  const OPENING = "opening";
  const OPENED = "opened";
  const CLOSE = "close";
  const CLOSING = "closing";
  const CLOSED = "closed";

  function newTaskAfterTimeout(newTask, sec) {
    setTimeout(
      () => {
        setTaskModal(newTask);
      },
      sec,
      newTask
    );
  }

  function taskWorking(task) {
    switch (task) {
      case OPEN:
        break;
      case OPENING:
        setModalShow(true);
        newTaskAfterTimeout(OPENED, 1000);
        break;
      case OPENED:
        console.log(task);
        break;
      case CLOSE:
        console.log(task);
        break;
      case CLOSING:
        newTaskAfterTimeout(CLOSED, 1000);
        break;
      case CLOSED:
        setModalShow(false);
        break;
    }
    console.log(task);
  }

  useEffect(() => {
    setTaskModal(CLOSED); // mounting => переводим в состояние закрыто
  }, []);

  useEffect(() => {
    if (active && taskModal === "closed") setTaskModal(OPEN);
    if (!active && taskModal === "opened") setTaskModal(CLOSE);
    if (active && taskModal === "open") setTaskModal(OPENING);
    if (!active && taskModal === "close") setTaskModal(CLOSING);
  }, [active, taskModal]);

  useEffect(() => {
    taskWorking(taskModal);
  }, [taskModal]);

  if (!modalShow)
    return (
      <>
        <p
          onClick={() => {
            showModalWindowByName("MenuMobile");
          }}
        >
          скрыта форма
        </p>
      </>
    );
  else
    return (
      <>
        <div
          onClick={() => {
            hideModalWindow();
          }}
        >
          ффф--открыта---фф
        </div>

        {/*<ModalContainer*/}
        {/*  active*/}
        {/*  title*/}
        {/*  >*/}
        {/*  /!*{children}*!/*/}
        {/*  </ModalContainer>*/}
      </>
    );
};

export default ModalWrapper;
