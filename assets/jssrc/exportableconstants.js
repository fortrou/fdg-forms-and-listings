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

export const resolutions = {
    tablet: 1100,
    mobile: 767
}

export const frameMeasures = {
    desktop: '100%',
    tablet: '820px',
    mobile: '375px'
}
export const assignedFields = {
    fsection: [],
    lsection: []
};

export const availableFilterFields = [];

export const filters ={
    shared: {
        enable: true,
        filterType: 'async',
        filtersBackground: '#ffffff',
        enabledFilters: [
            /*{
                type: 'search',
                field: 'post_title',
                params: {},
                list: []
            }*/
        ]
    },
    responsive: {
        desktop: {
            position: 'sidebar',
            sidebarPosition: 'left',
            columnGap: 30,
            rowGap: 30,
            layout: 'flex',
            gridColumns: 5,
            flexDirection: 'row',
            filterWidth: {
                measure: 'px',
                value: 300
            },
            borderRadius: {
                measure: 'px',
                value: 12
            },
            blockPadding: {
                measure: 'px',
                value: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            },
            blockMargin: {
                measure: 'px',
                value: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
        },
        tablet: {
            position: 'sidebar',
            sidebarPosition: 'moveLeft',
            columnGap: 30,
            rowGap: 30,
            layout: 'flex',
            gridColumns: 3,
            flexDirection: 'row',
            filterWidth: {
                measure: 'px',
                value: 300
            },
            borderRadius: {
                measure: 'px',
                value: 12
            },
            blockPadding: {
                measure: 'px',
                value: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            },
            blockMargin: {
                measure: 'px',
                value: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
        },
        mobile: {
            position: 'sidebar',
            sidebarPosition: 'moveLeft',
            columnGap: 30,
            rowGap: 30,
            layout: 'flex',
            gridColumns: 1,
            flexDirection: 'column',
            filterWidth: {
                measure: 'px',
                value: 300
            },
            borderRadius: {
                measure: 'px',
                value: 12
            },
            blockPadding: {
                measure: 'px',
                value: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            },
            blockMargin: {
                measure: 'px',
                value: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            }
        }
    }
}

export const styles = {
    shared: {
        type: 'grid',
        postType: 'post',
        itemsBorderColor: '#ffffff',
        itemsBorderRadius: 0,
        itemsBorderWidth: 0,
        postDisplay: 'flex',
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

            listingWidth: {
                measure: '%',
                value: 100
            },
            padding: { top: 0, right: 0, bottom: 0, left: 0 },
            imageSize: { width: '100%', height: 'auto' },
            imageMargin: { top: 0, right: 0, bottom: 0, left: 0 },
            contentPadding: { top: 0, right: 0, bottom: 0, left: 0 },
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },

        tablet: {
            gridColumns: 2,

            gridGap: 20,
            rowGap: 20,

            listingWidth: {
                measure: '%',
                value: 100
            },

            padding: { top: 0, right: 0, bottom: 0, left: 0 },
            imageSize: { width: '100%', height: 'auto' },
            imageMargin: { top: 0, right: 0, bottom: 0, left: 0 },
            contentPadding: { top: 0, right: 0, bottom: 0, left: 0 },
            flexDirection: '',
            justifyContent: '',
            alignItems: '',
        },

        mobile: {
            gridColumns: 1,

            gridGap: 12,
            rowGap: 12,

            listingWidth: {
                measure: '%',
                value: 100
            },

            padding: { top: 0, right: 0, bottom: 0, left: 0 },
            imageSize: { width: '100%', height: 'auto' },
            imageMargin: { top: 0, right: 0, bottom: 0, left: 0 },
            contentPadding: { top: 0, right: 0, bottom: 0, left: 0 },
            flexDirection: '',
            justifyContent: '',
            alignItems: '',
        },
    }
};
