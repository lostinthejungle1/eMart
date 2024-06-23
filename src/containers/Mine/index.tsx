import Header from '../../components/Header'
import NavigationBar from '../../components/NavigationBar'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { IoReorderFourOutline } from 'react-icons/io5'
import { CiMoneyCheck1 } from 'react-icons/ci'
import { CiDeliveryTruck } from 'react-icons/ci'
import { PiPackageLight } from 'react-icons/pi'
import { RiRefund2Line } from 'react-icons/ri'
import { IoSettingsOutline } from 'react-icons/io5'
import { IoLocationOutline } from 'react-icons/io5'
function Mine() {
    const navigate = useNavigate()
    return (
        <div className="mine-page page">
            <Header title="我的" className="header" />
            <div className="personal-info">
                <img
                    src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/09/12/17/potter.jpg"
                    alt=""
                    className="profile-img"
                />
                <span className="username">
                    liang<span className="vip">VIP5</span>
                </span>

                <button className="member-center">会员中心</button>
            </div>
            {/* maybe this should be put in member center */}
            {/* <div className="collection">
                <div className="voucher">
                    <span>4</span>
                    <span>优惠券</span>
                </div>
                <div className="point">
                    <span>258</span>
                    <span>积分</span>
                </div>
            </div> */}
            <div className="options">
                <div className="all-orders option-item">
                    <IoReorderFourOutline className="option-icon" />
                    <span className="option-title">全部订单</span>
                </div>
                <div className="payment-pending option-item">
                    <CiMoneyCheck1 className="option-icon" />
                    <span className="option-title">待付款</span>
                </div>
                <div className="delivery-pending option-item">
                    <CiDeliveryTruck className="option-icon" />
                    <span className="option-title">待发货</span>
                </div>
                <div className="receive-pending option-item">
                    <PiPackageLight className="option-icon" />
                    <span className="option-title">待收货</span>
                </div>
                <div className="change-and-refund option-item last">
                    <RiRefund2Line className="option-icon" />
                    <span className="option-title">退款/售后</span>
                </div>
                <div
                    className="setting option-item last"
                    onClick={() => navigate('/setting')}
                >
                    <IoSettingsOutline className="option-icon" />
                    <span className="option-title">设置</span>
                </div>
                <div className="address option-item">
                    <IoLocationOutline className="option-icon" />
                    <span className="option-title">地址</span>
                </div>
            </div>
            <NavigationBar current="mine" className="nav-bar" />
        </div>
    )
}

export default Mine
