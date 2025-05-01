import {useFieldsContext} from "../../useFieldContext";
import DynamicComponent from "../../components/dynamicCompontent";

export default function FiltersTab({usedTab}) {
    const {
        availableFields,
        setAvailableFields,
        styles,
        setStyles,
        setFrame,
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
        <div className="configurations-container" style={{display: (usedTab == 'filters') ? 'grid' : 'none'}}>
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
    )
}