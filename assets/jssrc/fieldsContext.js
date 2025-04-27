import { createContext, useContext, useState } from 'react';
import { useFieldsLogic } from './functions';
import {useEffect} from "@wordpress/element";

export const FieldsContext = createContext(null);

export function FieldsProvider({ children }) {

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
        buildPostBlockStyles
    } = useFieldsLogic();

    const stylesString = `
        .preview-container {
            box-sizing: border-box;
            display: ${styles.type == "grid" ? 'grid;' : ''}
            ${styles.type == "grid" ? 'grid-template-columns: repeat(' + styles.gridColumns + ', 1fr);' : ''}
            ${styles.type == "grid" ? 'column-gap: ' + styles.gridGap + 'px;' : ''}
            ${styles.type == "grid" ? 'row-gap: ' + styles.rowGap + 'px' : ''}
        }
        
        .preview-container .post-item {
            ${styles.itemBorderWidth > 0 ? 'border: ' + styles.itemBorderWidth + 'px solid ' + styles.itemsBorderColor : ''};
            border-radius: ${styles.itemsBorderRadius}px;
            overflow: hidden;
            padding: ${styles.paddingTop + 'px ' + styles.paddingRight + 'px ' + styles.paddingBottom + 'px ' + styles.paddingLeft + 'px '};
            display: ${styles.postDisplay};
            ${styles.postDisplay == 'flex' ? 'justify-content: ' + styles.justifyContent + ';' : ''}
            ${styles.postDisplay == 'flex' ? 'flex-direction: ' + styles.flexDirection + ';' : ''}
            ${styles.postDisplay == 'flex' ? 'align-items: ' + styles.alignItems + ';' : ''}
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
            ${(styles.itemsShowImages && styles.postDisplay == 'flex' && (styles.flexDirection == 'row' || styles.flexDirection == 'row-reverse')) ? `width: calc(100% - ${parseInt(styles.imageWidth, 10) + styles.imageMarginRight + styles.imageMarginLeft}px);` : ''}
        }
    ` + buildPostBlockStyles(assignedFields);




    const [posts, setPosts] = useState([]);
    const [postTypes, setPostTypes] = useState([]);

    useEffect(() => {
        fetch(fdgsyncajax.ajax_url + `?action=get_fil_demo_posts_listing&post_type=${styles.postType}&per_page=${styles.perPage}`)
            .then(res => res.json())
            .then(data => {
                setPosts(Object.values(data.data.posts));
                setAvailableFields(Object.values(data.data.keys));
                setAssignedFields({
                    fsection: Array.isArray(data.data.defaultKeys.fsection) ? data.data.defaultKeys.fsection : Object.values(data.data.defaultKeys.fsection),
                    lsection: Array.isArray(data.data.defaultKeys.lsection) ? data.data.defaultKeys.lsection : Object.values(data.data.defaultKeys.lsection)
                });
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
        <FieldsContext.Provider value={{
            availableFields,
            setAvailableFields,
            styles,
            setStyles,
            assignedFields,
            setAssignedFields,
            posts,
            postTypes,
            updateStyle,
            updatePostType,
            setMeasure,
            updateOption,
            addOptionToImageArea,
            buildPostBlockStyles,
        }}>

            {children}
        </FieldsContext.Provider>
    );
}