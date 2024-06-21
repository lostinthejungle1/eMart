import React from 'react'
import './style.css'

function Popover({
    show,
    children,
    blankClickCallback,
}: {
    show: boolean
    children: React.ReactNode
    blankClickCallback: () => void
}) {
    return show ? (
        <>
            <div className="popover-mask" onClick={blankClickCallback}></div>
            <div className="popover-content">{children}</div>
        </>
    ) : null
}

export default Popover
