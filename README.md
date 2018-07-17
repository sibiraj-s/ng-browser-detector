# ng-browser-detector [![Build Status](https://travis-ci.com/Sibiraj-S/ng-browser-detector.svg?branch=master)](https://travis-ci.com/Sibiraj-S/ng-browser-detector)

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
//unpkg.com/ng-browser-detector@latest/ng-browser-detector.min.js
```

##### Pretty Printed

```bash
//unpkg.com/ng-browser-detector@latest/ng-browser-detector.js
```

or

Install via Package managers such as [npm][npm] or [yarn][yarn]

```bash
npm install ng-browser-detector --save
# or
yarn add ng-browser-detector
```

### Usage

Import the modules required for ng-browser-detector.

 ```html
<-- scripts -->
<script src="angular/angular.min.js"></script>
<script src="../ng-browser-detector.min.js"></script>
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

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[github]: https://sibiraj-s.github.io/
[ng-browser-detector]: https://github.com/Sibiraj-S/ng-browser-detector
[demo]: https://sibiraj-s.github.io/ng-browser-detector/
