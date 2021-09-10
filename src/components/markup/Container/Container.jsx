import React from 'react'
import {getFullClassName} from "lib/js/jsMic";

const Container = ({children, className}) => {
    return (
        <>
          <div className={getFullClassName(className,'container')}>
            {children}
          </div>
        </>
    )
}

export default Container
