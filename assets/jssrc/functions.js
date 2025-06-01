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

        const uniqueKey = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

        const newField = { ...field, key: uniqueKey };

        updateOption(section, [...assignedFields.current[section], newField]);
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
                ${filters.responsive.desktop.sidebarPosition == 'top' ? (`
                .listing-container .filters-side {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: ${filters.responsive.desktop.filtersBlockPosition};
                }
                `) : (``)}
                
                .listing-container .filters-side .filters-container {
                    background: #fff;
                    ${!directions[filters.responsive.desktop.sidebarPosition] ? 'position: absolute;top: 0;' : ''}
                    width: ${filters.responsive.desktop.filterWidth.value + filters.responsive.desktop.filterWidth.measure };
                    height: auto;
                    padding-top: ${filters.responsive.desktop.blockPadding.value.top + filters.responsive.desktop.blockPadding.measure };
                    padding-right: ${filters.responsive.desktop.blockPadding.value.right + filters.responsive.desktop.blockPadding.measure };
                    padding-bottom: ${filters.responsive.desktop.blockPadding.value.bottom + filters.responsive.desktop.blockPadding.measure };
                    padding-left: ${filters.responsive.desktop.blockPadding.value.left + filters.responsive.desktop.blockPadding.measure };
                    margin-top: ${filters.responsive.desktop.blockMargin.value.top + filters.responsive.desktop.blockMargin.measure };
                    margin-right: ${filters.responsive.desktop.blockMargin.value.right + filters.responsive.desktop.blockMargin.measure };
                    margin-bottom: ${filters.responsive.desktop.blockMargin.value.bottom + filters.responsive.desktop.blockMargin.measure };
                    margin-left: ${filters.responsive.desktop.blockMargin.value.left + filters.responsive.desktop.blockMargin.measure };
                    box-sizing: border-box;
                    background: ${filters.shared.filtersBackground};
                    border-radius: ${filters.responsive.desktop.borderRadius.value}${filters.responsive.desktop.borderRadius.measure};
                    ${filters.responsive.desktop.sidebarPosition == 'moveLeft' ? 'left: -100vw;' : ''}
                    ${filters.responsive.desktop.sidebarPosition == 'moveRight' ? 'right: -100vw;' : ''}
                }
                
                .listing-container .filters-side .filters-container .filters-wrapper {
                    ${filters.responsive.desktop.sidebarPosition == 'top' ? (
                        `
                        display: ${filters.responsive.desktop.layout};
                        justify-content: center;
                        align-items: center;
                        flex-wrap: wrap;
                        `
                    ) : (``)}
                }
                .listing-container .filters-side .filters-container .filters-wrapper .filter-block {
                    ${filters.responsive.desktop.sidebarPosition == 'top' ? (`
                        margin-left: ${filters.responsive.desktop.filtersSpacing / 2}px;
                        margin-right: ${filters.responsive.desktop.filtersSpacing / 2}px;
                    `) : (`
                        margin-top: ${filters.responsive.desktop.filtersSpacing / 2}px;
                        margin-bottom: ${filters.responsive.desktop.filtersSpacing / 2}px;
                    `)}
                }
                
                .listing-container .filters-side .filters-container .filters-wrapper .filter-block .filter-title {
                    margin-bottom: ${filters.responsive.desktop.titleSpacing}px;
                }
                
                ${filters.shared.enableButton && (`
                    .listing-container .filters-side .filters-container .filters-wrapper .filter-button {
                        width: ${filters.responsive.desktop.button.position == 'below' ? '100%' : 'fit-content'};
                    }
                    .listing-container .filters-side .filters-container .filters-wrapper .filter-button button {
                        outline: none;
                        font-size: ${filters.responsive.desktop.button.fontSize}px;
                        background: ${filters.responsive.desktop.button.background};
                        color: ${filters.responsive.desktop.button.textColor};
                        font-weight: ${filters.responsive.desktop.button.fontWeight};
                        border: none;
                        border-radius: ${filters.responsive.desktop.button.borderRadius.value}${filters.responsive.desktop.button.borderRadius.measure};
                        padding: ${filters.responsive.desktop.button.spacing.padding.value.top}px ${filters.responsive.desktop.button.spacing.padding.value.right}px
                        ${filters.responsive.desktop.button.spacing.padding.value.bottom}px ${filters.responsive.desktop.button.spacing.padding.value.left}px;
                        margin: ${filters.responsive.desktop.button.spacing.margin.value.top}px ${filters.responsive.desktop.button.spacing.margin.value.right}px
                        ${filters.responsive.desktop.button.spacing.margin.value.bottom}px ${filters.responsive.desktop.button.spacing.margin.value.left}px;
                    }
                `)}
                
                .listing-container .filters-side .filter-field.filter-search input {
                    width: 100%;
                }
                
                .listing-container .preview-container {
                    ${(filters.responsive.desktop.sidebarPosition != 'moveLeft' 
                        && filters.responsive.desktop.sidebarPosition != 'moveRight'
                        && filters.responsive.desktop.sidebarPosition != 'top') && `
                        width: calc(100% - ${(parseInt(filters.responsive.desktop.filterWidth.value) + 30)}${filters.responsive.desktop.filterWidth.measure});
                        `
                    }
                }
                
                @media only screen and (max-width:1100px) {
                    .listing-container {
                        display: flex;
                        width: 100%;
                        ${directions[filters.responsive.tablet.sidebarPosition] ? 'flex-direction: ' + directions[filters.responsive.tablet.sidebarPosition] + ';' : ''}
                        position: relative;
                        align-items: flex-start;
                        justify-content: space-between;
                    }
                    ${filters.responsive.tablet.sidebarPosition == 'top' ? (`
                    .listing-container .filters-side {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: ${filters.responsive.tablet.filtersBlockPosition};
                    }
                    `) : (``)}
                    
                    .listing-container .filters-side .filters-container {
                        background: #fff;
                        ${!directions[filters.responsive.tablet.sidebarPosition] ? 'position: absolute;top: 0;' : ''}
                        width: ${filters.responsive.tablet.filterWidth.value + filters.responsive.tablet.filterWidth.measure };
                        height: auto;
                        padding-top: ${filters.responsive.tablet.blockPadding.value.top + filters.responsive.tablet.blockPadding.measure };
                        padding-right: ${filters.responsive.tablet.blockPadding.value.right + filters.responsive.tablet.blockPadding.measure };
                        padding-bottom: ${filters.responsive.tablet.blockPadding.value.bottom + filters.responsive.tablet.blockPadding.measure };
                        padding-left: ${filters.responsive.tablet.blockPadding.value.left + filters.responsive.tablet.blockPadding.measure };
                        margin-top: ${filters.responsive.tablet.blockMargin.value.top + filters.responsive.tablet.blockMargin.measure };
                        margin-right: ${filters.responsive.tablet.blockMargin.value.right + filters.responsive.tablet.blockMargin.measure };
                        margin-bottom: ${filters.responsive.tablet.blockMargin.value.bottom + filters.responsive.tablet.blockMargin.measure };
                        margin-left: ${filters.responsive.tablet.blockMargin.value.left + filters.responsive.tablet.blockMargin.measure };
                        box-sizing: border-box;
                        background: ${filters.shared.filtersBackground};
                        border-radius: ${filters.responsive.tablet.borderRadius.value}${filters.responsive.tablet.borderRadius.measure};
                        ${filters.responsive.tablet.sidebarPosition == 'moveLeft' ? 'left: -100vw;' : ''}
                        ${filters.responsive.tablet.sidebarPosition == 'moveRight' ? 'right: -100vw;' : ''}
                    }
                    
                    .listing-container .filters-side .filters-container .filters-wrapper {
                        ${filters.responsive.tablet.sidebarPosition == 'top' ? (`
                            display: ${filters.responsive.tablet.layout};
                            justify-content: center;
                            align-items: center;
                            flex-wrap: wrap;
                        `) : (``)}
                    }
                    .listing-container .filters-side .filters-container .filters-wrapper .filter-block {
                        ${filters.responsive.tablet.sidebarPosition == 'top' ? (`
                            margin-left: ${filters.responsive.tablet.filtersSpacing / 2}px;
                            margin-right: ${filters.responsive.tablet.filtersSpacing / 2}px;
                        `) : (`
                            margin-top: ${filters.responsive.tablet.filtersSpacing / 2}px;
                            margin-bottom: ${filters.responsive.tablet.filtersSpacing / 2}px;
                        `)}
                    }
                    
                    .listing-container .filters-side .filters-container .filters-wrapper .filter-block .filter-title {
                        margin-bottom: ${filters.responsive.tablet.titleSpacing}px;
                    }
                    
                    ${filters.shared.enableButton && (`
                        .listing-container .filters-side .filters-container .filters-wrapper .filter-button {
                            width: ${filters.responsive.tablet.button.position == 'below' ? '100%' : 'fit-content'};
                        }
                        .listing-container .filters-side .filters-container .filters-wrapper .filter-button button {
                            outline: none;
                            font-size: ${filters.responsive.tablet.button.fontSize}px;
                            background: ${filters.responsive.tablet.button.background};
                            color: ${filters.responsive.tablet.button.textColor};
                            font-weight: ${filters.responsive.tablet.button.fontWeight};
                            border: none;
                            border-radius: ${filters.responsive.tablet.button.borderRadius.value}${filters.responsive.tablet.button.borderRadius.measure};
                            padding: ${filters.responsive.tablet.button.spacing.padding.value.top}px ${filters.responsive.tablet.button.spacing.padding.value.right}px
                            ${filters.responsive.tablet.button.spacing.padding.value.bottom}px ${filters.responsive.tablet.button.spacing.padding.value.left}px;
                            margin: ${filters.responsive.tablet.button.spacing.margin.value.top}px ${filters.responsive.tablet.button.spacing.margin.value.right}px
                            ${filters.responsive.tablet.button.spacing.margin.value.bottom}px ${filters.responsive.tablet.button.spacing.margin.value.left}px;
                        }
                    `)}
                    
                    .listing-container .filters-side .filter-field.filter-search input {
                        width: 100%;
                    }
                    
                    .listing-container .preview-container {
                        ${(filters.responsive.tablet.sidebarPosition != 'moveLeft'
                        && filters.responsive.tablet.sidebarPosition != 'moveRight'
                        && filters.responsive.tablet.sidebarPosition != 'top') ? `
                            width: calc(100% - ${(parseInt(filters.responsive.tablet.filterWidth.value) + 30)}${filters.responsive.tablet.filterWidth.measure});
                        ` : `
                            width: 100%;
                        `}
                    }
                }
                @media only screen and (max-width:767px) {
                    .listing-container {
                        width: 100%;
                        display: flex;
                        ${directions[filters.responsive.mobile.sidebarPosition] ? 'flex-direction: ' + directions[filters.responsive.mobile.sidebarPosition] + ';' : ''}
                        position: relative;
                        align-items: flex-start;
                        justify-content: space-between;
                    }
                    ${filters.responsive.mobile.sidebarPosition == 'top' ? (`
                    .listing-container .filters-side {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: ${filters.responsive.mobile.filtersBlockPosition};
                    }
                    `) : (``)}
                    
                    .listing-container .filters-side .filters-container {
                        background: #fff;
                        ${!directions[filters.responsive.mobile.sidebarPosition] ? 'position: absolute;top: 0;' : ''}
                        width: ${filters.responsive.mobile.filterWidth.value + filters.responsive.mobile.filterWidth.measure };
                        height: auto;
                        padding-top: ${filters.responsive.mobile.blockPadding.value.top + filters.responsive.mobile.blockPadding.measure };
                        padding-right: ${filters.responsive.mobile.blockPadding.value.right + filters.responsive.mobile.blockPadding.measure };
                        padding-bottom: ${filters.responsive.mobile.blockPadding.value.bottom + filters.responsive.mobile.blockPadding.measure };
                        padding-left: ${filters.responsive.mobile.blockPadding.value.left + filters.responsive.mobile.blockPadding.measure };
                        margin-top: ${filters.responsive.mobile.blockMargin.value.top + filters.responsive.mobile.blockMargin.measure };
                        margin-right: ${filters.responsive.mobile.blockMargin.value.right + filters.responsive.mobile.blockMargin.measure };
                        margin-bottom: ${filters.responsive.mobile.blockMargin.value.bottom + filters.responsive.mobile.blockMargin.measure };
                        margin-left: ${filters.responsive.mobile.blockMargin.value.left + filters.responsive.mobile.blockMargin.measure };
                        box-sizing: border-box;
                        background: ${filters.shared.filtersBackground};
                        border-radius: ${filters.responsive.mobile.borderRadius.value}${filters.responsive.mobile.borderRadius.measure};
                        ${filters.responsive.mobile.sidebarPosition == 'moveLeft' ? 'left: -100vw;' : ''}
                        ${filters.responsive.mobile.sidebarPosition == 'moveRight' ? 'right: -100vw;' : ''}
                    }
                    
                    .listing-container .filters-side .filters-container .filters-wrapper {
                        ${filters.responsive.mobile.sidebarPosition == 'top' ? (`
                            display: ${filters.responsive.mobile.layout};
                            justify-content: center;
                            align-items: center;
                            flex-wrap: wrap;
                        `) : (``)}
                    }
                    .listing-container .filters-side .filters-container .filters-wrapper .filter-block {
                        ${filters.responsive.mobile.sidebarPosition == 'top' ? (`
                            margin-left: ${filters.responsive.mobile.filtersSpacing / 2}px;
                            margin-right: ${filters.responsive.mobile.filtersSpacing / 2}px;
                        `) : (`
                            margin-top: ${filters.responsive.mobile.filtersSpacing / 2}px;
                            margin-bottom: ${filters.responsive.mobile.filtersSpacing / 2}px;
                        `)}
                    }
                    
                    .listing-container .filters-side .filters-container .filters-wrapper .filter-block .filter-title {
                        margin-bottom: ${filters.responsive.mobile.titleSpacing}px;
                    }
                    
                    ${filters.shared.enableButton && (`
                        .listing-container .filters-side .filters-container .filters-wrapper .filter-button {
                            width: ${filters.responsive.mobile.button.position == 'below' ? '100%' : 'fit-content'};
                        }
                        .listing-container .filters-side .filters-container .filters-wrapper .filter-button button {
                            outline: none;
                            font-size: ${filters.responsive.mobile.button.fontSize}px;
                            background: ${filters.responsive.mobile.button.background};
                            color: ${filters.responsive.mobile.button.textColor};
                            font-weight: ${filters.responsive.mobile.button.fontWeight};
                            border: none;
                            border-radius: ${filters.responsive.mobile.button.borderRadius.value}${filters.responsive.mobile.button.borderRadius.measure};
                            padding: ${filters.responsive.mobile.button.spacing.padding.value.top}px ${filters.responsive.mobile.button.spacing.padding.value.right}px
                            ${filters.responsive.mobile.button.spacing.padding.value.bottom}px ${filters.responsive.mobile.button.spacing.padding.value.left}px;
                            margin: ${filters.responsive.mobile.button.spacing.margin.value.top}px ${filters.responsive.mobile.button.spacing.margin.value.right}px
                            ${filters.responsive.mobile.button.spacing.margin.value.bottom}px ${filters.responsive.mobile.button.spacing.margin.value.left}px;
                        }
                    `)}
                    
                    .listing-container .filters-side .filter-field.filter-search input {
                        width: 100%;
                    }
                    
                    .listing-container .preview-container {
                        ${(filters.responsive.mobile.sidebarPosition != 'moveLeft'
                            && filters.responsive.mobile.sidebarPosition != 'moveRight'
                            && filters.responsive.mobile.sidebarPosition != 'top') && `
                            width: calc(100% - ${(parseInt(filters.responsive.mobile.filterWidth.value) + 30)}${filters.responsive.mobile.filterWidth.measure});
                        `}
                    }
                }
            `;
            //console.log(styles)
            return styles;
        }
    }

    const buildPostBlockStyles = (assignedFields, resolutions) => {
        const fields = [
            ...assignedFields.current.fsection,
            ...assignedFields.current.lsection
        ];
        let styles = '';

        let responsiveGlobal = {
            desktop: '',
            tablet: '',
            mobile: ''
        };

        fields.forEach(field => {
            if (!field.options) return;

            const selector = `.preview-container .${field.key}-proto`;
            let responsiveSelector = {
                desktop: '',
                tablet: '',
                mobile: ''
            };

            Object.keys(field.options).forEach(optionKey => {
                const option = field.options[optionKey];

                if (option.responsive) {
                    Object.keys(resolutions).forEach(frame => {
                        const values = option.values?.[frame];
                        if (!values) return;

                        if (optionKey === 'padding' || optionKey === 'margin') {
                            const { top, right, bottom, left } = values;
                            responsiveSelector[frame] += `${option.param}: ${top}${option.measure} ${right}${option.measure} ${bottom}${option.measure} ${left}${option.measure}; `;
                        } else {
                            responsiveSelector[frame] += `${option.param}: ${values}${option.measure || ''}; `;
                        }
                    });
                } else {
                    responsiveSelector.desktop += `${option.param}: ${option.value}${option.measure || ''}; `;
                }
            });

            Object.entries(responsiveSelector).forEach(([frame, value]) => {
                if (!value) return;

                if (frame !== 'desktop') {
                    responsiveGlobal[frame] += `@media screen and (max-width: ${resolutions[frame]}) {\n${selector} { ${value} }\n}\n`;
                } else {
                    responsiveGlobal.desktop += `${selector} { ${value} }\n`;
                }
            });
        });

        // Собираем весь стиль
        Object.values(responsiveGlobal).forEach(cssBlock => {
            styles += cssBlock;
        });

        console.log(styles);
        return styles;
    };


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