<?php
class Fal_Filter_Templatter
{

    private $filterData = [];
    public function __construct($params)
    {
        $this->filterData = $params;
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
}