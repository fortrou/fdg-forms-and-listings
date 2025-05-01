export const availableFields = [
    {
        key: 'thumbnail',
        name: 'thumbnail'
    },
    {
        key: 'post_title',
        name: 'post title'
    },
    {
        key: 'post_excerpt',
        name: 'post excerpt'
    }
];
export const assignedFields = {
    fsection: [],
    lsection: []
};


export const styles = {
    shared: {
        type: 'grid',
        postType: 'post',
        itemsBorderColor: '#ffffff',
        itemsBorderRadius: 0,
        itemBorderWidth: 0,
        postDisplay: 'block',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        itemsShowImages: true,
        imageBorderRadius: 0,
        currentSelectedImageField: '',
        currentSelectedContentField: '',
        useTwoSection: false,
        perPage: 9,
    },

    responsive: {
        desktop: {
            gridColumns: 3,

            gridGap: 24,
            rowGap: 24,

            padding: { top: 0, right: 0, bottom: 0, left: 0 },
            imageSize: { width: '100%', height: 'auto' },
            imageMargin: { top: 0, right: 0, bottom: 0, left: 0 },
            contentPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        },

        tablet: {
            gridColumns: 2,
            gridGap: 20,
            rowGap: 20,

            padding: { top: 0, right: 0, bottom: 0, left: 0 },
            imageSize: { width: '100%', height: 'auto' },
            imageMargin: { top: 0, right: 0, bottom: 0, left: 0 },
            contentPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        },

        mobile: {
            gridColumns: 1,
            gridGap: 12,
            rowGap: 12,

            padding: { top: 0, right: 0, bottom: 0, left: 0 },
            imageSize: { width: '100%', height: 'auto' },
            imageMargin: { top: 0, right: 0, bottom: 0, left: 0 },
            contentPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        },
    }
};
