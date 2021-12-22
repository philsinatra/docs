# The Latest in CSS

- [`min()` Function](#min-func)
- [`max()` Function](#max-func)
- [`clamp()` Function](#clamp-func)
- [`light-level`](#light-level)
- [`inverted-colors`](#inverted-colors)
- [`prefers-color-scheme`](#prefers-color-scheme)
- [`prefers-contrast`](#prefers-contrast)
- [`prefers-reduced-motion`](#prefers-reduced-motion)
- [`prefers-reduced-transparency`](#prefers-reduced-transparency)
- [`prefers-reduced-data`](#prefers-reduced-data)
- [Custom media queries](#custom-media-queries)
- [Content-visibility](#content-visibility)
  - [Limitations of `content-visibility`](#limitations-of-content-visibility)
- [`Will-change` property](#will-change-property)
  - [When not to use will-change](#when-not-to-use-will-change)
- [Reducing the Render-blocking time](#reducing-the-render-blocking-time)
- [Avoiding `@import` to include multiple stylesheets](#avoiding-import-to-include-multiple-stylesheets)
- [References](#references)

<h2 id="min-func">`min()` Function</h2>

The `min()` function contains one or more comma-separated calculations and represents the smallest value of them. We use the `min()` to set a maximum value.

Consider the following example. We want the element to have a maximum width of `500px`.

<MinCSS />

The browser has to choose the smallest of the values `(50%, 500px)`. Choosing that depends on the viewport width. If `50%` computes to a value more than `500px`, then it will be ignored and `500px` will be used instead.

Otherwise, if the `50%` computes to a value less than `500px`, then the `50%` will be used as a value for the width. Can you guess the viewport width that will make that happen? (The 50% of X = 500px). The viewport width is `1000px`.

<h2 id="max-func">`max()` Function</h2>

The `max()` function contains one or more comma-separated calculations and represents the largest value of them. We use the `max()` to set a minimum value.

Consider the following example. We want the element to have a minimum width of `300px`.

<MaxCSS />

The browser has to choose the largest of the values (`50%`, `300px`). Choosing that depends on the viewport width. If `50%` computes to a value less than `300px`, then it will be ignored and `300px` will be used.

Otherwise, if the `50%` computes to a value more than `300px`, then the `50%` will be used as a value for the width. It’s the opposite of `min()` function.

<h2 id="clamp-func">`clamp()` Function</h2>

What `clamp()` do is that it clamps a value between two defined values, minimum and maximum. It takes three parameters (min value, preferred value, max value).

Consider the following example.

<ClampCSS />

We have an element with a minimum width of `200px`, a preferred value of `50%`, and a maximum value of `1000px`. Let’s visualize that!

Here is a recap for the example above:

- The width will never go below `200px`
- The central (preferred) value is `50%` and will only work if the viewport width is greater than 400px and less than 2000px.
- The width won’t go above `1000px`

The `clamp()` is similar to the physical tool we have. It clamps a value based on two provided values at the edges (`min`, `max`).

<h2 id="light-level">`light-level`</h2>

This feature isn’t available in any browsers at the time of writing, but it definitely sounds like a future favorite. With the [light-level](https://drafts.csswg.org/mediaqueries-5/#light-level) media query, you can tune your styles based on whether your user is viewing your web app outside in daylight, or perhaps checking in before going to bed. This is great news for anyone who has ever tried to read their phone in the park, or check out a website at night!

There are three available values – `dim`, `normal` (the default), and `washed`. Here’s an example where we change some CSS custom properties:

```css
@media (light-level: dim) {
  :root {
    --text-color: white;
    --background-color: black;
  }
}
```

<h2 id="inverted-colors">`inverted-colors`</h2>

Before the time of dark mode, a lot of people turned on the “invert colors” to get that “dark mode” feel. It looked pretty neat, but it also screwed with images, text shadows, and the way fonts were rendered (white on black has more perceived contrast than black on white for some reason).

![inverted colors example](https://i0.wp.com/blog.logrocket.com/wp-content/uploads/2020/02/inverted-colors-1.png?w=730&ssl=1)

The `inverted-colors` media query lets you adapt around those quirks! Although currently supported in Safari (and Safari on iOS), I sure hope this lands as well.

This is a boolean option, with two values `none` and `inverted`. But you can just skip the value altogether and write something like this:

```css
@media (inverted-colors) {
  img {
    filter: invert(1);
  }
  * {
    box-shadow: none !important;
    text-shadow: none !important;
  }
}
```

<h2 id="prefers-color-scheme">`prefers-color-scheme`</h2>

You might actually have heard about the `prefers-color-scheme` media query already. This one lets you react to whether the user has turned on so-called “dark mode” on their device. In other words – adding “dark mode” to your app is now a few lines of code!

This feature is already widely supported in browsers, and has three possible values – `light`, `dark`, and `no-preference`. Here’s an example where we change the background color of the site based on preference:

```css
@media (prefers-color-scheme: dark) {
  body {
    background: #1e1e1e;
    color: white;
  }
}
```

<h2 id="prefers-contrast">`prefers-contrast`</h2>

The `prefers-contrast` media query lets you cater to users who prefer high contrast content compared to your original design.

There’s two values here – `no-preference` and `high`. There’s some discussion in [the draft document](https://drafts.csswg.org/mediaqueries-5/#prefers-contrast) about splitting `high` into `increased` and `extremely-high`, but nothing is certain yet. That’s probably the reason why there’s no support for this one yet. But when they decide, you’ll know what to write!

```css
@media (prefers-contrast) {
  :root {
    --text-color: black;
  }
}
```

<h2 id="prefers-reduced-motion">`prefers-reduced-motion`</h2>

Some users aren’t fans of animations and transitions. To some unlucky few, these kinds of movements can make them physically sick! That’s why most devices now support a way to tune down the transitions you find in most modern UIs.

With the `prefers-reduced-motion` media query, you can respect that wish as well. Use it to reduce those “bouncy” animations, fading images and “fun” transitions a bit. Note that you don’t necessarily have to remove all movement, but reduce it.

Browser support for this one is pretty good already, and is a “boolean” value too – `no-preference` or `reduce`. Here’s an example:

```css
@media (prefers-reduced-motion) {
  * {
    transition-duration: 0.05s;
  }
}
```

<h2 id="prefers-reduced-transparency">`prefers-reduced-transparency`</h2>

Some operating systems offer an option to reduce the amount of translucent layering effects used by the system. Although not supported by any browsers yet, the `prefers-reduced-transparency` media query is aiming to help you cater to those users.

This is another boolean value – `no-preference` and `reduce`, so when it does get shipped in some browsers, you can write code like this:

```css
@media (prefers-reduced-transparency) {
  .floating-box {
    opacity: 1;
  }
}
```

<h2 id="prefers-reduced-data">`prefers-reduced-data`</h2>

Now this one is pretty exciting. If you’re running low on cellular data, or if you’re traveling internationally, it sucks to hit an image-heavy site. Well, not anymore, thanks to the fabulous prefers-reduced-data media query!

There’s no support for this yet, but it’s one of the most practical applications of media queries I’ve seen. With this, you could skip that huge header image or high-res profile images when they’re not needed. I sure hope it gets implemented soon.

The value is boolean as well, so `no-preference` and `reduce` are the values. Here’s an example:

```css
@media (prefers-reduced-data) {
  .hero-image {
    background-image: none;
    background-color: salmon;
  }
}
```

<h2 id="custom-media-queries">Custom media queries</h2>

The last media query introduced in the level 5 spec is definitely the most powerful one – scriptable, customizable media queries.

The main purpose seems to be avoiding repetition by creating a custom media query that maps to longer media queries.

They’re specified with the new `@custom-media` keyword, and it can look like this:

```css
@custom-media --medium-devices (min-width: 50rem);
@custom-media --large-landscape (min-width: 70rem) and (orientation: landscape);

@media (--medium-devices) {
  .container {
    max-width: 40rem;
  }
}
```

The CSS Working Group is also planning on a way to make these values scriptable, which is going to really bring super powers to media queries. Think how you can write styles when you can have `@media (–logged-in)` or `@media(–no-connection)` media queries?

There are no browsers out there implementing this yet, but you can use a [PostCSS plugin](https://github.com/postcss/postcss-custom-media) to use at least the @custom-media part of the spec.

<h2 id="content-visibility">Content-visibility</h2>

In general, most web apps have complex UI elements, and it expands beyond what the user sees in the browser view. On such occasions, we can use content-visibility to skip the rendering of the off-screen content. This will decrease the page rendering time drastically if you have a large amount of content off-screen.

This feature is one of the latest additions, and it is one of the most impactful features to improve rendering performance. While content-visibility accepts several values, we can use content-visibility: auto; on an element to obtain immediate performance gains.

Let's consider the following page that contains many cards with different info. While about 12 cards fit the screen, there are approximately 375 cards in the list. As you can see, the browser has taken 1037ms to render this page.

<Figure>
  <img
    src="https://miro.medium.com/max/700/1*8IqnZPmf3Gmw65XnMmQ6YQ.png"
    alt="regular HTML page"
  />
  <figcaption>Regular HTML page</figcaption>
</Figure>

As the next step, you can add `content-visibility` to all cards. (In this example, after adding content-visibility to the page, rendering time dropped to 150ms. That's more than 6x performance improvement.)

<Figure>
  <img
    src="https://miro.medium.com/max/700/1*zL8hg1aj4ztMVDHe_W7BLQ.png"
    alt="With content-visibility"
  />
  <figcaption>With content-visibility</figcaption>
</Figure>

<h3 id="limitations-of-content-visibility">
  Limitations of `content-visibility`
</h3>

- **This feature is still experimental.** As of this moment (28 December 2020), Firefox (PC and Android versions), Internet Explorer (I don’t think they have plans to add this to IE) and, Safari (Mac and iOS) do not support content-visibility.
- **Issues related to scroll-bar behavior.** Since elements are initially rendered with 0px height, whenever you scroll down, these elements come into the screen. The actual content will be rendered, and the height of the element will be updated accordingly. This will make the scroll bar to behavior in an unintended manner.

To fix the scroll bar issue, you can use another CSS property called `contain-intrinsic-size`. It specifies the natural size of an element. Therefore the element will be rendered with the given height instead of 0px.

```css
.element {
  content-visibility: auto;
  contain-intrinsic-size: 200px;
}
```

However, while experimenting, I noticed that even with `containt-intrinsic-size`, if we are having a large number of elements with `content-visibility` set to `auto` you will still have smaller scroll bar issues.

Therefore, my recommendation is to plan your layout, decompose it into a few sections and then use content-visibility on those sections for better scrollbar behavior.

<h2 id="will-change-property">`Will-change` property</h2>

Animations on the browser aren’t a new thing. Usually, these animations are rendered regularly with other elements. However, browsers can now use GPU to optimize some of these animation operations.

With `will-change` CSS property, we can indicate that the element will modify specific properties and let the browser perform necessary optimizations beforehand.

What happens underneath is that the browser will create a separate layer for the element. After that, it delegates the rendering of that element to the GPU along with other optimizations. This will result in a smoother animation as GPU acceleration take over the rendering of the animation.

Consider the following CSS class:

```css
.animating-element {
  will-change: opacity;
}
```

```html
<div class="animating-elememt">Animating Child elements</div>
```

When rendering the above snippet in the browser, it will recognize the `will-change` property and optimize future opacity-related changes.

According to a performance benchmark done by [Maximillian Laumeister](https://www.maxlaumeister.com/articles/css-will-change-property-a-performance-case-study/), he has obtained over 120FPS rendering speed with this one-line change, which initially was at roughly 50FPS.

<h3 id="when-not-to-use-will-change">When not to use will-change</h3>

While `will-change` is intended to improve performance, it also can degrade web app performance if you misuse it.

- **Using `will-change` indicates that the element will change in the future. ** So if you try to use `will-change` along with an animation simultaneously, it will not give you the optimization. Therefore, it is recommended to use will-change on the parent element and the animation on the child element.

```css
.my-class {
  will-change: opacity;
}
.child-class {
  transition: opacity 1s ease-in-out;
}
```

Do not use elements that are not animating.

When you use `will-change` on an element, the browser will try to optimize it by moving the element into a new layer and handing over the transformation to the GPU. If you have nothing to transform, it will result in a waste of resources.

One last thing to keep in mind is that it is advisable to remove `will-change` from an element after completing all the animations.

<h2 id="reducing-the-render-blocking-time">
  Reducing the Render-blocking time
</h2>

Today, many web apps must cater to many form factors, including PCs, Tablets, & Mobile Phones, etc. To accomplish this responsive nature, we must write new styles according to the media sizes. When it comes to the page rendering, it cannot start the rendering phase until the CSS Object Model (CSSOM) is ready. Depending on your web application, you may have a large stylesheet that caters to all device form factors.

However, suppose we split it up into multiple stylesheets depending on the form factor. In that case, we can let only the main CSS file block the critical path and have it downloaded as a high priority and let other stylesheets download in a low priority manner.

```html
<link rel="stylesheet" href="styles.css" />
```

<Figure>
  <img
    src="https://miro.medium.com/max/700/1*0LtBYTLTuUcK7J8ArX4sZA.png"
    alt="Single stylesheet"
  />
  <figcaption>Single stylesheet</figcaption>
</Figure>

After decomposing it to multiple stylesheets:

```html
<!-- style.css contains only the minimal styles needed for the page rendering -->
<link rel="stylesheet" href="styles.css" media="all" />
<!-- Following stylesheets have only the styles necessary for the form factor -->
<link rel="stylesheet" href="sm.css" media="(min-width: 20em)" /><link
  rel="stylesheet"
  href="md.css"
  media="(min-width: 64em)"
/><link rel="stylesheet" href="lg.css" media="(min-width: 90em)" /><link
  rel="stylesheet"
  href="ex.css"
  media="(min-width: 120em)"
/><link rel="stylesheet" href="print.css" media="print" />
```

<Figure>
  <img
    src="https://miro.medium.com/max/700/1*TiCgtB6JO9Ud5v0E0XblmQ.png"
    alt="Multiple stylesheets"
  />
  <figcaption>Multiple stylesheets</figcaption>
</Figure>

As you can see, having stylesheets decomposed according to form factors can reduce the render-blocking time.

<h2 id="avoiding-import-to-include-multiple-stylesheets">
  Avoiding `@import` to include multiple stylesheets
</h2>

With `@import`, we can include a stylesheet in another stylesheet. When we are working on a large project, having @import makes the code cleaner.

The critical fact about `@import` is that it is a blocking call as it has to make a network request to fetch the file, parse it, and include it in the stylesheet. If we have nested `@import` within stylesheets, it will hinder the rendering performance.

```css
/* style.css */
@import url('windows.css');

/* windows.css */
@import url('componenets.css');
```

<Figure>
  <img
    src="https://miro.medium.com/max/700/1*-KPFrviQosYgL1KTZUQHYw.png"
    alt="Waterfall with imports"
  />
  <figcaption>Waterfall with imports</figcaption>
</Figure>

Instead of using `@import` we can achieve the same with much better performance by having multiple links as it allows us to load stylesheets in parallel.

<h2 id="references">References</h2>

- Selbekk, Kristofer. "New media queries you need to know" LogRocket, 26-02-2020, [https://blog.logrocket.com/](https://blog.logrocket.com/new-media-queries-you-need-to-know/)
- Hapuarachchi, Rumesh Eranga "Improve Page Rendering Speed Using Only CSS", 09-12-2020, [https://blog.bitsrc.io/](https://blog.bitsrc.io/improve-page-rendering-speed-using-only-css-a61667a16b2)
