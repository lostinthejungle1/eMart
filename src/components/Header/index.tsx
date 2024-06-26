import './style.css'
function Header({
    title,
    className,
    style,
}: {
    title: string
    className?: string
    style?: React.CSSProperties
}) {
    return (
        <div className={`header ${className}`} style={style}>
            <h2>{title}</h2>
        </div>
    )
}

export default Header
