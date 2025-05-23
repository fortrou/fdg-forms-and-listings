import {useFieldsContext} from "../useFieldContext";

export default function GridStyles({tab, setTab}) {
    const {
        getter,
        availableFields,
        setAvailableFields,
        styles,
        setStyles,
        setFrame,
        assignedFields,
        updatePostType,
        updateOption,
        addOptionToImageArea,
        buildPostBlockStyles,
        frame,
        posts,
        postTypes
    } = useFieldsContext();
    return (
        <div className="tab-item half-height-tab" style={{display: styles.current.shared.type === 'masonry' ? 'none' : 'block'}}>
            <div className="tab-heading" onClick={(e) => setTab(tab == 'tab2' ? '' : 'tab2')}>
                Grid styles
            </div>
            <div className="tab-content" style={{display: (tab == 'tab2') ? 'block' : 'none'}} >
                <div className="setting-holder">
                    <div className="setting-content">
                        <div className="grid grid-3">
                            <div className="input-container">
                                <label>columns</label>
                                <input type="number" name="grid-columns" min="1" max="8"
                                       value={getter(styles.current, `responsive.${frame}.gridColumns`, styles.current.responsive['desktop'].gridColumns)}
                                       onChange={(e) => setStyles(`responsive.${frame}.gridColumns`, parseInt(e.target.value, 10))}/>
                            </div>
                            <div className="input-container">
                                <label>columns gap</label>
                                <input type="number" name="column-gap"
                                       value={getter(styles.current, `responsive.${frame}.gridGap`, styles.current.responsive['desktop'].gridGap)}
                                       onChange={(e) => setStyles(`responsive.${frame}.gridGap`, parseInt(e.target.value, 10))}/>
                            </div>
                            <div className="input-container">
                                <label>row gap</label>
                                <input type="number" name="column-gap"
                                       value={getter(styles.current, `responsive.${frame}.rowGap`, styles.current.responsive['desktop'].rowGap)}
                                       onChange={(e) => setStyles(`responsive.${frame}.rowGap`, parseInt(e.target.value, 10))}/>
                            </div>
                        </div>
                    </div>

                    <div className="setting-content">
                        <div className="grid grid-2">
                            <div className="input-container">
                                <label>Listing width</label>
                                <input type="text"
                                       value={styles.current.responsive[frame].listingWidth}
                                       onChange={(e) => setStyles(`responsive.${frame}.listingWidth`, e.target.value, 10)}/>
                            </div>
                            <div className="input-container">
                                <label>Responsive to:</label>
                                <select>
                                    <option value="container">Container</option>
                                    <option value="screen">Screen</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}