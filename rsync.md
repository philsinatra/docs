# [rsync](http://linux.die.net/man/1/rsync)

## Basic Syntax
```bash
# rsync options source destination
$ rsync -va --delete ~/Folder1/ ~/Folder2/
```

## Common Options
- -v : verbose
- -r : copies data recursively (but don’t preserve timestamps and permission while transferring data
- -a : archive mode, archive mode allows copying files recursively and it also preserves symbolic - links, file permissions, user & group ownerships and timestamps
- -z : compress file data
- -h : human-readable, output numbers in a human-readable format
- -l = links ; copy symlinks as symlinks
- -p = perms ; preserve permissions
- -t = times ; preserve times
- -g = group ; preserve group
- -o = owner ; preserve owner (super-user only)
- -D = same as --devices -- specials
- --devices = preserve device files (super users only)
- --specials = preserve special files

## Show Progress
Show the progress while transferring data with the `--progress` option.

## Automatically Delete source Files after successful Transfer
automatic deletion can be done using `–-remove-source-files` option

## Dry Run
`--dry-run`

Use of this option will not make any changes only do a dry run of the command and shows the output of the command, if the output shows exactly same you want to do then you can remove `--dry-run`  option from your command and run on the terminal.

## Update the remote only if a newer version is on the local filesystem
Copying files over the have been updated more recently on the local filesystem is done with the `--update` flag. The behavior is now like this:

1. Any files that do not exist on the remote system are copied over
2. Any files that exist on both local and remote that have a newer timestamp on the local server are copied over. (Conversely, any files that have an older timestamp are not copied over).
view sourceprint?
```bash
$ rsync --update -raz --progress source/ destination/
# Example
$ rsync --dry-run --update -vhrz --progress source/directory destination
```

## Include/Exclude/Delete
In case you don’t want to sync some particular files or folders you can specify it with `–exclude` option. So for example if you don’t want to sync file named "leave_me_alone.txt" you just add this `–exclude='leave_me_alone.txt'`, so your whole command would look like:
```bash
$ rsync -va --exclude='leave_me_alone.txt' --delete ~/Folder1/ ~/Folder2/
```

And you can add more files by just adding another `–exclude`:
```bash
$ rsync -va --exclude='leave_me_alone.txt' --exclude='not_going_anywhere.doc' --delete ~/Folder1/ ~/Folder2/
```

To only include certain file types, use a combination of the --include and --exclude parameters.
```bash
$ rsync -a --include '*/' --include '*.MOV' --exclude '*' source destination
```

If a file or directory not exist at the source, but already exists at the destination, you might want to delete that existing file/directory at the target while syncing .

We can use `–delete` option to delete files that are not there in source directory.

But the real power comes from the fact that you can use patterns, so if you have a lot of let’s say Microsoft Word files that you’d like to ignore for some reason, you can do this:
```bash
$ rsync -va --exclude='*.doc' --delete ~/Folder1/ ~/Folder2/
```

[more `-exclude` examples](#exclude_examples)

## References
- [Tecmint](http://www.tecmint.com/rsync-local-remote-file-synchronization-commands/)

## Multiple Sources

List multiple source files with rsync, it works like cp:
```bash
$ rsync -avR /path/to/file1.txt /path/to/file2/txt /path/to/directory ... /destination/
```

ex: copy both folders, exclude .psd files
```bash
$ rsync -avR --exclude='*.psd' /Users/username/Pictures ~/Desktop/
```

<a name="exclude_examples"></a>
### Exclude examples:

[http://www.thegeekstuff.com/](http://www.thegeekstuff.com/)

1. Exclude a specific directory

If you don’t want to sync the dir1 (including all it’s subdirectories) from the source to the destination folder, use the rsync –exclude option as shown below.
```bash
$ rm -rf destination
#
$ rsync -avz --exclude 'dir1' source/ destination/
building file list ... done
created directory dest
./
file1.txt
file2.txt
dir3/
dir3/file4.txt
```

2. Exclude multiple directories that matches a pattern

The following example will exclude any directory (or subdirectories) under source/ that matches the pattern "dir*"
```bash
$ rm -rf destination

$ rsync -avz --exclude 'dir*' source/ destination/
building file list ... done
created directory destination
./
file1.txt
file2.txt
```

3. Exclude a specific file

To exclude a specific file, use the relative path of the file in the exclude option as shown below.
```bash
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
```

4. Exclude path is always relative

If you are not careful, you might make this mistake.

In the following example, the exclude option seems to have a full path (i.e /dir1/dir2/file3.txt). But, from rsync point of view, exclude path is always relative, and it will be treated as dir1/dir2/file3.txt. In the example below, rsync will look for dir1 under source directory (and not under / root directory).
```bash
$ rsync -avz --exclude '/dir1/dir2/file3.txt' source/ destination/
```

So, the above command is exactly same as the following. Just to avoid confusion (and to make it easy to read), don’t give / in front of the exclude path.
```bash
$ rsync -avz --exclude 'dir1/dir2/file3.txt' source/ destination/
```

5. Exclude a specific file type

To exclude a specific file type that has a specific extension, use the appropriate pattern. For example, to exclude all the files that contains .txt as extension, do the following.
```bash
$ rsync -avz --exclude '*.txt' source/ destination/
building file list ... done
created directory destination
./
dir1/
dir1/dir2/
dir3/
```

6. Exclude multiple files and directories at the same time

When you want to exclude multiple files and directories, you can always specify multiple rsync exclude options in the command line as shown below.
```bash
$ rsync -avz --exclude file1.txt --exclude dir3/file4.txt source/ destination/
```

Wait. What if I had tons of files that I want to exclude from rsync?

I can’t keep adding them in the command line using multiple –exclude, which is hard to read, and hard to re-use the rsync command for later.

So, the better way is to use rsync –exclude-from option as shown below, where you can list all the files (and directories) you want to exclude in a file.

First, create a text file with a list of all the files and directories you don’t want to backup. This is the list of files and directories you want to exclude from the rsync.
```bash
$ vim exclude-list.txt
file1.txt
dir3/file4.txt
```

Next, execute the rsync using –exclude-from option with the exclude-list.txt as shown below.
```bash
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
```

Verify the destination directory to make sure the files and directories listed in the exclude-list.txt file is not backed-up.
```bash
$ find destination
destination
destination/file2.txt
destination/dir1
destination/dir1/dir2
destination/dir1/dir2/file3.txt
destination/dir3
```

7. Effect group/permissions

- "preserve permissions" flag -p
- "preserve groups" flag -g
- "preserve symlinks" flag -l
- "preserve special & device files" flag -D

Perform rsync without effecting group:
```bash
rsync -va --no-g source destination
```
