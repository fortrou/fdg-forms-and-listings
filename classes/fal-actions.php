<?php
require_once FDG_FORMS_LISTINGS_PLUGIN_PATH . '/classes/fal-filter-templatter.php';

class Fal_Actions
{
    public function __construct()
    {
        $this->run_async_actions();
    }

    public function run_async_actions()
    {
        add_action('wp_ajax_add_listing_post', [$this, 'add_listing_post']);
        add_action('wp_ajax_get_fil_demo_posts_listing', [$this, 'get_post_listing_data']);
        add_action('wp_ajax_get_fil_fetchable_posttypes', [$this, 'get_fil_fetchable_posttypes']);
        add_action('wp_ajax_fdg_fil_store_listing', [$this, 'fdg_fil_store_listing']);

        add_action('admin_post_fal_preview', [$this, 'fal_render_preview_page']);

        add_filter('fdg_fil_default_keys_editor', [$this, 'get_current_fields'], 10, 2);
    }

    public function fdg_fil_store_listing()
    {
        $styles = str_replace([ ' ;', '; '], ';', str_replace([': ', ' :'], ':', str_replace(["\n", "\r", '  '], '', $_POST['styles'])));
        $listing_id = $_POST['listing_id'];

        $config_raw = stripslashes($_POST['config']);
        $config = json_decode($config_raw, true);
        $filters_raw = stripslashes($_POST['enabledFilters']);
        $filters = json_decode($filters_raw, true);
        $config['filters']['shared']['enabledFilters'] = $filters;

        update_post_meta($listing_id, 'stylesheet_content', $styles);
        update_post_meta($listing_id, 'config_styles', $config['styles']);
        update_post_meta($listing_id, 'config_filters', $config['filters']);
        update_post_meta($listing_id, 'config_fields', $config['fields']);
    }

    public function get_listing_configs($listing_id)
    {
        return [
            'styles' => get_post_meta($listing_id, 'config_styles', true),
            'filters' => get_post_meta($listing_id, 'config_filters', true),
            'fields' => get_post_meta($listing_id, 'config_fields', true),
        ];
    }

    public function get_current_fields($state, $id)
    {
        if (get_post_meta($id, 'assigned_fields', true)) {
            return get_post_meta($id, 'assigned_fields', true);
        }
        return $state;
    }

    public function fal_render_preview_page() {
        require_once FDG_FORMS_LISTINGS_PLUGIN_PATH . '/templates/fal-preview-template.php';
    }

    public function get_fil_fetchable_posttypes()
    {
        $post_types = get_post_types([
            'public' => true,
            'publicly_queryable' => true,
            '_builtin' => false
        ], 'names');

        $post_types[] = 'post';
        $post_types[] = 'page';
        $post_types[] = 'users';

        $post_types_fields = [];

        foreach ($post_types as $pt) {
            $post_types_fields[$pt] = $this->get_all_custom_meta_keys_for_post_type($pt);
        }

        $filters = [];

        foreach ($post_types as $pt) {
            $filters[$pt] = [];

            if ($pt === 'users') {
                global $wp_roles;
                $roles = $wp_roles->roles;

                $filters[$pt][] = [
                    'type' => 'select',
                    'label' => 'User role',
                    'field' => 'role',
                    'source' => 'role',
                    'options' => array_map(function ($key, $data) {
                        return [
                            'value' => $key,
                            'label' => translate_user_role($data['name']),
                        ];
                    }, array_keys($roles), $roles),
                ];

            } else {
                // Авторы
                $authors = get_users(['who' => 'authors']);
                $filters[$pt][] = [
                    'type' => 'select',
                    'label' => 'Author',
                    'field' => 'author',
                    'source' => 'core',
                    'options' => array_map(function ($user) {
                        return [
                            'value' => $user->ID,
                            'label' => $user->display_name
                        ];
                    }, $authors),
                ];

                // Таксономии
                $taxonomies = get_object_taxonomies($pt, 'objects');
                foreach ($taxonomies as $tax) {
                    $terms = get_terms([
                        'taxonomy' => $tax->name,
                        'hide_empty' => false
                    ]);

                    $filters[$pt][] = [
                        'type' => 'multi-select',
                        'label' => $tax->label,
                        'field' => $tax->name,
                        'source' => 'taxonomy',
                        'options' => array_map(function ($term) {
                            return [
                                'value' => $term->term_id,
                                'label' => $term->name
                            ];
                        }, $terms)
                    ];
                }
            }
        }

        wp_send_json_success([
            'post_types' => $post_types,
            'filter_fields' => $post_types_fields,
            'query_params' => $filters,
        ]);
    }

    public function get_post_listing_data()
    {
        $listingId = $_REQUEST['listing_id'];
        $post_type = $_REQUEST['post_type'];

        $basicOptionsSet = apply_filters('modify_options_set', $this->getPropertiesSet());

        $fieldsList = [
            'image' => [
                'associatedMeta' => '',
                'properties' => [],
                'options' => [],
                'key' => 'fdl_' . base_convert(microtime(true) * 1000, 10, 36) . substr(str_shuffle(base_convert(mt_rand(), 10, 36)), 0, 5),
                'preType' => 'thumbnail',
                'type' => 'image',
            ],
            'title' => [
                'associatedMeta' => '',
                'properties' => [
                    "tag" => [
                        'label' => 'HTML tag',
                        'type' => 'select',
                        'options' => [
                            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span'
                        ],
                        'content' => 'div'
                    ]
                ],
                'options' => [],
                'key' => 'fdl_' . base_convert(microtime(true) * 1000, 10, 36) . substr(str_shuffle(base_convert(mt_rand(), 10, 36)), 0, 5),
                'preType' => 'post_title',
                'type' => 'text',
            ],
            'content' => [
                'associatedMeta' => '',
                'properties' => [],
                'options' => [],
                'key' => 'fdl_' . base_convert(microtime(true) * 1000, 10, 36) . substr(str_shuffle(base_convert(mt_rand(), 10, 36)), 0, 5),
                'preType' => 'post_excerpt',
                'type' => 'short_text',
            ],
            'button' => [
                'properties' => [
                    'text' => [
                        'label' => 'Button text',
                        'type' => 'text',
                        'content' => 'Read more'
                    ],
                    'url_format' => [
                        'label' => 'Button URL',
                        'type' => 'text',
                        'content' => '{{permalink}}'
                    ]
                ],
                'label' => 'button',
                'options' => [],
                'key' => 'fdl_' . base_convert(microtime(true) * 1000, 10, 36) . substr(str_shuffle(base_convert(mt_rand(), 10, 36)), 0, 5),
                'preType' => 'button',
                'type' => 'button',
            ],
            'meta' => [
                'properties' => [
                    'text' => [
                        'label' => 'format',
                        'type' => 'text',
                        'content' => '{{author}} | {{date=Y-m-d}}',
                    ]
                ],
                'label' => 'Meta',
                'options' => [],
                'key' => 'fdl_' . base_convert(microtime(true) * 1000, 10, 36) . substr(str_shuffle(base_convert(mt_rand(), 10, 36)), 0, 5),
                'preType' => 'author_date',
                'type' => 'formatted_text',
            ],
        ];

        $defaultKeys = [];

        foreach ($fieldsList as $key => &$value) {
            $value['options']['margin'] = $basicOptionsSet['margin'];
            $value['options']['padding'] = $basicOptionsSet['padding'];
            $value['name'] = str_replace('_', ' ', $key);

            if ($value['type'] == 'image') {
                $value['options']['height'] = $basicOptionsSet['height'];
                $value['options']['width'] = $basicOptionsSet['width'];
                $value['options']['borderRadius'] = $basicOptionsSet['borderRadius'];

            } else if ($value['type'] == 'button') {
                $value['options']['fontSize'] = $basicOptionsSet['fontSize'];
                $value['options']['fontWeight'] = $basicOptionsSet['fontWeight'];
                $value['options']['lineHeight'] = $basicOptionsSet['lineHeight'];
                $value['options']['borderRadius'] = $basicOptionsSet['borderRadius'];
                $value['options']['background'] = $basicOptionsSet['background'];
                $value['options']['textColor'] = $basicOptionsSet['textColor'];
            } else {
                $value['options']['fontSize'] = $basicOptionsSet['fontSize'];
                $value['options']['fontWeight'] = $basicOptionsSet['fontWeight'];
                $value['options']['lineHeight'] = $basicOptionsSet['lineHeight'];
                $value['options']['textColor'] = $basicOptionsSet['textColor'];
            }
            if (in_array($key, ['thumbnail', 'post_title', 'post_excerpt', 'button'])) {
                $defaultKeys[$key] = $value;
            }
        }

        wp_send_json_success([
            'availableFields' => $fieldsList,
            'filterFields' => $this->get_all_custom_meta_keys_for_post_type($post_type),
            'defaultKeys' => apply_filters('fdg_fil_default_keys_editor', ['fsection' => $defaultKeys, 'lsection' => []], $listingId),
            'listingData' => $this->get_listing_configs($listingId),
            'userRoles' => $this->getUserRoles()
        ]);
    }

    public function get_all_custom_meta_keys_for_post_type($post_type) {
        global $wpdb;

        $meta_keys = [];

        if ($post_type === 'users') {
            // Основные поля пользователя
            $meta_keys = [
                'falu|mf|user_email',
                'falu|mf|user_nicename',
                'falu|mf|display_name',
                'falu|sf|full_name',
                'falu|sf|avatar',
            ];

            $db_keys = $wpdb->get_col("
            SELECT DISTINCT meta_key
            FROM {$wpdb->usermeta}
            WHERE meta_key NOT LIKE '\_%'
        ");
            foreach ($db_keys as $key) {
                if (in_array($key, [
                    'rich_editing',
                    'syntax_highlighting',
                    'comment_shortcuts',
                    'admin_color',
                    'use_ssl',
                    'show_admin_bar_front',
                    'locale',
                    'wp_capabilities',
                    'wp_user_level',
                    'dismissed_wp_pointers',
                    'show_welcome_panel',
                    'session_tokens',
                    'wp_dashboard_quick_press_last_post_id',
                    'community-events-location',
                    'wp_persisted_preferences',
                    'wp_user-settings',
                    'wp_user-settings-time'
                ])) continue;
                $meta_keys[] = 'falu|cf|' . $key;
            }

            // ACF поля
            if (function_exists('acf_get_field_groups')) {
                $acf_groups = acf_get_field_groups(['user_form' => 'all']);
                foreach ($acf_groups as $group) {
                    $fields = acf_get_fields($group['key']);
                    foreach ($fields as $field) {
                        if (in_array($field['type'], ['repeater', 'flexible_content', 'group'])) continue;
                        if (!empty($field['name'])) {
                            $meta_keys[] = 'falu|cf|' . $field['name'];
                        }
                    }
                }
            }

        } else {
            $meta_keys = [
                'falp|mf|post_title',
                'falp|mf|post_excerpt',
                'falp|sf|post_author',
                'falp|sf|post_date',
                'falp|sf|post_modified',
                'falp|mf|post_status',
                'falp|sf|post_thumbnail',
            ];

            $db_keys = $wpdb->get_col(
                $wpdb->prepare("
                SELECT DISTINCT pm.meta_key
                FROM {$wpdb->postmeta} pm
                INNER JOIN {$wpdb->posts} p ON p.ID = pm.post_id
                WHERE p.post_type = %s
                  AND pm.meta_key NOT LIKE %s
            ", $post_type, '\_%')
            );
            foreach ($db_keys as $key) {
                $meta_keys[] = 'falp|cf|' . $key;
            }

            // Зарегистрированные
            if (function_exists('get_registered_meta_keys')) {
                $registered_meta = get_registered_meta_keys('post', $post_type);
                foreach (array_keys($registered_meta) as $key) {
                    $meta_keys[] = 'falp|cf|' . $key;
                }
            }

            // ACF поля
            if (function_exists('acf_get_field_groups')) {
                $acf_groups = acf_get_field_groups(['post_type' => $post_type]);
                foreach ($acf_groups as $group) {
                    $fields = acf_get_fields($group['key']);
                    foreach ($fields as $field) {
                        if (in_array($field['type'], ['repeater', 'flexible_content', 'group'])) continue;
                        if (!empty($field['name'])) {
                            $meta_keys[] = 'falp|cf|' . $field['name'];
                        }
                    }
                }
            }
        }

        $meta_keys = array_unique($meta_keys);


        return $meta_keys;
    }




    public function add_listing_post()
    {
        $type = sanitize_text_field($_POST['post_type_to_add']);
        $name = sanitize_text_field($_POST['fil_item_name']);

        $post = wp_insert_post([
            'post_type' => $type,
            'post_title' => $name,
            'post_status' => 'publish',
        ]);

        if (!is_wp_error($post)) {
            wp_send_json_success([
                'status' => 'success',
                'pid' => $post
            ]);
        }
        else {
            wp_send_json_error([
                'status' => 'error',
            ]);
        }
    }

    public function getUserRoles()
    {
        $editable_roles = get_editable_roles();
        foreach ($editable_roles as $role => $details) {
            if ($role == 'administrator') {
                continue;
            }
            $sub['role'] = esc_attr($role);
            $sub['name'] = translate_user_role($details['name']);
            $roles[] = $sub;
        }
        return $roles;
    }

    public function getPropertiesSet() {
        return [
            'width' => [
                'responsive' => true,
                'param' => 'width',
                'values' => [
                    'desktop' => [
                        'measure' => '%',
                        'set' => [
                            'value' => 100
                        ]
                    ],
                    'tablet' => [
                        'measure' => '%',
                        'lock' => true,
                        'set' => [
                            'value' => 100
                        ]
                    ],
                    'mobile' => [
                        'measure' => '%',
                        'lock' => true,
                        'set' => [
                            'value' => 100
                        ]
                    ],
                ],
                'label' => 'Width'
            ],
            'height' => [
                'responsive' => true,
                'param' => 'height',
                'values' => [
                    'desktop' => [
                        'measure' => 'custom',
                        'set' => [
                            'value' => 'auto'
                        ]
                    ],
                    'tablet' => [
                        'measure' => 'custom',
                        'lock' => true,
                        'set' => [
                            'value' => 'auto'
                        ]
                    ],
                    'mobile' => [
                        'measure' => 'custom',
                        'lock' => true,
                        'set' => [
                            'value' => 'auto'
                        ]
                    ],
                ],
                'label' => 'Height'
            ],
            'borderRadius' => [
                'responsive' => true,
                'param' => 'border-radius',
                'values' => [
                    'desktop' => [
                        'measure' => 'px',
                        'set' => [
                            'value' => 0
                        ]
                    ],
                    'tablet' => [
                        'measure' => 'px',
                        'lock' => true,
                        'set' => [
                            'value' => 0
                        ]
                    ],
                    'mobile' => [
                        'measure' => 'px',
                        'lock' => true,
                        'set' => [
                            'value' => 0
                        ]
                    ],
                ],
                'label' => 'Border radius'
            ],
            'fontSize' => [
                'responsive' => true,
                'param' => 'font-size',
                'values' => [
                    'desktop' => [
                        'measure' => 'px',
                        'set' => [
                            'value' => 16
                        ]
                    ],
                    'tablet' => [
                        'measure' => 'px',
                        'lock' => true,
                        'set' => [
                            'value' => 16
                        ]
                    ],
                    'mobile' => [
                        'measure' => 'px',
                        'lock' => true,
                        'set' => [
                            'value' => 16
                        ]
                    ],
                ],
                'label' => 'Font size'
            ],
            'fontWeight' => [
                'values' => [
                    'desktop' => [
                        'set' => [
                            'value' => 400
                        ]
                    ],
                    'tablet' => [
                        'lock' => true,
                        'set' => [
                            'value' => 400
                        ]
                    ],
                    'mobile' => [
                        'lock' => true,
                        'set' => [
                            'value' => 400
                        ]
                    ],
                ],
                'param' => 'font-weight',
                'responsive' => true,
                'label' => 'Font weight'
            ],
            'lineHeight' => [
                'measure' => 'em',
                'responsive' => true,
                'param' => 'line-height',
                'values' => [
                    'desktop' => [
                        'measure' => 'em',
                        'set' => [
                            'value' => 1.5
                        ]
                    ],
                    'tablet' => [
                        'measure' => 'em',
                        'lock' => true,
                        'set' => [
                            'value' => 1.5
                        ]
                    ],
                    'mobile' => [
                        'measure' => 'em',
                        'lock' => true,
                        'set' => [
                            'value' => 1.5
                        ]
                    ],
                ],
                'label' => 'Line height'
            ],
            'background' => [
                'value' => '#ffffff',
                'responsive' => false,
                'param' => 'background',
                'label' => 'Background color'
            ],
            'textColor' => [
                'value' => '#000000',
                'responsive' => false,
                'param' => 'color',
                'label' => 'Text color'
            ],
            'padding' => [
                'responsive' => true,
                'param' => 'padding',
                'label' => 'Padding',
                'values' => [
                    'desktop' => [
                        'measure' => 'px',
                        'set' => [
                            'top' => 0,
                            'right' => 0,
                            'bottom' => 0,
                            'left' => 0,
                        ]
                    ],
                    'tablet' => [
                        'measure' => 'px',
                        'lock' => true,
                        'set' => [
                            'top' => 0,
                            'right' => 0,
                            'bottom' => 0,
                            'left' => 0,
                        ]
                    ],
                    'mobile' => [
                        'measure' => 'px',
                        'lock' => true,
                        'set' => [
                            'top' => 0,
                            'right' => 0,
                            'bottom' => 0,
                            'left' => 0,
                        ]
                    ],
                ]
            ],
            'margin' => [
                'responsive' => true,
                'param' => 'margin',
                'label' => 'Margin',
                'values' => [
                    'desktop' => [
                        'measure' => 'px',
                        'set' => [
                            'top' => 0,
                            'right' => 0,
                            'bottom' => 0,
                            'left' => 0,
                        ]
                    ],
                    'tablet' => [
                        'measure' => 'px',
                        'lock' => true,
                        'set' => [
                            'top' => 0,
                            'right' => 0,
                            'bottom' => 0,
                            'left' => 0,
                        ]
                    ],
                    'mobile' => [
                        'measure' => 'px',
                        'lock' => true,
                        'set' => [
                            'top' => 0,
                            'right' => 0,
                            'bottom' => 0,
                            'left' => 0,
                        ]
                    ],
                ]
            ],
        ];
    }
}