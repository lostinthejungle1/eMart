import './style.css'
function Header({ title, className }: { title: string; className?: string }) {
    return (
        <div className={`header ${className}`}>
            <h2>{title}</h2>
        </div>
    )
}

export default Header
