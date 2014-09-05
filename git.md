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

### Branching and Merging

    $ git checkout -b iss53
    Switched to a new branch "iss53"

This is shorthand for

    $ git branch iss53
    $ git checkout iss53

You work on your web site and do some commits. Doing so moves the iss53 branch forward, because you have it checked out.

    $ vim index.html
    $ git commit -a -m 'added a new footer [issue 53]'

Switch back to your master branch

    $ git checkout master
    Switched to branch "master"

Run tests and merge if good to go.

    $ git merge hotfix
    Updating f42c576..3a0874c
    Fast forward
     README |    1 -
     1 files changed, 0 insertions(+), 1 deletions(-)

Delete the old unneeded branch.

    $ git branch -d hotfix
    Deleted branch hotfix (3a0874c).

If you have to merge only specific files from a feature branch, you can use git checkout with the name of the feature branch and the file(s) you need to merge

    $ git branch
    * master
      feature_branch
    $ git checkout feature_branch path/to/file1 path/to/file2
    $ git status
    # On branch master
    # Changes to be committed:
    #   (use "git reset HEAD ..." to unstage)
    #
    #   new file:   path/to/file1
    #   new file:   path/to/file2
    #
    $ git commit -m "Merge message"
    [master]: created 4d3e37b: "'Merge' update code from 'feature_branch' branch"
    4 files changed, 72 insertions(+), 0 deletions(-)
    create mode 100644 path/to/file1
    create mode 100644 path/to/file2

Seeing which local branches are tracking a remote branch

    $ git remote show origin

Update local branch with remote content

    $ git merge origin/master

I screwed up, how do I reset my checkout?

    $ git checkout -f

Reset to a specific commit

    $ git reset --hard {SHA1}

Show differences in branches

    $ git diff --name-status branch_name_1 branch_name_2
    $ git diff --stat --color branch_name_1 branch_name_2

If you want to see what would change in detail if you merged in a particular branch:
    
    $ git diff (branch)
    # show a specific file
    $ git diff (branch) (filename)

Show a file from a different branch without checking it out

    $ git show branch:file
    $ git show branch:file > export_file

Merge a branch –dry-run

    $ git merge --no-commit --no-ff branchtomergein

#### Test a pull/merge request before accepting on BitBucket

[Read Article](http://www.electricmonk.nl/log/2014/03/31/test-a-pull-merge-request-before-accepting-on-bitbucket/)

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

## Log

    git log

### Log Stats

If you pass the –stat option to ‘git log’, it will show you which files have changed in that commit and how many lines were added and removed from each.

    $ git log --stat

View the history of a specific file

    $ git log -p filename


Get the commit ID of the last commit:

    $ git log --format="%H" -n 1

Get a list of the files included in the last commit:

    $ git diff-tree --no-commit-id --name-only -r commit_id

Formatting the Log

You can also format the log output almost however you want. The ‘–pretty’ option can take a number of preset formats, such as ‘oneline’.

    $ git log --pretty=oneline
    $ git log --pretty="short
    $ git log --pretty="format: '%h : %s' --graph

Log Statistics

    $ git shortlog

Show the log for n number of commits. For example, git log -2 for the last two commits.

    $ git log -

Show the log with output for files changed and insertions/deletions. Basically the normal output of git commit appended to each message.

    $ git log --stat

Attaches SVN-like add/modified/deleted for each commit. Very basic but still gives a decent idea about what’s changed.

    $ git log --name-status

Compresses each commit to its SHA1 and message on one line. Pipe to wc -l if you want to count commits!

    $ git log --pretty=oneline

See if there’s any commits that have not been pushed to your origin remote.

    $ git log origin..HEAD

See all commits that affected only the file given.

    $ git log 

See all commits that dave has worked on, and ignore any merge commits to reduce noise.

    $ git log --no-merges --author=dave

View commits that have happened since last week. Could easily be replaced with yesterday, 1 year ago, 3 months ago, 1/20/09 and so on. There’s also other time based options: –after, –until, and –before if you want to get creative.

    $ git log --since="1 week ago"

Search through commit messages to find ones that start with the string “Bump”. This will take in any regular expression, so if you’re looking for that one commit you did and all you can remember is a part of the message, –grep will find it.

    $ git log --grep='^Bump'

Don’t want to use less to view your commits? This option will just give you the straight output if you need it

    $ git --no-pager log

Use the gitk command to review the history of a specific document using the Wish comparison application:

    $ gitk [filename]

## References

[http://philsinatra.net/blog/git/](http://philsinatra.net/blog/git/)