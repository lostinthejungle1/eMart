import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import './style.css'

function ReturnBtn({ path }: { path: string }) {
    const navigate = useNavigate()
    return (
        <>
            <IoIosArrowBack
                className="back-btn"
                onClick={() => {
                    navigate(path)
                }}
            />
        </>
    )
}

export default ReturnBtn
