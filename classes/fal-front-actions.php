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

        add_filter('fdg_fal_post_fields', [$this, 'get_post_data_fields'], 10, 2);
    }

    public function render_listing_filters($filters)
    {
        $this->listingTemplatter->setFilterData($filters);
        $this->listingTemplatter->displayFilters();
    }

    public function render_listing_post($config, $pid = 0)
    {
        var_dump($config['assignedFields']);
        $postData = [
            'post_title' => get_the_title(),
            'post_excerpt' => get_the_excerpt(),
        ];
        $this->listingTemplatter->renderPost($postData, $config['assignedFields'], $config['blockLayout']);
    }

    public function get_data_by_id($pid = 0, $type = "post")
    {
        if ($pid == 0 || $type == "") return [];
        return apply_filters('fdg_fal_' . $type . '_fields', [], $pid);
    }

    public function get_post_data_fields(&$fields, $id)
    {
        $post = get_post($id);
        if (!$post) return;

        $standard_fields = [
            'title'      => get_the_title($post),
            'excerpt'    => get_the_excerpt($post),
            'content'    => $post->post_content,
            'slug'       => $post->post_name,
            'thumbnail'  => get_the_post_thumbnail_url($post, 'full'),
            'author'     => get_the_author_meta('display_name', $post->post_author),
            'date'       => get_the_date('', $post),
            'permalink'  => get_permalink($post),
        ];

        foreach ($standard_fields as $key => $value) {
            $fields[$key] = $value;
        }

        $custom_fields = get_post_meta($id);
        foreach ($custom_fields as $key => $value) {
            if (!is_protected_meta($key, 'post')) {
                $fields[$key] = maybe_unserialize($value[0]);
            }
        }
    }


    public function get_users_data_fields(&$fields, $id)
    {
        $user = get_userdata($id);
        if (!$user) return;

        $standard_fields = [
            'ID'              => $user->ID,
            'user_login'      => $user->user_login,
            'user_email'      => $user->user_email,
            'user_nicename'   => $user->user_nicename,
            'display_name'    => $user->display_name,
            'user_url'        => $user->user_url,
            'user_registered' => $user->user_registered,
        ];

        foreach ($standard_fields as $key => $value) {
            $fields[$key] = $value;
        }

        $meta_fields = get_user_meta($id);
        foreach ($meta_fields as $key => $value) {
            if (!is_protected_meta($key, 'user')) {
                $fields[$key] = maybe_unserialize($value[0]);
            }
        }
    }


    public function get_categories_data_fields()
    {

    }
}