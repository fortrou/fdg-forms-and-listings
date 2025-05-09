import {DefaultIcons} from "./iconsComponent";
import {useRef, useState} from "@wordpress/element";
import {useFieldsContext} from "../useFieldContext";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export default function SimpleFIlterComponent({field})
{
    const {
        filters,
        setFilter,
        removeFilter
    } = useFieldsContext();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id: field.field});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const [localLabel, setLocalLabel] = useState(field.label ?? '');
    const timeoutRef = useRef(null);

    const {
        updateOption,
    } = useFieldsContext();

    const handleKeyUp = (e) => {
        const newValue = e.target.value;
        setLocalLabel(newValue);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setFilter(`shared.enabledFilters.${field.field}.label`, newValue);
        }, 700);
    };

    const [expanded, setExpanded] = useState(false);
    return (
        <div ref={setNodeRef} {...attributes} style={style} className="filter-item-wrap">
            <div className="filter-item">
                <div className="filter-top-line">
                    <div className="filter-title" {...listeners}>Field: {field.label}</div>
                    <div className="draggable-item-settings-wrapper">
                        <div className="filter-edit draggable-item-settings trash-icon"
                             onClick={() => removeField(field.key, section)}
                        >
                            <img src={DefaultIcons.trashIcon} alt=""/>
                        </div>

                        <div
                            className="filter-edit"
                            onClick={() => setExpanded(prev => !prev)}
                        >
                            <img src={DefaultIcons.settings} alt=""/>
                        </div>
                    </div>
                </div>
                {expanded && (
                    <div className="filter-details">
                        <div className="detail-line">
                            <div className="container">
                                field: {field.field}
                            </div>
                        </div>
                        <div className="detail-line">
                            <div className="title">Type:</div>
                            <div className="container">
                                <select value={field.type}
                                        onChange={(e) => setFilter(`shared.enabledFilters.${field.field}.type`, e.target.value)}>
                                    <option value="search">Search</option>
                                    <option value="list">List</option>
                                    <option value="multiple">Multiple</option>
                                    <option value="dropdown">Dropdown</option>
                                    <option value="range">Range</option>
                                </select>
                            </div>
                        </div>
                        <div className="detail-line">
                            <div className="title">Label:</div>
                            <div className="container">
                                <input type="text" value={localLabel ?? ''}
                                       onChange={(e) => setLocalLabel(e.target.value)}
                                       onKeyUp={handleKeyUp}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}