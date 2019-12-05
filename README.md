# ng-browser-detector [![Tests](https://github.com/sibiraj-s/ng-browser-detector/workflows/Tests/badge.svg)](https://github.com/sibiraj-s/ng-browser-detector/actions)

A simple angularJs service to detect platform, browser and version

live demo [here][demo]

## Getting Started

### Installation

You can directly clone/download [here][ng-browser-detector]

```bash
git clone git@github.com:sibiraj-s/ng-browser-detector.git
```

or use cdn

**Minified:**

```bash
//cdn.jsdelivr.net/npm/ng-browser-detector@latest/ng-browser-detector.min.js
```

**Pretty Printed:**

```bash
//cdn.jsdelivr.net/npm/ng-browser-detector@latest/ng-browser-detector.js
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
const app = angular.module('myApp', ['ngBrowser'])
```

in routes config

```js
function BrowserDetectController($scope, appBrowser) {
  $scope.appBrowser = appBrowser;
}

app.controller('BrowserDetectController', ['$scope', 'appBrowser', BrowserDetectController]);
```

to get platform

```js
appBrowser.getPlatformName();
```

refer https://github.com/sibiraj-s/browser-dtector#api for more info

A simple directive is included (usage : optional)

```html
<body browser-detector></body>
```

the directive appends the browser details to element's class, if provided `browser-detector="attr"` then the details are added as attributes

[npm]: https://www.npmjs.com/
[yarn]: https://yarnpkg.com/lang/en/
[github]: https://sibiraj-s.github.io/
[ng-browser-detector]: https://github.com/sibiraj-s/ng-browser-detector
[demo]: https://sibiraj-s.github.io/ng-browser-detector/
