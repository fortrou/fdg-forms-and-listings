export default function DefaultComponent({ field, data }) {
    return (
        <div className={`${field.key}-proto`}>
            {data}
        </div>
    )
}