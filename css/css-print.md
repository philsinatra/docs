# CSS @print

## CSS Printable Area

```css
@media print {
  body * {
    visibility: hidden;
  }
  #section-to-print, #section-to-print * {
    visibility: visible;
  }
  #section-to-print {
    position: absolute;
    left: 0;
    top: 0;
  }
}
```

<small>[reference](http://stackoverflow.com/questions/468881/print-div-id-printarea-div-only)</small>

## Printing Background Color

IF a user has "Print Background colours and images" turned off in their print settings, no CSS will override that, so always account for that. This is a default setting.

With Chrome and Safari you can add the css style `-webkit-print-color-adjust: exact;` to the element to force print the background color and/or image.

```css
-webkit-print-color-adjust: exact;
```

<small>[reference](http://stackoverflow.com/questions/3893986/css-media-print-issues-with-background-color)</small>

## @media (print) Not Working

Here are possible solutions for `@media print` not working properly:

Solution 1. Check if your print media style sheet linked with webpage properly or not.Link tag is closed properly and looks link as follows.This type of link used only if you want to use separate style sheet for print media.
```html
<link rel="stylesheet" type="text/css" href="css/print.css" media="print" />
```

---

Solution 2. If print media styles are controlled or executed by internal scripts,plugin or module . In that case @ media print style sheet not overwrite styles.To overwrite styles and load style of @ media print query use ( ! important; ) .For example in you media print style sheet “div ” height is 200px but this style is not working.
```css
@media print {
    .div { height:200px; }
}
```
Now change your code as following and add ( ! important ) in it.
```css
@media print {
    div {height:200px !important;}
}
```

---

Solution 3. In the third situation of error @ media print style query because of your media attribute is not right.If you are using conman style sheet for all media types then check link tag.
```html
<link rel="stylesheet" type="text/css" href="stylesheet.css" media="screen" />
```
In the above tag `media` attribute value is `screen`. **This can also create error** @ media print style loading. Delete `media=”screen”` from the link tag.
```html
<link rel="stylesheet" type="text/css" href="stylesheet.css" />
```

<small>[reference](http://tectrick.org/solution-error-media-print-style/)</small>