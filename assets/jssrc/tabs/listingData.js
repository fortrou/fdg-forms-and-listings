import UsedFormFields from "../components/usedFormFields";
import ListingConfigurator from '../components/ListingsConfigurator'
import TabButton from "../tabbutton";
import {useFieldsLogic} from "../functions";
import {useFieldsContext} from "../useFieldContext";
import TabSwitcher from "../switcher";
import {DefaultIcons} from "../components/iconsComponent";

export default function ListingData({tab, setTab}) {
    const {
        availableFields,
        setAvailableFields,
        styles,
        setStyles,
        assignedFields,
        updatePostType,
        updateOption,
        addOptionToImageArea,
        buildPostBlockStyles,
        posts,
        getter,
        frame,
        postTypes
    } = useFieldsContext();
    return (
        <div className="tab-item">
            <div className="tab-heading" onClick={(e) => setTab(tab == 'tab1' ? '' : 'tab1')}>
                Listing style
            </div>
            <div className="tab-content grid-tab" style={{display: (tab == 'tab1') ? 'block' : 'none'}} >
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
                                        <div className={`icon-item ${getter(styles.current, `responsive.${frame}.flexDirection`, styles.current.responsive['desktop'].flexDirection) === 'row' ? 'active' : ''}`}
                                             onClick={(e) => setStyles(`responsive.${frame}.flexDirection`, 'row')} >
                                            <img src={DefaultIcons.arrowRight}/>
                                        </div>
                                        <div className={`icon-item ${getter(styles.current, `responsive.${frame}.flexDirection`, styles.current.responsive['desktop'].flexDirection) === 'column' ? 'active' : ''}`}
                                             onClick={(e) => setStyles(`responsive.${frame}.flexDirection`, 'column')}>
                                            <img src={DefaultIcons.arrowDown}/>
                                        </div>
                                        <div className={`icon-item ${getter(styles.current, `responsive.${frame}.flexDirection`, styles.current.responsive['desktop'].flexDirection) === 'row-reverse' ? 'active' : ''}`}
                                             onClick={(e) => setStyles(`responsive.${frame}.flexDirection`, 'row-reverse')}>
                                            <img src={DefaultIcons.arrowLeft}/>
                                        </div>
                                        <div className={`icon-item ${getter(styles.current, `responsive.${frame}.flexDirection`, styles.current.responsive['desktop'].flexDirection) === 'column-reverse' ? 'active' : ''}`}
                                             onClick={(e) => setStyles(`responsive.${frame}.flexDirection`, 'column-reverse')}>
                                            <img src={DefaultIcons.arrowUp}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-container">
                                    <label>Justify content</label>
                                    <div className="icons-list grid grid-4 no-padding">
                                        <div
                                            className={`icon-item ${getter(styles.current, `responsive.${frame}.justifyContent`, styles.current.responsive['desktop'].justifyContent) === 'space-between' ? 'active' : ''}`}
                                            onClick={(e) => setStyles(`responsive.${frame}.justifyContent`, 'space-between')}>
                                            <img src={DefaultIcons.spaceBetween}/>
                                        </div>
                                        <div
                                            className={`icon-item ${getter(styles.current, `responsive.${frame}.justifyContent`, styles.current.responsive['desktop'].justifyContent) === 'flex-start' ? 'active' : ''}`}
                                            onClick={(e) => setStyles(`responsive.${frame}.justifyContent`, 'flex-start')}>
                                            <img src={DefaultIcons.flexStart}/>
                                        </div>
                                        <div
                                            className={`icon-item ${getter(styles.current, `responsive.${frame}.justifyContent`, styles.current.responsive['desktop'].justifyContent) === 'flex-end' ? 'active' : ''}`}
                                            onClick={(e) => setStyles(`responsive.${frame}.justifyContent`, 'flex-end')}>
                                            <img src={DefaultIcons.flexEnd}/>
                                        </div>
                                        <div
                                            className={`icon-item ${getter(styles.current, `responsive.${frame}.justifyContent`, styles.current.responsive['desktop'].justifyContent) === 'center' ? 'active' : ''}`}
                                            onClick={(e) => setStyles(`responsive.${frame}.justifyContent`, 'center')}>
                                            <img src={DefaultIcons.justifyCenter}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-container">
                                    <label>align items</label>
                                    <div className="icons-list grid grid-4 no-padding">
                                        <div
                                            className={`icon-item ${getter(styles.current, `responsive.${frame}.alignItems`, styles.current.responsive['desktop'].alignItems) === 'baseline' ? 'active' : ''}`}
                                            onClick={(e) => setStyles(`responsive.${frame}.alignItems`, 'baseline')}>
                                            <img src={DefaultIcons.alignBaseline}/>
                                        </div>
                                        <div
                                            className={`icon-item ${getter(styles.current, `responsive.${frame}.alignItems`, styles.current.responsive['desktop'].alignItems) === 'flex-start' ? 'active' : ''}`}
                                            onClick={(e) => setStyles(`responsive.${frame}.alignItems`, 'flex-start')}>
                                            <img src={DefaultIcons.alignStart}/>
                                        </div>
                                        <div
                                            className={`icon-item ${getter(styles.current, `responsive.${frame}.alignItems`, styles.current.responsive['desktop'].alignItems) === 'flex-end' ? 'active' : ''}`}
                                            onClick={(e) => setStyles(`responsive.${frame}.alignItems`, 'flex-end')}>
                                            <img src={DefaultIcons.alignEnd}/>
                                        </div>
                                        <div
                                            className={`icon-item ${getter(styles.current, `responsive.${frame}.alignItems`, styles.current.responsive['desktop'].alignItems) === 'center' ? 'active' : ''}`}
                                            onClick={(e) => setStyles(`responsive.${frame}.alignItems`, 'center')}>
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