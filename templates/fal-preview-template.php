<?php
// Пример генерации динамического HTML превью
$filters = json_decode(stripslashes($_POST['filters'] ?? '[]'), true);
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
                <?php if (!empty($filters)): ?>
                    <?php foreach ($filters as $filter): ?>
                    <?php endforeach; ?>
                <?php endif; ?>
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
                                    <?php if ($field['key'] == 'thumbnail'): ?>
                                        <div class="<?php echo $field['key'] ?>-proto image-wrapper field">
                                            <img src="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>" alt="" />
                                        </div>
                                    <?php else: ?>
                                        <?php if ($postData[$field['key']]): ?>
                                        <div class="<?php echo $field['key'] ?>-proto field"><?php echo $postData[$field['key']]; ?></div>
                                        <?php endif; ?>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            </div>
                            <?php if (!empty($configs['blockLayout'])): ?>
                                <div class="content-side">
                                    <?php foreach ($configs['assignedFields']['lsection'] as $field): ?>
                                        <div class="field"><?php echo esc_html(get_post_meta($post->ID, $field['key'], true)); ?></div>
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
