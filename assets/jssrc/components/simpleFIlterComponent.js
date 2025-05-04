import {DefaultIcons} from "./iconsComponent";
import {useState} from "@wordpress/element";
import {useFieldsContext} from "../useFieldContext";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

export default function SimpleFIlterComponent({field})
{
    const {
        filters,
        setFilter,
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


    const [expanded, setExpanded] = useState(false);
    return (
        <div ref={setNodeRef} {...attributes} style={style}>
            <div className="filter-item">
                <div className="filter-top-line">
                    <div className="filter-title" {...listeners}>Field: {field.field}</div>
                    <div
                        className="filter-edit"
                        onClick={() => setExpanded(prev => !prev)}
                    >
                        <img src={DefaultIcons.settings} alt=""/>
                    </div>
                </div>
                {expanded && (
                    <div className="filter-details">
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
                    </div>
                )}
            </div>
        </div>
    )
}