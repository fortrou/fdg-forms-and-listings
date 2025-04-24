export default function TabSwitcher({value, label, active, onClick}) {
    return (
        <div className="switcher-wrapper">
            <label>{label}</label>
            <div
                onClick={() => onClick(value)}
                className={`switcher-holder ${active ? 'active' : ''}`}
            >

            </div>
        </div>
    );
}