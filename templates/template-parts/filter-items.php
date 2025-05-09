<?php
    foreach ($filters as $key => $filter):
?>
    <div class="filter-block">
        <div class="filter-item">
            <div class="filter-title">
                <?php echo $filter['label']; ?>
            </div>
            <div class="filter-field">
                <?php if ($filter['type'] == 'search'): ?>
                    <input type="text" name="filter[<?php echo $key; ?>]">
                <?php elseif ($filter['type'] == 'dropdown'): ?>
                    <select name="filter[<?php echo $key; ?>]">
                        <option value="">Choose <?php echo $filter['label']; ?></option>
                        <?php
                            $options = $this->maybe_get_options( $key );
                            if ($options):
                                foreach ($options as $option):
                        ?>
                                    <option value="<?php echo $option; ?>"><?php echo $option; ?></option>
                        <?php
                                endforeach;
                            endif;
                        ?>
                    </select>
                <?php endif; ?>
            </div>
        </div>
    </div>

<?php
    endforeach;