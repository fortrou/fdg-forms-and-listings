import UsedFormFields from "../components/usedFormFields";
import ListingConfigurator from '../components/ListingsConfigurator'
import TabButton from "../tabbutton";
import {useFieldsLogic} from "../functions";
import {useFieldsContext} from "../useFieldContext";

export default function ListingData() {
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
                        Listing layout
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

                <div className="setting-holder">
                    <div className="setting-title">
                        Post display type
                    </div>
                    <div className="setting-content">
                        <div className="padding-settings">
                            <div className="input-container">
                                <select id="" value={styles.postDisplay}
                                        onChange={(e) => updateStyle('postDisplay', e.target.value)}>
                                    <option value="block">Block</option>
                                    <option value="flex">Flex</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="setting-holder"
                     style={{display: styles.postDisplay === 'flex' ? 'block' : 'none'}}>
                    <div className="setting-content">
                        <div className="grid grid-3">
                            <div className="input-container">
                                <label>flex direction</label>
                                <select value={styles.flexDirection}
                                        onChange={(e) => updateStyle('flexDirection', e.target.value)}>
                                    <option value="row">row</option>
                                    <option value="column">column</option>
                                    <option value="row-reverse">row-reverse</option>
                                    <option value="column-reverse">column-reverse</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <label>justify content</label>
                                <select value={styles.justifyContent}
                                        onChange={(e) => updateStyle('justifyContent', e.target.value)}>
                                    <option value="space-between">space-between</option>
                                    <option value="flex-start">flex-start</option>
                                    <option value="flex-end">flex-start</option>
                                    <option value="center">center</option>
                                </select>
                            </div>
                            <div className="input-container">
                                <label>align items</label>
                                <select value={styles.alignItems}
                                        onChange={(e) => updateStyle('alignItems', e.target.value)}>
                                    <option value="flex-start">flex-start</option>
                                    <option value="flex-end">flex-end</option>
                                    <option value="center">center</option>
                                    <option value="baseline">baseline</option>
                                </select>
                            </div>
                        </div>
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
            </div>
        </div>
    )
}