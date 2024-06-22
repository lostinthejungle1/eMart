function Product({
    product_id,
    thumbnail_url,
    sales_count,
    price,
    title,
}: {
    product_id: number
    thumbnail_url: string
    sales_count: number
    price: number
    title: string
}) {
    return (
        <div className="product-container">
            <img
                className="product-img"
                src="https://c8.alamy.com/comp/CF9DGC/strawberry-CF9DGC.jpg"
                alt={title}
            />
            <div className="product-info">
                <div className="product-title">{title}</div>
                <div className="product-sales">销量:{sales_count}</div>
                <div className="product-price">{price}</div>
                <button className="purchase-btn">购买</button>
            </div>
        </div>
    )
}

export default Product
