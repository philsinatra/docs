# CSS Starter

<!-- https://gist.github.com/philsinatra/79a52c69107d7fa899b88aea25f7f295 -->

```css
:root {
  --color-celery-400: #3da74e;
  --color-celery-500: #44b556;
  --color-celery-600: #4bc35f;
  --color-celery-700: #51d267;
  --color-chartreuse-400: #7cc33f;
  --color-chartreuse-500: #85d044;
  --color-chartreuse-600: #8ede49;
  --color-chartreuse-700: #9bec54;
  --color-yellow-400: #d2b200;
  --color-yellow-500: #dfbf00;
  --color-yellow-600: #edcc00;
  --color-yellow-700: #fad900;
  --color-magenta-400: #ca2996;
  --color-magenta-500: #d83790;
  --color-magenta-600: #e2499d;
  --color-magenta-700: #ec5aaa;
  --color-fuchsia-400: #b130bd;
  --color-fuchsia-500: #c038cc;
  --color-fuchsia-600: #cf3edc;
  --color-fuchsia-700: #d951e5;
  --color-purple-400: #864ccc;
  --color-purple-500: #9256d9;
  --color-purple-600: #9d64e1;
  --color-purple-700: #a873df;
  --color-indigo-400: #5c5ce0;
  --color-indigo-500: #6767ec;
  --color-indigo-600: #7575f1;
  --color-indigo-700: #8282f6;
  --color-seafoam-400: #16878c;
  --color-seafoam-500: #1b959a;
  --color-seafoam-600: #20a3a8;
  --color-seafoam-700: #23b2b8;
  --color-red-400: #d7373f;
  --color-red-500: #e34850;
  --color-red-600: #ec5b62;
  --color-red-700: #f76d74;
  --color-orange-400: #da7b11;
  --color-orange-500: #e68619;
  --color-orange-600: #f29423;
  --color-orange-700: #f9a43f;
  --color-green-400: #268e6c;
  --color-green-500: #2d9d78;
  --color-green-600: #33ab84;
  --color-green-700: #39b990;
  --color-blue-400: #1473e6;
  --color-blue-500: #2680eb;
  --color-blue-600: #378ef0;
  --color-blue-700: #4b9cf5;
  --color-black: #000;
  --color-gray-50: #080808;
  --color-gray-75: #1a1a1a;
  --color-gray-100: #1e1e1e;
  --color-gray-200: #2c2c2c;
  --color-gray-300: #393939;
  --color-gray-400: #494949;
  --color-gray-500: #5c5c5c;
  --color-gray-600: #7c7c7c;
  --color-gray-700: #a2a2a2;
  --color-gray-800: #c8c8c8;
  --color-gray-900: #efefef;
  --color-white: #fff;

  --color-overflow: #010101;
  --color-base: #1f2023;
  --color-surface: #27292d;
  --color-overlay-dark: #2d2f34;
  --color-overlay-light: #383b40;
  --color-text: #f4f4f4;

  --background: var(--color-text);
  --foreground: var(--color-overflow);

  --size-300: clamp(0.7rem, 0.66rem + 0.2vw, 0.8rem);
  --size-400: clamp(0.88rem, 0.83rem + 0.24vw, 1rem);
  --size-500: clamp(1.09rem, 1rem + 0.47vw, 1.33rem);
  --size-600: clamp(1.37rem, 1.21rem + 0.8vw, 1.78rem);
  --size-700: clamp(1.71rem, 1.45rem + 1.29vw, 2.37rem);
  --size-800: clamp(2.14rem, 1.74rem + 1.99vw, 3.16rem);
  --size-900: clamp(2.67rem, 2.07rem + 3vw, 4.21rem);
  --size-1000: clamp(3.34rem, 2.45rem + 4.43vw, 5.61rem);

  --base-font-size: var(--size-400);

  /* Spacing */
  --sp-2: 0.125rem; /* 2px */
  --sp-4: 0.25rem; /* 4px */
  --sp-8: 0.5rem; /* 8px */
  --sp-12: 0.75rem; /* 12px */
  --sp-16: 1rem; /* 16px */
  --sp-24: 1.5rem; /* 24px */
  --sp-32: 2rem; /* 32px */
  --sp-40: 2.5rem; /* 40px */
  --sp-48: 3rem; /* 48px */
  --sp-64: 4rem; /* 64px */
  --sp-96: 6rem; /* 96px */
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: var(--color-base);
    --foreground: var(--color-text);
  }
}

html {
  background-color: var(--background);
  box-sizing: border-box;
  color: var(--foreground);
  font-size: 100%;
  line-sizing: normal;
  overflow-x: hidden;
  text-spacing: trim-start allow-end trim-adjacent ideograph-alpha ideograph-numeric;
  touch-action: manipulation;
  -webkit-text-size-adjust: 100%;
}

@supports (font-kerning: normal) and (font-varient-ligatures: common-ligatures contextual) and
  (font-variant-numeric: oldstyle-nums proportional-nums) {
  html {
    font-feature-settings: normal;
    font-kerning: normal;
    font-variant-ligatures: common-ligatures contextual;
    font-variant-numeric: oldstyl-nums proportional-nums;
  }
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  font-kerning: normal;
  font-size: var(--base-font-size);
  font-smoothing: antialiased;
  -ms-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  -webkit-touch-callout: none;
  -webkit-overflow-scrolling: touch;

  /* Improve (or in some cases royally screw with) safari's legibility somewhat */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Improve kerning pairs. Webkit gets funny with this sometimes */
  text-rendering: optimizeLegibility;

  /* Remove those jagged edges on CSS transformations in Chrome is to add the CSS
  property -webkit-backface-visibility with a value of hidden.
  http://stackoverflow.com/questions/6492027/css-transform-jagged-edges-in-chrome
  */
  -webkit-backface-visibility: hidden;
}

.visually-hidden {
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
}

a {
  white-space: nowrap;
}

abbr {
  font-feature-settings: 'kern', 'liga', 'clig', 'calt', 'c2sc', 'smcp';
  @supports (font-variant-caps: all-small-caps) {
    font-feature-settings: normal;
    font-variant-caps: all-small-caps;
  }
}

h1 {
  font-size: var(--size-1000);
}
h2 {
  font-size: var(--size-800);
}
h3 {
  font-size: var(--size-600);
}
h4 {
  font-size: var(--size-400);
}
h5 {
  font-size: var(--size-200);
}
h6 {
  font-size: var(--size-100);
}

i,
em {
  font-style: italic;
}

img,
object,
video {
  max-width: 100%;
}

small {
  display: inline-block;
  line-height: 1.1;
}

.no-break {
  hyphens: none;
}

.numbers {
  letter-spacing: 0.01em;
}

svg use {
  pointer-events: none;
}

.visually-hidden {
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
}

/* If using normalize, these resets not needed */
[hidden] {
  display: none !important;
}

b,
strong {
  font-weight: bolder;
}
```
