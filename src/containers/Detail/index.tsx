import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import { getToken } from '../../utils'
import { IoIosArrowBack } from 'react-icons/io'
import AddCart from './AddCart'
import Popover from '../../components/Popover'
type Product = {
    id: number | null
    price: number
    sales_count: number
    title: string
    brief: string
    description: string
    specifications: string
    category: string
    thumbnail_url: string
}

function Detail() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [showPopover, setShowPopover] = useState(false)
    const [product, setProduct] = useState<Product>({
        id: null,
        price: 0,
        sales_count: 0,
        title: '',
        brief: '',
        description: '',
        specifications: '',
        category: '',
        thumbnail_url: '',
    })
    const [cartNumber, setCartNumber] = useState(0)

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL! + '/products/' + id, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((res) => {
                setProduct(res.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [id])

    return (
        <div className="detail-page">
            <IoIosArrowBack
                className="back-btn"
                onClick={() => {
                    navigate(-1)
                }}
            />
            <h2>商品详情</h2>
            <img
                src={
                    'https://mbg.com.my/cdn/shop/files/USA-Strawberry-250G-Berries_1024x1024.jpg?v=1714413327'
                }
                alt={product.title}
                className="thumbnail"
            />
            <div className="price-and-sale">
                <span className="price">
                    <span style={{ fontSize: '.2rem' }}>￥</span>
                    {product.price}
                </span>
                <span className="sales-count">已售{product.sales_count}</span>
            </div>
            <div className="title-and-brief">
                <h3 className="title">{product.title}</h3>
                <p className="brief">
                    {product.brief ||
                        '鱼鲜敲，清脆,爽口，附着的白毛为这个季节飘扬在田间的柳絮杨絮'}
                </p>
            </div>
            <div className="specification">
                <h3>规格信息</h3>
                <div className="specification-item">
                    <div className="specification-title">产地规格</div>
                    <div className="specification-content">
                        {product.specifications}
                    </div>
                </div>
            </div>
            <div className="description">
                <h3>商品详情</h3>
                <p className="description-content">{product.description}</p>
            </div>
            <AddCart
                cartNumber={0}
                addToCart={() => {
                    setShowPopover(true)
                }}
            />
            <Popover
                show={showPopover}
                blankClickCallback={() => {
                    setShowPopover(false)
                }}
            >
                <div className="pop-content">
                    <div className="brief-block">
                        <img
                            src={
                                'https://mbg.com.my/cdn/shop/files/USA-Strawberry-250G-Berries_1024x1024.jpg?v=1714413327'
                            }
                            alt={product.title}
                            className="pop-thumbnail"
                        />
                        <h3 className="pop-title">{product.title}</h3>
                        <span className="pop-price">
                            <span style={{ fontSize: '.14rem' }}>￥</span>
                            {product.price}
                        </span>
                    </div>
                    <div className="number-row">
                        <span>购买数量</span>
                        <div className="number-input">
                            <span
                                onClick={() => {
                                    if (cartNumber > 0) {
                                        setCartNumber((prev) => prev - 1)
                                    }
                                }}
                            >
                                -
                            </span>
                            <span>{cartNumber}</span>
                            <span
                                onClick={() =>
                                    setCartNumber((prev) => prev + 1)
                                }
                            >
                                +
                            </span>
                        </div>
                    </div>
                    <button className="add-btn">加入购物车</button>
                </div>
            </Popover>
        </div>
    )
}

export default Detail
