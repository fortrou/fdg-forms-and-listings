<div class="fil-crud-content">
    <?php
    $paged = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;
    $posts_per_page = 10;

    $query = new WP_Query([
        'post_type' => 'fdg_listings',
        'posts_per_page' => $posts_per_page,
        'paged' => $paged,
        'orderby' => 'date',
        'order' => 'DESC',
    ]);

    echo '<div class="wrap">';
    ?>

    <div class="manage-heading">
        <h1>Manage listings</h1>
        <div class="add-option">
            <a href="#" class="add-listing trigger-popup trigger-name-popup">
                Add listing
            </a>
        </div>
    </div>

    <?php
    echo '<table class="wp-list-table widefat fixed striped">';
    echo '<thead><tr><th>ID</th><th>Name</th><th>Date</th><th>Edit</th></tr></thead><tbody>';

    $current_url = admin_url('admin.php?page=' . $_GET['page']);

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            echo '<tr>';
            echo '<td>' . get_the_ID() . '</td>';
            echo '<td><a href="' . get_edit_post_link(get_the_ID()) . '">' . esc_html(get_the_title()) . '</a></td>';
            echo '<td>' . esc_html(get_the_date()) . '</td>';
            echo '<td><a href="' . add_query_arg('id', get_the_ID(), $current_url) . '">Edit</a></td>';
            echo '</tr>';
        }
    } else {
        echo '<tr><td colspan="4">No records found</td></tr>';
    }

    echo '</tbody></table>';

    // Пагинация
    $total_pages = $query->max_num_pages;
    if ($total_pages > 1) {
        $base_url = admin_url('admin.php?page=custom-cpt-manager');
        echo '<div class="tablenav"><div class="tablenav-pages">';
        echo paginate_links([
            'base' => add_query_arg('paged', '%#%'),
            'format' => '',
            'current' => $paged,
            'total' => $total_pages,
            'prev_text' => '&laquo;',
            'next_text' => '&raquo;',
            'type' => 'plain',
        ]);
        echo '</div></div>';
    }

    echo '</div>';

    wp_reset_postdata();
    ?>
</div>

<div class="fil-name-popup">
    <div class="popup-overlay">
    </div>
    <div class="popup-content">
        <form id="fil-content-creator">
            <div class="title">Add listing name:</div>
            <input type="hidden" name="action" value="add_listing_post">
            <input type="hidden" name="post_type_to_add" value="fdg_listings">
            <?php wp_nonce_field('add_custom_post', 'custom_post_nonce'); ?>
            <div class="input-holder">
                <input type="text" name="fil_item_name" placeholder="Listing name" required>
            </div>
            <div class="submit-holder">
                <button type="submit">Create listing</button>
            </div>
        </form>
    </div>
</div>