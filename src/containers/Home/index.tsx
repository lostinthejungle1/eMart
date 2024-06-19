import './style.css'
import { IoIosSearch } from 'react-icons/io'
import { IoLocationOutline } from 'react-icons/io5'
import { Carousel } from 'antd'
import Bannerimage1 from '../../images/home_banner_1.png'
import Bannerimage2 from '../../images/home_banner_2.jpg'
function Home() {
    return (
        <div className="page home-page ">
            <div className="banner">
                <h3 className="location">
                    <IoLocationOutline className="location-icon" />
                    <span>优果购（昌平店）</span>
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
        </div>
    )
}

export default Home
