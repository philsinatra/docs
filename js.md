# JavaScript Notes

## Shortcut Notations

### Objects

```javascript
var car = {
  color: 'red',
  wheels: 4,
  hubcaps: 'spinning',
  age: 4
}
```

### Arrays

```javascript
var moviesThatNeedBetterWriters = [
  'Transformers', 'Trasnformers 2', 'Indiana Jones 4'
];
```

### Conditions

Instead of writing:

```javascript
var direction;
if (x < 200)
  direction = 1;
else
  direction = -1;
```

You can write:

```javascript
var dirction = x < 200 ? 1 : -1;
```

## Event Delegation

```html
<ul id="resources">
  <li><a href="http://opera.com/wsc">Opera Web Standards Curriculum</a></li>
  <li><a href="http://sitepoint.com">Sitepoint</a></li>
  <li><a href="http://alistapart.com">A List Apart</a></li>
  <li><a href="http://yuiblog.com">YUI Blog</a></li>
</ul>
```

```javascript
(function() {
  var resources = document.getElementById('resources');
  resources.addEventListener('click', handler, false);
  function handler (e) {
    var x = e.target;
    if (x.nodeName.toLowerCase() === 'a') {
      window.alert('Event delegation: ' + x);
      e.preventDefault();
    }
  }
})();
```

Because the click happens on all the elements in the list, all you need to do is compare the `nodeName` to the right element that you want to react to the event.

## Anonymous Functions and the Module Pattern

```javascript
var myApplication = function(){
  var name = 'Chris';
  var age = '34';
  var status = 'single';
  function createMember(){
    // [...]
  }
  function getMemberDetails(){
    // [...]
  }
  return{
    create:createMember,
    get:getMemberDetails
  }
}();
//myApplication.get() and myApplication.create() now work.
```

## Class Lists

```javascript
var menu = document.getElementById('menu');

if (menu.classList.contains('is-active')) 
  menu.classList.remove('is-active');
else 
  menu.classList.add('is-active');
```

## Custom Popups

```html
<a href="http://google.com" onclick="window.open(this.href, '', 'resizable=yes,status=no,location=no,toolbar=no,menubar=no,fullscreen=yes,scrollbars=yes,dependent=no'); return false;">Click here</a>.
```

Build this out into a function:

```html
<p><a href="http://google.com" class="myclass">Google</a></p>
```

### Javascript `eventListener` by `class`, no jQuery

Loop through all the instances of a class, similar to jQuery `$('.btn').click(...`

```javascript
var classname = document.getElementsByClassName('myclass');

var myFunction = function(event) {
  event.preventDefault();
  var w = window.open(this.href, '', 'resizable=yes,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=yes,dependent=no');
  w.focus();
  return false;
}

for (var i = 0; i < classname.length; i++) {
  classname[i].addEventListener('click', myFunction, false);
}
```

[Stack Overflow](http://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class)

On the child window, use `resizeTo` and `moveTo` commands to manipulate the position and size of the window:

```javascript
  var resizeWindow = function() {
    var width = 1024;
    var height = 768;

    var left = parseInt((screen.availWidth/2) - (width/2));
    var top = parseInt((screen.availHeight/2) - (height/2));

    window.resizeTo(width, height);
    window.moveTo(left, top);
  }

  resizeWindow();
```

[Stack Overflow](http://stackoverflow.com/questions/6561066/after-i-launch-a-popup-window-how-do-i-move-it-to-the-center-of-the-page)