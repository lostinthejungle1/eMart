import Product from './Product'
type product = {
    product_id: number
    title: string
    price: number
    thumbnail_url: string
    count: number
    spec: string
}

type order = {
    order_id: number
    order_status: string
    order_price: number
    products: Array<product>
    order_datetime: string
}

function Order({
    order,
    getOrderOptions,
}: {
    order: order
    getOrderOptions: (orderStatus: string) => JSX.Element
}) {
    const getStatusName = (status: string) => {
        switch (status) {
            case 'payment-pending':
                return '待支付'
            case 'delivery-pending':
                return '待发货'
            case 'acceptance-pending':
                return '待收货'
            case 'completed':
                return '已完成'
            case 'canceled':
                return '已取消'
            default:
                return '未知状态'
        }
    }
    return (
        <div className="order-container">
            <div className="order-time">{order.order_datetime}</div>
            <span className="status">{getStatusName(order.order_status)}</span>
            <div className="products">
                {order.products.map((product) => (
                    <Product product={product} key={product.product_id} />
                ))}
            </div>
            <div className="order-id">订单号：{order.order_id}</div>
            <div className="order-price">共计：￥{order.order_price}</div>
            <div className="order-options">
                {getOrderOptions(order.order_status)}
            </div>
        </div>
    )
}

export default Order
