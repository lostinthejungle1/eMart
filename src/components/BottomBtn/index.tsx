import './style.css'
function BottomBtn({
    title,
    onClick,
    style,
}: {
    title: string
    onClick: () => void
    style?: React.CSSProperties
}) {
    return (
        <div className="btn-container" style={style}>
            <button className="add-address-btn" onClick={onClick}>
                {title}
            </button>
        </div>
    )
}

export default BottomBtn
