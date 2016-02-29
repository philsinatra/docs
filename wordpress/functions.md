# functions

Some helpful functions for WordPress.

## Admin Bar
Hide the admin bar at all times:

```php
/**
 * Hide the admin bar
 */
show_admin_bar(0);
```

## Thumbnails
Enable thumbnail images

```php
/**
 * Enable thumbnail images
 */
 add_theme_support( 'post-thumbnails' );
```

## Menus
Register custom menu(s)

```php
/**
 * Register WP menu
 * @link https://codex.wordpress.org/Navigation_Menus
 */
function register_my_menus() {
  register_nav_menus(
    array(
      'header-menu' => __( 'Header Menu' ),
      'footer-menu' => __( 'Footer Menu' )
    )
  );
}
add_action( 'init', 'register_my_menus' );
```

## Navigation
Add a _Home_ link to the primary navigation

```php
/**
 * Add 'Home' link to primary navigation
 */
function home_page_menu_args( $args ) {
  $args['show_home'] = true;
  return $args;
}
add_filter( 'wp_page_menu_args', 'home_page_menu_args' );
```


## Templates
Add a variable to the page that outputs the current WP template file being used. Once these functions are defined within the template, you can output the value with a simple echo: 

```php
<!-- TEMPLATE USED: <?php get_current_template( true ); ?> -->
```

```php
/**
 * Define current template file
 *
 * Create a global variable with the name of the current
 * theme template file being used.
 *
 * @param $template The full path to the current template
 * @link http://www.kevinleary.net/get-current-theme-template-filename-wordpress/
 */
function define_current_template( $template ) {
    $GLOBALS['current_theme_template'] = basename($template);

    return $template;
}
add_action('template_include', 'define_current_template', 1000);

/**
 * Get Current Theme Template Filename
 *
 * Get's the name of the current theme template file being used
 *
 * @global $current_theme_template Defined using define_current_template()
 * @param $echo Defines whether to return or print the template filename
 * @return The name of the template filename, including .php
 * @link http://www.kevinleary.net/get-current-theme-template-filename-wordpress/
 */
function get_current_template( $echo = false ) {
    if ( !isset( $GLOBALS['current_theme_template'] ) ) {
        trigger_error( '$current_theme_template has not been defined yet', E_USER_WARNING );
        return false;
    }
    if ( $echo ) {
        echo $GLOBALS['current_theme_template'];
    }
    else {
        return $GLOBALS['current_theme_template'];
    }
}
```

## Search
Include _tags_ in search results.

```php
/**
 * Include tags in search results
 * @link http://webtillerdesigns.com/include-post-tags-in-search/
 */
function custom_search_where($where){
  global $wpdb;
  if (is_search())
    $where .= "OR (t.name LIKE '%".get_search_query()."%' AND {$wpdb->posts}.post_status = 'publish')";
  return $where;
}

function custom_search_join($join){
  global $wpdb;
  if (is_search())
    $join .= "LEFT JOIN {$wpdb->term_relationships} tr ON {$wpdb->posts}.ID = tr.object_id INNER JOIN {$wpdb->term_taxonomy} tt ON tt.term_taxonomy_id=tr.term_taxonomy_id INNER JOIN {$wpdb->terms} t ON t.term_id = tt.term_id";
  return $join;
}

function custom_search_groupby($groupby){
  global $wpdb;

  // we need to group on post ID
  $groupby_id = "{$wpdb->posts}.ID";
  if(!is_search() || strpos($groupby, $groupby_id) !== false) return $groupby;

  // groupby was empty, use ours
  if(!strlen(trim($groupby))) return $groupby_id;

  // wasn't empty, append ours
  return $groupby.", ".$groupby_id;
}

add_filter('posts_where','custom_search_where');
add_filter('posts_join', 'custom_search_join');
add_filter('posts_groupby', 'custom_search_groupby');
```