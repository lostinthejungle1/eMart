import { useCallback, useEffect, useRef } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'

function Guide() {
    // Hooks should be called first in the component
    const refGuidePage = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const guidePage = refGuidePage.current
        guidePage?.classList.add('show')
    }, [])

    const navigate = useNavigate()
    const handleClick = useCallback(() => {
        navigate('/auth/login')
    }, [navigate])

    return (
        <div
            ref={refGuidePage}
            className="page guide-page"
            style={{ fontSize: '.2rem' }}
        >
            <img
                src={require('../../images/emart_logo_icon_@2x.png')}
                alt="logo"
                className="logo"
            />
            <h1 className="title">Emart</h1>
            <img
                src={require('../../images/slogan@2x.png')}
                alt="slogan"
                className="slogan"
            />
            <img
                src={require('../../images/next_step_icon_@2x.png')}
                alt="next"
                className="next"
                onClick={handleClick}
            />
        </div>
    )
}

export default Guide
