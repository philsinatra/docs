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

## Splitting Gulp Tasks

Instead of setting up a root level `gulpfile.js` file, create a folder named `gulpfile.js` and then add `index.js` to the root of that directory. Then create individual tasks files and import them into the primary `gulpfile.js/index.js` file to keep things nice and clean.

```javascript
// gulpfile.js/tasks/processCSS.js
const autoprefixer = require('autoprefixer')
const gulp = require('gulp')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const stylus = require('gulp-stylus')

function cssTranspile() {
  return gulp
    .src('./src/stylus/screen.styl')
    .pipe(sourcemaps.init())
    .pipe(
      stylus({
        compress: true,
      })
    )
    .pipe(postcss([autoprefixer({ grid: true })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/css'))
}

module.exports = cssTranspile
```

```javascript
// gulpfile.js/index.js
const processCSS = require('./tasks/processCSS.js')

function defaultTask(cb) {
  cb()
}

exports.css = processCSS
exports.default = defaultTask
```

## Javascript Task Example

```json
"devDependencies": {
  "@11ty/eleventy": "^0.11.0",
  "@11ty/eleventy-navigation": "^0.1.5",
  "@babel/core": "^7.9.6",
  "@babel/preset-env": "^7.9.6",
  "autoprefixer": "^9.8.0",
  "babel-polyfill": "^6.26.0",
  "del": "^5.1.0",
  "gulp": "^4.0.2",
  "gulp-babel": "^8.0.0",
  "gulp-concat": "^2.6.1",
  "gulp-if": "^3.0.0",
  "gulp-postcss": "^8.0.0",
  "gulp-sourcemaps": "^2.6.5",
  "gulp-strip-debug": "^3.0.0",
  "gulp-stylus": "^2.7.0",
  "gulp-uglify": "^3.0.2",
  "yargs": "^15.3.1"
}
```

```javascript
const argv = require('yargs').argv
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const gulp = require('gulp')
const gulpif = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const stripDebug = require('gulp-strip-debug')
const uglify = require('gulp-uglify')

function jsTranspile() {
  return gulp
    .src(['./node_modules/babel-polyfill/dist/polyfill.js', './src/js/main.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(concat('main.js'))
    .pipe(gulpif(argv.production, stripDebug()))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./assets/js'))
}

module.exports = jsTranspile
```

## References

- [https://gulpjs.com/docs/en/getting-started/creating-tasks](https://gulpjs.com/docs/en/getting-started/creating-tasks)
- [https://tinyurl.com/tqkzv5l](https://tinyurl.com/tqkzv5l)
- [https://tinyurl.com/ujadcw2](https://tinyurl.com/ujadcw2)
- [https://github.com/mdn/web-components-examples/blob/master/editable-list/main.js](https://github.com/mdn/web-components-examples/blob/master/editable-list/main.js)
