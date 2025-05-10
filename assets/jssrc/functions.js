import {useState, useRef, useReducer, useEffect} from "@wordpress/element";
import {
    availableFields as defaultAvailableFields,
    assignedFields as defaultAssignedFields,
    styles as defaultStyles,
    availableFilterFields as defaultAvailableFilterFields,
    filters as defaultFilters,
    resolutions as defaultResolutions,
    frameMeasures
} from './exportableconstants';

export function useFieldsLogic() {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [frame, setFrame] = useState('desktop')


    const [availableFilterFields, setAvailableFilterFields] = useState(defaultAvailableFilterFields)
    const [availableFields, setAvailableFields] = useState(defaultAvailableFields);
    const [resolutions, setResolutions] = useState(defaultResolutions);

    const assignedFields = useRef(defaultAssignedFields);
    const filters = useRef(defaultFilters)
    const styles = useRef(defaultStyles);

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

    const getter = (obj, path, defaultValue = '') => {
        if (!obj || !path) return defaultValue;

        const keys = Array.isArray(path) ? path : path.split('.');

        let current = obj;
        for (let key of keys) {
            if (current == null || typeof current !== 'object' || !(key in current)) {
                return defaultValue;
            }
            current = current[key];
        }

        return current === undefined || current == '' ? defaultValue : current;
    }


    const formRef = useRef(null);
    let timeoutRef = null;
    const [submitPending, setSubmitPending] = useState(false);


    function submitPreviewForm(formRef, delay = 500) {
        if (!formRef?.current) return;

        clearTimeout(timeoutRef);

        timeoutRef = setTimeout(() => {
            if (formRef.current) {
                formRef.current.submit();
            }
        }, delay);
    }

    useEffect(() => {
        if (submitPending) {
            submitPreviewForm(formRef);
            setSubmitPending(false); // сброс
        }
    }, [submitPending]);

    const setStyles = (path, value) => {
        setter(styles.current, path, value);
        forceUpdate();
        setSubmitPending(true);
    }

    const setEnabledFilter = (values) => {
        filters.current.shared.enabledFilters = values;
        forceUpdate();
        setSubmitPending(true);
    }

    const setFilter = (path, value) => {
        if (path == 'enabledFilters') {
            filters.current.shared.enabledFilters[value.field] = value;

        } else {
            setter(filters.current, path, value);
        }
        forceUpdate();
        setSubmitPending(true);
    }

    const updatePostType = (value) => {
        setStyles(current => ({
            ...current,
            ['postType']: value
        }))
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        fetch(fdgsyncajax.ajax_url + `?action=get_fil_demo_posts_listing&post_type=${value}&listing_id=${id}`)
            .then(res => res.json())
            .then(data => {
                setAvailableFields(Object.values(data.data.availableFields));
                setAvailableFilterFields(data.data.filterFields);
                setSubmitPending(formRef)
            });
    }

    const updateOption = (path, value) => {
        setter(assignedFields.current, path, value);
        forceUpdate();
        setSubmitPending(true);
    };


    const addOptionToImageArea = (param, section = 'fsection') => {
        const field = availableFields.find(field => field.key === param);

        if (!field) return;
        updateOption(section, [...assignedFields.current[section], field])
    };

    const removeField = (key, section) => {
        assignedFields.current[section] = assignedFields.current[section].filter(f => f.key !== key);
        forceUpdate();
        submitPreviewForm(formRef);
    }

    const removeFilter = () => {
        forceUpdate();
        submitPreviewForm(formRef);
    }

    const directions = {
        left : 'row',
        right : 'row-reverse',
        top : 'column'
    }

    const buildFiltersBlockStyle = (filters) => {
        let styles = '';
        if (filters.shared.enable) {
            styles += `
                .listing-container {
                    display: flex;
                    ${directions[filters.responsive.desktop.sidebarPosition] ? 'flex-direction: ' + directions[filters.responsive.desktop.sidebarPosition] + ';' : ''}
                    position: relative;
                    align-items: flex-start;
                    justify-content: space-between;
                }
                
                .listing-container .filters-side {
                    background: #fff;
                    ${!directions[filters.responsive.desktop.sidebarPosition] ? 'position: absolute;top: 0;' : ''}
                    width: ${filters.responsive.desktop.filterWidth.value + filters.responsive.desktop.filterWidth.measure };
                    height: auto;padding: 20px 18px;
                    box-sizing: border-box;
                    background: ${filters.shared.filtersBackground};
                    border-radius: ${filters.responsive.desktop.borderRadius.value}${filters.responsive.desktop.borderRadius.measure};
                    ${filters.responsive.desktop.sidebarPosition == 'moveLeft' ? 'left: -100vw;' : ''}
                    ${filters.responsive.desktop.sidebarPosition == 'moveRight' ? 'right: -100vw;' : ''}
                    
                }
                
                .listing-container .preview-container {
                    ${(filters.responsive.desktop.sidebarPosition != 'moveLeft' 
                        && filters.responsive.desktop.sidebarPosition != 'moveRight'
                        && filters.responsive.desktop.sidebarPosition != 'top') && `
                        width: calc(100% - ${(parseInt(filters.responsive.desktop.filterWidth.value) + 30)}${filters.responsive.desktop.filterWidth.measure});
                        `
                    }
                }
            `;
            //console.log(styles)
            return styles;
        }
    }

    const buildPostBlockStyles = (assignedFields) => {
        const fields = [...assignedFields.current.fsection, ...assignedFields.current.lsection];

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
        getter,
        availableFields,
        setAvailableFields,
        setAvailableFilterFields,
        availableFilterFields,
        styles,
        filters,
        resolutions,
        setStyles,
        setFilter,
        assignedFields,
        forceUpdate,
        frame,
        setFrame,
        formRef,
        removeField,
        frameMeasures,
        submitPreviewForm,
        updatePostType,
        updateOption,
        addOptionToImageArea,
        buildFiltersBlockStyle,
        buildPostBlockStyles,
        setEnabledFilter
    };
}