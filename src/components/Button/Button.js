import React from 'react'
import './Button.css';

export function Button( { btnType, clicked, children} ) {
    return (
        <div className="Button">
            <button className={btnType} onClick={clicked}>
                {children}
            </button>
        </div>
    )
}

export default Button;