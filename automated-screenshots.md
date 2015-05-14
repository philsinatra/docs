# Automated Screenshots

## Resources

- [phantomjs](http://phantomjs.org)
- [casperjs](http://casperjs.org)

## Installation

### PhantomJS

There is an OSX Yosemite bug with the binary file the [download page](http://phantomjs.org/download.html). Use the official release from the [project page](https://github.com/eugene1g/phantomjs/releases) on GitHub to download the binary file. Copy the file to your `usr/bin/` directory:

```bash
# may need sudo command
$ mv -f phantomjs /usr/bin/.
```

### CasperJS

There is a problem with the install if done through `npm`. Use [Homebrew](http://brew.sh) to install:

Update Formulaes:

```bash
$ brew update
```

Install the latest recommended version: (note: always check the official installation instructions for the latest version notes)

```bash
$ brew install casperjs --devel
```

To upgrade:

```bash
$ brew upgrade casperjs
```


## Usage

Setup a javascript file:

```javascript
var casper = require('casper').create();

casper.start();

// Base url of the file set to be screenshotted
var baseUrl = 'http://localhost:8888/project_name/path_to_files/';
// At what breakpoints should each image be made?
var breakpoints = [320, 480, 768, 1024, 1200];
// Name of folder screenshot images should go in
var screenshotFolder = 'screenshots';
// Array of files to be captured
var links = [
            'filename.html',
            'filename2.html'
          ];

function nameFile(link, breakpoint) {
  var name;
  if (link === '') name = 'home';
  else name = link;
  return screenshotFolder + '/' + name.replace(/\//g,'_').replace('.html','') + '-' + breakpoint + '.png';
}

links.forEach(function(link) {
  casper.thenOpen(baseUrl + link, function() {
    breakpoints.forEach(function(breakpoint) {
      casper.viewport(breakpoint, 800).capture(nameFile(link, breakpoint), {
        top: 0,
        left: 0,
        width: breakpoint,
        height: casper.evaluate(function() {
          return document.body.scrollHeight;
        })
      });
    });
  });
});

casper.run();
```

Run the script via `casperjs`:

```bash
$ casperjs screenshots.js
```

