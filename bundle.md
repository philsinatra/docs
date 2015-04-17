# Bundle

[http://bundler.io/](http://bundler.io/)

## Setup local gem dependencies instead of using globally installed gem files

Verify Bundler is installed on your system:

`$ bundle -v`

If not installed, install:

```bash
# This may require 'sudo' command
$ gem install bundler
```

If the project needs to be initialized, [create a Gemfile](http://bundler.io/v1.1/bundle_init.html) via Bundler:

`$ bundle init`

Setup `Gemfile` with required dependencies. Example:

```ruby
# A sample Gemfile
# source "https://rubygems.org"

gem 'autoprefixer-rails', ">=1.2.0.20140609"
gem 'breakpoint', ">=2.0.7"
gem 'compass', ">=0.12.6"
gem 'sass', ">=3.2.19"
gem 'singularitygs', ">=1.1.2"
```

[Install the required gem files locally to the project](http://bundler.io/v1.1/bundle_install.html) as opposed to globally on the system:

```bash
$ bundle install --path vendor/bundle
```

This should create a folder in your local project that holds local copies of the required gem files.

To guarantee that you're using your local gems and not the system gems, always run commands prefixed with `bundle exec`. Example:

```bash
$ bundle exec grunt
```

## Resources

- [Vendor Everything](http://ryan.mcgeary.org/2011/02/09/vendor-everything-still-applies/)
