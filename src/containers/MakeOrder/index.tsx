import Header from '../../components/Header'
import ReturnBtn from '../../components/ReturnBtn'
import { useLocation } from 'react-router-dom'
import './style.css'
import { useEffect, useState } from 'react'
import { useRequest } from '../../hooks'
import AddressCard from '../../components/AddressCard'
import OrderProduct from '../../components/OrderProduct'
import Popover from '../../components/Popover'
import VoucherBox from '../../components/VoucherBox'
import BottomBtn from '../../components/BottomBtn'
import CheckBox from '../../components/CheckBox'
import { DatePicker } from 'antd-mobile'
import { CiEdit } from 'react-icons/ci'

type AddressType = {
    address_id: number
    name: string
    phone: string
    address: string
    default: boolean
}

type product = {
    product_id: number
    title: string
    price: number
    thumbnail_url: string
    count: number
    specifications: string
}
interface Voucher {
    id: string
    code: string
    expiry_date: string
    distributed_to: string
    used: boolean
    discount: number
    free_shipping: boolean
    min_spend: number
    description: string
}

function MakeOrder() {
    const location = useLocation()
    const selectedItems = location.state.selectedItems

    const {
        data: addressList,
        loading,
        error,
    } = useRequest<AddressType[]>(
        process.env.REACT_APP_API_URL + '/address',
        'GET'
    )

    useEffect(() => {
        if (addressList?.length) {
            setSelectedAddress(
                addressList.find((address) => address.default) || null
            )
        }
    }, [addressList])

    const defaultAddress = addressList?.find(
        (address: AddressType) => address.default
    )
    const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null)
    const [showVoucherBox, setShowVoucherBox] = useState(false)
    const [showTimeBox, setShowTimeBox] = useState(false)
    const [selectedTime, setSelectedTime] = useState('')
    const [showAddressBox, setShowAddressBox] = useState(false)
    const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(
        null
    )
    const defaultDeliveryFee = 5

    const {
        data: vouchers,
        loading: vouchers_loading,
        error: vouchers_error,
    } = useRequest<Voucher[]>(
        process.env.REACT_APP_API_URL + '/vouchers/unused',
        'GET'
    )

    const getPriceTotal = () => {
        let total = selectedItems.reduce(
            (acc: number, item: product) => acc + item.price * item.count,
            0
        )

        return total.toFixed(2)
    }

    const getDiscount = () => {
        if (selectedVoucher && getPriceTotal() >= selectedVoucher.min_spend) {
            if (selectedVoucher.free_shipping) {
                return defaultDeliveryFee
            } else {
                return selectedVoucher.discount
            }
        }
        return 0
    }

    const getFinalTotal = () => {
        return (getPriceTotal() - getDiscount() + defaultDeliveryFee).toFixed(2)
    }

    const submitOrder = () => {
        // clear/update corresponding items in shopping cart
        // make backend request (order, inventory, voucher, credit,etc.)
        // navigate to order detail page
    }

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <div className="makeorder-page page">
            <Header title="确认订单" />
            <ReturnBtn path="/cart" />
            <div
                className="address-box"
                onClick={() => setShowAddressBox(true)}
            >
                {/* <CiEdit className="address-icon" /> */}
                {selectedAddress ? (
                    <AddressCard address={selectedAddress} showBtns={false} />
                ) : (
                    '请选择地址'
                )}
            </div>
            <Popover
                show={showAddressBox}
                blankClickCallback={() => setShowAddressBox(false)}
                className="address-popover"
            >
                <div className="address-popover-content">
                    <div className="address-popover-title">选择地址</div>
                    {addressList?.map((address: AddressType) => (
                        <AddressCard
                            address={address}
                            key={address.address_id}
                            showBtns={false}
                            onClickHandler={() => {
                                setSelectedAddress(address)
                                setShowAddressBox(false)
                            }}
                        />
                    ))}
                    <button className="address-popover-btn">新增地址</button>
                </div>
            </Popover>
            <div className="delivery-time" onClick={() => setShowTimeBox(true)}>
                <div>送达时间</div>
                <div className="selected-time">
                    {selectedTime ? selectedTime : '请选择'}
                </div>
                <DatePicker
                    visible={showTimeBox}
                    onClose={() => {
                        setShowTimeBox(false)
                    }}
                    precision="minute"
                    onConfirm={(val) => {
                        console.log(val)
                        setSelectedTime(val.toISOString())
                    }}
                />
            </div>
            <div className="product-container">
                <div>商品清单</div>
                <div className="product-list">
                    {selectedItems.map((product: product) => (
                        <OrderProduct
                            product={product}
                            key={product.product_id}
                        />
                    ))}
                </div>
            </div>

            <div
                className="selected-voucher"
                onClick={() => setShowVoucherBox(true)}
            >
                <div>优惠券</div>
                <div className="voucher-name">
                    {selectedVoucher ? selectedVoucher.description : '请选择'}
                </div>
            </div>
            <Popover
                show={showVoucherBox}
                blankClickCallback={() => setShowVoucherBox(false)}
                className="voucher-popover"
            >
                <div>优惠券</div>
                <div className="voucher-list">
                    {vouchers?.map((voucher) => (
                        <div
                            className="voucher-container"
                            key={voucher.id}
                            onClick={() => {
                                selectedVoucher?.id === voucher.id
                                    ? setSelectedVoucher(null)
                                    : setSelectedVoucher(voucher)
                            }}
                        >
                            <VoucherBox voucher={voucher} />
                            <CheckBox
                                selected={voucher.id === selectedVoucher?.id}
                                onClick={() => {}}
                            />
                        </div>
                    ))}
                </div>
                <BottomBtn
                    title="确定"
                    onClick={() => {
                        setShowVoucherBox(false)
                    }}
                />
            </Popover>
            <div className="summary">
                <div className="price-total summary-item">
                    <span>商品总计</span>
                    <span>¥{getPriceTotal()}</span>
                </div>
                <div className="price-discount  summary-item">
                    <span>优惠减免</span>
                    <span>-¥{getDiscount()}</span>
                </div>
                <div className="delivery-fee  summary-item">
                    <span>配送费</span>
                    <span
                        className={
                            selectedVoucher?.free_shipping
                                ? 'free-shipping'
                                : ''
                        }
                    >
                        ¥{defaultDeliveryFee}
                    </span>
                </div>
                <div className="member-profit summary-item">
                    <span>会员权益</span>
                    <span>
                        预计获得积分{Math.floor(Number(getFinalTotal()))}
                    </span>
                </div>
            </div>
            <div className="check-out">
                <div className="final-total">合计：¥{getFinalTotal()}元</div>
                <button className="submit-order-btn" onClick={submitOrder}>
                    提交订单
                </button>
            </div>
        </div>
    )
}

export default MakeOrder
