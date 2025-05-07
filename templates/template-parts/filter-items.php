<?php
    foreach ($filters as $key => $filter):
?>
    <div class="filter-block">
        <div class="filter-item">
            <div class="filter-title">
                <?php echo $filter['field']; ?>
            </div>
            <div class="filter-field">
                <?php if ($filter['type'] == 'search'): ?>
                    <input type="text" name="filter[<?php echo $key; ?>]">
                <?php endif; ?>
            </div>
        </div>
    </div>

<?php
    endforeach;