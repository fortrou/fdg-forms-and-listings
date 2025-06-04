<?php
class Fal_Filter_Templatter
{

    private $filterData = [];
    public function __construct()
    {
    }

    public function setFilters($filters) {
        $this->filterData = $filters;
    }

    public function displayFilters()
    {
        $filters = $this->filterData;
        require_once FDG_FORMS_LISTINGS_PLUGIN_PATH . '/templates/template-parts/filter-items.php';
    }

    public function maybe_get_options($filterKey, $postType = 'post', $ignore = '') {
        global $wpdb;

        $results = $wpdb->get_col(
            $wpdb->prepare("
            SELECT DISTINCT pm.meta_value
            FROM {$wpdb->postmeta} pm
            INNER JOIN {$wpdb->posts} p ON p.ID = pm.post_id
            WHERE pm.meta_key = %s
              AND p.post_type = %s
              AND p.post_status = 'publish'
              AND pm.meta_value != ''
        ", $filterKey, $postType)
        );

        // Если нужно, исключи значение $ignore
        if (!empty($ignore)) {
            $results = array_filter($results, function($val) use ($ignore) {
                return $val !== $ignore;
            });
        }

        return array_values(array_unique($results));
    }

    public function process_fields($fields, $postData) {
        foreach ($fields as $field) {
            if ($field['preType'] && method_exists($this, 'post_' . $field['preType'] . '_field')) {
                call_user_func([$this, 'post_' . $field['preType'] . '_field'], $field, $postData);
            }
        }
    }

    public function post_thumbnail_field($field, $postData) {
    ?>
            <div class="<?php echo $field['key'] ?>-proto image-wrapper field">
                <img src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>" alt="" />
            </div>
    <?php

    }
    public function post_post_title_field($field, $postData) {
        ?>
        <div class="<?php echo $field['key'] ?>-proto field"><?php echo $postData[$field['preType']]; ?></div>
        <?php

    }
    public function post_post_excerpt_field($field, $postData) {
        ?>
        <div class="<?php echo $field['key'] ?>-proto field"><?php echo $postData[$field['preType']]; ?></div>
        <?php
    }

    public function post_button_field($field, $postData) {
        $link = str_replace('{{permalink}}', get_permalink($postData->ID), $field['properties']['url_format']['content']);
        ?>
        <div class="link-field field">
            <a class="<?php echo $field['key'] ?>-proto" href="<?php echo $link; ?>"><?php echo $field['properties']['text']['content']; ?></a>
            <?php echo $postData[$field['preType']]; ?>
        </div>
        <?php
    }


}