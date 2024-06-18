import './style.css'
import { useState, useEffect } from 'react'

function Modal({ message, logo }: { message: string; logo: string }) {
    const [show, setShow] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false)
        }, 2000)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className={`modal ${show ? '' : 'noshow-modal'}`}>
            <span className="logo">{logo}</span>
            <span className="message">{message}</span>
        </div>
    )
}

export default Modal
