import {useFieldsContext} from "../useFieldContext";

export default function GridStyles() {
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
        <div className="tab-item" style={{display: styles.current.shared.type === 'masonry' ? 'none' : 'block'}}>
            <div className="tab-heading">
                Grid styles
            </div>
            <div className="tab-content">
                <div className="setting-holder">
                    <div className="setting-content">
                        <div className="grid grid-3">
                            <div className="input-container">
                                <label>columns</label>
                                <input type="number" name="grid-columns" min="1" max="8"
                                       value={styles.current.responsive[frame].gridColumns}
                                       onChange={(e) => setStyles(`responsive.${frame}.gridColumns`, parseInt(e.target.value, 10))}/>
                            </div>
                            <div className="input-container">
                                <label>columns gap</label>
                                <input type="number" name="column-gap"
                                       value={styles.current.responsive[frame].gridGap}
                                       onChange={(e) => setStyles(`responsive.${frame}.gridGap`, parseInt(e.target.value, 10))}/>
                            </div>
                            <div className="input-container">
                                <label>row gap</label>
                                <input type="number" name="column-gap"
                                       value={styles.current.responsive[frame].rowGap}
                                       onChange={(e) => setStyles(`responsive.${frame}.rowGap`, parseInt(e.target.value, 10))}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}