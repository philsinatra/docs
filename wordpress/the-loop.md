## The Basic Loop

If you want to create sites using WordPress, you need to understand the loop. Luckily, the basic one is pretty easy. Here’s what you see to begin with:
                
```php
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
```

And this is at the end:

```php
<?php endwhile; else: ?>
    <p>Some error message or similar.</p>
<?php endif; ?>
```


An example:

```php
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <h2><a href="<?php the_permalink(); ?>" title="<?php
          the_title_attribute(); ?>">
            <?php the_title(); ?>
        </a></h2>
        <?php the_content(); ?>
     </div>
<?php endwhile; else: ?>
     <div class="post">
        <h2>Error!</h2>
        <p>Something went wrong! Please try again.</p>
     </div>
<?php endif; ?>
```

The basic loop checks whether there are any posts to return, and in turn the loop is controlled by the global blog settings (how many posts to display and such) and your whereabouts on the blog. A single post would return just one post (the one you want, presumably), whereas a category listing would return the number of posts specified in the WordPress settings, but only the ones that belong to that particular category.

If there are posts, a while loop is started, and as long as there are posts to return, as controlled by the situation and settings, posts will be returned and displayed. When the while loop is done (all posts that should be returned have been output), it ends with endwhile, and then the loop ends with endif.
Should there be no posts that match the criteria of the particular situation, the else clause is called, and that’s when the error message (or similar) will be output (or nothing at all, if there is nothing defined). After that, the loop ends.

So the loop actually loops content from the database, based on the WordPress settings and any criteria that the page you’re on may bring. Makes sense, doesn’t it?

## Separate the Loop and the Template

The first and last lines are the actual loop, and the code in between is the output, or content, if you will. Now, you want to be able to reuse the code within for other loop outputs, or possibly overwrite it with a child theme in the future, so you’ll store that in its own template file and include it using get_template_part() as described earlier — like so:

```php
<?php while ( have_posts() ) : the_post(); ?>
    <?php get_template_part( 'content', 'archive' ) ;?>
<?php endwhile; ?>
```

Then you’ll put the actual output in a file called content-archive.php, which will be included as specified. You could use this for just category.php, as mentioned earlier, or for other suitable archive templates as well. For clarity’s sake, here are the contents of content-archive.php:

```php
<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <h2><a href="<?php the_permalink(); ?>" title="<?php
      the_title_attribute(); ?>">
        <?php the_title(); ?>
    </a></h2>
    <?php the_content(); ?>
</div>
```

What you have now is two files — category.php, which contains the actual loop (but not its contents) and whatever other markup is needed to make the category archives of your site look the way you want, and content-archive.php, which contains the actual output of the loop.

So what is happening? Well, get_template_part( 'content', 'archive' ) looks for content-archive.php first, where you’ll put your custom loop, hence making content.php clean and slim. Should content-archive.php not be present, content.php will be used instead, and this is where you’d put a general “if all else fails” loop output. 
