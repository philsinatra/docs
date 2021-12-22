# WebP Shell

## Installation

[Install the WebP CLI](https://developers.google.com/speed/webp/docs/precompiled)

## Script

Create a new shell script named `mwebp` in the correct location. For macOS, this is preferably the `/usr/local/bin/` directory. Windows location?

Set the file permissions:

```bash
chmod a+x mwebp
```

```bash
#!/bin/bash
set -e
for FILE in *;
  do
    filename=$(basename "$FILE")
    ext="${filename##*.}"
    if [ "$ext" == "jpg" ] || [ "$ext" == "png" ]
    then
      fn="$(basename "$filename" | sed 's/\(.*\)\..*/\1/')"
      cwebp "$FILE" -o "${fn}.webp"
    fi
done
```

Executing the script will batch convert all `.jpg` and `.png` files in the current directory using the default settings of [`cwebp`](https://developers.google.com/speed/webp/docs/cwebp).

## References

- A new image format for the Web. (n.d.). Google Developers. https://developers.google.com/speed/webp
