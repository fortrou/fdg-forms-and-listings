<?php
// Пример генерации динамического HTML превью
$filters = json_decode(stripslashes($_GET['filters'] ?? '[]'), true);
$styles = json_decode(stripslashes($_GET['styles'] ?? '[]'), true);
$configs = json_decode(stripslashes($_GET['configs'] ?? '[]'), true);

$stylesheet = $_GET['stylesheet'] ?? '';

$posts = get_posts([
    'post_type' => 'post',
    'numberposts' => 5,
]);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        <?php echo $stylesheet; ?>
    </style>
</head>
<body>
<div class="fal-preview-container <?php echo esc_attr($styles['current']['shared']['type'] ?? ''); ?>">
    <?php foreach ($posts as $post): ?>
        <div class="post-item">
            <div class="left-side">
                <?php foreach ($filters['fsection'] as $field): ?>
                    <div class="field"><?php echo esc_html(get_post_meta($post->ID, $field['key'], true)); ?></div>
                <?php endforeach; ?>
            </div>
            <?php if (!empty($styles['current']['shared']['useTwoSection'])): ?>
                <div class="content-side">
                    <?php foreach ($filters['lsection'] as $field): ?>
                        <div class="field"><?php echo esc_html(get_post_meta($post->ID, $field['key'], true)); ?></div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    <?php endforeach; ?>
</div>
</body>
</html>
