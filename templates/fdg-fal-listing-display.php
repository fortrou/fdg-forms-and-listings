<style>
    <?php echo file_get_contents(FDG_FORMS_LISTINGS_PLUGIN_PATH . '/assets/build/css/style-pack-1.css'); ?>
    .configurations-container {
        height: 100vh;
    }
    <?php echo $stylesheet; ?>
</style>
<div class="configurations-container <?php echo esc_attr($configs['display'] ?? ''); ?>">
    <div class="configurations-container">
        <div class="listing-container">
            <?php if ($configs['enableFilters'] && $filters): ?>
                <div class="filters-side">
                    <div class="filters-container">
                        <div class="filters-wrapper">
                            <?php
                                do_action('fdg_fal_listing_filters', $filters);
                            ?>
                            <?php if ($configs['enableButton']): ?>
                                <div class="filter-button">
                                    <button class="submit-filters" type="button" href="#"><?php echo $configs['filtersButtonText'] ?></button>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            <?php endif; ?>
            <div class="preview-container grid">
                <?php
                    var_dump($configs);die;
                ?>
                <?php if ( $posts->have_posts() ): ?>
                    <?php while ( $posts->have_posts() ):
                        $posts->the_post();
                        $postData = [
                            'post_title' => get_the_title(),
                            'post_excerpt' => get_the_excerpt(),
                        ];
                        do_action('fdg_fal_listing_posts', $configs);
                        ?>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>