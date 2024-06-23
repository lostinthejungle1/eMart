function Product({
    product_id,
    thumbnail_url,
    specifications,
    price,
    title,
    count,
    selected,
    addCountHandler,
    minusCountHandler,
    handleCheckBoxHandler,
}: {
    product_id: number
    thumbnail_url: string
    specifications: string
    price: number
    title: string
    count: number
    selected: boolean
    addCountHandler: (id: number) => void
    minusCountHandler: (id: number) => void
    handleCheckBoxHandler: (id: number) => void
}) {
    return (
        <div className="product-container">
            <div
                className={`check-box ${selected ? 'active' : ''}`}
                onClick={() => handleCheckBoxHandler(product_id)}
            ></div>
            <img
                className="product-img"
                src="https://c8.alamy.com/comp/CF9DGC/strawberry-CF9DGC.jpg"
                alt="product-img"
            />
            <div className="product-info">
                <div className="product-title">{title}</div>
                <div className="product-specification">{specifications}</div>
                <div className="product-price">￥{price}</div>
                <div className="product-counter">
                    <span
                        onClick={() => {
                            if (count === 0) return
                            minusCountHandler(product_id)
                        }}
                    >
                        -
                    </span>
                    <span>{count}</span>
                    <span
                        onClick={() => {
                            addCountHandler(product_id)
                        }}
                    >
                        +
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Product
