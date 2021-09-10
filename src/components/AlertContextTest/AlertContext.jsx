import React, {useContext, useState} from 'react';

const AlertContext = React.createContext()

export const useAlert = () => {
  return useContext(AlertContext)
}



export const AlertProvider = ({children, ...props}) => {
  const [alert, setAlert] = useState(false)
  const toggle = () => setAlert(prev => !prev)

  // console.log(props)

  return (
    <AlertContext.Provider value={{
      visible: alert,
      toggle
    }}>
      {children}
    </AlertContext.Provider>
  )
}
