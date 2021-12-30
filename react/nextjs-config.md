# NextJS Config

## Yarn 2 PNP 

Project needs to include `pages/404.tsx` and `pages/_error.tsx`

- [https://github.com/vercel/next.js/issues/21828#issuecomment-949814681](https://github.com/vercel/next.js/issues/21828#issuecomment-949814681)

## Common Dependencies

```json
"dependencies": {
  "@iconify/icons-tabler": "^1.1.2",
  "@iconify/react": "^1.1.3",
  "@mdx-js/loader": "^1.6.22",
  "@next/mdx": "^10.0.3",
  "@types/prismjs": "^1.16.2",
  "lodash.throttle": "^4.1.1",
  "next": "10.0.3",
  "react": "17.0.1",
  "react-dom": "17.0.1",
  "styled-components": "^5.2.1",
  "styled-normalize": "^8.0.7",
  "uuid": "^8.3.2"
},
"devDependencies": {
  "@types/node": "^14.14.14",
  "@types/react": "^17.0.0",
  "@types/styled-components": "^5.1.7",
  "babel-plugin-styled-components": "^1.12.0",
  "next-compose-plugins": "^2.2.1",
  "prop-types": "^15.7.2",
  "typescript": "^4.1.3"
},
```

## Production Prefix

```javascript
// next.config.js
const withPlugins = require('next-compose-plugins')
const productionPrefix = '/branches/nextjs'

module.exports = withPlugins({
  basePath: process.env.NODE_ENV === 'production' ? productionPrefix : '',
})
```

## MDX Content

```javascript
// next.config.js
const withPlugins = require('next-compose-plugins')
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

module.exports = withPlugins([
  withMDX({
    pageExtensions: ['js', 'jsx', 'mdx', 'tsx'],
  }),
])
```
