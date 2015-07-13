# WP Theme Development

## CSS File

You need a style.css file for your theme; there’s no avoiding it. At the top of this file, you have your theme declaration, and below that, there is just a regular style sheet. You can import other style sheets or keep all your styles in style.css — that’s up to you — but you need this file.

```css
/*
Theme Name: PJS
Them URI: http://philsinatra.net/wbdv243/
Description: My theme is awesome
Author: Phil Sinatra
Author UI: http://philsinatra.net
Template: PJS
Version: 1.0.0
*/
```

## Header

Because header.php is loaded as a header for all purposes in this theme (although you can have several headers if you like), you want this file to be general enough to work on all occasions. This is the code I’ve copied from the HTML file, to a new file called header.php:

```html
<!DOCTYPE HTML>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width, maximum-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Blog Title</title>
    <link rel="stylesheet" type="text/css" media="all" href="style.css" />
  </head>
  <body>
      <div id="outer-wrap">
          <div id="inner-wrap">
              <header id="header-container">
                  <h1 id="site-title">Blog Title</h1><!-- /#site-title -->
                  <p id="site-description">Description from blog settings</p><!-- /#site-description -->
                  <nav>
                      <div class="menu">
                          <ul>
                              <li><a href="#">Menu item</a></li>
                              <li><a href="#">Another menu item</a></li>
                              <li><a href="#">Third menu item</a></li>
                          </ul>
                      </div>
                      <!-- /.menu -->
                  </nav>
              </header>
              <!-- /#header-container -->
```

Now, this won’t do — you need some WordPress functions in there to make it work as intended. Theoretically, if you just wanted a functional theme, adding `wp_head()` would do, but obviously, you’ll want some more stuff than that.
Starting with the head part of this particular code, you want to make sure that WordPress knows the correct character set, that the right title is printed depending on where on the site the visitor is, that you include the style sheet correctly, that there is a pingback URL for blog-to-blog communication, that you load the necessary JavaScript, and that you have `wp_head()` last in the head. So with that in mind, here’s the head part of the code, with all these things added:

```php
<!DOCTYPE HTML>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width, maximum-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>
    <?php
        // The title
         wp_title( '|', true, 'right' );
        // Add the blog name.
        bloginfo( 'name' );
    ?>
    </title>
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="stylesheet" type="text/css" media="all" href="<?php
      bloginfo( 'stylesheet_url' ); ?>" />
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <?php
        // Always have wp_head() before closing of head
        wp_head();
    ?>
</head>
```

You’re using conditional tags to check whether the user is on an archive, a single post, or a page and to act accordingly after that.

Moving on, you need to take care of the rest of header.php. Here you want to make sure that the body tag gets the proper classes (good for styling with CSS, obviously), make sure that the correct site title and site description is outputted, and make sure that the menu doesn’t have to be hardcoded but can be used using WordPress’s menu feature:

```php
<body <?php body_class(); ?>>
    <div id="outer-wrap">
        <div id="inner-wrap">
            <header id="header-container">
                <?php if ( is_home() || is_front_page() ) { ?>
                    <h1 id="site-title">
                        <a href="<?php echo home_url(); ?>" title="<?php
                          bloginfo( 'name' ); ?>">
                            <?php bloginfo( 'name' ); ?>
                        </a> </h1>
                    <h2 id="site-description">
                        <?php bloginfo( 'description' ); ?>
                    </h2>
                <?php } else { ?>
                    <div id="site-title">
                        <a href="<?php echo home_url(); ?>" title="<?php
                          bloginfo( 'name' ); ?>">
                            <?php bloginfo( 'name' ); ?>
                        </a>
                    </div>
                    <div id="site-description">
                        <?php bloginfo( 'description' ); ?>
                    </div>
                <?php } ?>
                <nav>
                <?php
                    // Top navigation menu
                    wp_nav_menu( array(
                        'theme_location' => 'top-navigation'
                      )
                    ); ?>
                </nav>
            </header> <!-- #header-container ends -->
```

## Footer

```html
                <footer id="footer-container">
                  <nav>
                      <div class="menu">
                          <ul>
                              <li><a href="#">Menu item</a></li>
                              <li><a href="#">Another menu item</a></li>
                              <li><a href="#">Third menu item</a></li>
                          </ul>
                      </div>
                      <!-- /.menu -->
                  </nav>
                  <p>Copyright &copy; 2015, and similar information</p>
              </footer>
              <!-- /#footer-container -->
          </div>
          <!-- /#inner-wrap -->
      </div>
      <!-- /#outer-wrap -->
  </body>
</html>
```

There’s not much to do here. You’ve got another menu that you want to make user-editable with `wp_nav_menu()`, just like in header.php, and there’s the copyright text to take into account. Finally, you want to wrap up everything with `wp_footer()` just before the closing body tag, just as you did with `wp_head()` before the closing head tag.

```php
            <footer id="footer-container">
                <nav>
                <?php
                // Bottom navigation menu
                wp_nav_menu(array('theme_location' => 'bottom-navigation'));
                ?>
                </nav>
                <p>
                    Copyright &copy; <?php echo date('Y'); ?>
                    <a href="<?php echo home_url(); ?>" title="<?php bloginfo('name'); ?>">
                      <?php bloginfo('name'); ?>
                    </a> </p>
            </footer> <!-- #footer-container ends -->
        </div> <!-- #inner-wrap ends -->
    </div> <!-- #outer-wrap ends -->
<?php
// Wrapping up WordPress just before the closing body tag
wp_footer();
?>
</body>
</html>
```

## The Right Column: Sidebar

```html
<aside id="sidebar-container">
  <ul id="sidebar">
      <li class="widget-container">
          <h2 class="widget-title">Widget Title</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et erat orci. Etiam in dolor at arcu scelerisque aliquet. </p>
      </li>
      <li class="widget-container">
          <h2 class="widget-title">Another Widget Title</h2>
          <p>Quaerat rem reiciendis sequi est, excepturi in, libero, laborum saepe commodi beatae natus dolor doloribus! Praesentium totam dolor atque unde, consequuntur beatae perspiciatis quod minima. Error nostrum voluptatum ipsum aliquam!</p>
      </li>
  </ul>
  <!-- /#sidebar -->
</aside>
<!-- /#sidebar-container -->
```

Obviously, you don’t want the sidebar littered with dummy content, so that has got to go. The actual content will be dynamic, an area where the site owner can drop widgets, also known as a widget area. Most themes have one or several widget areas that let the site owner add whatever functionality he or she wants, either from the available widgets in WordPress by default or widgets added by plugins. The right column in this theme is a widget area, which means that you need to make some changes:

```php
<aside id="sidebar-container">
    <ul id="sidebar">
    <?php
        // If the sidebar is empty, output the static content
        if ( ! dynamic_sidebar( 'right-column' ) ) : ?>
        <li>Please add some widgets to the <em>Right column</em> widget area!</li>
    <?php endif; ?>
    </ul>
</aside> <!-- #sidebar-container ends -->
```

## The Content Flow: Using Index.php

It’s time to get the actual content under control.

All your previous template files have been parts of the site, and so is `index.php`. However, it is a bit different from all other templates because `index.php` is the fallback template if there is no dedicated template for the particular page. You’ll look more closely at that later on, but it is good to know that `index.php` needs to be there to save you should you forget to add a template or if new features come along.

```html
<div id="main-container">
  <section id="content-container">
      <article class="post">
          <header>
              <h2 class="entry-title">Post Title</h2>
              <!-- /.entry-title -->
              <p class="entry-meta">
                  Posted on <time datetime="2012-01-09">January 9,2012</time> by <a href="#">TDH</a> &bull; <a href="#comments">12 comments</a>
              </p>
              <!-- /.entry-meta -->
          </header>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et erat orci. Etiam in dolor at arcu scelerisque aliquet. Quisque lorem diam, volutpat in elementum non, facilisis vel ipsum. Fusce ut posuere neque. Vestibulum egestas, odio a gravida rhoncus, dolor mi ullamcorper velit, id lobortis nisl elit imperdiet neque. </p>
          <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras ac nunc nisi, egestas tincidunt urna. Nullam vel tortor nec lectus porta tincidunt ac eget diam. Praesent vulputate, nunc eget sodales imperdiet, nunc orci ullamcorper justo, in elementum ante felis sit amet dolor. </p>
      </article>
      <!-- /.post -->

      <article class="post">
          <header>
              <h2 class="entry-title">Another Post Title</h2>
              <!-- /.entry-title -->
              <p class="entry-meta">
                  Posted on <time datetime="2012-01-09">January 9,2012</time> by <a href="#">TDH</a> &bull; <a href="#comments">12 comments</a>
              </p>
              <!-- /.entry-meta -->
          </header>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et erat orci. Etiam in dolor at arcu scelerisque aliquet. Quisque lorem diam, volutpat in elementum non, facilisis vel ipsum. Fusce ut posuere neque. Vestibulum egestas, odio a gravida rhoncus, dolor mi ullamcorper velit, id lobortis nisl elit imperdiet neque. </p>
          <ol>
            <li>Lorem</li>
            <li>Ipsum</li>
            <li>Is slightly overused...</li>
          </ol>
          <p>Nunc eu ullamcorper orci. Quisque eget odio ac lectus vestibulum
          faucibus eget in.</p>
      </article>
      <!-- /.post -->
  </section>
  <!-- /#content-container -->

  <aside id="sidebar-container">
      <ul id="sidebar">
          <li class="widget-container">
              <h2 class="widget-title">Widget Title</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et erat orci. Etiam in dolor at arcu scelerisque aliquet. </p>
          </li>
          <li class="widget-container">
              <h2 class="widget-title">Another Widget Title</h2>
              <p>Quaerat rem reiciendis sequi est, excepturi in, libero, laborum saepe commodi beatae natus dolor doloribus! Praesentium totam dolor atque unde, consequuntur beatae perspiciatis quod minima. Error nostrum voluptatum ipsum aliquam!</p>
          </li>
      </ul>
      <!-- /#sidebar -->
  </aside>
  <!-- /#sidebar-container -->
</div>
<!-- /#main-container -->
```

First things first: You need to get the references for header.php, footer.php, and sidebar.php in there. You’ll use get_header(), get_footer(), and get_sidebar() to achieve this, and all you need to do is add the first one to the top and the second one to the bottom and then replace the code for the right column with the last one — like this:

```php
<?php get_header(); ?>
<div id="main-container">
    <section id="content-container">
```

```php
<?php get_sidebar(); ?>
</div>
<?php get_footer(); ?>
```

You’ll remember that these three tags will include the contents from header.php, footer.php, and sidebar.php.

Next up is getting `index.php` ready for actually displaying content. To do that, you need “[The Loop](Basic-Loop..markdown).” You’ll use the dummy content as a basis for how the actual output should look. Add the loop, clean out the dummy content, and see how it looks:

```php
<section id="content-container">
    <?php
        // Start the loop
        if ( have_posts() ) : while ( have_posts() ) : the_post();
    ?>
        <!-- LOOPED CONTENT GOES HERE -->
    <?php
        // Loop ends
        endwhile;
        // Nothing in the loop?
        else :
    ?>
    <article id="post-0" class="post no-results not-found">
        <header>
            <h2 class="entry-title">Nothing Found</h2>
        </header>
        <p>We're sorry, but we couldn't find anything for you. Please try and search for whatever it was you were looking for.</p>
        <?php get_search_form(); ?>
    </article>
    <?php
        // And we're done
        endif;
    ?>
</section> <!-- #main-container ends -->
```

Inside the loop, we define the layout for looped content:

```php
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header>
        <h2 class="entry-title">
            <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute();
              ?>" rel="bookmark">
                <?php the_title(); ?>
            </a>
        </h2>
        <p class="entry-meta">
            Posted on <time datetime="<?php echo get_the_date(); ?>"><?php
              the_time(); ?></time>
            by <?php the_author_link(); ?>
        <?php
            // Are the comments open?
            if ( comments_open() ) : ?>
            &bull; <?php comments_popup_link( 'No comments', '1 comment', '%
              comments' ); ?>
        <?php endif; ?>
        </p>
    </header>
    <?php
        // The content
        the_content();
    ?>
</article>
```

## Breaking Out of the Loop

Look at the earlier code block; what you want to do is to move the article block to a file of its own. Because this is the default post look and feel, you’ll just call it `content.php`. With the article block in `content.php`, you’ll replace it in `index.php` with this:

```php
get_template_part( 'content', get_post_format() );
```

This looks for content-X.php to include, where X is the post format, fetched with get_post_ format(). If the post in question is a regular post, it’ll just default to content.php, but if it is in the Gallery post format, the code will look for content-gallery.php first — and should that not exist, it’ll default to content.php. The purpose of this is obviously to be able to reuse content.php files for various post formats wherever you want.

So we have our `index.php` file:

```php
<?php get_header(); ?>
<div id="main-container">
    <section id="content-container">
    <?php
        // Start the loop
        if ( have_posts() ) : while ( have_posts() ) : the_post();
        // Get the correct content type
        get_template_part( 'content', get_post_format() );
        // Load comments if singular
        if ( is_singular() ) {
            comments_template( '', true );
        }
        // Loop ends
        endwhile;
        // Nothing in the loop?
        else : ?>
        <article id="post-0" class="post no-results not-found">
            <header>
                <h2 class="entry-title">Nothing Found</h2>
            </header>
            <p>We're sorry, but we couldn't find anything for you. Please try and
              search for whatever it was you were looking for.</p>
            <?php get_search_form(); ?>
        </article>
    <?php
        // We're done
    endif; ?>
    </section> <!-- #main-container ends -->
<?php get_sidebar(); ?>
</div>
<?php get_footer(); ?>
```

and then our `content.php` file: 

```php
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header>
        <h2 class="entry-title">
            <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute();
              ?>" rel="bookmark">
                <?php the_title(); ?>
            </a>
        </h2>
        <p class="entry-meta">
            Posted on <time datetime="<?php echo get_the_date(); ?>"><?php
              the_time(); ?></time>
            by <?php the_author_link(); ?>
        <?php
            // Are the comments open?
            if ( comments_open() ) : ?>
            &bull; <?php comments_popup_link( 'No comments', '1 comment', '%
              comments' ); ?>
        <?php endif; ?>
        </p>
    </header>
    <?php
        // The content
        the_content();
    ?>
</article>
```

## Single Posts and Pages

Most themes sport both `single.php` and `page.php` templates. The former is for single posts, and the latter is for pages. A simple theme doesn’t need these; a few conditional tags could do everything without complicating the index.php file. But forget about that and create a single.php and page.php template.

Start with `single.php`, which really doesn’t differ too much from `index.php`. In fact, it is basically a simplified `index.php`, without the fallback stuff and with `get_template_part( 'content', 'single' )` instead of the `get_post_format()` solution mentioned previously. A single post should look the same no matter what, in this case at least, so `content-single.php` will do.

single.php: 

```php
<?php get_header(); ?>
<div id="main-container">
    <section id="content-container">
    <?php
        // Start the loop
        while ( have_posts() ) : the_post();
        // Get the correct content type
        get_template_part( 'content', 'single' );
        comments_template( '', true );
        // Loop ends
        endwhile; ?>
    </section> <!-- #main-container ends -->
    <?php get_sidebar(); ?>
</div>
<?php get_footer(); ?>
```

Thanks to `get_template_part()`, single.php will try to load `content-single.php` first, and failing that, it’ll load `content.php`. Create a `content-single.php` file as well, based on the original `content.php` but without a linked title, using h1 instead of h2 and no check whether it is a single post or page either (because you already know that). Here it is:

```php
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header>
        <h1 class="entry-title">
            <?php the_title(); ?>
        </h1>
    <?php if ( is_single() ) : ?>
        <p class="entry-meta">
            Posted on <time datetime="<?php echo get_the_date(); ?> <?php
              the_time(); ?>"><?php the_date(); ?> <?php the_time(); ?></time>
            by <?php the_author_link(); ?>
        <?php
            // Are the comments open?
            if ( comments_open() ) : ?>
            &bull; <?php comments_popup_link( 'No comments', '1 comment', '%
              comments' ); ?>
        <?php endif;
            // Show categories and tags on single posts
            if ( is_singular( 'post' ) ) :
        ?>
            <br />Filed in <?php the_category( ', ' ); ?>
            <?php the_tags( ' and tagged with ', ', ', '' ); ?>
        </p>
<?php endif;
    endif; ?>
    </header>
    <?php
        // The content
        the_content();
    ?>
</article>
```

Then `page.php`, `comments.php`, and any other standard or custom files.