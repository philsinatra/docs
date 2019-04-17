# React Notes

## React Router

### Deploy To Subdirectory

1. Convert all absolute links to relative ones. Base tag works only for relative URLs. In other words, it's required to replace all paths that start with `/` to `./`. Conversion should be applied to all resources and assets. All assets should reside within the `src` folder.

    ```html
    <body>
      <img src="./assets/logo.svg"/>
    </body>
    ```

1. Setup `homepage` in `package.json` to `/subdir/`

    ```json
    "homepage": "/subdir/",
    ```

1. Add `<base href="%PUBLIC_URL%/">` to `index.html`. This tag should be placed in the `<head>` before any other element that uses URLS.

    ```html
    <head>
      ...
      <base href="%PUBLIC_URL%/">
      <title>React App</title>
    </head>
    <body>
      ...
    </body>
    ```

1. Add router history package

    ```bash
    npm install --save history
    # or
    yarn add history
    ```

1. Adjust the router

    ```javascript
    import { createBrowserHistory } from 'history';
    ...
    export const history = createBrowserHistory({
      basename: process.env.PUBLIC_URL
    });
    ```

1. Use updated history and basename in router

    ```javascript
    <Router history={history} basename={'/subdir'}>
    ```

#### References

- [An elegant solution of deploying React app into a subdirectory](https://skryvets.com/blog/2018/09/20/an-elegant-solution-of-deploying-react-app-into-a-subdirectory/)
- [How to deploy a React app to a subdirectory](https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1)