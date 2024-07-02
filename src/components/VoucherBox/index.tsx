import './style.css'
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

function VoucherBox({ voucher }: { voucher: Voucher }) {
    let isExpired = new Date(voucher.expiry_date) < new Date()

    const showStatus = () => {
        if (voucher.used) {
            return '已使用'
        } else if (isExpired) {
            return '已过期'
        } else {
            return '未使用'
        }
    }

    return (
        <div
            className={`voucher-box ${voucher.used || isExpired ? 'grey' : ''} `}
        >
            <div className="amount">
                {voucher.discount ? voucher.discount + '元' : '包邮'}
            </div>
            <div className="description">{voucher.description}</div>
            <div className="expire">{'有效期至' + voucher.expiry_date}</div>
            <div className="status">{showStatus()}</div>
        </div>
    )
}

export default VoucherBox
