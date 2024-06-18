import './style/base.css'
import './style/border.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Guide from './containers/Guide'
import Login from './containers/Auth/login'
import Register from './containers/Auth/register'
import Auth from './containers/Auth'
import Home from './containers/Home'
import ProtectedRoute from './components/ProtectedRoute'

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
])
function App() {
    return (
        <div className="app">
            <RouterProvider router={router} />
        </div>
    )
}

export default App
