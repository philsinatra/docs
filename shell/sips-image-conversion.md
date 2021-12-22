# `sips` Image Conversion Tool

## Batch Convert PNG to JPG

```bash
mkdir jpegs; sips -s format jpeg *.* --out jpegs
```

## Batch Convert JPG to PNG

```bash
mkdir pngs; sips -s format png *.* --out pngs
```

### Explanation

- `mkdir` creates a new folder
- `sips -s format` sets the format you want to change the files to
- `--out` sets the directory you want to save the converted files to

## Batch Resize Images

```bash
sips -Z 640 *.jpg
```

## Check Image Dimensions

```bash
sips -g pixelHeight -g pixelWidth *
```

## Documentation

- [Apple Documentation](https://developer.apple.com/legacy/library/documentation/Darwin/Reference/ManPages/man1/sips.1.html)

---

## Single File Conversion

To convert a single image with sips, use the following command string syntax:

```bash
sips -s format [image type] [file name] --out [ouptut file]
```

Example:

```bash
sips -s format png test.jpg --out test.png
```

## Batch Image Conversion

```bash
for i in [filename]; do sips -s format [image type] $i --out [destination]/$i.[extension];done
```

Example:

```bash
for i in *.jpeg; do sips -s format png $i --out Converted/$i.png;done
```
