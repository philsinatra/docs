# Terminal Goodies

## CURL

    $ curl http://pathtofile.xml -o ~/Desktop/output_filename.xml

## SCP

The basic format of the command:

    $ scp [options] original_file destination_file

To format the remote portion:

    user@server:path/to/file

*Note: to copy whole directories use the [-r] flag*

## symbolic link

    $ ln -s <path_to_file_that_should_be_linked> .

symbolic link to all files in a folder (OSX)

    $ ln -s <path_to_file_that_should_be_linked/*> .

## File copy maintaining Date/Owner info

    $ cp -a path/filename

## Open files in specific apps

[http://hints.macworld.com/article.php?story=2004012218171997](http://hints.macworld.com/article.php?story=2004012218171997)

    $ open -a "Adobe Photoshop 7.0" foo.jpg

## File Permissions and Ownership
    $ chown root filename
    $ chgrp root filename
    $ chmod 777 filename

## Change permissions to all sub files

    # goto content area
    $ cd /var/www/vhosts/xxxxx.com/
    # change to owned by nobody user:group
    $ chown -R nobody:nobody .
    # correct permissions all files at current directory and below
    $ find . -type f -exec chmod 664 {} \;
    # correct permissions all directories at current directory and below
    $ find . -type d -exec chmod 775 {} \;

##Directory compare and txt list output

compare directories and export txt list of differences

    $ diff -qr dirA dirB | grep -v -e 'DS_Store' -e 'Thumbs' | sort > diffs.txt

## List contents of zipped file

To list contents of zipped file:

    $ unzip -l filename.zip

## Copy
    $ cd /destination of copy/
    $ cp -R /directory_files to copy .

## Batch Rename

    $ for file in *.zipd; do mv "$file" "${file%zipd}zip"; done

## Show files by edit date

List files edited in the past day

    $ find . -type f -newermt 2011-06-07
    $ find . -type f -newermt 2011-06-06 ! -newermt 2011-06-07 | sort > ~/Desktop/list.txt

## Outgoing IP address
    $ % curl ifconfig.me/all/json

## Network Commands

[http://www.computerhope.com/](http://www.computerhope.com/)

## Extract files from multiple folders

    $ find path/to/extract/from -name *.mp3 -exec cp {} /path/to/destination \;

## sftp / ssh

To access a remote server without the use of a public key use:

    $ ssh -o "PubkeyAuthentication no" user@server
    $ sftp -o "PubkeyAuthentication no" user@server

Some helpful ftp commands:

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


