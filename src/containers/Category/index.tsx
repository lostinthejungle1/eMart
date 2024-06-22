import Header from '../../components/Header'
import NavigationBar from '../../components/NavigationBar'
import { IoSearchOutline } from 'react-icons/io5'
import './style.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getToken } from '../../utils'
import { Toast } from 'antd-mobile'
import Product from './Product'
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
                                product_id={product.id}
                                thumbnail_url={product.thumbnail_url}
                                sales_count={product.sales_count}
                                price={product.price}
                                title={product.title}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <NavigationBar current="category" className="nav-bar" />
        </div>
    )
}

export default Category
