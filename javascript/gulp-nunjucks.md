# Using Nunjucks with Gulp

```shell
$ npm install gulp-nunjucks-render --save-dev
```

``` javascript
var nunjucksRender = require('gulp-nunjucks-render');
```

Setup some type of project structure that allows easy use of Nunjucks.

```
project/
    |- app/
        |- index.html and other .html files
        |- pages/
        |- templates/
            |- partials/
```

The `templates` folder is used for storing all Nunjucks partials and other Nunjucks files that will be added to files in the `pages` folder.

The `pages` folder is used for storing files that will be compiled into HTML. Once they are compiled, they will be created in the `app` folder.

One good thing about Nunjucks (that other template engines might not have) is that it allows you to create a template that contains boilerplate HTMl code which can be inherited by other pages. Let’s call this boilerplate HTML `layout.nunjucks`.

Create a file called `layout.nunjucks` and place it in your `templates` folder. It should contain some boilerplate code like `<html>`, `<head>` and `<body>` tags. It can also contain things that are similar across all your pages, like links to CSS and JavaScript files.

Example:

```html
<!-- layout.nunjucks -->

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>

  <!-- You write code for this content block in another file -->
  {% block content %} {% endblock %}

  <script src="bower_components/jquery/dist/jquery.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

Next, let’s create a `index.nunjucks` file in the `pages` directory. This file would eventually be converted into `index.html` and placed in the `app` folder.

It should extend `layouts.nunjucks` so it contains the boilerplate code we defined in `layout.nunjucks`:

```html
<!-- index.nunjucks -->
{% extends "layout.nunjucks" %}
```

We can then add HTML code that’s specific to `index.nunjucks` between `{% block content %}` and `{% endblock %}`.

```html
<!-- index.nunjucks -->
{% extends "layout.nunjucks" %}

{% block content %} 
<h1>This is the index page</h1>
{% endblock %}
```

We’re done with setting up Nunjucks files. Now, let’s create a `nunjucks` task that coverts `index.nunjucks` into `index.html`.

Within the `nunjucks` task, we first need tell Nunjucks where to locate our templates. We can do so with the `nunjucks.configure` function that gulp-nunjucks-render provides.

```javascript
gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['app/templates/']);
});
```


Next, we add files from `pages` into the gulp task through `gulp.src`. Then, we output these files in `app`.

```javascript
gulp.task('nunjucks', function() {
  nunjucksRender.nunjucks.configure(['app/templates/']);

  // Gets .html and .nunjucks files in pages
  return gulp.src('app/pages/**/*.+(html|nunjucks)')
  // Renders template with nunjucks
  .pipe(nunjucksRender())
  // output files in app folder
  .pipe(gulp.dest('app'))
});
```

Run `gulp nunjucks` in the command line.

## Adding a Partial

We need to create a partial before we can add it to `index.nunjucks`. Let’s create a partial called `navigation.nunjucks` and place it in a `partials` folder that’s within the `templates` folder.

Sample navigation partial:

```html
<!-- navigation.nunjucks -->
<nav>
  <a href="#">Home</a>
  <a href="#">About</a>
  <a href="#">Contact</a>
</nav>
```

Add the partial to our `index.nunjucks` file. We can add partials with the help of the `{% include "path-to-partial" %}` statement that Nunjucks provides.

```html
{% block content %} 

<h1>This is the index page</h1>
<!-- Adds the navigation partial -->
{% include "partials/navigation.nunjucks" %}

{% endblock %}
```

## Adding a Macro

An example where we need to add a class to one of the links when we're on that page:

```html
<nav>
  <!-- active class should only on be present on the homepage -->
  <a href="#" class="active">Home</a>
  <a href="#">About</a>
  <a href="#">Contact</a>
</nav>
```

Create a `nav-macro.nunjucks` file in a `macros` folder that is within the `templates` folder. 

Macros being and end with the following tags:

```html
{% macro functionName() %}
  <!-- Macro stuff here -->
{% endmacro %}
```

Let’s create a macro called `active`. It’s purpose is to output the `active` class for the navigation. It should take one argument, `activePage`, that defaults to `'home'`.

```html
{% macro active(activePage='home') %}
  <!-- Macro stuff here -->
{% endmacro %}
```

We’ll write HTML that would be created within the macro. Here, we can also use the if function provided by Nunjucks to check if an active class should be added:

```html
{% macro active(activePage='home') %}
<nav>
  <a href="#" class="{%if activePage == 'home' %} active {% endif %}">Home</a>
  <!-- Repeat for about and contact -->
</nav>
{% endmacro %}
```

We use the `import` function in Nunjucks to add a macro file. (We used an `include` function when we added a partial previously). When we import a macro file, we have to set it as a variable as well. Here’s an example:

```html
<!-- index.html -->
{% block content %}

<!-- Importing Nunjucks Macro -->
{% import 'macros/navigation.nunjucks' as nav %}

{% endblock %}
```

In this case, we’ve set the `nav` variable as the entire `navigation.nunjucks` macro file. We can then use the `nav` variable to call any macro that were written in the file.

```html
{% import 'macros/navigation.nunjucks' as nav %}
<!-- Creating the navigation with activePage = 'home' -->
{{nav.active('home')}}
```

## Reference

[http://zellwk.com/blog/nunjucks-with-gulp/](http://zellwk.com/blog/nunjucks-with-gulp/)