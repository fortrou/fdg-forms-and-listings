<div class="post-item">
    <div class="left-side">
        <?php
            do_action('fdg_field_set_render', $fields['fsection'], $postData);
        ?>
    </div>
    <?php if ($is_block): ?>
        <div class="content-side">
            <?php
                do_action('fdg_field_set_render', $fields['fsection'], $postData);
            ?>
        </div>
    <?php endif; ?>
</div>