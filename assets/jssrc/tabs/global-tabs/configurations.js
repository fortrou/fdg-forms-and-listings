import {useFieldsContext} from "../../useFieldContext";
import ListingData from "../listingData";
import GridStyles from "../gridStyles";
import DynamicComponent from "../../components/dynamicCompontent";
import {useState} from "@wordpress/element";

export default function ConfigurationsTab({usedTab, showOptions}) {
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
        <div className="configurations-container" style={{ display: (usedTab == 'configurations') ? 'grid' : 'none' }}>
            <div className="configurations-side" style={{ display: (showOptions) ? 'grid' : 'none' }}>

                <ListingData/>

                <div className="grid-post-data">
                    <GridStyles/>

                    <div className="tab-item">
                        <div className="tab-heading">
                            Posts styles
                        </div>
                        <div className="tab-content">
                            <div className="setting-holder">
                                <div className="setting-title">
                                    Padding
                                </div>
                                <div className="setting-content">
                                    <div className="padding-settings grid grid-4">
                                        <div className="input-container">
                                            <label>Top</label>
                                            <input type="number" min="0"
                                                   value={styles.current.responsive[frame].padding.top}
                                                   onChange={(e) => setStyles(`responsive.${frame}.padding.top`, parseInt(e.target.value, 10))}/>
                                        </div>
                                        <div className="input-container">
                                            <label>Right</label>
                                            <input type="number" min="0"
                                                   value={styles.current.responsive[frame].padding.right}
                                                   onChange={(e) => setStyles(`responsive.${frame}.padding.right`, parseInt(e.target.value, 10))}/>
                                        </div>
                                        <div className="input-container">
                                            <label>Bottom</label>
                                            <input type="number" min="0"
                                                   value={styles.current.responsive[frame].padding.bottom}
                                                   onChange={(e) => setStyles(`responsive.${frame}.padding.bottom`, parseInt(e.target.value, 10))}/>
                                        </div>
                                        <div className="input-container">
                                            <label>Left</label>
                                            <input type="number" min="0"
                                                   value={styles.current.responsive[frame].padding.left}
                                                   onChange={(e) => setStyles(`responsive.${frame}.padding.left`, parseInt(e.target.value, 10))}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="setting-holder">
                                <div className="setting-title">
                                    Border
                                </div>
                                <div className="setting-content">
                                    <div className="border-container grid grid-3">
                                        <div className="input-container">
                                            <label>width</label>
                                            <input type="text" name="item-border-width"
                                                   value={styles.current.shared.itemBorderWidth}
                                                   onChange={(e) => setStyles(`shared.itemsBorderWidth`, parseInt(e.target.value, 10))}/>
                                        </div>
                                        <div className="input-container">
                                            <label>color</label>
                                            <input type="color" value={styles.current.shared.itemsBorderColor}
                                                   onChange={(e) => setStyles(`shared.itemsBorderColor`, e.target.value)}/>
                                        </div>
                                        <div className="input-container">
                                            <label>radius</label>
                                            <input type="number" value={styles.current.shared.itemsBorderRadius}
                                                   onChange={(e) => setStyles(`shared.itemsBorderRadius`, e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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