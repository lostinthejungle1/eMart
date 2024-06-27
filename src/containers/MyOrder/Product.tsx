type product = {
    product_id: number
    title: string
    price: number
    thumbnail_url: string
    count: number
    spec: string
}
function Product({ product }: { product: product }) {
    return (
        <div className="product-container">
            <img
                src="https://c8.alamy.com/comp/CF9DGC/strawberry-CF9DGC.jpg"
                alt={product.title}
                className="product-thumbnail"
            />
            <div className="product-info">
                <div className="product-title">{product.title}</div>
                <div className="product-spec">{product.spec}</div>
                <div className="product-figure">
                    <span className="product-price">{product.price}</span>
                    <span className="product-count">{product.count}</span>
                </div>
            </div>
        </div>
    )
}

export default Product