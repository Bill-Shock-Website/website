<?php add_action('init', 'create_banner', 0);

function create_banner() {
    $labels = array(
        'name' => _x('Banners', 'post type general name'),
        'singular_name' => _x('Banner', 'post type singular name'),
        'add_new' => _x('Add Banner', 'Banner'),
        'add_new_item' => __('Add Banner'),
        'edit_item' => __('Edit Banner'),
        'new_item' => __('New Banner'),
        'view_item' => __('View Banner'),
        'search_items' => __('Search Banner'),
        'not_found' => __('No Banner found'),
        'not_found_in_trash' => __('No Banner found in Trash'),
        'parent_item_colon' => ''
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'banner','with_front' => FALSE,),
        'capability_type' => 'post',
        'hierarchical' => true,
        'menu_position' => 7,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'page-attributes')
    );

    register_post_type('banner', $args);
     register_taxonomy("banner_cat", "banner", array("hierarchical" => true,
        "label" => "Banner Categories",
        "singular_label" => "Banner",
        'rewrite' => array('slug' => 'banner','with_front' => FALSE,),
        "query_var" => true,
        "show_ui" => true
            )
    ); 

}
?>