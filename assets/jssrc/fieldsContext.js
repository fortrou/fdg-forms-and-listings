import { createContext, useContext, useState } from 'react';
import { useFieldsLogic } from './functions';
import {useEffect} from "@wordpress/element";
import {filters} from "./exportableconstants";

export const FieldsContext = createContext(null);

export function FieldsProvider({ children }) {

    const {
        availableFields,
        setAvailableFields,
        styles,
        frame,
        availableFilterFields,
        filters,
        setStyles,
        setFilter,
        assignedFields,
        setAssignedFields,
        updatePostType,
        setFrame,
        setMeasure,
        setAvailableFilterFields,
        updateOption,
        addOptionToImageArea,
        buildPostBlockStyles
    } = useFieldsLogic();

    const stylesString = `
        .preview-container {
            box-sizing: border-box;
            display: ${styles.current.shared.type == "grid" ? 'grid;' : ''}
            ${styles.current.shared.type == "grid" ? 'grid-template-columns: repeat(' + styles.current.responsive.desktop.gridColumns + ', 1fr);' : ''}
            ${styles.current.shared.type == "grid" ? 'column-gap: ' + styles.current.responsive.desktop.gridGap + 'px;' : ''}
            ${styles.current.shared.type == "grid" ? 'row-gap: ' + styles.current.responsive.desktop.rowGap + 'px' : ''}
        }
        
        .preview-container .post-item {
            ${styles.current.shared.itemBorderWidth > 0 ? 'border: ' + styles.itemBorderWidth + 'px solid ' + styles.itemsBorderColor : ''};
            border-radius: ${styles.current.shared.itemsBorderRadius}px;
            overflow: hidden;
            padding: ${styles.current.responsive.desktop.padding.top + 'px ' + styles.current.responsive.desktop.padding.right + 'px ' + styles.current.responsive.desktop.padding.bottom + 'px ' + styles.current.responsive.desktop.padding.left + 'px '};
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
        fetch(fdgsyncajax.ajax_url + `?action=get_fil_demo_posts_listing&post_type=${styles.current.shared.postType}&per_page=${styles.current.shared.perPage}`)
            .then(res => res.json())
            .then(data => {
                setPosts(Object.values(data.data.posts));
                setAvailableFields(Object.values(data.data.keys));
                setAssignedFields({
                    fsection: Array.isArray(data.data.defaultKeys.fsection) ? data.data.defaultKeys.fsection : Object.values(data.data.defaultKeys.fsection),
                    lsection: Array.isArray(data.data.defaultKeys.lsection) ? data.data.defaultKeys.lsection : Object.values(data.data.defaultKeys.lsection)
                });
                setAvailableFilterFields(data.data.filterFields);
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
            frame,
            filters,
            setStyles,
            setFilter,
            assignedFields,
            setAssignedFields,
            availableFilterFields,
            posts,
            postTypes,
            setFrame,
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