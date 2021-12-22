# State Management in Gatsby

## Using the `wrapRootElement` Hook

### Wrapping with Provider

The first step is to setup our context provider with a simple `isDark` state and a method to reverse its current state. We’ll take whatever is passed-in as props and wrap it in our new `myContext.Provider`.

- `provider.js`

```javascript
import React, { useState } from 'react'

export const myContext = React.createContext()

const Provider = props => {
  const [isDark, setTheme] = useState(false)

  return (
    <myContext.Provider
      value={{
        isDark,
        changeTheme: () => setTheme(!isDark),
      }}
    >
      {props.children}
    </myContext.Provider>
  )
}

export default ({ element }) => <Provider>{element}</Provider>
```

Now that we have a way to manage our state, Gatsby offers us a neat little hook called `wrapRootElement`, which you can check out in the docs. This hook takes most of our site and passes it as props into a function we give it, like the one we just exported from `Provider.js`, giving us the perfect little space to wrap everything inside.

Both `gatsby-browser.js` and `gatsby-ssr.js` have access to this hook and it’s recommended to wrap both with our provider, that’s why we defined the wrapper function in `provider.js`.

- `gatsby-browser.js` & `gatsby-ssr.js`

```javascript
import Provider from './src/state/provider'

export const wrapRootElement = Provider
```

### Application

The global state can now be accessed in both layout templates, and page files. Wrap the `Consumer` around only the elements that need access to the state to avoid unnecessary re-renders.

```javascript
import { myContext } from '../../provider'

const IndexPage = () => (
  <Layout>
    <myContext.Consumer>
      {context => (
        <>
          <SEO title="Home" />
          <h1>{context.isDark ? 'Dark Theme' : 'Light Theme'}</h1>
          <button onClick={() => context.changeTheme()}>
            {context.isDark ? 'Light' : 'Dark'}
          </button>
        </>
      )}
    </myContext.Consumer>
  </Layout>
)
```

## Reference

Joshua Hall. "State Management in Gatsby using the wrapRootElement Hook", _Digital Ocean_, [https://www.digitalocean.com/community/tutorials/gatsbyjs-state-management-in-gatsby](https://www.digitalocean.com/community/tutorials/gatsbyjs-state-management-in-gatsby). January 3, 2020.
