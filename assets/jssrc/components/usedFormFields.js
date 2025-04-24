import {useState} from "@wordpress/element";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor
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
import PaddingComponent from "./optionsComponent";
import ImageComponent from "./imageComponent";


const DraggableItem = ({ id, field, updateOption }) => {
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

    const [expanded, setExpanded] = useState(false);

    const DetectComponent = {
        padding: ({ field, data }) => (
            <PaddingComponent field={field} values={data} updateOption={updateOption} />
        )
    };

    const scrapeOptions = (field) => {
        return Object.keys(field.options).map((key) => {
            const Component = DetectComponent[key];
            return Component ? (
                <Component key={key} field={field.key} data={field.options[key]} />
            ) : null;
        });
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="field-item"
        >
            <div className="draggable-zone">
                <strong>{field.name}</strong>
            </div>

            <div
                className="draggable-item-settings"
                onClick={() => setExpanded(prev => !prev)}
                onMouseDown={(e) => e.stopPropagation()} // 👈 предотвращает drag с кнопки
            >
                <img src={DefaultIcons.settings} alt="" />
            </div>

            {expanded && (
                <div className="field-details">
                    {field.options ? scrapeOptions(field) : null}
                </div>
            )}
        </div>
    );
};


export default function UsedFormFields({fields, setFields, updateOption}) {
    const sensors = useSensors(
        useSensor(PointerSensor)
    );

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={({active, over}) => {
                if (active.id !== over?.id) {
                    const oldIndex = fields.findIndex(f => f.key === active.id);
                    const newIndex = fields.findIndex(f => f.key === over.id);
                    setFields(items =>
                        arrayMove(items, oldIndex, newIndex)
                    );
                }
            }}
        >
            <SortableContext
                items={fields.map(field => field.key)}
                strategy={verticalListSortingStrategy}
            >
                <div className="draggable-fields">
                    {fields.map(field => (
                        <DraggableItem id={field.key} field={field} updateOption={updateOption}/>
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}