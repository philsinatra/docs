# Gatsby Path Prefix

To run a Gatsby static site in a sub directory on a personal server, assets must be properly prefixed to load correctly.

Add the following to the `gatsby-config.js` file:

```javascript
module.exports = {
  pathPrefix: '/path-to/remote/folder',
}
```

Static assets must also be prefixed using the `withPrefix` function:

```javascript
import { withPrefix } from 'gatsby'
```

Wrap each reference to a static asset in this function call. For example:

```javascript
<link
  rel="apple-touch-icon"
  sizes="57x57"
  href={withPrefix('/apple-icon-57x57.png')}
/>
```
