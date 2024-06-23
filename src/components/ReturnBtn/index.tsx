import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import './style.css'

function ReturnBtn() {
    const navigate = useNavigate()
    return (
        <>
            <IoIosArrowBack
                className="back-btn"
                onClick={() => {
                    navigate(-1)
                }}
            />
        </>
    )
}

export default ReturnBtn
