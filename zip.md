# Zip

## Create a password protected and encrypted zip

    $ zip -ejr [name] [path_to_folder]

Once you execute this command, Mac OS X will ask for the desired password (twice, for confirmation), and then create a Zip archive of your folder with your chosen name at the root level of your home folder. (If you want to specify a different location, you need to provide the full path instead of just the name.)

### Parameters

| name           | archive file name (no .zip extension) |
| path_to_folder | target directory to be zipped         |

`[name]` is the name you want to give to the resulting archive file (without the ".zip" extension, which the zip command will add automatically).

And `[path_to_folder]` is the complete name of the folder with its full path. Instead of typing it, you can just type zip -ejr [name] followed by a space and then drag-and-drop the target folder onto the command line. Terminal will automatically insert the full path with escape characters if required.

### Flags

| e | encryption    |
| j | junk the path |
| r | recursive     |

The `e` option stands for _encryption_ the `j` for _junk the path_ (otherwise the zip command will archive the complete folder hierarchy leading to your target folder, which you probably don’t want), and `r` stands for _recursive_ which will force the zip command to include the entire contents of the folder in the archive. (Otherwise it will only archive the folder itself without its contents, which is not exactly useful.)