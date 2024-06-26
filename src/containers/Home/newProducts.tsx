import Product from './product'
import { IoMdFlame } from 'react-icons/io'
import { FaCircleChevronRight } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

type products = Array<{
    product_id: number
    thumbnail_url: string
    price: string
    title: string
}>
function NewProducts({ products }: { products: products }) {
    const navifgate = useNavigate()

    const handleClickProduct = (id: number) => {
        navifgate(`/detail/${id}`)
    }

    return (
        <div className="new-products">
            <h3 className="new-products-title">
                <IoMdFlame className="new-products-title-logo" />
                新品尝鲜
            </h3>
            <span className="new-products-more">
                更多 <FaCircleChevronRight className="new-products-more-logo" />
            </span>

            <div className="products">
                {products.map((product, index) => (
                    <Product
                        key={product.product_id}
                        thumbnail_url={product.thumbnail_url}
                        price={product.price}
                        title={product.title}
                        onClick={() => handleClickProduct(product.product_id)}
                        onAddToCart={() => {
                            console.log('Add to cart:', product.title)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default NewProducts
