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
        add_action('wp_ajax_get_fil_demo_posts_listing', [$this, 'get_demo_posts_listing']);
        add_action('wp_ajax_get_fil_fetchable_posttypes', [$this, 'get_fil_fetchable_posttypes']);
        add_action('admin_post_fal_preview', [$this, 'fal_render_preview_page']);

        add_filter('fdg_fil_default_keys_editor', [$this, 'get_current_fields'], 10, 3);
    }

    public function get_current_fields($state, $id, $type)
    {
        if ($type == 'posts') {
            if (get_post_meta($id, 'assigned_fields', true)) {
                return get_post_meta($id, 'assigned_fields', true);
            }
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

        wp_send_json_success([
            'post_types' => $post_types,
        ]);
    }

    public function get_demo_posts_listing()
    {
        $listingId = $_REQUEST['listing_id'];

        $basicOptionsSet = apply_filters('modify_options_set', $this->getPropertiesSet());

        $fieldsList = [
            'thumbnail' => [
                'properties' => [],
                'options' => [],
                'key' => 'fdl_' . base_convert(microtime(true) * 1000, 10, 36) . substr(str_shuffle(base_convert(mt_rand(), 10, 36)), 0, 5),
                'preType' => 'thumbnail',
                'type' => 'image',
            ],
            'post_title' => [
                'properties' => [],
                'options' => [],
                'key' => 'fdl_' . base_convert(microtime(true) * 1000, 10, 36) . substr(str_shuffle(base_convert(mt_rand(), 10, 36)), 0, 5),
                'preType' => 'post_title',
                'type' => 'text',
            ],
            'post_excerpt' => [
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

        $resortedKeys = [];
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
            'keys'  => $resortedKeys,
            'filterFields' => $this->get_all_custom_meta_keys_for_post_type($_REQUEST['post_type']),
            'defaultKeys' => apply_filters('fdg_fil_default_keys_editor', ['fsection' => $defaultKeys, 'lsection' => []], $listingId, 'post'),
        ]);
    }

    public function get_all_custom_meta_keys_for_post_type($post_type) {
        global $wpdb;

        $meta_keys = [];
        $db_keys = $wpdb->get_col(
            $wpdb->prepare("
            SELECT DISTINCT pm.meta_key
            FROM {$wpdb->postmeta} pm
            INNER JOIN {$wpdb->posts} p ON p.ID = pm.post_id
            WHERE p.post_type = %s
              AND pm.meta_key NOT LIKE %s
        ", $post_type, '\_%')
        );
        $meta_keys = array_merge($meta_keys, $db_keys);

        if (function_exists('get_registered_meta_keys')) {
            $registered_meta = get_registered_meta_keys('post', $post_type);
            $meta_keys = array_merge($meta_keys, array_keys($registered_meta));
        }

        if (function_exists('acf_get_field_groups')) {
            $acf_groups = acf_get_field_groups(['post_type' => $post_type]);
            foreach ($acf_groups as $group) {
                $fields = acf_get_fields($group['key']);
                foreach ($fields as $field) {
                    // Исключаем repeater и flexible_content
                    if (in_array($field['type'], ['repeater', 'flexible_content', 'group'])) {
                        continue;
                    }
                    if (!empty($field['name'])) {
                        $meta_keys[] = $field['name'];
                    }
                }
            }
        }

        $meta_keys = array_unique($meta_keys);
        sort($meta_keys);

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

    public function getPropertiesSet() {
        return [
            'width' => [
                'measure' => '%',
                'responsive' => true,
                'param' => 'width',
                'values' => [
                    'desktop' => [
                        'value' => 100
                    ],
                    'tablet' => [
                        'value' => 100
                    ],
                    'mobile' => [
                        'value' => 100
                    ],
                ],
                'label' => 'Width'
            ],
            'height' => [
                'measure' => 'custom',
                'responsive' => true,
                'param' => 'height',
                'values' => [
                    'desktop' => [
                        'value' => 'auto'
                    ],
                    'tablet' => [
                        'value' => 'auto'
                    ],
                    'mobile' => [
                        'value' => 'auto'
                    ],
                ],
                'label' => 'Height'
            ],
            'borderRadius' => [
                'measure' => 'px',
                'responsive' => true,
                'param' => 'border-radius',
                'values' => [
                    'desktop' => [
                        'value' => 0
                    ],
                    'tablet' => [
                        'value' => 0
                    ],
                    'mobile' => [
                        'value' => 0
                    ],
                ],
                'label' => 'Border radius'
            ],
            'fontSize' => [
                'measure' => 'px',
                'responsive' => true,
                'param' => 'font-size',
                'values' => [
                    'desktop' => [
                        'value' => 16
                    ],
                    'tablet' => [
                        'value' => 16
                    ],
                    'mobile' => [
                        'value' => 16
                    ],
                ],
                'label' => 'Font size'
            ],
            'fontWeight' => [
                'values' => [
                    'desktop' => [
                        'value' => 400
                    ],
                    'tablet' => [
                        'value' => 400
                    ],
                    'mobile' => [
                        'value' => 400
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
                        'value' => 1.5
                    ],
                    'tablet' => [
                        'value' => 1.5
                    ],
                    'mobile' => [
                        'value' => 1.5
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
                'measure' => 'px',
                'responsive' => true,
                'param' => 'padding',
                'label' => 'Padding',
                'values' => [
                    'desktop' => [
                        'top' => 0,
                        'right' => 0,
                        'bottom' => 0,
                        'left' => 0,
                    ],
                    'tablet' => [
                        'top' => 0,
                        'right' => 0,
                        'bottom' => 0,
                        'left' => 0,
                    ],
                    'mobile' => [
                        'top' => 0,
                        'right' => 0,
                        'bottom' => 0,
                        'left' => 0,
                    ],
                ]
            ],
            'margin' => [
                'measure' => 'px',
                'responsive' => true,
                'param' => 'margin',
                'label' => 'Margin',
                'values' => [
                    'desktop' => [
                        'top' => 0,
                        'right' => 0,
                        'bottom' => 0,
                        'left' => 0,
                    ],
                    'tablet' => [
                        'top' => 0,
                        'right' => 0,
                        'bottom' => 0,
                        'left' => 0,
                    ],
                    'mobile' => [
                        'top' => 0,
                        'right' => 0,
                        'bottom' => 0,
                        'left' => 0,
                    ],
                ]
            ],
        ];
    }
}