import { useFieldsContext } from './useFieldContext';
import TabButton from './tabbutton';
import TabSwitcher from './switcher';
import ListingData from './tabs/listingData'
import GridStyles from './tabs/gridStyles';
import DynamicComponent from './components/dynamicCompontent';

export default function PreviewContent() {
    const {
        availableFields,
        setAvailableFields,
        styles,
        setStyles,
        assignedFields,
        setAssignedFields,
        updateStyle,
        updatePostType,
        setMeasure,
        updateOption,
        addOptionToImageArea,
        buildPostBlockStyles,
        posts,
        postTypes
    } = useFieldsContext();

    return (
        <div className="configurations-container">
            <div className="configurations-side">

                <ListingData />

                <GridStyles styles={styles} updateStyle={updateStyle}/>

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
                                        <input type="number" min="0" value={styles.paddingTop}
                                               onChange={(e) => updateStyle('paddingTop', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>Right</label>
                                        <input type="number" min="0" value={styles.paddingRight}
                                               onChange={(e) => updateStyle('paddingRight', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>Bottom</label>
                                        <input type="number" min="0" value={styles.paddingBottom}
                                               onChange={(e) => updateStyle('paddingBottom', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>Left</label>
                                        <input type="number" min="0" value={styles.paddingLeft}
                                               onChange={(e) => updateStyle('paddingLeft', parseInt(e.target.value, 10))}/>
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
                                        <input type="text" name="item-border-width" value={styles.itemBorderWidth}
                                               onChange={(e) => updateStyle('itemBorderWidth', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>color</label>
                                        <input type="color" value={styles.itemsBorderColor}
                                               onChange={(e) => updateStyle('itemsBorderColor', e.target.value)}/>
                                    </div>
                                    <div className="input-container">
                                        <label>radius</label>
                                        <input type="number" value={styles.itemsBorderRadius}
                                               onChange={(e) => updateStyle('itemsBorderRadius', e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="setting-holder">
                            <div className="setting-title">
                                Content padding
                            </div>
                            <div className="setting-content">
                                <div className="padding-settings grid grid-4">
                                    <div className="input-container">
                                        <label>Top</label>
                                        <input type="number" min="0" value={styles.contentPaddingTop}
                                               onChange={(e) => updateStyle('contentPaddingTop', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>Right</label>
                                        <input type="number" min="0" value={styles.contentPaddingRight}
                                               onChange={(e) => updateStyle('contentPaddingRight', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>Bottom</label>
                                        <input type="number" min="0" value={styles.contentPaddingBottom}
                                               onChange={(e) => updateStyle('contentPaddingBottom', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>Left</label>
                                        <input type="number" min="0" value={styles.contentPaddingLeft}
                                               onChange={(e) => updateStyle('contentPaddingLeft', parseInt(e.target.value, 10))}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`preview-container ${styles.type}`}>
                {posts.map(post => (
                    <div key={post.ID} className="post-item">
                        {styles.itemsShowImages && (
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
                        {styles.useTwoSection && (
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
    );
}
