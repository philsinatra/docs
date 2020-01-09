# Gulp

## `package.json`

```json
"browserslist": [
  "last 2 versions",
  "> 1%",
  "IE >= 11"
],
"dependencies": {
  "babel-polyfill": "^6.26.0",
  "normalize-styl": "^4.1.1"
},
"devDependencies": {
  "@babel/core": "^7.7.5",
  "@babel/plugin-transform-modules-commonjs": "^7.7.5",
  "@babel/preset-env": "^7.7.6",
  "autoprefixer": "^9.7.3",
  "del": "^5.1.0",
  "eslint": "^6.7.2",
  "eslint-config-airbnb-base": "^14.0.0",
  "eslint-plugin-import": "^2.19.1",
  "gulp": "^4.0.2",
  "gulp-postcss": "^8.0.0",
  "gulp-sourcemaps": "^2.6.5",
  "gulp-stylus": "^2.7.0",
  "prettier": "^1.19.1"
}
```

## gulpfile.js

```javascript
const { parallel, series, watch } = require('gulp')
const autoprefixer = require('autoprefixer')
const del = require('del')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const stylus = require('gulp-stylus')

function clean() {
  return del(['./dist'])
}

function cssTranspile() {
  return (
    gulp
      .src('./src/stylus/screen.styl')
      .pipe(sourcemaps.init())
      .pipe(
        stylus({
          compress: true
        })
      )
      // https://tinyurl.com/mb2cy2o
      .pipe(postcss([autoprefixer({ grid: true })]))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./dist/css'))
  )
}

function screens() {
  return gulp
    .src(['./src/index.html', './src/icons/*'])
    .pipe(gulp.dest('./dist'))
}

function watcher() {
  watch('./src/stylus/**/*', cssTranspile)
  watch('./src/index.html', screens)
}

exports.clean = clean
exports.css = cssTranspile
exports.screens = screens
exports.watch = watcher
exports.default = series(clean, parallel(cssTranspile, screens))
```

## Resources

- [https://gulpjs.com/docs/en/getting-started/creating-tasks](https://gulpjs.com/docs/en/getting-started/creating-tasks)
- [https://tinyurl.com/tqkzv5l](https://tinyurl.com/tqkzv5l)
- [https://tinyurl.com/ujadcw2](https://tinyurl.com/ujadcw2)
- [https://github.com/mdn/web-components-examples/blob/master/editable-list/main.js](https://github.com/mdn/web-components-examples/blob/master/editable-list/main.js)
