import {useState} from "@wordpress/element";
import {useFieldsContext} from "./useFieldContext";
import ConfigurationsTab from "./tabs/global-tabs/configurations";
import FiltersTab from "./tabs/global-tabs/filters";
import {DefaultIcons} from "./components/iconsComponent";


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

    const [usedTab, setUsedTab] = useState('filters');
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className="listing-global-container">
            <div className="listing-tabs">
                <div className="tabs-switcher">
                    <div className={`tab-item listing-configurations ${(usedTab == 'configurations') ? 'active' : ''}`} onClick={(e) => setUsedTab('configurations')}>Listing setup</div>
                    <div className={`tab-item listing-filters ${(usedTab == 'filters') ? 'active' : ''}`} onClick={(e) => setUsedTab('filters')}>Filters setup</div>
                    <div className={`tab-item listing-settings ${(usedTab == 'settings') ? 'active' : ''}`} onClick={(e) => setUsedTab('settings')}>Settings</div>
                </div>
                <div className="settings-trigger">
                    <button className={`trigger-settings ${(usedTab == 'configurations') ? 'active' : ''}`}
                            onClick={(e) => setShowOptions(!showOptions)}>
                        <img src={DefaultIcons.settings} alt=""/>
                    </button>
                </div>
            </div>
            <ConfigurationsTab usedTab={usedTab} showOptions={showOptions} />
            <FiltersTab usedTab={usedTab} />
        </div>
    );
}
