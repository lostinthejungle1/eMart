import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useRequest } from '../../hooks'

import './style.css'
import ReturnBtn from '../../components/ReturnBtn'
import VoucherBox from '../../components/VoucherBox'

interface voucher {
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

function Voucher() {
    const { data, loading, error } = useRequest<voucher[]>(
        process.env.REACT_APP_API_URL + '/vouchers/',
        'GET'
    )

    return (
        <div className="voucher-page">
            <Header title="优惠券" />
            <ReturnBtn path="/mine" />
            {/* todo:sorted vouchers based on expire data */}
            {/* todo:tabs based on status */}
            <div className="voucher-list">
                {data?.map((voucher) => (
                    <VoucherBox key={voucher.id} voucher={voucher} />
                ))}
            </div>
        </div>
    )
}

export default Voucher
