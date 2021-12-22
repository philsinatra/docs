# Gatsby Self Hosted Fonts

Store font files in `/src/fonts/`.

```javascript
// ./src/styles/fonts.js
import TitilliumWeb from '../fonts/TitilliumWeb-Roman-VF.ttf'
export default TitilliumWeb
```

```javascript
// ./src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components'
import TitilliumWeb from './fonts'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Titillium-Web';
    font-weight: 1 999;
    font-style: normal;
    src: url(${TitilliumWeb}) format('truetype');
  }

  body {
    font-family: 'Titillium-Web', serif, -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
  }
`

## References

- [Github Discussion](https://github.com/gatsbyjs/gatsby/issues/2583#issuecomment-340722928)

```
