<?php

if( !defined( 'TMPL_URI' ) ) define( 'TMPL_URI', get_template_directory_uri() );

add_theme_support( 'post-thumbnails' );

register_nav_menu('mainmenu', 'Main Navigation');
show_admin_bar(false);
add_action('init', 'my_add_excerpts_to_pages');
?>