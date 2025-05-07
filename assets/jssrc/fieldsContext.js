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
        frameMeasures,
        resolutions,
        setStyles,
        setFilter,
        assignedFields,
        updatePostType,
        formRef,
        submitPreviewForm,
        setFrame,
        setAvailableFilterFields,
        updateOption,
        buildFiltersBlockStyle,
        setEnabledFilter,
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
            ${styles.current.shared.itemsBorderWidth != '' ? 'border: ' + styles.current.shared.itemsBorderWidth + 'px solid ' + styles.current.shared.itemsBorderColor : ''};
            border-radius: ${styles.current.shared.itemsBorderRadius}px;
            overflow: hidden;
            padding: ${styles.current.responsive.desktop.padding.top + 'px ' + styles.current.responsive.desktop.padding.right + 'px ' + styles.current.responsive.desktop.padding.bottom + 'px ' + styles.current.responsive.desktop.padding.left + 'px '};
            display: ${styles.current.shared.postDisplay};
            ${styles.current.shared.postDisplay == 'flex' ? 'justify-content: ' + styles.current.shared.justifyContent + ';' : ''}
            ${styles.current.shared.postDisplay == 'flex' ? 'flex-direction: ' + styles.current.shared.flexDirection + ';' : ''}
            ${styles.current.shared.postDisplay == 'flex' ? 'align-items: ' + styles.current.shared.alignItems + ';' : ''}
        }
        
        .preview-container .post-item .left-side img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: ${styles.current.shared.imageBorderRadius};
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
        @media only screen and (max-width: ${resolutions.tablet}px) {
            .preview-container {
                box-sizing: border-box;
                display: ${styles.current.shared.type == "grid" ? 'grid;' : ''}
                ${styles.current.shared.type == "grid" ? 'grid-template-columns: repeat(' + styles.current.responsive.tablet.gridColumns + ', 1fr);' : ''}
                ${styles.current.shared.type == "grid" ? 'column-gap: ' + styles.current.responsive.tablet.gridGap + 'px;' : ''}
                ${styles.current.shared.type == "grid" ? 'row-gap: ' + styles.current.responsive.tablet.rowGap + 'px' : ''}
            }
            
            .preview-container .post-item {
                ${styles.current.shared.itemsBorderWidth != '' ? 'border: ' + styles.itemsBorderWidth + 'px solid ' + styles.itemsBorderColor : ''};
                border-radius: ${styles.current.shared.itemsBorderRadius}px;
                overflow: hidden;
                padding: ${styles.current.responsive.tablet.padding.top + 'px ' + styles.current.responsive.tablet.padding.right + 'px ' + styles.current.responsive.tablet.padding.bottom + 'px ' + styles.current.responsive.tablet.padding.left + 'px '};
                display: ${styles.current.shared.postDisplay};
                ${styles.current.shared.postDisplay == 'flex' ? 'justify-content: ' + styles.current.shared.justifyContent + ';' : ''}
                ${styles.current.shared.postDisplay == 'flex' ? 'flex-direction: ' + styles.current.shared.flexDirection + ';' : ''}
                ${styles.current.shared.postDisplay == 'flex' ? 'align-items: ' + styles.current.shared.alignItems + ';' : ''}
            }
        }
        
        @media only screen and (max-width: ${resolutions.mobile}px) {
            .preview-container {
                box-sizing: border-box;
                display: ${styles.current.shared.type == "grid" ? 'grid;' : ''}
                ${styles.current.shared.type == "grid" ? 'grid-template-columns: repeat(' + styles.current.responsive.mobile.gridColumns + ', 1fr);' : ''}
                ${styles.current.shared.type == "grid" ? 'column-gap: ' + styles.current.responsive.mobile.gridGap + 'px;' : ''}
                ${styles.current.shared.type == "grid" ? 'row-gap: ' + styles.current.responsive.mobile.rowGap + 'px' : ''}
            }
            
            .preview-container .post-item {
                ${styles.current.shared.itemsBorderWidth != '' ? 'border: ' + styles.current.shared.itemsBorderWidth + 'px solid ' + styles.current.shared.itemsBorderColor : ''};
                border-radius: ${styles.current.shared.itemsBorderRadius}px;
                overflow: hidden;
                padding: ${styles.current.responsive.mobile.padding.top + 'px ' + styles.current.responsive.mobile.padding.right + 'px ' + styles.current.responsive.mobile.padding.bottom + 'px ' + styles.current.responsive.mobile.padding.left + 'px '};
                display: ${styles.current.shared.postDisplay};
                ${styles.current.shared.postDisplay == 'flex' ? 'justify-content: ' + styles.current.shared.justifyContent + ';' : ''}
                ${styles.current.shared.postDisplay == 'flex' ? 'flex-direction: ' + styles.current.shared.flexDirection + ';' : ''}
                ${styles.current.shared.postDisplay == 'flex' ? 'align-items: ' + styles.current.shared.alignItems + ';' : ''}
            }
        }
    ` + buildPostBlockStyles(assignedFields) + buildFiltersBlockStyle(filters.current);




    const [posts, setPosts] = useState([]);
    const [postTypes, setPostTypes] = useState([]);

    useEffect(() => {
        fetch(fdgsyncajax.ajax_url + `?action=get_fil_demo_posts_listing&post_type=${styles.current.shared.postType}&per_page=${styles.current.shared.perPage}`)
            .then(res => res.json())
            .then(data => {
                setPosts(Object.values(data.data.posts));
                setAvailableFields(Object.values(data.data.keys));
                updateOption('fsection', Array.isArray(data.data.defaultKeys.fsection) ? data.data.defaultKeys.fsection : Object.values(data.data.defaultKeys.fsection));
                updateOption('lsection', Array.isArray(data.data.defaultKeys.lsection) ? data.data.defaultKeys.lsection : Object.values(data.data.defaultKeys.lsection));
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
            frameMeasures,
            stylesString,
            setStyles,
            setFilter,
            assignedFields,
            availableFilterFields,
            posts,
            postTypes,
            setFrame,
            formRef,
            submitPreviewForm,
            updatePostType,
            updateOption,
            addOptionToImageArea,
            setEnabledFilter,
            buildPostBlockStyles,
        }}>

            {children}
        </FieldsContext.Provider>
    );
}