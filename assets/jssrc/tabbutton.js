export default function TabButton({ value, label, active, onClick }) {
    return (
        <button
            onClick={() => onClick(value)}
            className={`tab-btn ${active ? 'active' : ''}`}
        >
            {label}
        </button>
    );
};