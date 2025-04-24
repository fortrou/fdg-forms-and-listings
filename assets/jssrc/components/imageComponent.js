export default function ImageComponent({field, data}) {
    return (
        <div className={`image-wrapper ${field.key}-proto`}>
            <img src={data.url} alt={data.alt ? data.alt : ''} />
        </div>
    );
}