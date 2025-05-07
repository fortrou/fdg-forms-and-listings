import {useFieldsContext} from "../useFieldContext";
import {useEffect, useRef, useState} from "@wordpress/element";
import {resolutions} from "../exportableconstants";

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
        frameMeasures,
        updatePostType,
        setMeasure,
        updateOption,
        addOptionToImageArea,
        buildPostBlockStyles,
        frame,
        posts,
        postTypes,
        formRef,
        submitPreviewForm,
    } = useFieldsContext();

    const previewURL = new URL('/wp-admin/admin.php?page=fal-preview', window.location.origin);

    const config= {
        post_type: styles.current.shared.postType,
        display: styles.current.shared.type,
        blockLayout: styles.current.shared.useTwoSection,
        perPage: styles.current.shared.perPage,
        assignedFields: assignedFields,
        enableFilters: filters.current.shared.enable
    };

    const [formReady, setFormReady] = useState(false);

    useEffect(() => {
        submitPreviewForm(formRef)
    }, []);

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
                className={'preview-iframe'}
                title="FAL Preview"
                width={`${frameMeasures[frame]}`}
                height="1000"
                style={{ border: '1px solid #ccc', transition: 'width 0.3s' }}
                onLoad={() => setFormReady(true)}
            />
        </>
    )
}