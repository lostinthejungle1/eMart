import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import NavigationBar from '../../components/NavigationBar'
import './style.css'
import Checkout from './Checkout'
import axios from 'axios'
import { getToken } from '../../utils'
import Product from './Product'
import { debounce } from 'lodash'

type product = {
    id: number
    thumbnail_url: string
    specifications: string
    price: number
    title: string
    count: number
    selected: boolean
}

function Cart() {
    const [cart, setCart] = useState<Array<product>>([])
    const [isCartInitialized, setIsCartInitialized] = useState(false)
    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL! + '/cart', {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((res) => {
                setCart(res.data)
                setIsCartInitialized(true)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    const updateCart = debounce((cart: Array<product>) => {
        axios
            .put(
                process.env.REACT_APP_API_URL! + '/cart',
                { products: cart },
                { headers: { Authorization: `Bearer ${getToken()}` } }
            )
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.error(err)
            })
    }, 1000) // Delay of 1 second

    useEffect(() => {
        if (isCartInitialized) {
            updateCart(cart)
        }
    }, [cart, isCartInitialized])

    const [selectAll, setSelectAll] = useState(false)

    const selectAllHandler = () => {
        setSelectAll(!selectAll)
        setCart(
            cart.map((item) => {
                item.selected = !selectAll
                return item
            })
        )
    }

    const getTotalPrice = () => {
        return cart
            .filter((item) => item.selected)
            .reduce((acc, item) => acc + item.price * item.count, 0)
    }

    const getTotalCount = () => {
        //each item in cart has a count property, sum them up
        return cart.reduce((acc, item) => acc + item.count, 0)
    }

    const addCountHandler = (id: number) => {
        setCart(
            cart.map((item) => {
                if (item.id === id) {
                    item.count++
                }
                return item
            })
        )
    }

    const minusCountHandler = (id: number) => {
        setCart(
            cart.map((item) => {
                if (item.id === id) {
                    item.count--
                }
                return item
            })
        )
    }

    const handleCheckBoxHandler = (id: number) => {
        setCart(
            cart.map((item) => {
                if (item.id === id) {
                    item.selected = !item.selected
                }
                return item
            })
        )
    }

    return (
        <div className="cart-page">
            <Header title="购物车" />
            {cart.map((item) => (
                <Product
                    key={item.id}
                    product_id={item.id}
                    thumbnail_url={item.thumbnail_url}
                    specifications={item.specifications}
                    price={item.price}
                    title={item.title}
                    count={item.count}
                    selected={item.selected}
                    addCountHandler={addCountHandler}
                    minusCountHandler={minusCountHandler}
                    handleCheckBoxHandler={handleCheckBoxHandler}
                />
            ))}
            <Checkout
                totalCount={1}
                totalPrice={2}
                selectAllHandler={selectAllHandler}
                checkoutHandler={() => {}}
                getTotalPrice={getTotalPrice}
                getTotalCount={getTotalCount}
                selectAll={selectAll}
            />
            <NavigationBar current="cart" className="nav-bar" />
        </div>
    )
}

export default Cart
