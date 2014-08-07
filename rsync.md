# rsync

    $ rsync -va --progress source_dir destination_dir

Here is the simple example of syncing two folders from terminal:

    $ rsync -va --delete ~/Folder1/ ~/Folder2/

What this line does is comparing contents of Folder1 with what you have in Folder2 and copies all new and newer files and folders from Folder1 to Folder2.

This "–delete" option tells it that you want also to delete files and folders from Folder2 that do not exist in Folder1. So in case that you’d like to leave those files/folders in Folder2, you just omit this part.

Option "-va" hides two options actually, "v" stands for Verbose, so it will inform you what’s being done.

And "a" stands for archive mode, which means that the operation will be recursive so it looks inside of all subfolders you have in Folder1 and Folder2, and that it will keep the permissions intact and also some other things.

You can always check the manual of Rsync by typing "man rsync" in terminal.

In case you don’t want to sync some particular files or folders you can specify it with "–exclude" option. So for example if you don’t want to sync file named "leave_me_alone.txt" you just add this "–exclude=’leave_me_alone.txt’", so your whole command would look like:

    $ rsync -va --exclude='leave_me_alone.txt' --delete ~/Folder1/ ~/Folder2/

And you can add more files by just adding another "–exclude":

    $ rsync -va --exclude='leave_me_alone.txt' --exclude='not_going_anywhere.doc' --delete ~/Folder1/ ~/Folder2/

To only include certain file types, use a combination of the --include and --exclude parameters.

    $ rsync -a --include '*/' --include '*.MOV' --exclude '*' source destination

But the real power comes from the fact that you can use patterns, so if you have a lot of let’s say Microsoft Word files that you’d like to ignore for some reason, you can do this:

    $ rsync -va --exclude='*.doc' --delete ~/Folder1/ ~/Folder2/

To Archive or not?

    -a, --archive = archive mode; same as -rlptgoD (no -H, -A) 
    
    -r = recursive 
    -l = links ; copy symlinks as symlinks 
    -p = perms ; preserve permissions 
    -t = times ; preserve times 
    -g = group ; preserve group 
    -o = owner ; preserve owner (super-user only) 
    -D = same as --devices -- specials 
    --devices = preserve device files (super users only) 
    --specials = preserve special files 

## Multiple Sources

List multiple source files with rsync, it works like cp:

    $ rsync -avR /path/to/file1.txt /path/to/file2/txt /path/to/directory ... /destination/

ex: copy both folders, exclude .psd files

    $ rsync -avR --exclude='*.psd' /Users/username/Pictures ~/Desktop/

Exclude examples:

[http://www.thegeekstuff.com/](http://www.thegeekstuff.com/)

1. Exclude a specific directory

If you don’t want to sync the dir1 (including all it’s subdirectories) from the source to the destination folder, use the rsync –exclude option as shown below.

    $ rm -rf destination
    
    $ rsync -avz --exclude 'dir1' source/ destination/
    building file list ... done
    created directory dest
    ./
    file1.txt
    file2.txt
    dir3/
    dir3/file4.txt

2. Exclude multiple directories that matches a pattern

The following example will exclude any directory (or subdirectories) under source/ that matches the pattern "dir*"

    $ rm -rf destination
    
    $ rsync -avz --exclude 'dir*' source/ destination/
    building file list ... done
    created directory destination
    ./
    file1.txt
    file2.txt

3. Exclude a specific file

To exclude a specific file, use the relative path of the file in the exclude option as shown below.

    $ rm -rf destination
    
    $ rsync -avz --exclude 'dir1/dir2/file3.txt' source/ destination/
    building file list ... done
    created directory destination
    ./
    file1.txt
    file2.txt
    dir1/
    dir1/dir2/
    dir3/
    dir3/file4.txt

4. Exclude path is always relative

If you are not careful, you might make this mistake.

In the following example, the exclude option seems to have a full path (i.e /dir1/dir2/file3.txt). But, from rsync point of view, exclude path is always relative, and it will be treated as dir1/dir2/file3.txt. In the example below, rsync will look for dir1 under source directory (and not under / root directory).

    $ rsync -avz --exclude '/dir1/dir2/file3.txt' source/ destination/

So, the above command is exactly same as the following. Just to avoid confusion (and to make it easy to read), don’t give / in front of the exclude path.

    $ rsync -avz --exclude 'dir1/dir2/file3.txt' source/ destination/

5. Exclude a specific file type

To exclude a specific file type that has a specific extension, use the appropriate pattern. For example, to exclude all the files that contains .txt as extension, do the following.

    $ rsync -avz --exclude '*.txt' source/ destination/
    building file list ... done
    created directory destination
    ./
    dir1/
    dir1/dir2/
    dir3/

6. Exclude multiple files and directories at the same time

When you want to exclude multiple files and directories, you can always specify multiple rsync exclude options in the command line as shown below.

    $ rsync -avz --exclude file1.txt --exclude dir3/file4.txt source/ destination/

Wait. What if I had tons of files that I want to exclude from rsync?

I can’t keep adding them in the command line using multiple –exclude, which is hard to read, and hard to re-use the rsync command for later.

So, the better way is to use rsync –exclude-from option as shown below, where you can list all the files (and directories) you want to exclude in a file.

First, create a text file with a list of all the files and directories you don’t want to backup. This is the list of files and directories you want to exclude from the rsync.

    $ vim exclude-list.txt
    file1.txt
    dir3/file4.txt

Next, execute the rsync using –exclude-from option with the exclude-list.txt as shown below.

    $ rm -rf destination    

    $ rsync -avz --exclude-from 'exclude-list.txt' source/ destination/
    building file list ... done
    created directory destination
    ./
    file2.txt
    dir1/
    dir1/dir2/
    dir1/dir2/file3.txt
    dir3/

Verify the destination directory to make sure the files and directories listed in the exclude-list.txt file is not backed-up.

    $ find destination
    destination
    destination/file2.txt
    destination/dir1
    destination/dir1/dir2
    destination/dir1/dir2/file3.txt
    destination/dir3

7. Effect group/permissions

- "preserve permissions" flag -p
- "preserve groups" flag -g
- "preserve symlinks" flag -l
- "preserve special & device files" flag -D

Perform rsync without effecting group:    

    rsync -va --no-g source destination

