import UsedFormFields from "../components/usedFormFields";
import ListingConfigurator from '../components/ListingsConfigurator'
import TabButton from "../tabbutton";
import {useFieldsLogic} from "../functions";
import {useFieldsContext} from "../useFieldContext";
import TabSwitcher from "../switcher";
import {DefaultIcons} from "../components/iconsComponent";

export default function ListingData() {
    const {
        availableFields,
        setAvailableFields,
        styles,
        setStyles,
        assignedFields,
        setAssignedFields,
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
            <div className="tab-content grid-tab">
                <div className="tab-side">
                    <div className="setting-holder">
                        <div className="setting-title">
                            Query data
                        </div>
                        <div className="setting-content">
                            <select value={styles.current.shared.postType}
                                    onChange={(e) => updatePostType(e.target.value)}>
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
                                    active={styles.current.shared.type === 'grid'}
                                    onClick={(val) => setStyles('type', val)}
                                />
                                <TabButton
                                    value="masonry"
                                    label="Masonry"
                                    active={styles.current.shared.type === 'masonry'}
                                    onClick={(val) => setStyles('type', val)}
                                />
                            </div>
                        </div>
                    </div>

                    <TabSwitcher
                        value="use_two_sections"
                        label="Use two sections"
                        active={styles.current.shared.useTwoSection === true}
                        onClick={(val) => setStyles(`shared.useTwoSection`, !styles.current.shared.useTwoSection)}
                    />

                    {styles.current.shared.useTwoSection && (<div className="setting-holder"
                         style={{display: styles.current.shared.postDisplay === 'flex' ? 'block' : 'none'}}>
                        <div className="setting-content">
                            <div className="grid grid-2 no-padding">
                                <div className="input-container">
                                    <label>Sections direction</label>
                                    <div className="icons-list grid grid-4 no-padding">
                                        <div className={`icon-item ${styles.current.shared.flexDirection === 'row' ? 'active' : ''}`}
                                             onClick={(e) => setStyles('shared.flexDirection', 'row')} >
                                            <img src={DefaultIcons.arrowRight}/>
                                        </div>
                                        <div className={`icon-item ${styles.current.shared.flexDirection === 'column' ? 'active' : ''}`}
                                             onClick={(e) => setStyles('shared.flexDirection', 'column')}>
                                            <img src={DefaultIcons.arrowDown}/>
                                        </div>
                                        <div className={`icon-item ${styles.current.shared.flexDirection === 'row-reverse' ? 'active' : ''}`}
                                             onClick={(e) => setStyles('shared.flexDirection', 'row-reverse')}>
                                            <img src={DefaultIcons.arrowLeft}/>
                                        </div>
                                        <div className={`icon-item ${styles.current.shared.flexDirection === 'column-reverse' ? 'active' : ''}`}
                                             onClick={(e) => setStyles('shared.flexDirection', 'column-reverse')}>
                                            <img src={DefaultIcons.arrowUp}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-container">
                                    <label>Justify content</label>
                                    <div className="icons-list grid grid-4 no-padding">
                                        <div
                                            className={`icon-item ${styles.current.shared.justifyContent === 'space-between' ? 'active' : ''}`}
                                            onClick={(e) => setStyles('shared.justifyContent', 'space-between')}>
                                            <img src={DefaultIcons.spaceBetween}/>
                                        </div>
                                        <div
                                            className={`icon-item ${styles.current.shared.justifyContent === 'flex-start' ? 'active' : ''}`}
                                            onClick={(e) => setStyles('shared.justifyContent', 'flex-start')}>
                                            <img src={DefaultIcons.flexStart}/>
                                        </div>
                                        <div
                                            className={`icon-item ${styles.current.shared.justifyContent === 'flex-end' ? 'active' : ''}`}
                                            onClick={(e) => setStyles('shared.justifyContent', 'flex-end')}>
                                            <img src={DefaultIcons.flexEnd}/>
                                        </div>
                                        <div
                                            className={`icon-item ${styles.current.shared.justifyContent === 'center' ? 'active' : ''}`}
                                            onClick={(e) => setStyles('shared.justifyContent', 'center')}>
                                            <img src={DefaultIcons.justifyCenter}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-container">
                                    <label>align items</label>
                                    <div className="icons-list grid grid-4 no-padding">
                                        <div
                                            className={`icon-item ${styles.current.shared.alignItems === 'baseline' ? 'active' : ''}`}
                                            onClick={(e) => setStyles('shared.alignItems', 'baseline')}>
                                            <img src={DefaultIcons.alignBaseline}/>
                                        </div>
                                        <div
                                            className={`icon-item ${styles.current.shared.alignItems === 'flex-start' ? 'active' : ''}`}
                                            onClick={(e) => setStyles('shared.alignItems', 'flex-start')}>
                                            <img src={DefaultIcons.alignStart}/>
                                        </div>
                                        <div
                                            className={`icon-item ${styles.current.shared.alignItems === 'flex-end' ? 'active' : ''}`}
                                            onClick={(e) => setStyles('shared.alignItems', 'flex-end')}>
                                            <img src={DefaultIcons.alignEnd}/>
                                        </div>
                                        <div
                                            className={`icon-item ${styles.current.shared.alignItems === 'center' ? 'active' : ''}`}
                                            onClick={(e) => setStyles('shared.alignItems', 'center')}>
                                            <img src={DefaultIcons.alignCenter}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    )}

                </div>
                <div className="tab-side">
                    <div className="setting-holder">
                        <div className="setting-title">
                            Fields selected
                        </div>

                        <ListingConfigurator/>

                    </div>
                </div>
            </div>
        </div>
    )
}