import './style/base.css'
import './style/border.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Guide from './containers/Guide'
import Login from './containers/Auth/login'
import Register from './containers/Auth/register'
import Auth from './containers/Auth'
import Home from './containers/Home'
import Category from './containers/Category'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './containers/Cart'
import Mine from './containers/Mine'
import Detail from './containers/Detail'
import Setting from './containers/Setting'
import AllOrder from './containers/MyOrder'
import MyOrder from './containers/MyOrder'
import Address from './containers/Address'
import NewAddress from './containers/NewAddress'
import Voucher from './containers/Voucher'
import MakeOrder from './containers/MakeOrder'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Guide />,
        errorElement: <div>404 Not found</div>,
    },
    {
        path: '/auth',
        element: <Auth />,
        children: [
            {
                path: '/auth/login',
                element: <Login />,
            },
            {
                path: '/auth/register',
                element: <Register />,
            },
        ],
    },
    {
        path: '/home',
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: '/category',
        element: (
            <ProtectedRoute>
                <Category />
            </ProtectedRoute>
        ),
    },
    {
        path: '/cart',
        element: (
            <ProtectedRoute>
                <Cart />
            </ProtectedRoute>
        ),
    },
    {
        path: '/mine',
        element: (
            <ProtectedRoute>
                <Mine />
            </ProtectedRoute>
        ),
    },
    {
        path: '/detail/:id',
        element: (
            <ProtectedRoute>
                <Detail />
            </ProtectedRoute>
        ),
    },
    {
        path: '/setting',
        element: (
            <ProtectedRoute>
                <Setting />
            </ProtectedRoute>
        ),
    },
    {
        path: '/my-order/:status',
        element: (
            <ProtectedRoute>
                <MyOrder />
            </ProtectedRoute>
        ),
    },
    {
        path: '/address',
        element: (
            <ProtectedRoute>
                <Address />
            </ProtectedRoute>
        ),
    },
    {
        path: '/new-address/:status',
        element: (
            <ProtectedRoute>
                <NewAddress />
            </ProtectedRoute>
        ),
    },
    {
        path: '/voucher',
        element: (
            <ProtectedRoute>
                <Voucher />
            </ProtectedRoute>
        ),
    },
    {
        path: '/make-order',
        element: (
            <ProtectedRoute>
                <MakeOrder />
            </ProtectedRoute>
        ),
    },
])
function App() {
    return (
        <div className="app">
            <RouterProvider router={router} />
        </div>
    )
}

export default App
