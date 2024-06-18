import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { Toast } from 'antd-mobile'

function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const handleLoginSubmit = () => {
        //validate fields and show messages to users if not satisfied
        if (username.length < 5) {
            setUsernameError('用户名长度不能小于5个字符')
            return
        } else {
            setUsernameError('')
        }

        if (password.length < 10 && password !== 'admin') {
            setPasswordError('密码长度不能小于10个字符')
            return
        } else {
            setPasswordError('')
        }

        //if all fields are satisfied, send request to backend
        axios
            .post(process.env.REACT_APP_API_URL! + '/login', {
                username,
                password,
            })
            .then((res) => {
                console.log(res)
                if (res.status === 200) {
                    Toast.show({
                        icon: 'success',
                        content: '登录成功',
                    })
                    //set token to localstorage
                    localStorage.setItem('token', res.data.token)
                    setTimeout(() => {
                        navigate('/home')
                    }, 2000)
                }
            })
            .catch((err) => {
                console.log(err)
                Toast.show({
                    icon: 'fail',
                    content: err.response.data.message,
                })
            })
    }

    return (
        <div>
            <div className="form">
                <div className="form-item">
                    <div className="form-item-title">用户名</div>
                    <input
                        className="form-item-content"
                        type="text"
                        placeholder="请输入用户名"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    {usernameError && (
                        <div className="form-item-error">{usernameError}</div>
                    )}
                </div>
                <div className="form-item">
                    <div className="form-item-title">密码</div>
                    <input
                        className="form-item-content"
                        type="password"
                        placeholder="请输入密码"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordError && (
                        <div className="form-item-error">{passwordError}</div>
                    )}
                </div>
            </div>
            <div className="submit" onClick={handleLoginSubmit}>
                登录
            </div>
            <div className="notice">*登录即表示您赞同使用条款及隐私政策</div>
        </div>
    )
}

export default Login
