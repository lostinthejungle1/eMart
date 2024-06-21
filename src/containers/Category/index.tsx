import Header from '../../components/Header'
import NavigationBar from '../../components/NavigationBar'
import './style.css'
function Category() {
    return (
        <div className="category-page">
            <Header title="分类" />
            <NavigationBar current="category" className="nav-bar" />
        </div>
    )
}

export default Category
