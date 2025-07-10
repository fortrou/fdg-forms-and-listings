<div class="post-item">
    <div class="left-side">
        <?php
            do_action('fdg_field_set_render', $fields, $assignedFields['fsection']);
        ?>
    </div>
    <?php if ($is_block): ?>
        <div class="content-side">
            <?php
                do_action('fdg_field_set_render', $fields, $assignedFields['lsection']);
            ?>
        </div>
    <?php endif; ?>
</div>