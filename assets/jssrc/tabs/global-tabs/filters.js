import {useFieldsContext} from "../../useFieldContext";
import DynamicComponent from "../../components/dynamicCompontent";
import TabSwitcher from "../../switcher";
import {filters} from "../../exportableconstants";

export default function FiltersTab({usedTab}) {
    const {
        availableFields,
        setAvailableFields,
        styles,
        filters,
        availableFilterFields,
        setStyles,
        setFilter,
        assignedFields,
        setAssignedFields,
        updatePostType,
        setMeasure,
        updateOption,
        addOptionToImageArea,
        buildPostBlockStyles,
        frame,
        posts,
        postTypes
    } = useFieldsContext();

    return (
        <div className="filters-configurations" style={{display: (usedTab == 'filters') ? 'grid' : 'none'}}>
            <div className="filters-settings">
                <div className="column-left">
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
                            <select value={filters.current.responsive[frame].sidebarPosition} onChange={(e) => setFilter(`responsive.${frame}.sidebarPosition`, e.target.value)}>
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
                <div className="column-right" style={{'display': filters.current.shared.enable ? 'block' : 'none'}}>
                    <div className="setting-item">
                        <div className="setting-title">
                            Filter field
                        </div>
                        <div className="setting-content">
                            <select name="" id="">
                                {availableFilterFields.map(field => {
                                    return (
                                        <option value="field">{field}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="configurations-container">
                <div className="filters-side">
                </div>
                <div className={`preview-container ${styles.current.shared.type}`}>
                    {posts.map(post => (
                        <div key={post.ID} className="post-item">
                            {styles.current.shared.itemsShowImages && (
                                <div className="left-side">
                                    {assignedFields.fsection.map(field => {
                                            let fieldData = post[field.key] ? post[field.key] : '';
                                            return (
                                                <DynamicComponent field={field} data={fieldData}/>
                                            )
                                        }
                                    )}
                                </div>
                            )}
                            {styles.current.shared.useTwoSection && (
                                <div className="content-side">
                                    {assignedFields.lsection.map(field => {
                                            let fieldData = post[field.key] ? post[field.key] : '';
                                            return (
                                                <DynamicComponent field={field} data={fieldData}/>
                                            )
                                        }
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}