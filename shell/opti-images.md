# Optipng / Jpegopti

## Optipng

- [Official Manual](http://optipng.sourceforge.net/optipng-0.7.5.man.pdf)
- [Notes](http://www.clock.co.uk/blog/optimise-your-pngs-from-the-terminal-in-osx)

A quick example: `cd` into the directory with image(s) to be optimized and:

```shell
find . -name "*.png" -exec optipng -o7 {} \;
```

## Jpegopti

An exmaple with a `dry-run` option enabled:

```shell
find . -name "*.jpg" -exec jpegoptim -m60 -o -p -n --strip-all {} \;
```

Run the same command for real: 

```shell
find . -name "*.jpg" -exec jpegoptim -m60 -o -p --strip-all {} \;
```
