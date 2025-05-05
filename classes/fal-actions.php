<?php
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
        $posts = get_posts([
            'posts_per_page' => $_REQUEST['per_page'],
            'post_type'      => $_REQUEST['post_type'],
        ]);


        $returnList = [];

        foreach ($posts as $post) {
            $image = get_the_post_thumbnail_url($post->ID, 'full');
            $arrayEncoded = json_decode(json_encode($post), true);
            $arrayEncoded['thumbnail'] = [
                'url' => $image,
                'alt' => $post->post_title,
            ];

            unset($arrayEncoded['post_date_gmt'],
                $arrayEncoded['post_content'],
                $arrayEncoded['post_status'],
                $arrayEncoded['comment_status'],
                $arrayEncoded['ping_status'],
                $arrayEncoded['post_password'],
                $arrayEncoded['to_ping'],
                $arrayEncoded['pinged'],
                $arrayEncoded['post_modified_gmt'],
                $arrayEncoded['post_content_filtered'],
                $arrayEncoded['post_parent'],
                $arrayEncoded['guid'],
                $arrayEncoded['menu_order'],
                $arrayEncoded['post_type'],
                $arrayEncoded['post_mime_type'],
                $arrayEncoded['comment_count'],
                $arrayEncoded['filter']);
            $returnList[] = $arrayEncoded;
        }

        $keys = array_keys($returnList[0]);
        $resortedKeys = [];
        $defaultKeys = [];

        foreach ($keys as $key => $value) {
            $properties = [
                'key' => $value,
                'name' => str_replace('_', ' ', $value),
                'options' => [
                    'margin' => [
                        'measure' => 'px',
                        'value' => [
                            'top' => 0,
                            'right' => 0,
                            'bottom' => 0,
                            'left' => 0,
                        ]
                    ],
                    'padding' => [
                        'measure' => 'px',
                        'value' => [
                            'top' => 0,
                            'right' => 0,
                            'bottom' => 0,
                            'left' => 0,
                        ]
                    ]
                ]
            ];
            if ($value == 'thumbnail') {
                $properties['options']['height'] = [
                    'measure' => 'custom',
                    'value' => 'auto'
                ];

                $properties['options']['width'] = [
                    'measure' => '%',
                    'value' => '100'
                ];
            } else {
                $properties['options']['fontSize'] = [
                    'measure' => 'px',
                    'value' => 16
                ];
                $properties['options']['fontWeight'] = 400;
                $properties['options']['lineHeight'] = [
                    'measure' => 'em',
                    'value' => 1.5
                ];
            }
            $resortedKeys[$value] = $properties;
            if (in_array($value, ['thumbnail', 'post_title', 'post_excerpt'])) {
                $defaultKeys[$value] = $properties;
            }
        }

        wp_send_json_success([
            'posts' => apply_filters('demonstration_posts_listing', $returnList),
            'keys'  => $resortedKeys,
            'filterFields' => $this->get_all_custom_meta_keys_for_post_type($_REQUEST['post_type']),
            'defaultKeys' => apply_filters('fdg_fil_default_keys_editor', ['fsection' => $defaultKeys, 'lsection' => []]),
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
}