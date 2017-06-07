# DOCS

Documents and notes related to web developement.

## Shell dotfiles

A great resource with additional shell enhancements and functions: [https://github.com/mathiasbynens/dotfiles](https://github.com/mathiasbynens/dotfiles)

## Fonts

- [101 Best Free Logo Fonts](http://www.webdesignerdepot.com/2015/06/101-best-free-logo-fonts/)

## Audio

- [Royalty Free Audio](http://www.purple-planet.com)

## SVG

- [SVG Patterns](http://www.heropatterns.com/?mc_cid=a2f92af018&mc_eid=aad7905fc1)

## Video Placeholder

```html
<video preload controls poster="https://cdn.brad.is/images/thumb.jpg">
    <source src="https://cdn.brad.is/videos/curiosity.mp4" type="video/mp4">
    <source src="https://cdn.brad.is/videos/curiosity.webm" type="video/webm">
</video>
```

## Sublime Text

Select every other line:

1. Find: <kbd>Ctrl</kbd>+<kbd>F</kbd>
1. If regular expressions are not already enabled, enable them: <kbd>Alt</kbd>+<kbd>Command</kbd>+<kbd>R</kbd>
1. Type in the expression `.*\n.*\n`
1. Find all: <kbd>Alt</kbd>+<kbd>Enter</kbd>
1. Press left arrow to get rid of the selections, leaving just the cursors: <kbd>←</kbd>
1. You now have a cursor at the start of every odd-numbered line. If you wanted even-numbered lines, press down: <kbd>↓</kbd>
1. Depending on the file, there might be one cursor missing right down the bottom of the file. Using the mouse (damn!) scroll to the bottom, hold down <kbd>Ctrl</kbd>, and click where the missing cursor should be to add it in.
