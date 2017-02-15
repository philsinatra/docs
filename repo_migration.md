# How to Move a Private Repository from Bitbucket to Github

- [original source article](https://medium.com/collaborne-engineering/how-to-migrate-a-private-repository-from-bitbucket-to-github-6cddedd5d73#.isttw4eok)

## Create Github repository

First, create a new private repository on Github.com. It’s important to keep the repository empty, e.g. don’t check option _Initialize this repository with a README_ when creating the repository.

## Move existing content

Next, we need to fill the Github repository with the content from our Bitbucket repository:

1. Check out the existing repository from Bitbucket:
    ```bash
    $ git clone https://USER@bitbucket.org/USER/PROJECT.git
    ```

1. Add the new Github repository as upstream remote of the repository checked out from Bitbucket:
    ```bash
    $ cd PROJECT
    $ git remote add upstream https://github.com:USER/PROJECT.git
    ```

1. Push all branches (below: just master) and tags to the Github repository:
    ```bash
    $ git push upstream master
    $ git push --tags upstream
    ```

## Clean up old repository

Finally, we need to ensure that developers don’t get confused by having two repositories for the same project. Here is how to delete the Bitbucket repository:

1. Double check that the Github repository has all content
1. Go to the web interface of the old Bitbucket repository
1. Select menu option Setting > Delete repository
1. Add the URL of the new Github repository as redirect URL
