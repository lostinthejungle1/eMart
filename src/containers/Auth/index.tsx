import './style.css'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Toast } from 'antd-mobile'

function Auth() {
    const navigate = useNavigate()
    const [tab, setTab] = useState('login')
    useEffect(() => {
        //verify token, if verified, navigate to home page
        const token = localStorage.getItem('token')
        axios
            .post(process.env.REACT_APP_API_URL! + '/verify-token', { token })
            .then((res) => {
                if (res.status === 200) {
                    navigate('/home')
                }
            })
            .catch((err) => {
                console.log(err)
                Toast.show({
                    icon: 'fail',
                    content: '登录信息过期，请重新登录',
                })
                localStorage.removeItem('token')
            })
    }, [navigate])

    return (
        <div className="page auth-page">
            <div className="tab">
                <div
                    className={`tab-item tab-item-left ${tab === 'login' ? 'active' : ''}`}
                    onClick={() => {
                        navigate('/auth/login')
                        setTab('login')
                    }}
                >
                    登录
                </div>
                <div
                    className={`tab-item tab-item-right ${tab === 'register' ? 'active' : ''}`}
                    onClick={() => {
                        navigate('/auth/register')
                        setTab('register')
                    }}
                >
                    注册
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Auth
