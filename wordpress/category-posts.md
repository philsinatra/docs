# Categories and Posts

Query the WordPress database and return records for a single category:

```php
query_posts(array(
    'category_name' => 'category-name', // get posts by category name (e.g. player-profiles)
    'posts_per_page' => -1 // all posts
));
```
