import './style.css'
import ReturnBtn from '../../components/ReturnBtn'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import axios from 'axios'
import AddressCard from './AddressCard'
import { AddressType } from './type'
import { getToken } from '../../utils'
import { useNavigate } from 'react-router-dom'
import BottomBtn from '../../components/BottomBtn'
function Address() {
    const [addressList, setAddressList] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL + '/address', {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((res) => {
                setAddressList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const deleteAddress = (addressId: number) => {}

    return (
        <div className="address-page page">
            <Header title="收货地址" />
            <ReturnBtn path="/mine" />
            <div className="address-list">
                {addressList.map((address: AddressType) => (
                    <AddressCard
                        address={address}
                        key={address.address_id}
                        deleteAddress={deleteAddress}
                    />
                ))}
            </div>
            <BottomBtn
                title="添加收货地址"
                onClick={() => navigate('/new-address/new')}
            />
        </div>
    )
}

export default Address
