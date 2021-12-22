# `mozjpeg`

## Installation

Via MacPorts

```bash
sudo port install mozjpeg
```

To fix missing dependencies after installing `mozjpeg`, copy scripts to local bin:

```bash
# Find where mozjpeg is installed
port contents mozjpeg

# example:
Port mozjpeg contains:
  /opt/local/bin/cjpeg
  /opt/local/bin/djpeg
  ...

# cd to that location and copy scripts

cd /opt/local/bin

cp cjpeg /usr/local/bin/mozcjpeg
cp djpeg /usr/local/bin/mozdjpeg
```

- [reference](https://github.com/jmcollin/optimizeImage)
