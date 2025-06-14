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
    const [showOptions, setShowOptions] = useState(false);
    const [saveStatus, setSaveStatus] = useState('');

    return (
        <div className="listing-global-container">
            <div className="listing-tabs">
                <div className="tabs-switcher">
                    <div className={`tab-item listing-configurations ${(usedTab == 'configurations') ? 'active' : ''}`} onClick={(e) => setUsedTab('configurations')}>Listing setup</div>
                    <div className={`tab-item listing-filters ${(usedTab == 'filters') ? 'active' : ''}`} onClick={(e) => setUsedTab('filters')}>Filters setup</div>
                    <div className={`tab-item listing-settings ${(usedTab == 'settings') ? 'active' : ''}`} onClick={(e) => setUsedTab('settings')}>Settings</div>
                </div>
                <h1>Configuring Listing</h1>
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

                    <button className={`save-listing ${saveStatus}`}>Update listing</button>

                </div>
            </div>
            <div className="outer-preview-wrap">
                <div className="configurations-side">
                    <ConfigurationsTab usedTab={usedTab} showOptions={showOptions}/>
                    <FiltersTab usedTab={usedTab}/>
                </div>
                <div className="preview-side">
                    <PreviewIframeComponent/>
                </div>
            </div>
        </div>
    );
}
