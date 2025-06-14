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
import {
    PaddingComponent,
    MarginComponent,
    HeightComponent,
    WidthComponent,
    FontSizeComponent,
    FontWeightComponent,
    SimpleTextComponent, ColorSelectorComponent
} from "./optionsComponent";
import ImageComponent from "./imageComponent";
import {useFieldsContext} from "../useFieldContext";


const DraggableItem = ({ id, field, index, path, section }) => {
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
        removeField,
        frame
    } = useFieldsContext()

    const [expanded, setExpanded] = useState(false);

    const DetectComponent = {
        padding: PaddingComponent,
        margin: MarginComponent,
        height: HeightComponent,
        width: WidthComponent,
        fontSize: FontSizeComponent,
        fontWeight: FontWeightComponent,
        borderRadius: SimpleTextComponent,
        background: ColorSelectorComponent,
        textColor: ColorSelectorComponent,
    };

    const scrapeOptions = (field, frame) => {
        return Object.keys(field.options).map((key) => {
            const Component = DetectComponent[key];
            return Component ? (
                <Component
                    key={key}
                    path={path + `.options.${key}`}
                    section={section}
                    field={field}
                    values={field.options[key].responsive ? field.options[key].values[frame] : field.options[key].value}
                    label={field.options[key]?.label}
                    measure={field.options[key].measure ? field.options[key].measure : ''}
                    responsive={field.options[key].responsive}
                />
            ) : null;
        });
    };



    const DetectProperty = {
        text: SimpleTextComponent,
    };

    const scrapeProperties = (field) => {
        return Object.keys(field.properties).map((key) => {
            const fieldData = field.properties[key];
            const Component = DetectProperty[fieldData.type];
            return Component ? (
                <Component
                    key={key}
                    path={path + `.properties.${key}.content`}
                    field={fieldData}
                    values={fieldData.content}
                    label={fieldData.label}
                    responsive={false}
                />
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
                    {field.options ? scrapeOptions(field, frame) : null}

                    {field.properties ? scrapeProperties(field) : null}
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
                    <DraggableItem key={field.key} id={field.key} section={sectionId} field={field} path={`${sectionId}[${index}]`}/>
                ))}
            </div>
    );
}