# Git

## Your Identity

The first thing you should do when you install Git is to set your user name and e-mail address. This is important because every Git commit uses this information, and it’s immutably baked into the commits you pass around:

    $ git config --global user.name "John Doe"
    $ git config --global user.email johndoe@example.com

### Command Alias

    $ git config --global alias.shortcut command

example:

    $ git config --global alias.co checkout
    $ git config --global alias.st status
    $ git config --global alias.ci commit

## Checking Your Settings

If you want to check your settings, you can use the git config –list command to list all the settings Git can find at that point:

    $ git config --list
      user.name=Scott Chacon
      user.email=schacon@gmail.com
      color.status=auto
      color.branch=auto
      color.interactive=auto
      color.diff=auto

## Ignore Files

Add a .gitignore file to the root of your project. Below is a starter file:

    # Compiled source #
    ###################
    *.com
    *.class
    *.dll
    *.exe
    *.o
    *.so
    *.sass-cache
    
    # Packages #
    ############
    # it's better to unpack these files and commit the raw source
    # git has its own built in compression methods
    *.7z
    *.dmg
    *.gz
    *.iso
    *.jar
    *.rar
    *.tar
    *.zip
    
    # Logs and databases #
    ######################
    *.log
    *.sql
    *.sqlite
    
    # OS generated files #
    ######################
    .DS_Store
    .DS_Store?
    ._*
    .Spotlight-V100
    .Trashes
    Icon?
    ehthumbs.db
    Thumbs.db

## Helpful Common Commands

### Push

So let’s say you have checked out a new branch, committed some awesome changes, but now you need to share this branch though with another developer. You can push the branch up to a remote very simply:

    $ git push origin newfeature

Deleting is also a pretty simple task (despite it feeling a bit kludgy):

    $ git push origin :newfeature

Push all branches at once

    $ git push --all origin

### Stash

Now you want to switch branches, but you don’t want to commit what you’ve been working on yet; so you’ll stash the changes. To push a new stash onto your stack, run git stash

    $ git stash
    Saved working directory and index state \
      "WIP on master: 049d078 added the index file"
    HEAD is now at 049d078 added the index file
    (To restore them type "git stash apply")

To see which stashes you’ve stored, you can use git stash list:

    $ git stash list
    stash@{0}: WIP on master: 049d078 added the index file
    stash@{1}: WIP on master: c264051... Revert "added file_size"
    stash@{2}: WIP on master: 21d80a5... added number to log

In this case, two stashes were done previously, so you have access to three different stashed works. You can reapply the one you just stashed by using the command shown in the help output of the original stash command: git stash apply. If you want to apply one of the older stashes, you can specify it by naming it, like this: git stash apply stash@{2}. If you don’t specify a stash, Git assumes the most recent stash and tries to apply it:

    $ git stash apply
    # On branch master
    # Changes not staged for commit:
    #   (use "git add ..." to update what will be committed)
    #
    #      modified:   index.html
    #      modified:   lib/simplegit.rb
    #

You can manually delete stashes with:

    $ git stash drop

Or delete all of the stored stashes with:

    $ git stash clear

### Remote

Remote show

    $ git remote show origin

Push new local branch to remote repo

    $ git push origin plugin

Push to existing remote branch

    $ git push -u origin

Checkout a remote branch

    $ git fetch origin
    $ git checkout --track origin/plugin

Merge remote branch

    $ git fetch
    $ git merge origin/master

Delete remote branch

    $ git push origin :newfeature

Seeing which local branches are tracking a remote branch

    $ git remote show origin

### Show

Show a file from a different branch without checking it out

    $ git show branch:file
    $ git show branch:file > export_file

Get a file from a specific revision

    $git show branch:path/to/file

So let’s say we want to go back four commits from our current HEAD, and we want the index.html file.

    $ git show HEAD~4:index.html

You could of course pass any valid treeish into the command. It will accept the actual SHA1 of the blob as well.

### Reset Current Branch

    $ git checkout -f
    $ git checkout -f path/file

Delete untracked files/directories

    # remove files
    $ git clean -f
    # remove files and directories
    $ git clean -f -d .
    # remove ignored files also
    $ git clean -f -x .

### Pruning

    $ git remote show origin
        Remote branches:
        feature_branch                  tracked
        master                          tracked
        refs/remotes/origin/feature_old stale (use 'git remote prune' to remove)
    
Sometimes branches are deleted from a remote repo. By default, git fetch will not remove any remote-tracking branches that have been deleted on the remote repo. Running git remote prune REMOTENAME will delete these tracking branches.

    $ git remote prune origin
        Password:
        Pruning origin
        URL: https://...
         * [pruned] feature_old
    
Use the –dry-run flag to review what will be pruned.

### Cleanup

    $ git gc

Runs a number of housekeeping tasks within the current repository, such as compressing file revisions (to reduce disk space and increase performance) and removing unreachable objects which may have been created from prior invocations of git add.

Users are encouraged to run this task on a regular basis within each repository to maintain good disk space utilization and good operating performance.

### List Conflicts

List the conflicted files in git

    $ git ls-files -u

## References

[http://philsinatra.net/blog/git/](http://philsinatra.net/blog/git/)