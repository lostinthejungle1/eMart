import { useNavigate } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { BiCategory } from 'react-icons/bi'
import { IoCartOutline } from 'react-icons/io5'
import { IoPersonOutline } from 'react-icons/io5'
import './style.css'

function NavigationBar({
    current,
    className,
}: {
    current: string
    className?: string
}) {
    const navigate = useNavigate()
    return (
        <nav className={className}>
            <ul className="navigation-bar">
                <li
                    className={`${current === 'home' ? 'active' : ''} navigation-bar-item`}
                    onClick={() => navigate('/home')}
                >
                    <FaHome className="navigation-bar-item-logo" />
                    <div>首页</div>
                </li>
                <li
                    className={`${current === 'category' ? 'active' : ''} navigation-bar-item`}
                    onClick={() => navigate('/category')}
                >
                    <BiCategory className="navigation-bar-item-logo" />
                    <div>分类</div>
                </li>
                <li
                    className={`${current === 'cart' ? 'active' : ''} navigation-bar-item`}
                    onClick={() => navigate('/cart')}
                >
                    <IoCartOutline className="navigation-bar-item-logo" />
                    <div>购物车</div>
                </li>
                <li
                    className={`${current === 'mine' ? 'active' : ''} navigation-bar-item`}
                    onClick={() => navigate('/mine')}
                >
                    <IoPersonOutline className="navigation-bar-item-logo" />
                    <div>我的</div>
                </li>
            </ul>
        </nav>
    )
}

export default NavigationBar
