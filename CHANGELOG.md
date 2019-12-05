# CHANGELOG

All notable changes to this project will be documented in this file.

> **Tags**
>
> - Features
> - Bug Fixes
> - Performance Improvements
> - Enhancements
> - Dependency Updates
> - Breaking Changes
> - Documentation
> - Internal
> - Unreleased

## v2.0.1 (2019-12-05)

#### Internal

- publish LICENSE to npm ([b1d528a](https://github.com/sibiraj-s/ng-browser-detector/commit/b1d528a))

## v2.0.0 (2019-12-05)

#### Enhancements

- use [browser-dtector](https://www.npmjs.com/package/browser-dtector) for browser detection ([0974658](https://github.com/sibiraj-s/ng-browser-detector/commit/0974658))

#### Internal

- migrate from travis-ci to Github actions ([d7c0400](https://github.com/sibiraj-s/ng-browser-detector/commit/d7c0400))
- use gulp task runner instead of grunt ([0974658](https://github.com/sibiraj-s/ng-browser-detector/commit/0974658))
- add karma unit tests ([13eb077](https://github.com/sibiraj-s/ng-browser-detector/commit/13eb077))

#### Dependency Updates

- bump devDependencies ([e77f141](https://github.com/sibiraj-s/ng-browser-detector/commit/e77f141), [965c2fe](https://github.com/sibiraj-s/ng-browser-detector/commit/965c2fe))

#### Breaking Changes

- rename methods
  - `getPlatform` -> `getPlatformName`
  - `getName` -> `getBrowserName`
  - `getVersion` -> `getBrowserVersion`

## v1.1.7 (2018-12-28)

#### Enhancements

- use babel to transipile and minify output files ([beb03d0](https://github.com/sibiraj-s/ng-browser-detector/commit/beb03d0))
- migrate from `unpkg` cdn to `jsdelivr` ([eca1e77](https://github.com/sibiraj-s/ng-browser-detector/commit/eca1e77))

#### Internal

- extend LICENSE to year 2019 ([3be368a](https://github.com/sibiraj-s/ng-browser-detector/commit/3be368a))
- remove grunt-contrib-uglify in favour of babel's minify preset ([beb03d0](https://github.com/sibiraj-s/ng-browser-detector/commit/beb03d0))
- replace `eslint-config-standard` with `eslint-config-airbnb-base` ([beb03d0](https://github.com/sibiraj-s/ng-browser-detector/commit/beb03d0))
- replace `grunt-contrib-sass` with `grunt-sass` ([beb03d0](https://github.com/sibiraj-s/ng-browser-detector/commit/beb03d0))
- convert source code to es6 syntax ([beb03d0](https://github.com/sibiraj-s/ng-browser-detector/commit/beb03d0))

#### Dependency Updates

- update eslint to v5.11.1 ([beb03d0](https://github.com/sibiraj-s/ng-browser-detector/commit/beb03d0))
- update husky to v1.2.1 ([beb03d0](https://github.com/sibiraj-s/ng-browser-detector/commit/beb03d0))

## v1.1.6 (2018-10-05)

#### Dependency Updates

- update grunt-contrib-uglify to v4.0.0 ([2feb318](https://github.com/sibiraj-s/ng-browser-detector/commit/2feb318))
- update eslint to v5.6.1 ([2376093](https://github.com/sibiraj-s/ng-browser-detector/commit/2376093))
- update husky to v1.1.0 ([2376093](https://github.com/sibiraj-s/ng-browser-detector/commit/2376093))
- update grunt-contrib-connect to v2.0.0 ([2376093](https://github.com/sibiraj-s/ng-browser-detector/commit/2376093))
- update eslint-plugin-promise to v4.0.1 ([2376093](https://github.com/sibiraj-s/ng-browser-detector/commit/2376093))

#### Internal

- update github username ([7f62d0a](https://github.com/sibiraj-s/ng-browser-detector/commit/7f62d0a))
- remove vscode settings in favour of editorconfig ([ce31847](https://github.com/sibiraj-s/ng-browser-detector/commit/ce31847))

## v1.1.5 (2018-08-29)

#### Internal

- just a code cleanup while applying standardJS rules to eslint ([66cd563](https://github.com/sibiraj-s/ng-browser-detector/commit/66cd563))

## v1.1.4 (2018-07-28)

Just a Maintenance Patch

#### Internal

- remove karma testing as karma has few vulnerabilities in its dependencies
- run travis builds in trusty environment
- mark repo as private to prevent accidental publish to npm registry
- replace jshint with eslint for better performance
- remove commitizen and cz-conventional-changelog dependency
- add prepublish script to prevent direct execution of `npm publish`

## v1.1.3 (2018-07-17)

Just a Maintenance Patch

#### Internal

- hide unfinished AngularJS code while AngularJS is being loaded. ([47d4dcd](https://github.com/sibiraj-s/ng-browser-detector/commit/47d4dcd))
- remove pullapprove
- migrate to travis-ci.com

#### Dependency Updates

- update devDependencies ([04d163d](https://github.com/sibiraj-s/ng-browser-detector/commit/04d163d))

## v1.1.2 (2018-07-10)

Just a Maintenance Release.

#### Dependency Updates

- update devDependencies and repo maintenance ([79d144c](https://github.com/sibiraj-s/ng-browser-detector/commit/79d144c))

## v1.1.1 (2018-03-27)

#### Internal

- use npm instead of yarn ([e977da9](https://github.com/sibiraj-s/ng-browser-detector/commit/e977da9))
- add post build actions ([b153404](https://github.com/sibiraj-s/ng-browser-detector/commit/b153404))
- delete TREE.md ([8ed671d](https://github.com/sibiraj-s/ng-browser-detector/commit/8ed671d))
- add shebang line to shell scripts ([6db28e1](https://github.com/sibiraj-s/ng-browser-detector/commit/6db28e1))

#### Dependency Updates

- update devDependencies ([4ec7a24](https://github.com/sibiraj-s/ng-browser-detector/commit/4ec7a24))
- update angular to v1.6.9 in demo ([28aba37](https://github.com/sibiraj-s/ng-browser-detector/commit/28aba37))

## v1.1.0 (2018-02-07)

#### Features

- detect Microsoft Edge browser ([514a277](https://github.com/sibiraj-s/ng-browser-detector/commit/514a277))

#### Dependency Updates

- update devDependencies ([514a277](https://github.com/sibiraj-s/ng-browser-detector/commit/514a277))

## v1.0.1 (2017-11-28)

#### Internal

- publish only dist folder to npm registry
- move dependencies to peerDependencies

#### Dependency Updates

- update cz-conventional-changelog to v2.1.0
- update angular to v1.6.7
- update grunt-contrib-uglify to v3.2.1

#### Breaking Changes

- bower installations will not be supported anymore, use npm or yarn

## v1.0.0 (2017-07-11)

#### Features

- Initial Release. Detect device platforms and browsers with versions
