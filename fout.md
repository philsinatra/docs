# Flash of Unstyled Text

This technique uses [FontFaceObserver](https://github.com/bramstein/fontfaceobserver).

First load the [fontfaceobserver.js file](fontfaceobserver.js) in the document `head`. At the end of the script, setup the fonts you want to include in the technique.

```javascript
var fontA = new FontFaceObserver('DINCondensed-Bold');
var fontB = new FontFaceObserver('Roboto-Regular');

Promise.all([fontA.load(), fontB.load()]).then(function () {
	document.documentElement.className += " fonts-loaded";
	// Optimization for Repeat Views
	sessionStorage.foutFontsLoaded = true;
});
```

In the stylesheet, use a base font that is similar to the non-web fonts for the initial load. Then use the `.fonts-loaded` class to define the custom fonts.

```css
.fonts-loaded {
  font-family: /* custom font stack here */
}
```
