import ImageComponent from './imageComponent';
import DefaultComponent from './defaultComponent'
export const DetectComponent = {
    thumbnail: ({ field, data }) => (
        <ImageComponent field={field} data={data} />
    )
}
export default function DynamicCompontent({ field, data }) {
    const Component = DetectComponent[field.key];
    return Component ? <Component field={field} data={data} /> : <DefaultComponent field={field} data={data} />
}