# ARIA Controls

## Display Toggle

Setup the trigger button:

```html
<a href="#" class="btn" id="myButton" aria-expanded="true" aria-controls="target_it">My Button</a>
```

Hide elements that should be hidden via CSS:

```css
*[aria-hidden=true] { display: none; }
```

Toggle/trigger the display change:

```javascript
$('#myButton').click(function(event) {
  var self = $(this),
    expanded = JSON.parse($(this).attr('aria-expanded')),
    selector = $(this).attr('aria-controls'),
    $content = $('#' + selector);

  event.preventDefault();

  if (!expanded) {
    $(this).attr('aria-expanded', true);
    $content.attr('aria-hidden', false);
  } else {
    $(this).attr('aria-expanded', false);
    $content.attr('aria-hidden', true);
  }
});
```
