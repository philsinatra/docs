# Custom Fields

- [WP Codex Reference](https://codex.wordpress.org/Custom_Fields)

WordPress has the ability to allow post authors to assign custom fields to a post. This arbitrary extra information is known as `meta-data`.

Meta-data is handled with `key/value` pairs. The `key` is the name of the meta-data element. The `value` is the information that will appear in the meta-data list on each individual post that the information is associated with.

Echo the `meta-data` information:

```php
the_meta();
```

Returns something like:

```html
<ul class='post-meta'>
  <li><span class='post-meta-key'>Currently Reading:</span> Calvin and Hobbes</li>
  <li><span class='post-meta-key'>Today's Mood:</span> Jolly and Happy</li>
</ul>
```

## Getting Custom Fields

Use the `get_post_meta()` function to return/echo the value of individual custom field values.

```php
$key = 'Currently Reading';
echo get_post_meta($post->ID, $key, true);
```
