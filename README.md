# ng-browser-detector [![Build Status](https://travis-ci.org/Sibiraj-S/ng-browser-detector.svg?branch=master)](https://travis-ci.org/Sibiraj-S/ng-browser-detector)

A simple angularJs service to detect platform, browser and version

live demo [here][demo]

## Getting Started

### Installation

You can directly clone/download [here][ng-browser-detector]

```bash
git clone git@github.com:Sibiraj-S/ng-browser-detector.git
```
or use cdn

##### Minified

```bash
//unpkg.com/ng-browser-detector@latest/dist/ng-browser-detector.min.js
```

##### Pretty Printed

```bash
//unpkg.com/ng-browser-detector@latest/dist/ng-browser-detector.js
```
or

Install via Package managers such as [npm][npm], [yarn][yarn] and [bower][bower]

```bash
npm install ng-browser-detector --save
# or
yarn add ng-browser-detector
# or
bower install ng-browser-detector --save
```

### Usage

Import the modules required for ng-browser-detector.

 ```html
<-- scripts -->
<script src="angular/angular.min.js"></script>
<script src="ng-browser-detector/dist/ng-browser-detector.min.js"></script>
 ```

add `ngBrowser` dependency to the module

```js
angular.module('myApp', ['ngBrowser'])
```

in routes config

```js
app.controller('mainController', ['$scope', 'appBrowser', function($scope, appBrowser) {
   $scope.appBrowser = appBrowser;

   appBrowser.getPlatform();
}]);
```

to get platform

```js
appBrowser.getPlatform();
```

to get browser name

```js
appBrowser.getName();
```

to get browser version

```js
appBrowser.getVersion();
```

a simple directive is included (usage : optional)
```html
<body browser-detector></body>
```

the directive appends the browser details to element's class, if provided `browser-detector="attr"` then the details are added as attributes


## Pull Requests

Send Pull Requests only to `.js` files in `src` directory only. files in dist folder is auto generated

* **grunt serve** - sets up a local server with livereload

* **grunt develop** - watches js files for changes and lints the same

* **grunt dist** - adds lints js files for errors, add banners and minifies the js files



[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[bower]: https://bower.io/
[github]: https://sibiraj-s.github.io/
[ng-browser-detector]: https://github.com/Sibiraj-S/ng-browser-detector
[demo]: https://sibiraj-s.github.io/ng-browser-detector/
