# Yarn Package Manager

## Installing Yarn

```bash
npm install -g yarn
```

[yarnpkg.com/en/docs/install](https://yarnpkg.com/en/docs/install)

## Initialize a project

```bash
# May need sudo
yarn init
```

## Add | Upgrade | Removed Dependencies

```bash
yarn add [package-name]
yarn add [package]@[version-or-tag]

# devDependencies
yarn add gulp --dev
```

To upgrade or remove a package, replace `add` with either `upgrade` or `remove` followed by the package name.

```bash
# upgrade to gulp version 4
yarn upgrade gulp@4.0

# remove gulp
yarn remove gulp
```

## Yarn Lock File

`yarn.lock` file should be included in version control to maintain version consistency.

## Remove Dependency Bloat

```bash
yarn clean
```

## Update Yarn

```bash
yarn self-update
```

## Resources

- [Homepage](https://yarnpkg.com)
- [Facebook Intro](https://code.facebook.com/posts/1840075619545360)
- [Scotch.io](https://scotch.io/tutorials/yarn-package-manager-an-improvement-over-npm)