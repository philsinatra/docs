# Bash/Shell Scripting

## Add git branch name to bash prompt

Add following lines to your ~/.bash_profile

```bash
parse_git_branch() {
     git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
export PS1="\u@\h \[\033[32m\]\w\[\033[33m\]\$(parse_git_branch)\[\033[00m\] $ "
```

In here `parse_git_branch()` function extract the branch name when your are in git repository. This function output used in `PS1` variable in order to prompt the branch name.

In above PS1 we defined following properties:

- `\u@\h \[\033[32m\]` - user, host name and its displaying color
- `\w\[\033[33m\]` - current working directory and its displaying color
- `\$(parse_git_branch)\[\033[00m\]` - git branch name and its displaying color

Now when you go to git repository form the terminal it will display currently checked out git branch in the prompt. Following is the example output of bash prompt after adding these changes to `~/.bash_profile`.

### My Bash Prompt

```bash
export PS1="\W\$(parse_git_branch)\[\033[00m\] $ "
```

## Colors

### Foreground & background colour commands

```bash
tput setab [1-7] # Set the background colour using ANSI escape
tput setaf [1-7] # Set the foreground colour using ANSI escape
```

Colours are as follows:

```bash
Num  Colour    #define         R G B

0    black     COLOR_BLACK     0,0,0
1    red       COLOR_RED       1,0,0
2    green     COLOR_GREEN     0,1,0
3    yellow    COLOR_YELLOW    1,1,0
4    blue      COLOR_BLUE      0,0,1
5    magenta   COLOR_MAGENTA   1,0,1
6    cyan      COLOR_CYAN      0,1,1
7    white     COLOR_WHITE     1,1,1
```

There are also non-ANSI versions of the colour setting functions (setb instead of setab, and setf instead of setaf) which use different numbers, not given here.

### Text mode commands

```bash
tput bold    # Select bold mode
tput dim     # Select dim (half-bright) mode
tput smul    # Enable underline mode
tput rmul    # Disable underline mode
tput rev     # Turn on reverse video mode
tput smso    # Enter standout (bold) mode
tput rmso    # Exit standout mode
```

### Clear and insert commands

```bash
tput ech N   # Erase N characters
tput clear   # Clear screen and move the cursor to 0,0
tput el 1    # Clear to beginning of line
tput el      # Clear to end of line
tput ed      # Clear to end of screen
tput ich N   # Insert N characters (moves rest of line forward!)
tput il N    # Insert N lines
```

### Other commands

```bash
tput sgr0    # Reset text format to the terminal's default
tput bel     # Play a bell
```

### Example

```bash
red=`tput setaf 1`
green=`tput setaf 2`
reset=`tput sgr0`
echo "${red}red text ${green}green text${reset}"
```

-[Stack Overflow source](https://stackoverflow.com/questions/5947742/how-to-change-the-output-color-of-echo-in-linux)

## Arrays

- [http://www.thegeekstuff.com/2010/06/bash-array-tutorial](http://www.thegeekstuff.com/2010/06/bash-array-tutorial)

## Make Directory

```bash
mkdir directory_name
# -p flag will make directory if it does not already exist
mkdir -p directory_name
```

## CURL

```bash
curl http://pathtofile.xml -o ~/Desktop/output_filename.xml
```

## SCP

The basic format of the command:

```bash
scp [options] original_file destination_file
```

To format the remote portion:

    user@server:path/to/file

*Note: to copy whole directories use the [-r] flag*

## Symbolic Link

```bash
ln -s <path_to_file_that_should_be_linked> .
```

Symbolic link to all files in a folder (OSX)

```bash
ln -s <path_to_file_that_should_be_linked/*> .
```

To check if a symbolic link exists before creating:

```bash
cdn=../cdn
path=../build
files=( "docs" "fonts" "media" "ui")

for i in "${files[@]}"
  do
    if [[ -h "$path/$i" ]]; then echo "{$i} link exists"; else ln -s "$cdn/$i" "$path/$i"; fi
done
```

This will loop through the defined `path` and check each of the items in the `files` array to see if they exist as a symbolic link. If they do not exist, the script will create the symlinks.

## File copy maintaining Date/Owner info

```bash
cp -a path/filename
```

## Open files in specific apps

[http://hints.macworld.com/article.php?story=2004012218171997](http://hints.macworld.com/article.php?story=2004012218171997)

```bash
open -a "Adobe Photoshop 7.0" foo.jpg
```

## Directory compare and txt list output

Compare directories and export txt list of differences:

```bash
diff -qr dirA dirB | grep -v -e 'DS_Store' -e 'Thumbs' | sort > diffs.txt
```

## List contents of zipped file

To list contents of zipped file:

```bash
unzip -l filename.zip
```

## Copy

```bash
cd /destination of copy/
cp -R /directory_files to copy .
```

### Copy With Preservation

```bash
$ cp -rp /source /destination
#
# cp manpage details
-p    same as --preserve=mode,ownership,timestamps

--preserve[=ATTR_LIST]
        preserve the specified attributes (default: mode,ownership,timestamps),
        if possible additional attributes: context, links, xattr, all
```

## Batch Rename

```bash
for file in *.zipd; do mv "$file" "${file%zipd}zip"; done
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
cd directory/my-files/
~/Documents/./remove-spaces *
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

## Find & Remove Files Based On Wildcard String

_*NEEDLE*_ represents the wildcard string value that is being searched for in the file names.

```bash
find . -maxdepth 1 -name "*NEEDLE*" -print
find . -maxdepth 1 -name "*NEEDLE*" -exec rm {} \;
```

## Show files by edit date

List files edited in the past day

```bash
find . -type f -newermt 2011-06-07
find . -type f -newermt 2011-06-06 ! -newermt 2011-06-07 | sort > ~/Desktop/list.txt
```

## Outgoing IP address

```bash
curl ifconfig.me
```

## Network Commands

[http://www.computerhope.com/](http://www.computerhope.com/)

## Extract files from multiple folders

```bash
find path/to/extract/from -name *.mp3 -exec cp {} /path/to/destination \;
```

## sftp / ssh

To access a remote server without the use of a public key use:

```bash
ssh -o "PubkeyAuthentication no" user@server
sftp -o "PubkeyAuthentication no" user@server
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


## Reformat Text As A Long List of Words

```bash
tr [:cntrl:] " " <filename | tr -s " " >new.filename
```

- [http://www.linuxforums.org/forum/ubuntu-linux/153458-scipt-add-carriage-return-text-after-number-words.html](http://www.linuxforums.org/forum/ubuntu-linux/153458-scipt-add-carriage-return-text-after-number-words.html)

## Insert a new line every ten words

```bash
xargs -n10 < file
# output to a new file
xargs -n10 < new.file
```

- [http://stackoverflow.com/questions/15979802/how-to-insert-a-newline-n-after-x-numbers-of-words-with-awk-or-sed](http://stackoverflow.com/questions/15979802/how-to-insert-a-newline-n-after-x-numbers-of-words-with-awk-or-sed)

## Package Assets

```bash
#!/bin/bash
cd ${0%/*}

# Package `build` contents for delivery.
read -r -p "Package for delivery? (did you --production flag everything?) [Y/n] " response
case $response in
    [yY][eE][sS]|[yY])
        echo 'Copying files...'
        cp -r ../build ~/Desktop/.
        cd ~/Desktop/
        mv build package_name
        echo 'Done.'

        echo 'Zipping files...'
        zip -r9X package_name.zip package_name
        echo 'Done.'

        read -r -p "Delete prep directory? This will leave the .zip file but remove the temporary source. [Y/n] " response
        case $response in
          [yY][eE][sS]|[yY])
            echo 'Cleaning up...'
            rm -r package_name
            ;;
        esac

        cd -
        echo 'Packaging complete.'
        open ~/Desktop/
        ;;
    *)
        # do_something_else
        ;;
esac
```
