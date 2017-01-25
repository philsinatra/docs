# ARIA Controls

## Navigation

```html
  <header role="banner">
    <nav aria-label="site" role="navigation">
      <button aria-label="menu" aria-expanded="false">
          <svg class="menu_toggle_button"><use xlink:href="#navicon"></use></svg>
          <span class="visually-hidden">menu</span>
      </button>

      <ul hidden>
        <li><a href="index.html">Home</a></li>
      </ul>
    </nav>
  </header>
```

```javascript
(function() {
    // get the button and menu nodes
    var button = document.querySelector('[aria-label="site"] button');
    var menu = button.nextElementSibling;

    // set initial (closed menu) states
    button.setAttribute('aria-expanded', 'false');
    button.hidden = false;
    menu.hidden = true;

    button.addEventListener('click', function() {
        // toggle menu visibility
        var expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', String(!expanded));
        menu.hidden = expanded;
    });
})();
```

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
