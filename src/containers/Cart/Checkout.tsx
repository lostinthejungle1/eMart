import CheckBox from '../../components/CheckBox'

function Checkout({
    totalPrice,
    totalCount,
    selectAllHandler,
    checkoutHandler,
    getTotalPrice,
    getTotalCount,
    selectAll,
}: {
    totalPrice: number
    totalCount: number
    selectAllHandler: () => void
    checkoutHandler: () => void
    getTotalPrice: () => number
    getTotalCount: () => number
    selectAll: boolean
}) {
    return (
        <div className="checkout-container">
            <div className="select-all">
                <CheckBox selected={selectAll} onClick={selectAllHandler} />
                全选
            </div>
            <div className="total">
                <span>总价：</span>
                <span>{getTotalPrice()}</span>
            </div>
            <div className="checkout-btn" onClick={checkoutHandler}>
                结算({getTotalCount()})
            </div>
        </div>
    )
}

export default Checkout
