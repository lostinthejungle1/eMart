type product = {
    id: number
    price: number
    sales_count: number
    title: string
    description: string
    specifications: string
    category: string
    thumbnail_url: string
}

function Product({
    product,
    openProductDetail,
    handlePurchase,
}: {
    product: product
    openProductDetail: (id: number) => void
    handlePurchase: (product: product) => void
}) {
    return (
        <div
            className="product-container"
            onClick={() => openProductDetail(product.id)}
        >
            <img
                className="product-img"
                src="https://c8.alamy.com/comp/CF9DGC/strawberry-CF9DGC.jpg"
                alt={product.title}
            />
            <div className="product-info">
                <div className="product-title">{product.title}</div>
                <div className="product-sales">销量:{product.sales_count}</div>
                <div className="product-price">{product.price}</div>
                <button
                    className="product-purchase-btn"
                    onClick={(e) => {
                        e.stopPropagation()
                        handlePurchase(product)
                    }}
                >
                    购买
                </button>
            </div>
        </div>
    )
}

export default Product
