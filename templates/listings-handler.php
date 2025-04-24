<?php

?>
<style>
    #wpcontent {
        background: #fff;
        min-height: 100vh;
    }
</style>

<?php if ($_GET['id']): ?>
    <?php require_once FDG_FORMS_LISTINGS_PLUGIN_PATH . '/templates/listing-editor.php'; ?>
<?php else: ?>
    <?php require_once FDG_FORMS_LISTINGS_PLUGIN_PATH . '/templates/listing-list.php'; ?>
<?php endif; ?>