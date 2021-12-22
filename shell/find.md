# Find

```bash
$ find path_to_search . type -f -name "*text_to_find*"
# find and copy
$ find path_to_search . type -f -name "*text_to_find*" -exec cp "{}" destination_path \;
```

Use `-maxdepth` to only return the current directory, not recursivly search inside subfolders

Use `-type f` to only return files and not directories or device nodes or whatever else

Use a combination if `-not` and `-name` to avoid the files with names you don't want

It might come together like this:
```bash
$ find /path/to/uploads -maxdepth 1 -type f -not -name 't_*'
```

## Simple Recursive Find

```bash
$ find . -name "*.jpg"
```

## Recursive Find - Count File Types

```bash
$ find . -type f | sed 's/.*\.//' | sort | uniq -c
   16 avi
   29 jpg
  136 mp3
    3 mp4
```

Command explanation:

- `find` recursively prints all filenames
- `sed` deletes from every filename the prefix until the file extension
- `uniq` assumes sorted input
    - `-c` does the counting (like a histogram).

Reference: [http://unix.stackexchange.com/questions/18506/recursive-statistics-on-file-types-in-directory](http://unix.stackexchange.com/questions/18506/recursive-statistics-on-file-types-in-directory)