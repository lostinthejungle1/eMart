import './style.css'
import { IoIosSearch } from 'react-icons/io'
import { IoLocationOutline } from 'react-icons/io5'
import { Carousel } from 'antd'
import Bannerimage1 from '../../images/home_banner_1.png'
import Bannerimage2 from '../../images/home_banner_2.jpg'
import { useEffect, useState } from 'react'
import Category from './category'
import NewProducts from './newProducts'
import axios from 'axios'
import { getToken } from '../../utils'
import { Toast } from 'antd-mobile'
import NavigationBar from '../../components/NavigationBar'
// type products = Array<{
//     product_id: number
//     thumbnail_url: string
//     price: string
//     title: string
// }>

function Home() {
    const [location, setLocation] = useState({
        latitude: null as number | null,
        longitude: null as number | null,
    })

    const [products, setProducts] = useState([])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Got current position:', position)
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
                localStorage.setItem('location', JSON.stringify(location))
            },
            (error) => {
                console.error('Error getting current position:', error)
            }
        )
    }, [])

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL! + '/products/new-products', {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            })
            .then((response) => {
                console.log(response)
                setProducts(response.data)
            })
            .catch((error) => {
                console.error('Error fetching products:', error)
                Toast.show({
                    icon: 'fail',
                    content: '获取新品尝鲜列表失败',
                })
            })
    }, [])

    return (
        <div className="page home-page ">
            <div className="banner">
                <h3 className="location">
                    <IoLocationOutline className="location-icon" />
                    <span>{`${location.latitude},${location.longitude}`}</span>
                </h3>
                <div className="search">
                    <IoIosSearch className="search-icon" />
                    <span>请输入你需要搜索的内容</span>
                </div>

                <Carousel className="banner-carousel" autoplay>
                    <div className="image-box">
                        <img
                            className="banner-image"
                            src={Bannerimage1}
                            alt="banner"
                        />
                        <span className="image-figure">1/2</span>
                    </div>
                    <div className="image-box">
                        <img
                            className="banner-image"
                            src={Bannerimage2}
                            alt="banner"
                        />
                        <span className="image-figure">2/2</span>
                    </div>
                </Carousel>
            </div>
            <Category />
            <NewProducts products={products} />
            <NewProducts products={products} />
            <NewProducts products={products} />
            <NavigationBar current="home" className="nav-bar" />
        </div>
    )
}

export default Home
