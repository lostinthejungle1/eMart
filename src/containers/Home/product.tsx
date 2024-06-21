type ProductProps = {
    thumbnail_url: string
    price: string
    title: string
    onAddToCart: () => void
    onClick: () => void
}
function Product({
    thumbnail_url,
    price,
    title,
    onAddToCart,
    onClick,
}: ProductProps) {
    return (
        <div className="product" onClick={onClick}>
            <img
                src={thumbnail_url}
                alt={title}
                className="product-thumbnail"
            />
            <span className="product-title">{title}</span>
            <span className="product-price">{price}</span>
            <div onClick={onAddToCart} className="product-add-btn">
                <span>+</span>
            </div>
        </div>
    )
}

export default Product
