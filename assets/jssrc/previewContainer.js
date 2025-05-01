import {useState} from "@wordpress/element";
import {useFieldsContext} from "./useFieldContext";
import ConfigurationsTab from "./tabs/global-tabs/configurations";
import FiltersTab from "./tabs/global-tabs/filters";


export default function PreviewContent() {
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

    const [usedTab, setUsedTab] = useState('configurations')

    return (
        <div className="listing-global-container">
            <div className="listing-tabs">
                <div className="tab-item" onClick={(e) => setUsedTab('configurations')}>Listing setup</div>
                <div className="listing-settings" onClick={(e) => setUsedTab('filters')}>Filters setup</div>
                <div className="listing-settings" onClick={(e) => setUsedTab('settings')}>Settings</div>
            </div>
            <ConfigurationsTab usedTab={usedTab} />
            <FiltersTab usedTab={usedTab} />
        </div>
    );
}
