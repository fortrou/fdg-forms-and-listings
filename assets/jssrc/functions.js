import {useState} from "@wordpress/element";
import {
    availableFields as defaultAvailableFields,
    assignedFields as defaultAssignedFields,
    styles as defaultStyles
} from './exportableconstants';

export function useFieldsLogic() {
    const [availableFields, setAvailableFields] = useState(defaultAvailableFields);
    const [assignedFields, setAssignedFields] = useState(defaultAssignedFields);
    const [styles, setStyles] = useState(defaultStyles);

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
            console.log(wrapper)

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
    };
}