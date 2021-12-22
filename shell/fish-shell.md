# Fish Shell

## Installation

Use the macOS installer.

- [Homepage](https://fishshell.com)

To make Fish the default:

```bash
chsh -s /usr/local/bin/fish
```

Configuration on macOS can be found at the following location:

`~/.config/fish/config.fis`

### Oh My Fish

- [Github](https://github.com/oh-my-fish/oh-my-fish)

```bash
curl -L https://get.oh-my.fish | fish
```

### Fisherman

[Fisherman](https://github.com/fisherman/fisherman) is a plugin manager. To install:

```shell
curl -Lo ~/.config/fish/functions/fisher.fish --create-dirs https://git.io/fisher
```

### Bob the Fish

- [GitHub](https://github.com/oh-my-fish/theme-bobthefish)

```shell
bobthefish_display_colors --all
```

## Plugins

- [YouTube Downloader](https://github.com/rg3/youtube-dl/blob/master/README.md#format-selection-examples)

```bash
# Example
youtube-dl 'https://www.youtube.com/watch?v=dGk-36bF6-Y' -f best
```
