import {useFieldsContext} from "../../useFieldContext";
import DynamicComponent from "../../components/dynamicCompontent";
import TabSwitcher from "../../switcher";
import {filters} from "../../exportableconstants";
import {useState} from "@wordpress/element";
import SimpleFIlterComponent from "../../components/simpleFIlterComponent";
import PreviewIframeComponent from "../../components/previewIframeComponent";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors
} from '@dnd-kit/core';
import {SortableContext, arrayMove, verticalListSortingStrategy} from '@dnd-kit/sortable';

export default function FiltersTab({usedTab}) {
    const {
        availableFields,
        setAvailableFields,
        styles,
        filters,
        availableFilterFields,
        setStyles,
        setFilter,
        setEnabledFilter,
        assignedFields,
        updatePostType,
        updateOption,
        addOptionToImageArea,
        buildPostBlockStyles,
        frame,
        posts,
        postTypes,
    } = useFieldsContext();

    const [currentFilterField, setCurrentFilterField] = useState('');
    const addFilterField = () => {
        if (currentFilterField != '') {
            setFilter('enabledFilters', {
                type: 'search',
                field: currentFilterField,
                label: currentFilterField,
                params: {},
                list: []
            })

            setCurrentFilterField('')
        }
    }

    const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 5 } });
    const sensors = useSensors(sensor);

    const filterList = Object.values(filters.current.shared.enabledFilters);
    const filterKeys = filterList.map(f => f.field);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over?.id) {
            const filtersObj = filters.current.shared.enabledFilters;

            const sorted = Object.values(filtersObj);

            const oldIndex = sorted.findIndex(f => f.field === active.id);
            const newIndex = sorted.findIndex(f => f.field === over.id);

            const newOrder = arrayMove(sorted, oldIndex, newIndex);

            const newEnabledFilters = {};
            newOrder.forEach(f => {
                newEnabledFilters[f.field] = f;
            });
            setEnabledFilter(newEnabledFilters);
        }
    };


    return (
        <div className="filters-configurations" style={{display: (usedTab == 'filters') ? 'flex' : 'none'}}>
            <div className="filters-settings">
                <div className="column-filters-global">
                    <div className="setting-item">
                        <div className="setting-title">
                            Enable filters
                        </div>
                        <div className="setting-content">
                            <TabSwitcher
                                value="enable_filter"
                                label=""
                                active={filters.current.shared.enable === true}
                                onClick={(val) => setFilter(`shared.enable`, !filters.current.shared.enable)}
                            />
                        </div>
                    </div>

                    <div className="setting-item">
                        <div className="setting-title">
                            Filter position
                        </div>
                        <div className="setting-content">
                            <select value={filters.current.responsive[frame].sidebarPosition}
                                    onChange={(e) => setFilter(`responsive.${frame}.sidebarPosition`, e.target.value)}>
                                {frame === 'desktop' && (
                                    <>
                                        <option value="top">Top</option>
                                        <option value="left">Left sidebar</option>
                                        <option value="right">Right sidebar</option>
                                        <option value="moveLeft">Move from left</option>
                                        <option value="moveRight">Move from right</option>
                                    </>
                                )}

                                {(frame === 'mobile' || frame === 'tablet') && (
                                    <>
                                        <option value="top">Top</option>
                                        <option value="moveLeft">Move from left</option>
                                        <option value="moveRight">Move from right</option>
                                    </>
                                )}

                            </select>
                        </div>
                    </div>
                </div>
                <div className="column-filters-fields" style={{'display': filters.current.shared.enable ? 'block' : 'none'}}>
                    <div className="setting-item">
                        <div className="setting-title">
                            Filter field
                        </div>
                        <div className="setting-content">
                            <select value={currentFilterField}
                                    onChange={(e) => {
                                        setCurrentFilterField(e.target.value)
                                    }}>
                                <option value="">Choose field</option>
                                {availableFilterFields.map(field => {
                                    return (
                                        <option value={`${field}`}>{field}</option>
                                    )
                                })}
                            </select>
                            <button onClick={addFilterField}>Add filter</button>
                        </div>
                    </div>
                    <div className="filters-listing">
                        {filters.current.shared.enable && (
                            <div className="filters-side">
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                >
                                    <SortableContext items={filterKeys} strategy={verticalListSortingStrategy}>
                                        {filterList.map((filter) => (
                                            <SimpleFIlterComponent key={filter.field} field={filter}/>
                                        ))}
                                    </SortableContext>
                                </DndContext>
                            </div>
                        )}
                    </div>
                </div>
                <div className="column-filters-styles" style={{'display': filters.current.shared.enable ? 'block' : 'none'}}>

                </div>
                <div className="column-filters-styles" style={{'display': filters.current.shared.enable ? 'block' : 'none'}}></div>
            </div>
        </div>
    )
}