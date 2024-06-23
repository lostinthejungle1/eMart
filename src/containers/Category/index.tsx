import Header from '../../components/Header'
import NavigationBar from '../../components/NavigationBar'
import { IoSearchOutline } from 'react-icons/io5'
import './style.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../../utils'
import { Toast } from 'antd-mobile'
import Product from './Product'
import { useNavigate } from 'react-router-dom'
import Popover from '../../components/Popover'
import { set } from 'lodash'
type category = {
    name: string
    display_name: string
}
type product = {
    id: number
    price: number
    sales_count: number
    title: string
    description: string
    specifications: string
    category: string
    thumbnail_url: string
}

function Category() {
    const [products, setProducts] = useState<Array<product>>([])
    const [productsFilteredByPrice, setproductsFilteredByPrice] = useState<
        Array<product>
    >([])
    const [category, setCategory] = useState<Array<category>>([])
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [selectedPrice, setSelectedPrice] = useState('')
    const [selectedProduct, setSelectedProduct] = useState<product | null>(null)
    const [cartNumber, setCartNumber] = useState(0)
    const navigate = useNavigate()
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL + '/categories', {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            })
            .then((res) => {
                setCategory(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    useEffect(() => {
        axios
            .get(
                process.env.REACT_APP_API_URL +
                    '/products/category/' +
                    selectedCategory,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            )
            .then((res) => {
                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [selectedCategory])
    const openProductDetail = (id: number) => {
        navigate('/detail/' + id)
    }
    const handlePurchase = (product: product) => {
        setSelectedProduct(product)
    }

    const addToCart = (id: number, count: number) => {
        axios
            .post(
                process.env.REACT_APP_API_URL + '/cart-add',
                {
                    product_id: id,
                    count: count,
                },
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            )
            .then((res) => {
                Toast.show({
                    icon: 'success',
                    content: '添加购物车成功',
                })
                setSelectedProduct(null)
                setCartNumber(0)
                navigate('/cart')
            })
            .catch((err) => {
                console.log(err)
                Toast.show({
                    icon: 'fail',
                    content: '添加购物车失败',
                })
            })
    }

    const makeOrder = (id: number, count: number) => {
        console.log('make order')
    }

    return (
        <div className="category-page">
            <Header title="分类" />
            <div className="search-container">
                <IoSearchOutline className="search-icon" />
                <input
                    className="search-bar"
                    type="text"
                    placeholder="搜索商品名称"
                />
            </div>
            <div className="category-container">
                <div className="category-filter">
                    {category.map((item, index) => (
                        <div
                            key={index}
                            className={
                                selectedCategory === item.name
                                    ? 'category-item selectedCategory'
                                    : 'category-item'
                            }
                            onClick={() => setSelectedCategory(item.name)}
                        >
                            {item.display_name}
                        </div>
                    ))}
                </div>
                <div className="pirce-filter-and-product-list">
                    <div className="price-filter">
                        <div className="price-filter-item selectedPrice">
                            全部
                        </div>
                        <div className="price-filter-item">0-19元</div>
                        <div className="price-filter-item">19-29元</div>
                        <div className="price-filter-item">30-49元</div>
                        <div className="price-filter-item">50元+</div>
                    </div>

                    <div className="product-list">
                        {products.map((product) => (
                            <Product
                                key={product.id}
                                product={product}
                                openProductDetail={openProductDetail}
                                handlePurchase={handlePurchase}
                            />
                        ))}
                    </div>
                </div>
                <Popover
                    show={selectedProduct !== null}
                    blankClickCallback={() => {
                        setSelectedProduct(null)
                    }}
                >
                    <div className="pop-content">
                        <div className="brief-block">
                            <img
                                src={
                                    'https://mbg.com.my/cdn/shop/files/USA-Strawberry-250G-Berries_1024x1024.jpg?v=1714413327'
                                }
                                alt={selectedProduct?.title}
                                className="pop-thumbnail"
                            />
                            <h3 className="pop-title">
                                {selectedProduct?.title}
                            </h3>
                            <span className="pop-price">
                                <span style={{ fontSize: '.14rem' }}>￥</span>
                                {selectedProduct?.price}
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
                        <div className="btns">
                            <button
                                className="add-btn"
                                onClick={() =>
                                    addToCart(selectedProduct?.id!, cartNumber)
                                }
                            >
                                加入购物车
                            </button>
                            <button
                                className="purchase-btn"
                                onClick={() =>
                                    makeOrder(selectedProduct?.id!, cartNumber)
                                }
                            >
                                立即购买
                            </button>
                        </div>
                    </div>
                </Popover>
            </div>
            <NavigationBar current="category" className="nav-bar" />
        </div>
    )
}

export default Category
