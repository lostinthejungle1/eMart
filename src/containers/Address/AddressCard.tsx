import { useNavigate } from 'react-router-dom'
import { AddressType } from './type'
function AddressCard({
    address,
    deleteAddress,
}: {
    address: AddressType
    deleteAddress: (addressId: number) => void
}) {
    const navigate = useNavigate()
    return (
        <div className="address-card">
            <div className="address-info">
                <div className="name">{address.name}</div>
                <div className="phone">{address.phone}</div>
                <div className="address">{address.address}</div>
            </div>
            <div className="edit-btns">
                <span className="default">{address.default ? '默认' : ''}</span>
                <div>
                    <button
                        className="edit-btn"
                        onClick={() =>
                            navigate(`/new-address/${address.address_id}`)
                        }
                    >
                        编辑
                    </button>
                    <button
                        className="delete-btn"
                        onClick={() => deleteAddress(address.address_id)}
                    >
                        删除
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddressCard
