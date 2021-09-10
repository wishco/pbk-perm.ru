import React from 'react';
import {useAlert} from './AlertContext';


export default function AlertMain () {
  const {toggle} = useAlert()


  return (
    <>
      <h1>
        Привет в примере с контекст
        <button onClick={toggle}> Показать alert
        </button>
      </h1>

    </>
  )
}
