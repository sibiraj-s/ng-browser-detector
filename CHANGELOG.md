# CHANGELOG

All notable changes to this project will be documented in this file.

> **Tags**
> - Features
> - Bug Fixes
> - Performance Improvements
> - Dependency Updates
> - Breaking Changes
> - Documentation
> - Internal

## v1.1.5 (2018-08-29)

#### Internal

* just a code cleanup while applying standardJS rules to eslint ([66cd563](https://github.com/Sibiraj-S/ng-browser-detector/commit/66cd563))

## v1.1.4 (2018-07-28)

Just a Maintenance Patch

#### Internal

* remove karma testing as karma has few vulnerabilities in its dependencies
* run travis builds in trusty environment
* mark repo as private to prevent accidental publish to npm registry
* replace jshint with eslint for better performance
* remove commitizen and cz-conventional-changelog dependency
* add prepublish script to prevent direct execution of `npm publish`

## v1.1.3 (2018-07-17)

Just a Maintenance Patch

#### Internal

* hide unfinished AngularJS code while AngularJS is being loaded. ([47d4dcd](https://github.com/Sibiraj-S/ng-browser-detector/commit/47d4dcd))
* remove pullapprove
* migrate to travis-ci.com

#### Dependency Updates

* update devDependencies ([04d163d](https://github.com/Sibiraj-S/ng-browser-detector/commit/04d163d))

## v1.1.2 (2018-07-10)

Just a Maintenance Release.

#### Dependency Updates

* update devDependencies and repo maintenance ([79d144c](https://github.com/Sibiraj-S/ng-browser-detector/commit/79d144c))

## v1.1.1 (2018-03-27)

#### Internal

* use npm instead of yarn ([e977da9](https://github.com/Sibiraj-S/ng-browser-detector/commit/e977da9))
* add post build actions ([b153404](https://github.com/Sibiraj-S/ng-browser-detector/commit/b153404))
* delete TREE.md ([8ed671d](https://github.com/Sibiraj-S/ng-browser-detector/commit/8ed671d))
* add shebang line to shell scripts ([6db28e1](https://github.com/Sibiraj-S/ng-browser-detector/commit/6db28e1))

#### Dependency Updates

* update devDependencies ([4ec7a24](https://github.com/Sibiraj-S/ng-browser-detector/commit/4ec7a24))
* update angular to v1.6.9 in demo ([28aba37](https://github.com/Sibiraj-S/ng-browser-detector/commit/28aba37))

## v1.1.0 (2018-02-07)

#### Features

* detect Microsoft Edge browser ([514a277](https://github.com/Sibiraj-S/ng-browser-detector/commit/514a277))

#### Dependency Updates 

* update devDependencies ([514a277](https://github.com/Sibiraj-S/ng-browser-detector/commit/514a277))

## v1.0.1 (2017-11-28)

#### Internal

* publish only dist folder to npm registry
* move dependencies to peerDependencies

#### Dependency Updates

* update cz-conventional-changelog to v2.1.0
* update angular to v1.6.7
* update grunt-contrib-uglify to v3.2.1

#### Breaking Changes

* bower installations will not be supported anymore, use npm or yarn

## v1.0.0 (2017-07-11)

#### Features

* Initial Release. Detect device platforms and browsers with versions
