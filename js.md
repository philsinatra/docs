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

## JavaScript and prototype-based OOP

[A List Apart Article](http://alistapart.com/article/prototypal-object-oriented-programming-using-javascript)

Following is an example that demonstrates this kind of OOP in JavaScript. We start by creating an animal object:

```javascript
var genericAnimal = Object.create(null);
```

`Object.create(null)` creates a new empty object. Next, we add some properties and functions to our new object:

```javascript
genericAnimal.name = 'Animal';
genericAnimal.gender = 'female';
genericAnimal.description = function() {
  return 'Gender: ' + this.gender + '; Name: ' + this.name;
};
```

`genericAnimal` is a proper object and can be used like one:

```javascript
console.log(genericAnimal.description());
//Gender: female; Name: Animal
```

We can create other, more specific animals by using our sample object as a prototype. Think of this as cloning the object, just like we took a chair and created a clone in the real world.

```javascript
var cat = Object.create(genericAnimal);
```

We just created a cat as a clone of the generic animal. We can add properties and functions to this:

```javascript
cat.purr = function() {
  return 'Purrrr!';
};
```

We can use our cat as a prototype and create a few more cats:

```javascript
var colonel = Object.create(cat);
colonel.name = 'Colonel Meow';

var puff = Object.create(cat);
puff.name = 'Puffy';
```

You can also observe that properties/methods from parents were properly carried over:

```javascript
console.log(puff.description());
//Gender: female; Name: Puffy
```

## Get URL Parameter

```javascript
var getURLParameter = function(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if(results==null)
    return '';
  else
    return results[1];
}
```

## iOS Scroll/Resize Bug

To fix the `resize` event firing on iOS scroll bug:

```javascript
// Store the window width
var window_width = window.innerWidth;

resizeWindow = function(event) {
  var w = window.innerWidth;

  if (w !== window_width) {
    // Store new width for next resize event.
    window_width = w;

    // Do stuff.
  }
  // Otherwise do nothing.
};

window.addEventListener('resize', resizeWindow, false);
```

- [stackoverflow](http://stackoverflow.com/questions/8898412/iphone-ipad-triggering-unexpected-resize-events/24212316#24212316)

## Form Validation

### Phone Numbers

- [reference](http://webcheatsheet.com/javascript/form_validation.php#phone)

```javascript
var phone = $('input#phone').val();
var phone_stripped = phone.replace(/[\(\)\.\-\ ]/g, '');
if (phone === '') {
  $('label#phone_error').html('This field is required.').show();
  $('input#phone').focus();
  return false;
} else if (isNaN(parseInt(phone_stripped))) {
  $('label#phone_error').html('The number provided contains illegal characters.').show();
  $('input#phone').focus();
  return false;
} else if (phone_stripped.length !== 10) {
  $('label#phone_error').html('The phone number is the wrong length. There should be 10 numbers.').show();
  $('input#phone').focus();
  return false;
}
else $('label#phone_error').hide();
```
