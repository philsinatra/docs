# Zip

## Cross Platform Zip

To compress:
```bash
$ zip -r archive_name.zip folder_to_compress
```

To extract:
```bash
$ unzip archive_name.zip
```

Create a zip without invisibile OSX files (.DS_Store etc), us the **-X** option:
```bash
$ zip -r -X archive_name.zip folder_to_compress
```

List the details about a zip archive:
```bash
$ zipinfo file[.zip]
```

[zipinfo details](http://linux.about.com/library/cmd/blcmdl1_zipinfo.htm)

## Create a password protected and encrypted zip
```bash
$ zip -ejr [name] [path_to_folder]
```

Once you execute this command, Mac OS X will ask for the desired password (twice, for confirmation), and then create a Zip archive of your folder with your chosen name at the root level of your home folder. (If you want to specify a different location, you need to provide the full path instead of just the name.)

### Parameters

Parameter  | Description
------------- | -------------
name           | archive file name (no .zip extension)
path_to_folder | target directory to be zipped

`[name]` is the name you want to give to the resulting archive file (without the ".zip" extension, which the zip command will add automatically).

And `[path_to_folder]` is the complete name of the folder with its full path. Instead of typing it, you can just type zip -ejr [name] followed by a space and then drag-and-drop the target folder onto the command line. Terminal will automatically insert the full path with escape characters if required.

### Flags

Flag  | Description
------------- | -------------
e | encryption
j | junk the path
r | recursive
9 | max compression

The `e` option stands for _encryption_ the `j` for _junk the path_ (otherwise the zip command will archive the complete folder hierarchy leading to your target folder, which you probably don’t want), and `r` stands for _recursive_ which will force the zip command to include the entire contents of the folder in the archive. (Otherwise it will only archive the folder itself without its contents, which is not exactly useful.)

## Compress Multiple Folders Into Individual Zips

This will create a unique zip for each folder in your current directory.

```shell
$ for i in */; do zip -r "${i%/}.zip" "$i"; done
```

# Tar

To open a _tar_ file in Linux or Unix:

```bash
$ cd location_of_tar_file
# extract to current directory
$ tar -xvf yourfile.tar
# extract to different directory
$ tar -C /myfolder -xvf yourfile.tar
```

To create a _tar_ file:

```bash
tar -cvzf tarballname.tar.gz itemtocompress
```

For example, to compress a directories jpg files only, you’d type:

```bash
tar -cvzf jpegarchive.tar.gz /path/to/images/*.jpg
```bash
