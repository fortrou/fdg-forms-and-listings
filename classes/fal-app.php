<?php
require_once FDG_FORMS_LISTINGS_PLUGIN_PATH . '/classes/fal-actions.php';
class Fal_App
{

    private $asyncActions;

    public function __construct() {
        $this->init();
        $this->run_actions();
    }

    public function init()
    {
        $this->asyncActions = new Fal_Actions();
    }

    public function run_actions()
    {
        add_action('init', [$this, 'register_post_types']);
        add_action('admin_menu', [$this, 'add_fil_configurations']);

    }

    public function add_fil_configurations()
    {
        add_menu_page('Fil Forms', 'Fil Forms and Listings', 'manage_options', 'fil-forms', 'callback_function', 'dashicons-feedback');

        add_submenu_page(
            'fil-forms',
            'FiL Forms settings',
            'FiL Forms',
            'manage_options',
            'fil-forms-settings',
            [$this, 'render_fil_forms'],
            'dashicons-admin-generic',
            21
        );

        add_submenu_page(
            'fil-forms',
            'FiL Listings settings',
            'FiL Listings',
            'manage_options',
            'fil-listings-settings',
            [$this, 'render_fil_listings'],
            'dashicons-admin-generic',
            21
        );

        add_action('admin_head', function () {
            remove_submenu_page('fil-forms', 'fil-forms');
        });

    }

    public function render_fil_forms()
    {
        require_once FDG_FORMS_LISTINGS_PLUGIN_PATH . '/templates/forms-handler.php';
    }

    public function render_fil_listings()
    {
        require_once FDG_FORMS_LISTINGS_PLUGIN_PATH . '/templates/listings-handler.php';
    }
    public function register_post_types()
    {
        register_post_type('fdg_forms', [
            'labels' => [
                'name' => 'Fil Forms',
                'singular_name' => 'Form',
            ],
            'public' => false,
            'show_ui' => false,
            'menu_position' => 20,
            'menu_icon' => 'dashicons-admin-post',
            'supports' => ['title', 'editor'],
            'has_archive' => true,
        ]);

        register_post_type('fdg_listings', [
            'labels' => [
                'name' => 'Fil Listings',
                'singular_name' => 'Listing',
            ],
            'public' => false,
            'show_ui' => false,
            'menu_position' => 20,
            'menu_icon' => 'dashicons-admin-post',
            'supports' => ['title', 'editor'],
            'has_archive' => true,
        ]);
    }
}