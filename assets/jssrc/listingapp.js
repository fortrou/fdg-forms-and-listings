import { useState, useEffect } from '@wordpress/element';
import TabButton from './tabbutton';
import TabSwitcher from './switcher';
import ListingData from './tabs/listingData'
import GridStyles from './tabs/gridStyles';
import DynamicComponent from './components/dynamicCompontent';
import {
    availableFields as defaultAvailableFields,
    availableImageContainerFields as defaultAvailableImageContainerFields,
    availableContentContainerFields as defaultAvailableContentContainerFields,
    styles as defaultStyles, availableImageContainerFields
} from './exportableconstants';


export default function PreviewApp() {

    const [availableFields, setAvailableFields] = useState(defaultAvailableFields);
    const [availableImageContainerFields, setAvailableImageContainerFields] = useState(defaultAvailableImageContainerFields);
    const [availableContentContainerFields, setAvailableContentContainerFields] = useState(defaultAvailableContentContainerFields);
    const [styles, setStyles] = useState(defaultStyles);

    const stylesString = `
        .preview-container {
            box-sizing: border-box;
            display: ${styles.type == "grid" ? 'grid' : ''};
            ${styles.type == "grid" ? 'grid-template-columns: repeat(' + styles.gridColumns + ', 1fr)' : ''};
            ${styles.type == "grid" ? 'column-gap: ' + styles.gridGap + 'px' : ''};
            ${styles.type == "grid" ? 'row-gap: ' + styles.rowGap + 'px' : ''};
        }
        
        .preview-container .post-item {
            ${styles.itemBorderWidth > 0 ? 'border: ' + styles.itemBorderWidth + 'px solid ' + styles.itemsBorderColor : ''};
            border-radius: ${styles.itemsBorderRadius}px;
            overflow: hidden;
            padding: ${styles.paddingTop + 'px ' + styles.paddingRight + 'px ' + styles.paddingBottom + 'px ' + styles.paddingLeft + 'px '};
            display: ${styles.postDisplay};
            ${styles.postDisplay == 'flex' ? 'justify-content: ' + styles.justifyContent : ''};
            ${styles.postDisplay == 'flex' ? 'flex-direction: ' + styles.flexDirection : ''};
            ${styles.postDisplay == 'flex' ? 'align-items: ' + styles.alignItems : ''};
        }
        
        .preview-container .post-item .left-side img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: ${styles.imageBorderRadius};
        }
        .preview-container .post-item .left-side {
            width: ${styles.imageWidth};
            height: ${styles.imageHeight};
            margin: ${styles.imageMarginTop + 'px ' + styles.imageMarginRight + 'px ' + styles.imageMarginBottom + 'px ' + styles.imageMarginLeft + 'px '};
        }
        .preview-container .post-item .content-side {
            box-sizing: border-box;
            padding: ${styles.contentPaddingTop + 'px ' + styles.contentPaddingRight + 'px ' + styles.contentPaddingBottom + 'px ' + styles.contentPaddingLeft + 'px '};
            ${(styles.itemsShowImages && styles.postDisplay == 'flex' && (styles.flexDirection == 'row' || styles.flexDirection == 'row-reverse')) ? `width: calc(100% - ${parseInt(styles.imageWidth, 10) + styles.imageMarginRight + styles.imageMarginLeft}px)` : ''};
        }
    `;


    const updateStyle = (key, value) => {
        setStyles(current => ({
            ...current,
            [key]: value
        }))
    }

    const updatePostType = (value) => {
        setStyles(current => ({
            ...current,
            ['postType']: value
        }))
        fetch(fdgsyncajax.ajax_url + `?action=get_fil_demo_posts_listing&post_type=${value}&per_page=${styles.perPage}`)
            .then(res => res.json())
            .then(data => {
                setPosts(data.data.posts);
                setAvailableFields(Object.values(data.data.keys));
            });
    }

    const updateOption = (field, property, subproperty, value) => {
        if (availableImageContainerFields[field].options[property].value[subproperty]) {
            availableImageContainerFields[field].options[property].value[subproperty] = value;
        } else {
            availableImageContainerFields[field].options[property].value = value;
        }
    }

    const addOptionToImageArea = (param) => {
        if (param == 'top') {
            const field = availableFields.find(field => field.key === styles.currentSelectedImageField);
            setAvailableImageContainerFields(current => [
                ...current,
                field
            ])
        } else {
            const field = availableFields.find(field => field.key === styles.currentSelectedContentField);
            setAvailableContentContainerFields(current => [
                ...current,
                field
            ])
        }
    }

    const [posts, setPosts] = useState([]);
    const [postTypes, setPostTypes] = useState([]);

    useEffect(() => {
        fetch(fdgsyncajax.ajax_url + `?action=get_fil_demo_posts_listing&post_type=${styles.postType}&per_page=${styles.perPage}`)
            .then(res => res.json())
            .then(data => {
                setPosts(Object.values(data.data.posts));
                setAvailableFields(Object.values(data.data.keys));
                setAvailableImageContainerFields(Object.values(data.data.defaultKeys));
            });
    }, []);

    useEffect(() => {
        fetch(fdgsyncajax.ajax_url + '?action=get_fil_fetchable_posttypes')
            .then(res => res.json())
            .then(data => setPostTypes(data.data.post_types));
    }, []);

    useEffect(() => {
        let tag = document.getElementById('fil-listing-styles');
        if (!tag) {
            tag = document.createElement('style');
            tag.id = 'fil-listing-styles';
            document.head.appendChild(tag);
        }

        tag.innerHTML = stylesString;
    }, [stylesString]);

    return (
        <div className="configurations-container">
            <div className="configurations-side">

                <ListingData styles={styles}
                             updateStyle={updateStyle}
                             updatePostType={updatePostType}
                             postTypes={postTypes}
                             availableFields={availableFields}
                             addOptionToImageArea={addOptionToImageArea}
                             availableImageContainerFields={availableImageContainerFields}
                             setAvailableImageContainerFields={setAvailableImageContainerFields}
                             availableContentContainerFields={availableContentContainerFields}
                             setAvailableContentContainerFields={setAvailableContentContainerFields}
                             updateOption={updateOption} />

                <GridStyles styles={styles} updateStyle={updateStyle} />

                <div className="tab-item">
                    <div className="tab-heading">
                        Post display settings
                    </div>
                    <div className="tab-content">
                        <div className="setting-holder">
                            <div className="setting-title">
                                Display type
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
                                Image settings
                            </div>
                            <div className="setting-content">
                                <div className="padding-settings">
                                    <div className="grid grid-3">
                                        <div className="input-container">
                                            <TabSwitcher
                                                value="show_images"
                                                label="Show images"
                                                active={styles.itemsShowImages === true}
                                                onClick={(val) => updateStyle('itemsShowImages', !styles.itemsShowImages)}
                                            />
                                        </div>
                                        <div className="input-container"
                                             style={{display: styles.itemsShowImages ? 'block' : 'none'}}>
                                            <label>Height</label>
                                            <input type="text" min="0" value={styles.imageHeight}
                                                   onChange={(e) => updateStyle('imageHeight', e.target.value)}/>
                                        </div>
                                        <div className="input-container"
                                             style={{display: styles.itemsShowImages ? 'block' : 'none'}}>
                                            <label>Width</label>
                                            <input type="text" min="0" value={styles.imageWidth}
                                                   onChange={(e) => updateStyle('imageWidth', e.target.value)}/>
                                        </div>
                                        <div className="input-container"
                                             style={{display: styles.itemsShowImages ? 'block' : 'none'}}>
                                            <label>Border radius</label>
                                            <input type="text" min="0" value={styles.imageBorderRadius}
                                                   onChange={(e) => updateStyle('imageBorderRadius', e.target.value)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="setting-holder" style={{display: styles.itemsShowImages ? 'block' : 'none'}}>
                            <div className="setting-title">
                                Image margins
                            </div>
                            <div className="setting-content">
                                <div className="padding-settings grid grid-4">
                                    <div className="input-container">
                                        <label>Top</label>
                                        <input type="number" min="0" value={styles.imageMarginTop}
                                               onChange={(e) => updateStyle('imageMarginTop', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>Right</label>
                                        <input type="number" min="0" value={styles.imageMarginRight}
                                               onChange={(e) => updateStyle('imageMarginRight', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>Bottom</label>
                                        <input type="number" min="0" value={styles.imageMarginBottom}
                                               onChange={(e) => updateStyle('imageMarginBottom', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>Left</label>
                                        <input type="number" min="0" value={styles.imageMarginLeft}
                                               onChange={(e) => updateStyle('imageMarginLeft', parseInt(e.target.value, 10))}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="tab-item">
                    <div className="tab-heading">
                        Posts styles
                    </div>
                    <div className="tab-content">
                        <div className="setting-holder">
                            <div className="setting-title">
                                Padding
                            </div>
                            <div className="setting-content">
                                <div className="padding-settings grid grid-4">
                                    <div className="input-container">
                                        <label>Top</label>
                                        <input type="number" min="0" value={styles.paddingTop}
                                               onChange={(e) => updateStyle('paddingTop', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>Right</label>
                                        <input type="number" min="0" value={styles.paddingRight}
                                               onChange={(e) => updateStyle('paddingRight', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>Bottom</label>
                                        <input type="number" min="0" value={styles.paddingBottom}
                                               onChange={(e) => updateStyle('paddingBottom', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>Left</label>
                                        <input type="number" min="0" value={styles.paddingLeft}
                                               onChange={(e) => updateStyle('paddingLeft', parseInt(e.target.value, 10))}/>
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
                                        <input type="text" name="item-border-width" value={styles.itemBorderWidth}
                                               onChange={(e) => updateStyle('itemBorderWidth', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>color</label>
                                        <input type="color" value={styles.itemsBorderColor}
                                               onChange={(e) => updateStyle('itemsBorderColor', e.target.value)}/>
                                    </div>
                                    <div className="input-container">
                                        <label>radius</label>
                                        <input type="number" value={styles.itemsBorderRadius}
                                               onChange={(e) => updateStyle('itemsBorderRadius', e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="setting-holder">
                            <div className="setting-title">
                                Content padding
                            </div>
                            <div className="setting-content">
                                <div className="padding-settings grid grid-4">
                                    <div className="input-container">
                                        <label>Top</label>
                                        <input type="number" min="0" value={styles.contentPaddingTop}
                                               onChange={(e) => updateStyle('contentPaddingTop', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>Right</label>
                                        <input type="number" min="0" value={styles.contentPaddingRight}
                                               onChange={(e) => updateStyle('contentPaddingRight', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>Bottom</label>
                                        <input type="number" min="0" value={styles.contentPaddingBottom}
                                               onChange={(e) => updateStyle('contentPaddingBottom', parseInt(e.target.value, 10))}/>
                                    </div>
                                    <div className="input-container">
                                        <label>Left</label>
                                        <input type="number" min="0" value={styles.contentPaddingLeft}
                                               onChange={(e) => updateStyle('contentPaddingLeft', parseInt(e.target.value, 10))}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`preview-container ${styles.type}`}>
                {posts.map(post => (
                    <div key={post.ID} className="post-item">

                        {styles.itemsShowImages && (
                            <div className="left-side">
                                {availableImageContainerFields.map(field => {
                                        let fieldData = post[field.key] ? post[field.key] : '';
                                        return (
                                            <DynamicComponent field={field} data={fieldData} />
                                        )
                                    }
                                )}
                            </div>
                        )}
                        <div className="content-side">
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}