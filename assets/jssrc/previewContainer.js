import {useState} from "@wordpress/element";
import {useFieldsContext} from "./useFieldContext";
import ConfigurationsTab from "./tabs/global-tabs/configurations";
import FiltersTab from "./tabs/global-tabs/filters";
import {DefaultIcons} from "./components/iconsComponent";
import PreviewIframeComponent from "./components/previewIframeComponent";


export default function PreviewContent() {
    const {
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

    const [usedTab, setUsedTab] = useState('configurations');
    const [showOptions, setShowOptions] = useState(true);

    return (
        <div className="listing-global-container">
            <div className="listing-tabs">
                <div className="tabs-switcher">
                    <div className={`tab-item listing-configurations ${(usedTab == 'configurations') ? 'active' : ''}`} onClick={(e) => setUsedTab('configurations')}>Listing setup</div>
                    <div className={`tab-item listing-filters ${(usedTab == 'filters') ? 'active' : ''}`} onClick={(e) => setUsedTab('filters')}>Filters setup</div>
                    <div className={`tab-item listing-settings ${(usedTab == 'settings') ? 'active' : ''}`} onClick={(e) => setUsedTab('settings')}>Settings</div>
                </div>
                <div className="settings-trigger">
                    <div className="frame-selector">
                        <button className={`trigger-settings ${(frame == 'desktop') ? 'active' : ''}`}
                                onClick={(e) => setFrame('desktop')}>
                            <img src={DefaultIcons.frameDesktop} alt=""/>
                        </button>
                        <button className={`trigger-settings ${(frame == 'tablet') ? 'active' : ''}`}
                                onClick={(e) => setFrame('tablet')}>
                            <img src={DefaultIcons.frameTablet} alt=""/>
                        </button>
                        <button className={`trigger-settings ${(frame == 'mobile') ? 'active' : ''}`}
                                onClick={(e) => setFrame('mobile')}>
                            <img src={DefaultIcons.frameMobile} alt=""/>
                        </button>
                    </div>
                    <button className={`trigger-settings ${(usedTab == 'configurations') ? 'active' : ''}`}
                            onClick={(e) => setShowOptions(!showOptions)}>
                        <img src={DefaultIcons.settings} alt=""/>
                    </button>
                </div>
            </div>
            <ConfigurationsTab usedTab={usedTab} showOptions={showOptions} />
            <FiltersTab usedTab={usedTab} />

            <PreviewIframeComponent />
        </div>
    );
}
