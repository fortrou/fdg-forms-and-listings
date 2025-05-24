<?php
// Пример генерации динамического HTML превью
$filters = json_decode(stripslashes($_POST['enabledFilters'] ?? '[]'), true);
$configs = json_decode(stripslashes($_POST['config'] ?? '[]'), true);

$stylesheet = urldecode($_POST['stylesheet']) ?? '';

$posts = new WP_Query([
    'post_type' => $configs['post_type'],
    'post_status' => 'publish',
    'posts_per_page' => $configs['perPage'],
]);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        <?php echo file_get_contents(FDG_FORMS_LISTINGS_PLUGIN_PATH . '/assets/build/css/style-pack-1.css'); ?>
        .configurations-container {
            height: 100vh;
        }
        <?php echo $stylesheet; ?>
    </style>
</head>
<body>
<div class="configurations-container <?php echo esc_attr($configs['display'] ?? ''); ?>">
    <div class="configurations-container">
        <div class="listing-container">
            <?php if ($configs['enableFilters']): ?>
            <div class="filters-side">
                <div class="filters-container">
                    <div class="filters-wrapper">
                        <?php if (!empty($filters)): ?>
                            <?php foreach ($filters as $filter): ?>
                            <?php
                                $filtersHolder = new Fal_Filter_Templatter($filters);
                                $filtersHolder->displayFilters();
                            ?>
                            <?php endforeach; ?>
                        <?php endif; ?>
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
                <?php if ( $posts->have_posts() ): ?>
                    <?php while ( $posts->have_posts() ):
                        $posts->the_post();
                        $postData = [
                            'post_title' => get_the_title(),
                            'post_excerpt' => get_the_excerpt(),
                        ];
                    ?>
                        <div class="post-item">
                            <div class="left-side">
                                <?php foreach ($configs['assignedFields']['fsection'] as $field): ?>
                                    <?php if ($field['preType'] == 'thumbnail'): ?>
                                        <div class="<?php echo $field['preType'] ?>-proto image-wrapper field">
                                            <img src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>" alt="" />
                                        </div>
                                    <?php else: ?>
                                        <?php if ($postData[$field['preType']]): ?>
                                        <div class="<?php echo $field['preType'] ?>-proto field"><?php echo $postData[$field['preType']]; ?></div>
                                        <?php endif; ?>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            </div>
                            <?php if ($configs['blockLayout']): ?>
                                <div class="content-side">
                                    <?php foreach ($configs['assignedFields']['lsection'] as $field): ?>
                                        <?php if ($field['preType'] == 'thumbnail'): ?>
                                            <div class="<?php echo $field['preType'] ?>-proto image-wrapper field">
                                                <img src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>" alt="" />
                                            </div>
                                        <?php else: ?>
                                            <?php if ($postData[$field['preType']]): ?>
                                                <div class="<?php echo $field['preType'] ?>-proto field"><?php echo $postData[$field['preType']]; ?></div>
                                            <?php endif; ?>
                                        <?php endif; ?>
                                    <?php endforeach; ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    <?php endwhile; ?>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>
</body>
</html>
