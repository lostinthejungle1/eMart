import './style.css'
function Header({ title }: { title: string }) {
    return (
        <div className="header">
            <h2>{title}</h2>
        </div>
    )
}

export default Header
