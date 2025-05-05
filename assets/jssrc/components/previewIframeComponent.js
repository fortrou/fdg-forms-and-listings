import {useFieldsContext} from "../useFieldContext";
import {useEffect, useRef, useState} from "@wordpress/element";
import {assignedFields, resolutions} from "../exportableconstants";

export default function PreviewIframeComponent()
{
    const {
        availableFields,
        setAvailableFields,
        styles,
        filters,
        availableFilterFields,
        stylesString,
        resolutions,
        assignedFields,
        updatePostType,
        setMeasure,
        updateOption,
        addOptionToImageArea,
        buildPostBlockStyles,
        frame,
        posts,
        postTypes
    } = useFieldsContext();

    const previewURL = new URL('/wp-admin/admin.php?page=fal-preview', window.location.origin);
    const config= {
        post_type: styles.current.shared.postType,
        display: styles.current.shared.type,
        blockLayout: styles.current.shared.useTwoSection,
        perPage: styles.current.shared.perPage,
        assignedFields: assignedFields,
    };

    const formRef = useRef(null);
    const timeoutRef = useRef(null);
    const [formReady, setFormReady] = useState(false);


    useEffect(() => {
        if (!formRef.current) return;

        clearTimeout(timeoutRef.current);

        // Debounce на 500мс
        timeoutRef.current = setTimeout(() => {
            formRef.current.submit();
        }, 500);

        return () => clearTimeout(timeoutRef.current);
    }, [styles, filters]);

    return (
        <>
            <form
                ref={formRef}
                method="POST"
                action="/wp-admin/admin-post.php?action=fal_preview"
                target="falPreview"
                style={{ display: 'none' }}
                onSubmit={() => setFormReady(false)}
            >
                <input type="hidden" name="config" value={JSON.stringify(config)} />
                <input type="hidden" name="filters" value={JSON.stringify(filters.current.shared.enabledFilters)} />
                <input type="hidden" name="stylesheet" value={encodeURIComponent(stylesString)} />
            </form>

            <iframe
                name="falPreview"
                title="FAL Preview"
                width='1000px'
                height="1000"
                style={{ border: '1px solid #ccc', transition: 'width 0.3s' }}
                onLoad={() => setFormReady(true)}
            />
        </>
    )
}