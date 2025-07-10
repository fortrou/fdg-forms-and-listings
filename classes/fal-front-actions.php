<?php
if ( ! defined( 'ABSPATH' ) ) exit;
require_once FDG_FORMS_LISTINGS_PLUGIN_PATH . 'classes/fal-filter-templatter.php';

class FAL_Front_Actions
{
    private $listingTemplatter;
    public function __construct()
    {
        $this->listingTemplatter = new FAL_Filter_Templatter();
        $this->run_actions();
    }

    public function run_actions()
    {
        add_action('fdg_fal_listing_filters', [ $this, 'render_listing_filters' ], 10, 1);
        add_action('fdg_fal_listing_posts', [ $this, 'render_listing_post' ], 10, 2);
        add_action('fdg_field_set_render', [$this, 'render_fields'], 10, 2);
        add_action('fdg_fal_render_field_image', [$this, 'render_image_field'], 10, 2);
        add_action('fdg_fal_render_field_text', [$this, 'render_title_field'], 10, 2);
        add_action('fdg_fal_render_field_short_text', [$this, 'render_content_field'], 10, 2);
        add_action('fdg_fal_render_field_button', [$this, 'render_button_field'], 10, 2);

        add_filter('fdg_fal_post_fields', [$this, 'get_post_data_fields'], 10, 2);
    }

    public function render_listing_filters($filters)
    {
        $this->listingTemplatter->setFilterData($filters);
        $this->listingTemplatter->displayFilters();
    }

    public function render_listing_post($config, $pid = 0)
    {
        $post_type = $config['post_type'] == 'users' ? $config['post_type'] : 'post';
        $post_type = apply_filters('fdg_fal_post_type_filter', $post_type, $config['post_type']);

        $postFields = [];
        foreach ($config['assignedFields']['fsection'] ?? [] as $value) {
            $postFields[$value['key']] = [
                'value' => $value['associatedMeta'],
                'type'  => $value['type'],
            ];

            $properties = [];
            if (!empty($value['properties'])) {
                foreach ($value['properties'] as $key => $prop) {
                    $properties[$key] = $prop['content'];
                }
            }

            $postFields[$value['key']]['properties'] = $properties;
        }

        foreach ($config['assignedFields']['lsection'] ?? [] as $value) {
            $postFields[$value['key']] = [
                'value' => $value['associatedMeta'],
                'type'  => $value['type'],
            ];

            $properties = [];
            if (!empty($value['properties'])) {
                foreach ($value['properties'] as $key => $prop) {
                    $properties[$key] = $prop['content'];
                }
            }

            $postFields[$value['key']]['properties'] = $properties;
        }
        $fields = $this->get_data_by_id($postFields, $pid, $post_type);

        $this->listingTemplatter->renderPost($fields, $config['assignedFields'], $config['blockLayout']);
    }

    public function get_data_by_id($fields, $pid = 0, $type = "post")
    {
        if ($pid == 0 || $type == "") return [];
        return apply_filters('fdg_fal_' . $type . '_fields', $fields, $pid);
    }

    public function get_post_data_fields($fields, $id)
    {
        $post = (array)get_post($id);
        if (!$post) return;
        $meta = get_post_meta($id);

        foreach ($fields as &$value) {
            $field = explode('|', $value['value']);
            if ($field[0] != 'falp') continue;
            if ($field[1] == 'mf') {
                $value['value'] = $post[$field[2]];
            } else if ($field[1] == 'cf') {
               $value['value'] = $meta[$field[2]];
            } else if ($field[1] == 'sf') {
                if ($field[2] == 'post_thumbnail') {
                    $value['value'] = get_the_post_thumbnail_url($id, 'medium');
                }
                if ($field[2] == 'post_date') {
                    $value['value'] = date(get_option('date_format'), strtotime($post[$field[2]]));
                }
                if ($field[2] == 'post_modified') {
                    $value['value'] = date(get_option('date_format'), strtotime($post[$field[2]]));
                }
                if ($field[2] == 'post_author') {
                    if ($post[$field[2]]) {
                        $user = get_userdata($post[$field[2]]);
                        $value['value'] = $user->first_name . ' ' . $user->last_name;
                    }
                }
            } else {
                $value['value'] = '';
            }
        }
        return $fields;
    }


    public function get_users_data_fields($fields, $id)
    {
        $user = get_userdata($id);
        if (!$user) return;

        $meta = get_user_meta($id);

        foreach ($fields as &$value) {
            $field = explode('|', $value['value']);
            if ($field[0] !== 'falu') continue;

            if ($field[1] === 'mf') {
                switch ($field[2]) {
                    case 'user_email':
                    case 'user_nicename':
                    case 'user_login':
                    case 'user_url':
                    case 'user_registered':
                    case 'display_name':
                        $value['value'] = $user->{$field[2]};
                        break;

                    default:
                        $value['value'] = '';
                        break;
                }

            } elseif ($field[1] === 'cf') {
                if (!empty($meta[$field[2]])) {
                    $value['value'] = maybe_unserialize($meta[$field[2]][0]);
                } else {
                    $value['value'] = '';
                }

            } elseif ($field[1] === 'sf') {
                switch ($field[2]) {
                    case 'full_name':
                        $first = get_user_meta($id, 'first_name', true);
                        $last = get_user_meta($id, 'last_name', true);
                        $value['value'] = trim($first . ' ' . $last);
                        break;

                    case 'avatar':
                        $value['value'] = get_avatar_url($id);
                        break;

                    default:
                        $value['value'] = '';
                        break;
                }

            } else {
                $value['value'] = '';
            }
        }
    }

    public function get_categories_data_fields()
    {

    }

    public function render_fields($fields, $fieldSet) {

        foreach ($fieldSet as $item) {
            $itemData = $fields[$item['key']];
            do_action('fdg_fal_render_field_' . $itemData['type'], $item, $itemData);
        }
    }

    public function render_image_field($item, $itemData) {
        if ($item['type'] != 'image' || empty($itemData['value'])) return "";
        $img = $itemData['value'];
        if (strpos($img, 'http') === false) {
            $attachment_id = (int) $img;
            $url = wp_get_attachment_url($attachment_id);

            if ($url) {
                $img = $url;
            } else {
               return "";
            }
        }
        printf('<picture class="proto-%s image-wrapper field">
                        <img src="%s"/>
                    </picture>', $item['key'], $img);
    }

    public function render_title_field($item, $itemData)
    {
        if ($item['type'] != 'text' || empty($itemData['value'])) return "";
        printf('<div class="proto-%s text-field field">
            <span class="content-holder">
                %s
            </span>    
        </div>', $item['key'], $itemData['value']);
    }
    public function render_content_field($item, $itemData)
    {
        if ($item['type'] != 'short_text' || empty($itemData['value'])) return "";
        printf('<div class="proto-%s content-field field">
            <span class="content-holder">
                %s
            </span>
        </div>', $item['key'], $itemData['value']);
    }
    public function render_button_field($item, $itemData)
    {
        if ($item['type'] != 'button' || empty($itemData['value'])) return "";
        printf('<span class="proto-%s button-field field">
            <span class="content-holder">
                <a href="%s">%s</a>
            </span>
        </span>', $item['key'], $item['properties']['text'], $itemData['value']);
    }

}