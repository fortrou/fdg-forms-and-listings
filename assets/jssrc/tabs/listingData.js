import UsedFormFields from "../components/usedFormFields";
import ListingConfigurator from '../components/ListingsConfigurator'
import TabButton from "../tabbutton";

export default function ListingData({
                                    styles,
                                    updateStyle,
                                    updatePostType,
                                    postTypes,
                                    availableFields,
                                    addOptionToImageArea,
                                    assignedFields,
                                    setAssignedFields,
                                    updateOption
    }) {
    console.log(assignedFields)
    return (
        <div className="tab-item">
            <div className="tab-heading">
                Listing style
            </div>
            <div className="tab-content">
                <div className="setting-holder">
                    <div className="setting-title">
                        Query data
                    </div>
                    <div className="setting-content">
                        <select value={styles.postType} onChange={(e) => updatePostType(e.target.value)}>
                            {postTypes.map(postType => (
                                <option key={postType} value={postType}>{postType}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="setting-holder">
                    <div className="setting-title">
                        Fields selected
                    </div>

                    <ListingConfigurator assignedFields={assignedFields}
                                         setAssignedFields={setAssignedFields}
                                         updateOption={updateOption}
                                         styles={styles}
                                         updateStyle={updateStyle}
                                         availableFields={availableFields}
                                         addOptionToImageArea={addOptionToImageArea}
                    />

                </div>

                <div className="setting-holder">
                    <div className="setting-title">
                        Layout
                    </div>
                    <div className="setting-content">
                        <div className="grid grid-3">
                            <TabButton
                                value="grid"
                                label="Grid"
                                active={styles.type === 'grid'}
                                onClick={(val) => updateStyle('type', val)}
                            />
                            <TabButton
                                value="masonry"
                                label="Masonry"
                                active={styles.type === 'masonry'}
                                onClick={(val) => updateStyle('type', val)}
                            />
                            <TabButton
                                value="listing"
                                label="Listing"
                                active={styles.type === 'listing'}
                                onClick={(val) => updateStyle('type', val)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}