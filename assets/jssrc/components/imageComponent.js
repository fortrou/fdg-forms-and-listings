export default function ImageComponent({data}) {
    return (
        <div className="image-wrapper">
            <img src={data.url} alt={data.alt ? data.alt : ''} />
        </div>
    );
}