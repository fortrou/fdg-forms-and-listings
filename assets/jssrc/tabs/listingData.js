import UsedFormFields from "../components/usedFormFields";
import TabButton from "../tabbutton";

export default function ListingData({
                                    styles,
                                    updateStyle,
                                    updatePostType,
                                    postTypes,
                                    availableFields,
                                    addOptionToImageArea,
                                    availableImageContainerFields,
                                    setAvailableImageContainerFields,
                                    availableContentContainerFields,
                                    setAvailableContentContainerFields,
                                    updateOption
    }) {
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
                    <div className="setting-content">
                        <div className="grid grid-2">
                            <select value={styles.currentSelectedImageField}
                                    onChange={(e) => updateStyle('currentSelectedImageField', e.target.value)}>
                                <option key="" value="">Choose field</option>
                                {availableFields.map(field => (
                                    <option key={field.key} value={field.key}>{field.name}</option>
                                ))}
                            </select>

                            <button onClick={(e) => {
                                addOptionToImageArea('top')
                            }}>add field
                            </button>
                        </div>

                        <UsedFormFields fields={availableImageContainerFields}
                                        setFields={setAvailableImageContainerFields} updateOption={updateOption}/>

                    </div>
                    <div className="setting-content">
                        <UsedFormFields fields={availableContentContainerFields}
                                        setFields={setAvailableContentContainerFields} updateOption={updateOption}/>
                    </div>
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