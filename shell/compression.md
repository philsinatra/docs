# Compression

## `.zip` Format

To compress a folder:

```bash
zip -r archive_name.zip folder\_to\_compress

# To declare a compression value, add a numeric parameter
# 9 is the highest
zip -r9 archive_name.zip folder\_to\_compress

# On macOS, ignore invisible files (.DS_Store)
zip -r9 -X archive_name.zip folder\_to\_compress
```

To compress multiple folders into individual, unique zips:

```bash
for i in */; do zip -r "${i%/}.zip" "$i"; done
```

To extract the contents of a zip file:

```bash
unzip archive_name.zip
```

List the details about a zip archive:

```bash
zipinfo archive_name.zip
```

### Encryption

Create a password protected and encrypted zip:

```bash
zip -ejr [name] [path\_to\_folder]
```

Once you execute this command, macOS will ask for the desired password (twice, for confirmation), and then create a zip archive of your folder with your chosen name at the root level of your home folder. (If you want to specify a different location, you need to provide the full path instead of just the name.)

- **name**: archive file name (no .zip extension). `[name]` is the name you want to give to the resulting archive file (without the ".zip" extension, which the zip command will add automatically).
- **path_to_folder**: target directory to be zipped. `[path\_to\_folder]` is the complete name of the folder with its full path. Instead of typing it, you can just type `zip -ejr`[name] followed by a space and then drag-and-drop the target folder onto the command line. Terminal will automatically insert the full path with escape characters if required.

#### Flags

- **e**: encryption
- **j**: junk the path
- **r**: recursive
- **9**: max compression

The `e` option stands for _encryption_ the `j` for _junk the path_ (otherwise the zip command will archive the complete folder hierarchy leading to your target folder, which you probably don’t want), and `r` stands for _recursive_ which will force the zip command to include the entire contents of the folder in the archive. (Otherwise it will only archive the folder itself without its contents, which is not exactly useful.)

## `.tar` Format

To compress a folder:

```bash
tar -cvzf archive_name.tar.gz folder\_to\_compress

# Compress only JPG files (example)
tar -cvzf archive_name.tar.gz /path/to/images/*.jpg
```

To extract the contents of a tar file:

```bash
cd location_of_tar_file

# extract to current directory
tar -xvf yourfile.tar

# extract to different directory
tar -C /myfolder -xvf yourfile.tar
```

## `tar.bz2` Format

```bash
# to compress
tar -jcvf archive_name.tar.bz2 folder_to_compress

# to extract
tar -jxvf archive_name.tar.bz2
```
