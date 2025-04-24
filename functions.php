<?php
add_action('admin_enqueue_scripts', 'fd_syndicator_admin_scripts');
function fd_syndicator_admin_scripts() {
    wp_enqueue_script(
        'fdforms_listings_scripts',
        FDG_FORMS_LISTINGS_PLUGIN_URL . '/assets/js/main.js',
        ['jquery'],
        '1.1'
    );
    wp_localize_script( 'fdforms_listings_scripts', 'fdgsyncajax', array(
        'ajax_url' => admin_url( 'admin-ajax.php' ), // URL для обработки AJAX-запросов
        'nonce'    => wp_create_nonce( 'my_ajax_nonce' ) // Защита через nonce
    ));

    wp_enqueue_script('fdg-listings-script', FDG_FORMS_LISTINGS_PLUGIN_URL . '/assets/build/js/bundle.js', ['wp-element'], null, true);
    wp_enqueue_style(
        'fdforms_listings-style',
        FDG_FORMS_LISTINGS_PLUGIN_URL . '/assets/build/css/index.css',
        [],
        '1.1'
    );
}