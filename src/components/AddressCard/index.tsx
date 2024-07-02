import { useNavigate } from 'react-router-dom'
import './style.css'
type AddressType = {
    address_id: number
    name: string
    phone: string
    address: string
    default: boolean
}

function AddressCard({
    address,
    deleteAddress,
    showBtns,
    onClickHandler,
}: {
    address: AddressType | null
    deleteAddress?: (addressId: number) => void
    showBtns: boolean
    onClickHandler?: () => void
}) {
    const navigate = useNavigate()
    return (
        <div className="address-card" onClick={onClickHandler}>
            <div className="address-info">
                <div className="name">{address ? address.name : ''}</div>
                <div className="phone">{address ? address.phone : ''}</div>
                <div className={address?.default ? 'default' : ''}>
                    {address?.default ? '默认' : ''}
                </div>
                <div className="address">{address ? address.address : ''}</div>
            </div>
            {showBtns && address && (
                <div className="edit-btns">
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
                        onClick={() =>
                            deleteAddress
                                ? deleteAddress(address.address_id)
                                : null
                        }
                    >
                        删除
                    </button>
                </div>
            )}
        </div>
    )
}

export default AddressCard
