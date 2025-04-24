import ImageComponent from './imageComponent';
import DefaultComponent from './defaultComponent'
export const DetectComponent = {
    thumbnail: ({ data }) => (
        <ImageComponent data={data} />
    )
}
export default function DynamicCompontent({ field, data }) {
    const Component = DetectComponent[field.key];
    return Component ? <Component data={data} /> : <DefaultComponent data={data} />
}