import {useState, useRef, useReducer} from "@wordpress/element";
import {
    availableFields as defaultAvailableFields,
    assignedFields as defaultAssignedFields,
    styles as defaultStyles,
    availableFilterFields as defaultAvailableFilterFields,
    filters as defaultFilters,
    resolutions as defaultResolutions
} from './exportableconstants';

export function useFieldsLogic() {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [frame, setFrame] = useState('desktop')


    const [availableFilterFields, setAvailableFilterFields] = useState(defaultAvailableFilterFields)
    const [availableFields, setAvailableFields] = useState(defaultAvailableFields);
    const [assignedFields, setAssignedFields] = useState(defaultAssignedFields);

    const [resolutions, setResolutions] = useState(defaultResolutions);
    const filters = useRef(defaultFilters)
    const styles = useRef(defaultStyles);

    const setMeasure = (field, index, fieldKey, value) => {
        setAssignedFields(prev => {
            let wrapper = '';
            for (const [sectionKey, fields] of Object.entries(prev)) {
                for (const item of fields) {
                    console.log(item.key)
                    if (item.key === field) {
                        wrapper = sectionKey;
                        break;
                    }
                }
                if (wrapper) break;
            }


            if (!wrapper) return prev;

            const updatedOptions = Object.entries(prev[wrapper][index].options).reduce((acc, [key, val]) => {
                if (key !== fieldKey) {
                    acc[key] = val;
                    return acc;
                }

                if ( typeof val?.value === 'object' && val.value !== null && !Array.isArray(val.value) ) {
                    acc[key] = {
                        ...val,
                        value: {
                            ...val.value,
                            [property]: value
                        }
                    };
                } else {
                    acc[key] = {
                        ...val,
                        value
                    };
                }

                return acc;
            }, {});

            return {
                ...prev,
                [wrapper]: prev[wrapper].map((item, i) =>
                    i === index
                        ? {
                            ...item,
                            options: updatedOptions
                        }
                        : item
                )
            };
        });
    };

    const setter = (obj, path, value) => {
        const keys = path.replace(/\[(\d+)]/g, '.$1').split('.');
        let current = obj;
        while (keys.length > 1) {
            const key = keys.shift();
            if (!(key in current)) current[key] = {};
            current = current[key];
        }
        current[keys[0]] = value;
    }

    const setStyles = (path, value) => {
        setter(styles.current, path, value);

        forceUpdate();
    }

    const setEnabledFilter = (values) => {
        filters.current.shared.enabledFilters = values;
        forceUpdate();
    }

    const setFilter = (path, value) => {
        if (path == 'enabledFilters') {
            filters.current.shared.enabledFilters[value.field] = value;

        } else {
            setter(filters.current, path, value);
        }
        forceUpdate();
    }

    const updatePostType = (value) => {
        setStyles(current => ({
            ...current,
            ['postType']: value
        }))
        fetch(fdgsyncajax.ajax_url + `?action=get_fil_demo_posts_listing&post_type=${value}&per_page=${styles.current.shared.perPage}`)
            .then(res => res.json())
            .then(data => {
                setPosts(data.data.posts);
                setAvailableFields(Object.values(data.data.keys));
                setAvailableFilterFields(data.data.filterFields);
            });
    }

    const updateOption = (section, index, fieldKey, property, value) => {
        setAssignedFields(prev => {
            let wrapper = '';

            for (const [sectionKey, fields] of Object.entries(prev)) {
                for (const field of fields) {
                    if (field.key === section) {
                        wrapper = sectionKey;
                        break;
                    }
                }
                if (wrapper) break;
            }

            if (!wrapper) return prev;

            const updatedOptions = Object.entries(prev[wrapper][index].options).reduce((acc, [key, val]) => {
                if (key !== fieldKey) {
                    acc[key] = val;
                    return acc;
                }

                // Обновляем нужное поле
                if (
                    typeof val?.value === 'object' &&
                    val.value !== null &&
                    !Array.isArray(val.value)
                ) {
                    // Сложное поле
                    acc[key] = {
                        ...val,
                        value: {
                            ...val.value,
                            [property]: value
                        }
                    };
                } else {
                    // Простое поле
                    acc[key] = {
                        ...val,
                        value
                    };
                }

                return acc;
            }, {});

            return {
                ...prev,
                [wrapper]: prev[wrapper].map((item, i) =>
                    i === index
                        ? {
                            ...item,
                            options: updatedOptions
                        }
                        : item
                )
            };
        });
    };


    const addOptionToImageArea = (param, section = 'fsection') => {
        const field = availableFields.find(field => field.key === param);

        if (!field) return;

        setAssignedFields(current => ({
            ...current,
            [section]: [...current[section], field]
        }));
    };

    const buildFiltersBlockStyle = (filters) => {
        let styles = '';
        if (filters.shared.enable) {
            Object.keys(filters.responsive).forEach(key => {
                let mediaQuery = '';
                let basicLayoutStyles = '';

                if (resolutions[key]) {
                    mediaQuery = `@media screen and (max-width: ${resolutions[key]}px)`;
                }

                const field = filters.responsive[key];
                basicLayoutStyles += `display: grid; column-gap: ${field.columnGap}px; row-gap: ${field.rowGap}px;`;
                if (field.position == 'sidebar') {
                    if (field.sidebarPosition == 'left') {
                        basicLayoutStyles += `grid-template-columns: ${field.filterWidth.value}${field.filterWidth.measure} auto; grid-template-areas: "filters content";height: 100%;`
                    }

                    if (field.sidebarPosition == 'right') {
                        basicLayoutStyles += `grid-template-columns: auto ${field.filterWidth.value}${field.filterWidth.measure}; grid-template-areas: "content filters";height: 100%;`
                    }
                } else if (field.position == 'top') {
                    basicLayoutStyles += `grid-template-columns: 1fr; height: auto;`;
                } else {

                }
                if (basicLayoutStyles) {
                    let tempStyles = `
                        .listing-container {
                            width: 100%;
                            ${basicLayoutStyles}
                        }
                        .listing-container .filters-side {
                            grid-area: filters;
                        }
                        .listing-container .preview-container {
                            grid-area: content;
                        }
                    `;

                    if (mediaQuery) {
                        styles += `
                            ${mediaQuery} {
                                ${tempStyles}
                                .listing-container .filters-side {
                                    grid-area: unset;
                                }
                                .listing-container .preview-container {
                                    grid-area: unset;
                                }
                            }
                        `
                    } else {
                        styles += tempStyles;
                    }
                }
            });
            //console.log(styles)
            return styles;
        }
        styles = '.listing-container {display: block;} .listing-container .filters-side {display: none;}'
    }

    const buildPostBlockStyles = (assignedFields) => {
        const fields = [...assignedFields.fsection, ...assignedFields.lsection];

        let styles = '';

        fields.forEach(field => {
            if (!field.options) return;
            const selector = `.preview-container .${field.key}-proto`;

            let fieldStyles = '';

            if (field.options.fontSize) {
                const { measure, value } = field.options.fontSize;
                fieldStyles += `font-size: ${value}${measure};`;
            }

            if (field.options.width) {
                const { measure, value } = field.options.width;
                fieldStyles += `width: ${value}${ measure == 'custom' ? '' : measure};`;
            }

            if (field.options.height) {
                const { measure, value } = field.options.height;
                fieldStyles += `height: ${value}${ measure == 'custom' ? '' : measure};`;
            }

            if (field.options.fontWeight) {
                fieldStyles += `font-weight: ${field.options.fontWeight.value};`;
            }

            if (field.options.lineHeight) {
                const { measure, value } = field.options.lineHeight;
                fieldStyles += `line-height: ${value}${measure};`;
            }

            if (field.options.margin) {
                const { top, right, bottom, left } = field.options.margin.value;
                fieldStyles += `margin: ${top}px ${right}px ${bottom}px ${left}px;`;
            }

            if (field.options.padding) {
                const { measure, value } = field.options.padding;
                fieldStyles += `padding: ${value.top}${measure} ${value.right}${measure} ${value.bottom}${measure} ${value.left}${measure};`;
            }

            if (fieldStyles) {
                styles += `
                ${selector} {
                    ${fieldStyles}
                }
            `;
            }

        })

        return styles;
    }

    return {
        availableFields,
        setAvailableFields,
        setAvailableFilterFields,
        availableFilterFields,
        styles,
        filters,
        setStyles,
        setFilter,
        assignedFields,
        setAssignedFields,
        forceUpdate,
        frame,
        setFrame,
        updatePostType,
        setMeasure,
        updateOption,
        addOptionToImageArea,
        buildFiltersBlockStyle,
        buildPostBlockStyles,
        setEnabledFilter
    };
}