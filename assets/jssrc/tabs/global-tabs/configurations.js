import {useFieldsContext} from "../../useFieldContext";
import ListingData from "../listingData";
import GridStyles from "../gridStyles";
import DynamicComponent from "../../components/dynamicCompontent";
import {useState} from "@wordpress/element";
import {closestCenter, DndContext} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import SimpleFIlterComponent from "../../components/simpleFIlterComponent";
import PreviewIframeComponent from "../../components/previewIframeComponent";

export default function ConfigurationsTab({usedTab, showOptions}) {
    const {
        availableFields,
        setAvailableFields,
        styles,
        setStyles,
        setFrame,
        filters,
        assignedFields,
        updatePostType,
        updateOption,
        addOptionToImageArea,
        buildPostBlockStyles,
        frame,
        posts,
        postTypes
    } = useFieldsContext();

    const filterList = Object.values(filters.current.shared.enabledFilters);
    const [expandedTab, setExpandedTab] = useState('tab1');

    return (
        <div className="configurations-container" style={{display: (usedTab == 'configurations') ? 'grid' : 'none'}}>
            <div className="configurations-side">

                <ListingData tab={expandedTab} setTab={setExpandedTab} />

                <div className="grid-post-data">
                    <GridStyles tab={expandedTab} setTab={setExpandedTab} />

                    <div className="tab-item">
                        <div className="tab-heading" onClick={(e) => setExpandedTab(expandedTab == 'tab3' ? '' : 'tab3')}>
                            Posts styles
                        </div>
                        <div className="tab-content" style={{display: (expandedTab == 'tab3') ? 'block' : 'none'}} >
                            <div className="setting-holder">
                                <div className="setting-title">
                                    Padding
                                </div>
                                <div className="setting-content">
                                    <div className="padding-settings grid grid-4">
                                        <div className="input-container">
                                            <label>Top</label>
                                            <input type="number" min="0"
                                                   value={styles.current.responsive[frame].padding.top}
                                                   onChange={(e) => setStyles(`responsive.${frame}.padding.top`, parseInt(e.target.value, 10))}/>
                                        </div>
                                        <div className="input-container">
                                            <label>Right</label>
                                            <input type="number" min="0"
                                                   value={styles.current.responsive[frame].padding.right}
                                                   onChange={(e) => setStyles(`responsive.${frame}.padding.right`, parseInt(e.target.value, 10))}/>
                                        </div>
                                        <div className="input-container">
                                            <label>Bottom</label>
                                            <input type="number" min="0"
                                                   value={styles.current.responsive[frame].padding.bottom}
                                                   onChange={(e) => setStyles(`responsive.${frame}.padding.bottom`, parseInt(e.target.value, 10))}/>
                                        </div>
                                        <div className="input-container">
                                            <label>Left</label>
                                            <input type="number" min="0"
                                                   value={styles.current.responsive[frame].padding.left}
                                                   onChange={(e) => setStyles(`responsive.${frame}.padding.left`, parseInt(e.target.value, 10))}/>
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
                                            <input type="text"
                                                   value={styles.current.shared.itemsBorderWidth || ''}
                                                   onChange={(e) => setStyles(`shared.itemsBorderWidth`, e.target.value)}/>
                                        </div>
                                        <div className="input-container">
                                            <label>color</label>
                                            <input type="color" value={styles.current.shared.itemsBorderColor}
                                                   onChange={(e) => setStyles(`shared.itemsBorderColor`, e.target.value)}/>
                                        </div>
                                        <div className="input-container">
                                            <label>radius</label>
                                            <input type="number" value={styles.current.shared.itemsBorderRadius}
                                                   onChange={(e) => setStyles(`shared.itemsBorderRadius`, e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}