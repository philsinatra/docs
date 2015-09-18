## Find
```bash
$ find path_to_search . type -f -name "*text_to_find*"
# find and copy
$ find path_to_search . type -f -name "*text_to_find*" -exec cp "{}" destination_path \;
```

### Details

Use `-maxdepth` to only return the current directory, not recursivly search inside subfolders

Use `-type f` to only return files and not directories or device nodes or whatever else

Use a combination if `-not` and `-name` to avoid the files with names you don't want

It might come together like this:
```bash
$ find /path/to/uploads -maxdepth 1 -type f -not -name 't_*'
```

## CURL
```bash
$ curl http://pathtofile.xml -o ~/Desktop/output_filename.xml
```

## SCP

The basic format of the command:
```bash
$ scp [options] original_file destination_file
```

To format the remote portion:

    user@server:path/to/file

*Note: to copy whole directories use the [-r] flag*

## Symbolic Link
```bash
$ ln -s <path_to_file_that_should_be_linked> .
```

Symbolic link to all files in a folder (OSX)
```bash
$ ln -s <path_to_file_that_should_be_linked/*> .
```

## File copy maintaining Date/Owner info
```bash
$ cp -a path/filename
```

## Open files in specific apps

[http://hints.macworld.com/article.php?story=2004012218171997](http://hints.macworld.com/article.php?story=2004012218171997)
```bash
$ open -a "Adobe Photoshop 7.0" foo.jpg
```

## File Permissions and Ownership
```bash
$ chown root filename
$ chgrp root filename
$ chmod 777 filename
# change user:group in one line
$ chown user:group filename
```

## Change permissions to all sub files
```bash
# goto content area
$ cd /var/www/vhosts/xxxxx.com/
# change to owned by nobody user:group
$ chown -R nobody:nobody .
# correct permissions all files at current directory and below
$ find . -type f -exec chmod 664 {} \;
# correct permissions all directories at current directory and below
$ find . -type d -exec chmod 775 {} \;
```

## Directory compare and txt list output

compare directories and export txt list of differences
```bash
$ diff -qr dirA dirB | grep -v -e 'DS_Store' -e 'Thumbs' | sort > diffs.txt
```

## List contents of zipped file

To list contents of zipped file:
```bash
$ unzip -l filename.zip
```

## Copy
```bash
$ cd /destination of copy/
$ cp -R /directory_files to copy .
```

## Batch Rename
```bash
$ for file in *.zipd; do mv "$file" "${file%zipd}zip"; done
```

## Batch Remove Spaces In File Names
```bash
#! /bin/sh
for n in *
do
OldName=$n
#NewName=`echo $n | tr -d " "`
NewName=`echo $n | tr -s " " "-"`
echo $NewName
mv "$OldName" "$NewName"
done
```

To run this script, `cd` into the destination directory and then execute. Example:
```bash
$ cd directory/my-files/
$ ~/Documents/./remove-spaces *
```

## Create Executable Shell Script
```bash
$ ls
myscript.sh
$ mv myscript.sh myscript
$ chmod 755 myscript
# To use the script from the command line:
$ ./myscript
```

## Show files by edit date

List files edited in the past day
```bash
$ find . -type f -newermt 2011-06-07
$ find . -type f -newermt 2011-06-06 ! -newermt 2011-06-07 | sort > ~/Desktop/list.txt
```

## Outgoing IP address
```bash
$ % curl ifconfig.me/all/json
```

## Network Commands

[http://www.computerhope.com/](http://www.computerhope.com/)

## Extract files from multiple folders
```bash
$ find path/to/extract/from -name *.mp3 -exec cp {} /path/to/destination \;
```

## sftp / ssh

To access a remote server without the use of a public key use:
```bash
$ ssh -o "PubkeyAuthentication no" user@server
$ sftp -o "PubkeyAuthentication no" user@server
```

## Get User Input
```bash
echo "Type something and then hit [ENTER]"
read userinput
```

## Does directory exist?
```bash
if [ -d "$dir" ]
then
  echo "$dir directory already exists!"
else
  echo "$dir directory not found!"
fi
```

## Some helpful ftp commands:

- pwd:    print working directory of remote host
- lpwd:   print working directory of local host
- cd: change directory of remote host
- lcd:    change directory of local host
- ls: list directory on the remote host
- lls:    list directory on the local host
- mkdir:  make directory on remote host
- lmkdir: make directory on local host
- get:    receive file from remote host to local client
- put:    send file from local client to remote host
- help:   display help text
