import React from 'react'
import './style.css'

function Popover({
    show,
    children,
    blankClickCallback,
    className,
}: {
    show: boolean
    children: React.ReactNode
    blankClickCallback: () => void
    className?: string
}) {
    return show ? (
        <div className={className}>
            <div className="popover-mask" onClick={blankClickCallback}></div>
            <div className="popover-content">{children}</div>
        </div>
    ) : null
}

export default Popover
