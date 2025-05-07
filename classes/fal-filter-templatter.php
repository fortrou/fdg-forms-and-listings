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

}