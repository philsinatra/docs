# Gatsby SEO

These notes combine the basics of a SEO component for a GatsbyJS site with some specifics related to Facebook, specifically getting Open Graph `og:` meta tags to be recognized. The [GatsbyJS documentation](https://www.gatsbyjs.com/docs/add-seo-component/) for building a SEO component is a solid starting point, although the need to query metadata seems a bit overkill. My initial component ended up with hard coded values:

```javascript
import PropTypes from 'prop-types'
import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'

const SEO = ({ title, description, image, article }) => {
  const { pathname } = useLocation()
  const siteUrl = 'https://mywebsite.com'
  const defaultTitle = 'Default Page Title'
  const titleTemplate = '%s | My Website or Default Title'
  const defaultDescription = 'Enter description here'
  const url = 'https://mywebsite.com'
  const seo = {
    , title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  }

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {seo.url && <meta property="og:url" content={seo.url} />}
      <meta property="og:type" content="website" />
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && (
        <meta property="og:description" content={seo.description} />
      )}
      {seo.image && <meta property="og:image" content={seo.image} />}
      <meta name="twitter:card" content="summary_large_image" />
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && (
        <meta name="twitter:description" content={seo.description} />
      )}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  , title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

SEO.defaultProps = {
  , title: null,
  description: null,
  image: null,
  article: false,
}
```

The Facebook specifics are outlined on the [Guide to Sharing for Webmaster](https://developers.facebook.com/docs/sharing/webmasters/). **Note**: obviously this is subject to change with Facebook's ever evolving algorithms and requirements. They offer a [developer tool for debugging](https://developers.facebook.com/tools/debug/) that can point out if any of the require tags are missing or ill formed.

The part that is not document anywhere that will make or break the success of the setup is including the correct plugin in the Gatsby config file to properly export the SEO meta tags in the final build.

```javascript
// gatsby-config.js
module.exports = {
  plugins: ['gatsby-plugin-react-helmet'],
}
```

Without this plugin, the build `index.html` file will not include the tags and any shared links on Facebook will not include preview images or proper descriptions.
