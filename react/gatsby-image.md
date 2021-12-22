# Gatsby Image

## Installation & Configuration

Installation can be done using one of the starter themes.

```bash
gatsby new image-demo https://github.com/gatsbyjs/gatsby-starter-default
cd image-demo/
```

Or by using the basic Gatsby initializer.

```bash
gatsby init
```

### Installing Gatsby Image

Depending on the primary installation method, some of these may be installed by default. Verify all four of these packages are installed.

```bash
yarn add gatsby-image
yarn add gatsby-transformer-sharp gatsby-plugin-sharp gatsby-source-filesystem
```

The `gatsby-source-filesystem` package allows Gatsby to use GraphQL on the images in a certain directory and make queries out of them. The two `sharp` plugins are what processes the images before you display them.

Update the `gatsby-config.js` and add the plugins to it.

```javascript
module.exports = {
  siteMetadata: {
    title: "My Gatsby Site",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
```

**Important**: Make sure you specify the correct `path` to your images! The `gatsby-source-filesystem` will look in this folder to access your images. Since we're using the default starter, there's already a folder at `/src/images` so we'll use that. Get some images off of Unsplash and add them to that folder.

## Testing An Image Query With GraphQL

```bash
gatsby develop
```

Navigate to `http://localhost:8000/___graphql` to see the GraphiQL view of the site. Here we can test the different queries available to us. I've added 3 images to my `/src/images` folder and named them `one.jpg`, `two.jpg`, and `three.jpg`. To query for `photo.jpg`:

```graphql
query {
  imageOne: file(relativePath: { eq: "one.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        base64
        tracedSVG
        aspectRatio
        src
        srcSet
        srcWebp
        srcSetWebp
        sizes
        originalImg
        originalName
      }
    }
  }
}
```

## Adding the GraphQL Query

Open up `src/pages/index.js`. You'll need to import graphql from `gatsby` as well as Img from `gatsby-image`.

```javascript
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

const IndexPage = ({ data }) => {
  return (
    <Container>
      <Img fluid={data.imageOne.childImageSharp.fluid} />
      <Img fluid={data.imageTwo.childImageSharp.fluid} />
      <Img fluid={data.imageThree.childImageSharp.fluid} />
    </Container>
  )
}

query {
  imageOne: file(relativePath: { eq: "one.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  imageTwo: file(relativePath: { eq: "two.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  imageThree: file(relativePath: { eq: "three.jpg" }) {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 900px;
  width: 100%;
`

export default IndexPage
```

## Using the Gatsby Image Component

```javascript
<Img fluid={data.imageOne.childImageSharp.fluid} />
```

To reduce repetition, you can use a custom fragment.

```language-diff-javascript
- query {
-   imageOne: file(relativePath: { eq: "one.jpg" }) {
-     childImageSharp {
-       fluid(maxWidth: 1000) {
-         ...GatsbyImageSharpFluid
-       }
-     }
-   }
-   imageTwo: file(relativePath: { eq: "two.jpg" }) {
-     childImageSharp {
-       fluid(maxWidth: 1000) {
-         ...GatsbyImageSharpFluid
-       }
-     }
-   }
-   imageThree: file(relativePath: { eq: "three.jpg" }) {
-     childImageSharp {
-       fluid(maxWidth: 1000) {
-         ...GatsbyImageSharpFluid
-       }
-     }
-   }
- }
```

```javascript
export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export const pageQuery = graphql`
  query {
    imageOne: file(relativePath: { eq: "one.jpg" }) {
      ...fluidImage
    }
    imageTwo: file(relativePath: { eq: "two.jpg" }) {
      ...fluidImage
    }
    imageThree: file(relativePath: { eq: "three.jpg" }) {
      ...fluidImage
    }
  }
`;
```

## Add `webp` Support

```diff-highlight
export const fluidImage = graphql`
fragment fluidImage on File {
  childImageSharp {
    fluid(maxWidth: 1000) {
-     ...GatsbyImageSharpFluid
+     ...GatsbyImageSharpFluid_withWebp
    }
  }
}
```

### Adjust Quality

```diff
export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
-      fluid(maxWidth: 1000) {
+      fluid(maxWidth: 1000, quality: 80) {
         ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
`
```

## Add `avif` Support

Awaiting full implementation. Currently the conversion to `avif` works, but this is a full replacement of the output, rather than an option for supported browsers like the `_withWebp` option.

```javascript
// NOT yet implemented
export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1000, toFormat: AVIF) {
        # ...GatsbyImageSharpFluid
        ...GatsbyImageSharpFluid_withWebp
      }
    }
  }
`;
```

## Multiple Images

Create a separate component that can load all of the images, which then can be referenced as needed.

```javascript
import { StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import React from "react";

const Image = ({ alt, filename }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 1152, quality: 80) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => {
      const image = data.images.edges.find((n) =>
        n.node.relativePath.includes(filename)
      );
      if (!image) return null;
      const imageFluid = image.node.childImageSharp.fluid;
      return <Img alt={alt} fluid={imageFluid} />;
    }}
  />
);

Image.defaultProps = {
  alt: "",
};

Image.propTypes = {
  alt: PropTypes.string,
  filename: PropTypes.string.isRequired,
};

export default Image;
```

Then import the component in the desired page and call it as needed.

```javascript
import Image from "../components/Image";

return <Image filename="filename.jpg" alt="alternative text" />;
```

## References

- Chang, H. (2018, September 20). An Introduction To Using Gatsby Image &amp; Gatsby.js V2. Retrieved January 28, 2021, from <https://codebushi.com/using-gatsby-image/>
- Gatsby-image. (n.d.). Retrieved January 28, 2021, from <https://www.gatsbyjs.com/plugins/gatsby-image/#avoiding-stretched-images-using-the-fluid-type>
- [Using Gatsby-Image With Your Site](https://www.gatsbyjs.org/tutorial/gatsby-image-tutorial/#using-static-query)
- [Gatsbyjs/gatsby-image/fluid-queries](https://www.gatsbyjs.org/packages/gatsby-image/#fluid-queries)
- [Using Fragments](https://www.gatsbyjs.org/docs/working-with-images/)
- [How to render multiple images in gatsby using image component](https://criscodes.hashnode.dev/how-to-render-multiple-images-in-gatsby-using-image-component-cjxoowlou000pfms1o91x71ts)
