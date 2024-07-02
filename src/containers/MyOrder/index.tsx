import './style.css'
import Header from '../../components/Header'
import ReturnBtn from '../../components/ReturnBtn'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../../utils'
import { useParams, useNavigate } from 'react-router-dom'
import Order from './Order'
type product = {
    product_id: number
    title: string
    price: number
    thumbnail_url: string
    count: number
    specifications: string
}
type order = {
    order_id: number
    order_status: string
    order_price: number
    products: Array<product>
    order_datetime: string
}

function MyOrder() {
    const selectedStatus = useParams().status
    console.log(selectedStatus)
    const navigate = useNavigate()
    const [orderList, setOrderList] = useState<Array<order>>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        switch (selectedStatus) {
            case 'all':
                axios
                    .get(process.env.REACT_APP_API_URL + '/order/details', {
                        headers: {
                            Authorization: `Bearer ${getToken()}`,
                        },
                    })
                    .then((res) => {
                        setOrderList(res.data)
                        setLoading(false)
                    })
                    .catch((err) => {
                        setLoading(false)
                    })
                break
            case 'payment-pending':
                axios
                    .get(
                        process.env.REACT_APP_API_URL +
                            '/order/details/payment-pending',
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                            },
                        }
                    )
                    .then((res) => {
                        setOrderList(res.data)
                        setLoading(false)
                    })
                    .catch((err) => {
                        setLoading(false)
                    })
                break
            case 'delivery-pending':
                axios
                    .get(
                        process.env.REACT_APP_API_URL +
                            '/order/details/delivery-pending',
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                            },
                        }
                    )
                    .then((res) => {
                        setOrderList(res.data)
                        setLoading(false)
                    })
                    .catch((err) => {
                        setLoading(false)
                    })
                break
            case 'acceptance-pending':
                axios
                    .get(
                        process.env.REACT_APP_API_URL +
                            '/order/details/acceptance-pending',
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                            },
                        }
                    )
                    .then((res) => {
                        setOrderList(res.data)
                        setLoading(false)
                    })
                    .catch((err) => {
                        setLoading(false)
                    })
                break
            case 'completed-or-canceled':
                Promise.all([
                    axios.get(
                        process.env.REACT_APP_API_URL +
                            '/order/details/completed',
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                            },
                        }
                    ),
                    axios.get(
                        process.env.REACT_APP_API_URL +
                            '/order/details/canceled',
                        {
                            headers: {
                                Authorization: `Bearer ${getToken()}`,
                            },
                        }
                    ),
                ])
                    .then((res) => {
                        setOrderList([...res[0].data, ...res[1].data])
                        setLoading(false)
                    })
                    .catch((err) => {
                        setLoading(false)
                    })
        }
    }, [selectedStatus])

    const getOrderOptions = (status: string) => {
        switch (status) {
            case 'payment-pending':
                return <button>立即付款 04:59</button>
            case 'delivery-pending':
                return (
                    <>
                        <button>订单详情</button>
                        <button>联系客服</button>
                    </>
                )
            case 'acceptance-pending':
                return (
                    <>
                        <button>查看物流</button>
                        <button>确认收货</button>
                    </>
                )
            case 'completed':
                return <button>再次购买</button>
            case 'canceled':
                return <button>再次购买</button>
            default:
                return <></>
        }
    }

    return (
        <div className="my-order-page page">
            <Header title="我的订单" />
            <ReturnBtn path="/mine" />
            <div className="tabs">
                <div
                    className={`tab ${selectedStatus === 'all' ? 'active' : ''}`}
                    onClick={() => navigate('/my-order/all')}
                >
                    全部
                </div>
                <div
                    className={`tab ${selectedStatus === 'payment-pending' ? 'active' : ''}`}
                    onClick={() => navigate('/my-order/payment-pending')}
                >
                    待付款
                </div>
                <div
                    className={`tab ${selectedStatus === 'delivery-pending' ? 'active' : ''}`}
                    onClick={() => navigate('/my-order/delivery-pending')}
                >
                    待发货
                </div>
                <div
                    className={`tab ${selectedStatus === 'acceptance-pending' ? 'active' : ''}`}
                    onClick={() => navigate('/my-order/acceptance-pending')}
                >
                    待收货
                </div>
                <div
                    className={`tab ${selectedStatus === 'completed-or-canceled' ? 'active' : ''}`}
                    onClick={() => navigate('/my-order/completed-or-canceled')}
                >
                    已完成
                </div>
            </div>
            <div className="list">
                {loading && <div>loading...</div>}
                {orderList.map((order) => (
                    <Order
                        order={order}
                        getOrderOptions={getOrderOptions}
                        key={order.order_id}
                    />
                ))}
            </div>
        </div>
    )
}

export default MyOrder
