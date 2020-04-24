import React from 'react'

export default function Start({children, onClick}) {
    return(
        <button className="button" onClick={onClick}>
            {children}
        </button>
    )
}