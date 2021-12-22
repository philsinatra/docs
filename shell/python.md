# Python 3

- [Python 3](#python-3)
  - [Installation](#installation)
    - [Don't Use Homebrew](#dont-use-homebrew)
  - [VSCode Extensions](#vscode-extensions)
  - [Resources](#resources)

## Installation

```bash
# Install via MacPorts
sudo port install python37

sudo port select --set python python37
sudo port select --set python3 python37

#!/opt/local/bin/python
```

```bash
# python27 has the following notes:
#   To make this the default Python or Python 2 (i.e., the version run by the
#   'python' or 'python2' commands), run one or both of:

      sudo port select --set python python27
      sudo port select --set python2 python27

# python37 has the following notes:
#   To make this the default Python or Python 3 (i.e., the version run by the
#   'python' or 'python3' commands), run one or both of:

      sudo port select --set python python37
      sudo port select --set python3 python3
```

### Don't Use Homebrew

But if you do...

```bash
# Install via Homebrew
brew install python3

#!/usr/local/bin/python3

# Update via Homebrew
brew upgrade python
```

## VSCode Extensions

- [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python)
- [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner)
- [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces)

Automatically install `pylint` and `yapf` for linting and formatting when prompted by VSCode.

## Resources

- [Python 3 Bootcamp](https://github.com/Pierian-Data/Complete-Python-3-Bootcamp)
