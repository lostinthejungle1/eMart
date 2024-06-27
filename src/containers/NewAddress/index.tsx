import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import { Switch } from 'antd'
import ReturnBtn from '../../components/ReturnBtn'
import axios from 'axios'
import { AddressType } from '../Address/type'
import { getToken } from '../../utils'
import './style.css'
import BottomBtn from '../../components/BottomBtn'

function NewAddress() {
    const { status } = useParams()
    const [address, setAddress] = useState<AddressType>({
        address_id: 0,
        name: '',
        phone: '',
        address: '',
        default: false,
    })

    const navigate = useNavigate()

    useEffect(() => {
        if (status !== 'new') {
            // fetch address detail
            axios
                .get(process.env.REACT_APP_API_URL + '/address/' + status, {
                    headers: { Authorization: `Bearer ${getToken()}` },
                })
                .then((res) => {
                    setAddress(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [status])

    const saveAddress = () => {
        //do some validation, if not pass, return

        if (status === 'new') {
            axios
                .post(
                    process.env.REACT_APP_API_URL + '/address',
                    {
                        name: address.name,
                        phone: address.phone,
                        address: address.address,
                        default: address.default,
                    },
                    {
                        headers: { Authorization: `Bearer ${getToken()}` },
                    }
                )
                .then((res) => {
                    // navigate to address page
                    if (res.data.success) {
                        // navigate to address page
                        navigate('/address')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            axios
                .put(
                    process.env.REACT_APP_API_URL + '/address/' + status,
                    address,
                    {
                        headers: { Authorization: `Bearer ${getToken()}` },
                    }
                )
                .then((res) => {
                    // navigate to address page
                    if (res.data.success) {
                        // navigate to address page
                        navigate('/address')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <div className="new-address-page page">
            <Header
                title={status === 'new' ? '新增收获地址' : '编辑收货地址'}
            />
            <ReturnBtn path="/address" />
            <div className="name input">
                <label>收货人</label>
                <input
                    type="text"
                    value={address.name}
                    onChange={(e) =>
                        setAddress({ ...address, name: e.target.value })
                    }
                    placeholder="请输入收货人姓名"
                />
            </div>
            <div className="phone input">
                <label>手机</label>
                <input
                    type="text"
                    value={address.phone}
                    onChange={(e) =>
                        setAddress({ ...address, phone: e.target.value })
                    }
                    placeholder="请输入手机号码"
                />
            </div>
            <div className="address input">
                <label>收货地址</label>
                <input
                    type="text"
                    value={address.address}
                    onChange={(e) =>
                        setAddress({ ...address, address: e.target.value })
                    }
                    placeholder="请输入收货地址"
                />
            </div>
            <div className="default">
                <label>设为默认地址</label>
                <Switch
                    value={address.default}
                    onChange={(checked: boolean) =>
                        setAddress({ ...address, default: checked })
                    }
                    style={{
                        backgroundColor: address.default ? '#73D13D' : '',
                    }}
                />
            </div>
            <BottomBtn title="保存" onClick={saveAddress} />
        </div>
    )
}

export default NewAddress
