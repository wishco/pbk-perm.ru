import React from 'react';
import AlertMain from './AlertMain';
import Alert from './Alert';
import {AlertProvider, useAlert} from
    './AlertContext';

function AlertApp() {

  const alert = useAlert()

  // console.log(alert)

  return (

      <AlertProvider val={11212} val2={25}>
        <div>
          <Alert/>
          <AlertMain/>
        </div>
      </AlertProvider>

  )

}

export default AlertApp
