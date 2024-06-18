import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Toast } from 'antd-mobile'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [isVerified, setIsVerified] = useState(false)
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) {
            Toast.show({
                icon: 'fail',
                content: '登录信息过期，请重新登录',
            })
            navigate('/auth/login')
        } else {
            axios
                .post(process.env.REACT_APP_API_URL! + '/verify-token', {
                    token,
                })
                .then((res) => {
                    if (res.status === 200) {
                        setIsVerified(true)
                    } else {
                        throw new Error('Token verification failed')
                    }
                })
                .catch((err) => {
                    console.log(err)
                    Toast.show({
                        icon: 'fail',
                        content: '登录信息过期，请重新登录',
                    })
                    localStorage.removeItem('token')
                    navigate('/auth/login')
                })
        }
    }, [navigate, token])

    if (!isVerified) {
        return null
    }

    return <>{children}</>
}

export default ProtectedRoute
