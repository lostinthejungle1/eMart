import beauty_products from '../../images/food_category/beauty_products.png'
import dairy_bakery from '../../images/food_category/dairy_bakery.png'
import family_utilities from '../../images/food_category/family_utilities.png'
import fresh_veggies from '../../images/food_category/fresh_veggies.png'
import meat_products from '../../images/food_category/meat_products.png'
import oil_instant_food from '../../images/food_category/oil_instant_food.png'
import seasonal_fruits from '../../images/food_category/seasonal_fruits.png'
import snacks from '../../images/food_category/snacks.png'
function Category() {
    const categories = [
        {
            name: '新鲜蔬菜',
            image: fresh_veggies,
        },
        {
            name: '时令水果',
            image: seasonal_fruits,
        },
        {
            name: '鲜肉蛋禽',
            image: meat_products,
        },
        {
            name: '乳品烘焙',
            image: dairy_bakery,
        },
        {
            name: '粮油速食',
            image: oil_instant_food,
        },
        {
            name: '家居百货',
            image: family_utilities,
        },
        {
            name: '个护美妆',
            image: beauty_products,
        },
        {
            name: '休闲零食',
            image: snacks,
        },
    ]

    return (
        <div className="categories">
            {categories.map((category, index) => (
                <div key={index} className="category-box">
                    <img
                        className="category-image"
                        src={category.image}
                        alt={category.name}
                    />
                    <div className="category-name">{category.name}</div>
                </div>
            ))}
        </div>
    )
}

export default Category
