import './style.css'
function CheckBox({
    selected,
    onClick,
}: {
    selected: boolean
    onClick: () => void
}) {
    return (
        <div
            className={`check-box ${selected ? 'active' : ''}`}
            onClick={onClick}
        >
            <div className="circle"></div>
        </div>
    )
}

export default CheckBox
