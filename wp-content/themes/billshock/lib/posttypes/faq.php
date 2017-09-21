<?php add_action('init', 'create_faq', 0);

function create_faq() {
    $labels = array(
        'name' => _x('FAQs', 'post type general name'),
        'singular_name' => _x('FAQ', 'post type singular name'),
        'add_new' => _x('Add FAQ', 'FAQ'),
        'add_new_item' => __('Add FAQ'),
        'edit_item' => __('Edit FAQ'),
        'new_item' => __('New FAQ'),
        'view_item' => __('View FAQ'),
        'search_items' => __('Search FAQ'),
        'not_found' => __('No FAQ found'),
        'not_found_in_trash' => __('No FAQ found in Trash'),
        'parent_item_colon' => ''
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'publicly_queryable' => true,
        'show_ui' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'faq','with_front' => FALSE,),
        'capability_type' => 'post',
        'hierarchical' => true,
        'menu_position' => 7,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'page-attributes')
    );

    register_post_type('faq', $args);
     register_taxonomy("faq_cat", "faq", array("hierarchical" => true,
        "label" => "FAQ Categories",
        "singular_label" => "FAQ",
        'rewrite' => array('slug' => 'faq','with_front' => FALSE,),
        "query_var" => true,
        "show_ui" => true
            )
    ); 

}
?>