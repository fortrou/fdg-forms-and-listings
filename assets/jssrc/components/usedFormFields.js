import {useState} from "@wordpress/element";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
    useDroppable
} from '@dnd-kit/core';

import {
    SortableContext,
    arrayMove,
    useSortable,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';

import {CSS} from '@dnd-kit/utilities';

import { DefaultIcons } from './iconsComponent';
import {PaddingComponent, MarginComponent, HeightComponent, WidthComponent, FontSizeComponent, FontWeightComponent} from "./optionsComponent";
import ImageComponent from "./imageComponent";
import {useFieldsContext} from "../useFieldContext";


const DraggableItem = ({ id, field, index, section }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab'
    };

    const {
        removeField
    } = useFieldsContext()

    const [expanded, setExpanded] = useState(false);

    const DetectComponent = {
        padding: ({ field, data }) => (
            <PaddingComponent index={index} field={field} values={data} section={section} />
        ),
        margin: ({ field, data }) => (
            <MarginComponent index={index} field={field} values={data} section={section} />
        ),
        height: ({ field, data }) => (
            <HeightComponent index={index} field={field} values={data} section={section} />
        ),
        width: ({ field, data }) => (
            <WidthComponent index={index} field={field} values={data} section={section} />
        ),
        fontSize: ({ field, data }) => (
            <FontSizeComponent index={index} field={field} values={data} section={section} />
        ),
        fontWeight: ({ field, data }) => (
            <FontWeightComponent index={index} field={field} values={data} section={section} />
        ),
    };

    const scrapeOptions = (index, field) => {
        return Object.keys(field.options).map((key) => {
            const Component = DetectComponent[key];
            return Component ? (
                <Component key={key} index={index} field={field.key} data={field.options[key]} />
            ) : null;
        });
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="field-item"
        >
            <div {...listeners} className="draggable-zone">
                <strong>{field.name}</strong>
            </div>

            <div className="draggable-item-settings-wrapper">
                <div className="draggable-item-settings trash-icon"
                    onClick={() => removeField(field.key, section)}
                >
                    <img src={DefaultIcons.trashIcon} alt=""/>
                </div>

                <div
                    className="draggable-item-settings"
                    onClick={() => setExpanded(prev => !prev)}
                >
                    <img src={DefaultIcons.settings} alt="" />
                </div>
            </div>

            {expanded && (
                <div className="field-details">
                    {field.options ? scrapeOptions(index, field) : null}
                </div>
            )}
        </div>
    );
};

export default function UsedFormFields({fields, updateOption, sectionId}) {
    const sensors = useSensors(
        useSensor(PointerSensor)
    );
    const { setNodeRef } = useDroppable({
        id: sectionId
    });

    return (
            <div ref={setNodeRef} className="draggable-fields">
                {fields.map((field, index) => (
                    <DraggableItem key={field.key} index={index} id={field.key} field={field} section={sectionId} />
                ))}
            </div>
    );
}