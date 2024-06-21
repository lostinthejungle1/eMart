import { MdOutlineShoppingCart } from 'react-icons/md'
function AddCart({
    cartNumber,
    addToCart,
}: {
    cartNumber: number
    addToCart: () => void
}) {
    return (
        <div className="add-to-cart-docker">
            <div className="cart">
                <div className="cart-symbol">
                    <MdOutlineShoppingCart className="cart-icon" />
                    <span className="cart-num">{cartNumber || 0}</span>
                    {/* number of items in shopping cart */}
                </div>

                <span>购物车</span>
            </div>
            <button onClick={addToCart} className="add-btn">
                加入购物车
            </button>
        </div>
    )
}

export default AddCart
