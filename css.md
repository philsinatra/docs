# CSS

## Grid Autoprefixer

Here is a table detailing the properties in the spec at CR, the IE10 properties and also whether they are prefixed by Autoprefixer as tested using the [online Autoprefixer tool](https://autoprefixer.github.io).

| CR Level 1 Property | IE10 Implementation | Autoprefixer | Note |
| ------------------- | ------------------- | ------------ | ---- |
| `grid-template-columns` | `-ms-grid-columns` | Yes | |
| `grid-template-rows` | `-ms-grid-rows` | Yes | |
| `grid-template-areas` | - | No | |
| `grid-template` | - | No | Shorthand |
| `grid-auto-columns` | - | No | |
| `grid-auto-rows` | - | No | |
| `grid-auto-flow` | - | No | |
| `grid` | - | No | Shorthand |
| `grid-row-start` | `-ms-grid-row` Yes | |
| `grid-column-start` | `-ms-grid-column` | Yes | |
| `grid-row-end` | - | No | Defined by the `-ms-grid-row-span` property |
| `grid-column-end` | - | No | Defined by the `-ms-grid-column-span` property |
| `grid-row` | - | Yes (only for start value) | Shorthand for setting start and end values together |
| `grid-column` | - | Yes (only for start value) | Shorthand for setting start and end values together |
| `grid-area` | - | No | |
| `grid-row-gap` | - | No | Gap properties can be faked by using a regular track |
| `grid-column-gap` | - | No | |
| `grid-gap` | - | No | |
| - | `-ms-grid-column-span` | - | Not required due to changes to spec |
| - | `-ms-grid-row-span` | - | Not required due to changes to spec |
| `align-self` | `-ms-grid-column-align` | Yes | Now part of Box Alignment |
| `justify-self` | `-ms-grid-row-align` | No | Now part of Box Alignment |

- Reference: [Should I try to use the IE implementation of CSS Grid Layout? by Rachel Andrew](https://rachelandrew.co.uk/archives/2016/11/26/should-i-try-to-use-the-ie-implementation-of-css-grid-layout/)

## Visually Hidden

```css
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
}
```

## Globals

```css
body {
    /* Set the default for kerning */
    font-kerning: normal;
    font-smoothing: antialiased;
    /* Improve (or in some cases royally screw with) safari's legibility somewhat */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* Improve kerning pairs. Webkit gets funny with this sometimes */
    text-rendering: optimizeLegibility;
    -ms-text-size-adjust: none;
    -webkit-text-size-adjust: none;
    -webkit-touch-callout: none;

    -webkit-overflow-scrolling: touch;

    /* In case anyone's searching for this later on, a nice trick to get rid of
    those jagged edges on CSS transformations in Chrome is to add the CSS
    property -webkit-backface-visibility with a value of hidden.
    http://stackoverflow.com/questions/6492027/css-transform-jagged-edges-in-chrome
    */

    -webkit-backface-visibility: hidden;
}

```



## CSS Naming Conventions

### BEM (Block Element Modifier)

Start by identifying _blocks_ of content, such as "teasers" on the home page.

Within a block, there will be related elements (title, date, description, read more link etc.). BEM model suggests we name these by the containing block name, two underscores and then the element name. Example:

```css
.teaser__title {}
.teaser__date {}
.teaser__description {}
.teaser__read-more {}
```

There may be a situation where a teaser needs special styling (a different background color, font-style etc.) BEM dictates we use a _modifier_, which is referred to by the block name, two hyphens and then the modifier name:

```css
.teaser--latest {}
```

Sample markup so far:

```html
<div class="teaser teaser-latest">
    <h2 class="teaser__title">The BEMIT naming convention</h2>
    <time class="teaser__date" datetime="2016-01-11"> January 11, 2016</time>
    <p class="teaser__description">Trying to keep CSS tidy and transparent&hellip;</p>
    <a class="teaser__read-more" href="#">Read more&hellip;</a>
</div>
```

### ITCSS - Organizing style sheet elements

Default layers:

<dl>
    <dt>Settings</dt>
    <dd>Global variables, config switches</dd>
    <dt>Tools</dt>
    <dd>Default mixins and functions</dd>
    <dt>Generic</dt>
    <dd>Ground-zero styles [Normalize.css, resets, box-sizing]</dd>
    <dt>Base</dt>
    <dd>Unclassed HTML elements [type selectors]</dd>
    <dt>Objects</dt>
    <dd>Cosmetic-free design patterns</dd>
    <dt>Components</dt>
    <dd>Designed components, chunks of UI</dd>
    <dt>Trumps</dt>
    <dd>Helpers and overrides</dd>
</dl>

The idea is to ask "What's the scope of the element I'm styling?" If it's an element that appears everywhere on the site, like a paragraph, it should be somewhere towards the top of the style sheet. If I'm styling a pattern that only appears on one page, like the _teaser_ example, it'll be towards the bottom.

[![inverted triangle](http://media.creativebloq.futurecdn.net/sites/creativebloq.com/files/images/2015/10/itcssmain.jpg)](https://www.youtube.com/watch?v=1OKZOV-iLj4&feature=youtu.be "Harry Roberts - Managing CSS Projects with ITCSS")

### BEMIT

#### Namespace prefixes

To address the issue of scope, we can use namespace prefixes. Does the element potentially appear on every page of the site? If so, it's probably an _object_, and should have an **o-** in front of it. Is the element repeated, but only used on one particular page, such as the _teasers_ example? Then it's probably a _component_, and should take the prefix **c-**, for example, `c-teaser`.

Possible prefixes:

|Prefix|Name|Usage|
|----------|----------|----------|
|o-|object|element potentially appears on every page of the site|
|c-|component|element is repeated, but only used on one particular page|
|u-|utility|achieve certain results (.u-text-center)|
|t-|themes|the cosmetic appearance may be due to the presence of a theme (day/night|
|s-|scope|similar to theme, but no necessarily cosmetic; style a _blob_ content area|
|is- / has-|state/condition|the DOM currently has a temporary, optional, or short-lived style applied to it due to a certain state being invoked|
|_|hacks|a class used to foce something to work|
|js-|JavaScript|this piece of the DOM has some behavior acting upon it, and JavaScript binds onto it to provide that behavior|
|qa-|quality assurance|QA or testing needs to find or bind onto these parts of the DOM|

#### Object Namespace: o-

Format:

```css
.o-object-name[<element>|<modifier>] {}
```

Example:

```css
.o-layout {}
    .o.layout__item {}
.o-layout--fixed {}
```

Imagine you're a developer new to a project, you have no knowledge of the CSS or what its classes mean or do. You're asked by the project manager to add some padding around the testimonials that appear on the site. You right click, Inspect Element and see this:

```html
<blockquote class="media testimonial"></blockquote>
```

It should be clear that you need to find the `.testimonial {}` ruleset and add the padding, however you find that adding the padding to the `.media {}` ruleset has the exact outcome you expected.

The issue is that the `.media` is an abstraction, a reusable and non-cosmetic design pattern that can underpin any number of different UI components. Adding the padding here may give us the desired results, but it also may have unintentionally broken 20 other pieces of UI elsewhere.

By adding a leading **o-** to the classes for objects, we can signify their universal nature and avoid breaking things. If you see a class that begins with **o-**, bells should ring and you should know to stay away from it.

```html
<blockquote class="o-media testimonial"></blockquote>
```

#### Component Namespace c-

Format:

```css
.c-component-name[<element>|<modifier>] {}
```

Example:

```css
.c-modal {}
    .c-modal__title {}
.c-modal--gallery {}
```

Components are finite, discrete, implementation-specific parts of the UI and should be easily identifiable: _"This is a button"_; _"This is the date picker"_ etc.

Revisiting the previous example, by introducing a component namespace, we'd be left with this:

```html
<blockquote class="o-media c-testimonial"></blockquote>
```

Now I can tell _purely_ from this HTML that any changes made to the `.o-media` class may be felt throughout the entire site, but any changes made to the `.c-testimonial` ruleset will only modify testimonials and nothing else.

### Responsive suffixes

We can extend BEM even more by adding a suffix, preceded with @, for targeting media queries. For example, `.c-teaser@sm` gives us a hook to style the teaser block at small screen widths, while `.o-image@print` is a class that allows us to style an image object for print. (**NOTE:** the @ symbol must be escaped in CSS, so it would be written like this: `.c-teaser\@sm {}`)

Organizing styles into media queries should eliminate the need for this level of idiot-proofing.

## Conclusion

### BEM

- _Blocks_ are HTML elements that are likely to contain other content which is related in some way. Think of `<figure>` elements which contain and image and caption.
- Inside a block, you'll find smaller _elements_. These should be marked up with the suffix __element-name.
- Some blocks are different to others of the same type, so they have a _modifier_. They are marked up with the suffix --modifier-name.

### ITCSS

Write CSS based on specificity in the least wasteful order as possible.

### BEMIT

- We can give other developers an idea of the scope of an element using namespace prefixes, suck as o- for _objects_ that appear throughout the site (handle with care), and c- for _component_ that probably  only appear once.
- We can also add an @ suffix for elements that need particular responsive treatment, such as @sm for small screen sizes, or @print.

## Highlighting Types of Namespace

```css
[class^="o-"],
[class*=" o-"] {
  outline: 5px solid orange;
}

[class^="c-"],
[class*=" c-"] {
  outline: 5px solid cyan;
}

[class^="u-"],
[class*=" u-"] {
  outline: 5px solid violet;
}

[class^="_"],
[class*=" _"] {
  outline: 5px solid red;
}
```

## References

- [Beautiful Web](http://www.jamesturneronline.net/beautifulweb/bemit-naming-convention.html)
- [csswizardy.com](http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/)

## Sample CSS

```css
/*
#    /$$$$$$  /$$           /$$                 /$$
#   /$$__  $$| $$          | $$                | $$
#  | $$  \__/| $$  /$$$$$$ | $$$$$$$   /$$$$$$ | $$
#  | $$ /$$$$| $$ /$$__  $$| $$__  $$ |____  $$| $$
#  | $$|_  $$| $$| $$  \ $$| $$  \ $$  /$$$$$$$| $$
#  | $$  \ $$| $$| $$  | $$| $$  | $$ /$$__  $$| $$
#  |  $$$$$$/| $$|  $$$$$$/| $$$$$$$/|  $$$$$$$| $$
#   \______/ |__/ \______/ |_______/  \_______/|__/
#
#
#
Global definitions and styles
*/

* { box-sizing: border-box; }

body {
    font: 100%/1.4 -apple-system, BlinkMacSystemFont,
    "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
}

img { max-width: 100%; }

/*
#    /$$$$$$
#   /$$__  $$
#  | $$  \__/  /$$$$$$  /$$$$$$/$$$$  /$$$$$$/$$$$   /$$$$$$  /$$$$$$$
#  | $$       /$$__  $$| $$_  $$_  $$| $$_  $$_  $$ /$$__  $$| $$__  $$
#  | $$      | $$  \ $$| $$ \ $$ \ $$| $$ \ $$ \ $$| $$  \ $$| $$  \ $$
#  | $$    $$| $$  | $$| $$ | $$ | $$| $$ | $$ | $$| $$  | $$| $$  | $$
#  |  $$$$$$/|  $$$$$$/| $$ | $$ | $$| $$ | $$ | $$|  $$$$$$/| $$  | $$
#   \______/  \______/ |__/ |__/ |__/|__/ |__/ |__/ \______/ |__/  |__/
#
#
#
*/

h1 {}
p {}
ul, ol {}


/*
#   /$$$$$$$              /$$       /$$
#  | $$__  $$            | $$      | $$
#  | $$  \ $$  /$$$$$$  /$$$$$$   /$$$$$$    /$$$$$$   /$$$$$$  /$$$$$$$   /$$$$$$$
#  | $$$$$$$/ |____  $$|_  $$_/  |_  $$_/   /$$__  $$ /$$__  $$| $$__  $$ /$$_____/
#  | $$____/   /$$$$$$$  | $$      | $$    | $$$$$$$$| $$  \__/| $$  \ $$|  $$$$$$
#  | $$       /$$__  $$  | $$ /$$  | $$ /$$| $$_____/| $$      | $$  | $$ \____  $$
#  | $$      |  $$$$$$$  |  $$$$/  |  $$$$/|  $$$$$$$| $$      | $$  | $$ /$$$$$$$/
#  |__/       \_______/   \___/     \___/   \_______/|__/      |__/  |__/|_______/
#
#
#
Reusable patterns
*/
.o-layout {}
    .o-layout__item {}

.c-modal {}
    .c-modal__content {}
    .c-modal__foot {}
.c-modal--wide {}
.js-modal {}

.c-teaser {}
    .c-teaser__title {}
    .c-teaser__date {}
    .c-teaser__description {}
    .c-teaser__read-more {}
.c-teaser--latest {}


/*
#   /$$$$$$$$ /$$                                               /$$
#  | $$_____/| $$                                              | $$
#  | $$      | $$  /$$$$$$  /$$$$$$/$$$$   /$$$$$$  /$$$$$$$  /$$$$$$    /$$$$$$$
#  | $$$$$   | $$ /$$__  $$| $$_  $$_  $$ /$$__  $$| $$__  $$|_  $$_/   /$$_____/
#  | $$__/   | $$| $$$$$$$$| $$ \ $$ \ $$| $$$$$$$$| $$  \ $$  | $$    |  $$$$$$
#  | $$      | $$| $$_____/| $$ | $$ | $$| $$_____/| $$  | $$  | $$ /$$ \____  $$
#  | $$$$$$$$| $$|  $$$$$$$| $$ | $$ | $$|  $$$$$$$| $$  | $$  |  $$$$/ /$$$$$$$/
#  |________/|__/ \_______/|__/ |__/ |__/ \_______/|__/  |__/   \___/  |_______/
#
#
#
Unique elements - only appear once on a given page
 */
.c-logo {}
.c-nav {}


/*
#   /$$$$$$$$
#  |__  $$__/
#     | $$     /$$$$$$  /$$   /$$ /$$$$$$/$$$$   /$$$$$$   /$$$$$$$
#     | $$    /$$__  $$| $$  | $$| $$_  $$_  $$ /$$__  $$ /$$_____/
#     | $$   | $$  \__/| $$  | $$| $$ \ $$ \ $$| $$  \ $$|  $$$$$$
#     | $$   | $$      | $$  | $$| $$ | $$ | $$| $$  | $$ \____  $$
#     | $$   | $$      |  $$$$$$/| $$ | $$ | $$| $$$$$$$/ /$$$$$$$/
#     |__/   |__/       \______/ |__/ |__/ |__/| $$____/ |_______/
#                                              | $$
#                                              | $$
#
*/
@media (min-width: 30em) {
    .c-footer { position: fixed !important; }
}


/*
#    /$$$$$$   /$$$$$$
#   /$$__  $$ /$$__  $$
#  | $$  \ $$| $$  \ $$
#  | $$  | $$| $$$$$$$$
#  | $$  | $$| $$__  $$
#  | $$/$$ $$| $$  | $$
#  |  $$$$$$/| $$  | $$
#   \____ $$$|__/  |__/
#        \__/
 */

[class^="o-"],
[class*=" o-"] {
  outline: 5px solid orange;
}

[class^="c-"],
[class*=" c-"] {
  outline: 5px solid cyan;
}

[class^="u-"],
[class*=" u-"] {
  outline: 5px solid violet;
}

[class^="_"],
[class*=" _"] {
  outline: 5px solid red;
}
```
