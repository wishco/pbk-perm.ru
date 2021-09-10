import React from 'react'
import {getFullClassName} from "lib/js/jsMic";

const Wrapper = ({children, className}) => {
    return (
        <>
            <div className={getFullClassName(className, 'wrapper')}>
              {children}
            </div>
        </>
    )
}

export default Wrapper
