# Sass Compass

Installing gems on macOS Mojave doesn't work because of rootless permissions system. Using the following command seems to get the job done.

1. `sudo brew install ruby`
1. `sudo gem update --system`
1. ~~`sudo gem install compass`~~
1. `sudo gem install -n /usr/local/bin compass`


- [https://github.com/Compass/compass/issues/2018](https://github.com/Compass/compass/issues/2018)
