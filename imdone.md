# Atom Package - imdone

[https://atom.io/packages/imdone-atom](https://atom.io/packages/imdone-atom)

- Code style tasks are only detected in comments for files with extensions listed in imdone-core/languages.js or the languages attribute in the `.imdone/config.json`.

To setup support for `.html` files, add the following to the `.imdone/config.json` file:

```json
"languages": [
".html, html"
]
```

<small>[reference](https://github.com/imdone/imdone-core#metadata)</small>