import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { Toast } from 'antd-mobile'

function Register() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const handleRegisterSubmit = () => {
        // console.log('注册')
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

        if (confirmPassword !== password) {
            setConfirmPasswordError('两次输入的密码不一致')
            return
        } else {
            setConfirmPasswordError('')
        }

        //if all fields are satisfied, send request to backend
        axios
            .post(process.env.REACT_APP_API_URL! + '/register', {
                username,
                password,
            })
            .then((res) => {
                if (res.status === 201) {
                    console.log('注册成功')
                    Toast.show({
                        icon: 'success',
                        content: '注册成功',
                    })
                    setTimeout(() => {
                        navigate('/login')
                    }, 2000)
                }
            })
            .catch((err) => {
                // console.log(err)
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
                <div className="form-item">
                    <div className="form-item-title">确认密码</div>
                    <input
                        className="form-item-content"
                        type="password"
                        placeholder="请再次输入密码"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPasswordError && (
                        <div className="form-item-error">
                            {confirmPasswordError}
                        </div>
                    )}
                </div>
            </div>
            <div className="submit" onClick={handleRegisterSubmit}>
                注册
            </div>
        </div>
    )
}

export default Register
