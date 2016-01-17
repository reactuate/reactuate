# Reactuate

Reactuate is an opinionated stack for building React-based frontend applications. Core objectives are as follows:

1. Fork-and-forget (or fork-and-follow) is not a great way to keep up with what's happening in the frontend space. Therefore, starting off from a cloned boilerplate "kit" is not an acceptable solution. Reactuateis distributed as a __dependency__.
1. Reactuate is strictly a frontend-oriented stack and is not meant to provide a foundation for so called "universal" (server and client side) JavaScript applications.
1. Reducing the amount of noise. Many kits suffer from the need to create too many files for each "functional vertical" (such as
   action creators, constants, reducer), which in turn leads to increased maintenance complexity (try renaming one of the vericals),
   "import nightmare" and inability to have a compact overview of the functionality.
1. Discovering and learning the capabilities of comprehensive stack solution could be complicated. What's even worse, maintaining such stacks can be equally painful. Therefore, unconventionally, Reactuate is written as a *literate program* and is meant to be read as a small book and be a concise reference manual — while being a functional library.
1. Don't cling on the legacy stuff. Move forward.

## Version

Current published version:

    0.1.0

## License

Reactuate is licensed under the terms of [Apache 2.0 license](LICENSE.md).

# Requirements

Reactuate requires the minimum of the following version of Node.js:

[Node.js version]()

    v5.4.1

More recent versions are allowed, within the upper boundary of the next major version.

In order to produce the extracted source code of Reactuate (should you need it), you will need `litpro` npm package to be installed. Currently required version:

[litpro version]()

    0.8.4

Building Reactute is quite simple:

```shell
$ litpro -b . README.md
```

# Getting started

As it has been mentioned before, Reactuate is distributed as a dependency, and can, therefore, be installed with npm (assuming you already initialized your project with `npm init`):

```shell
$ npm install --save-dev reactuate
```

The rest of this manual will introduce you to concepts and software used in the stack.


# Webpack Layer

We serve the application in development mode and package the production version by employing [webpack](http://webpack.github.io) package [webpack@1.12.11](# ":|dependency"):

## Webpack Configuration

There's normally little to no Webpack configuration tweaking you need to do.

By default, it will assume your index.html to be this:

[index.html]()
```html
<!doctype html>
<html lang="en">
	<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Reactuate-based application</title>
	</head>
	<body>
		<div id="app"></div>
	</body>
</html>
```

[index.html](#:index.html "save:")

When you are ready to override it, simply copy the above file to the root of your project:

[index file]()
```js
require('fs').existsSync(path.join(process.cwd(), 'index.html')) ?
  path.join(process.cwd(), 'index.html') : path.join(__dirname, 'index.html')
```
This file will be processed with [html-webpack-plugin@1.7.0](# ":|dependency"). 

Reactuate will search for your source code files in this directory in your project:

[source directory]()

    src

It will assume your main file in that directory to be

[main file]()

    index.js

All the JavaScript files are going to be process by Babel through the use of
[babel-loader@0.2.1](# ":|dependency") plugin, current version:

To enable ES2015 syntax and experimental features, the following plugins are required:

* [babel-preset-es2015@6.3.13](# ":|dependency")
* [babel-preset-stage-0@6.3.13](# ":|dependency")

To enable React-specific features, a number of Babel plugins is required:

* [babel-plugin-react-transform@2.0.0](# ":|dependency")
* [babel-preset-react@6.3.13](# ":|dependency")
* [babel-preset-react-hmre@1.0.1](# ":|dependency")

In production builds, following optimizations are used:

* [babel-plugin-transform-react-constant-elements@6.4.0](# ":|dependency")
* [babel-plugin-transform-react-inline-elements@6.4.0](# ":|dependency")
* [babel-plugin-transform-react-remove-prop-types@0.1.0](# ":|dependency")

Source code builds will produced into this directory in your project:

[build directory]()

    build

Other required packages:

* [json-loader@0.5.4](# ":|dependency")

[]()

This is how the configuration is composed:

[webpack-config.js](# "save:")
```js
var path = require('path')

var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function(options) {
  var plugins = []
  var loaders = []

  var production = process.env['NODE_ENV'] === 'production'
  var src = '_":source directory"'
  var main = '_":main file"'
  var index = _":index file"
  console.log('Using ' + index + ' as an index file')

  var entry = path.resolve(process.cwd(), path.join(src, main))
```

When in development mode, webpack should use Webpack development server:

```js
  if (!production) {
    entry = [
        "webpack-dev-server/client?http://localhost:3000", // Needed for hot reloading
        "webpack/hot/only-dev-server", // See above
        entry
      ]
  }
```

and enable hot module replacement

```js
  if (!production) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
    plugins.push(new HtmlWebpackPlugin({template: path.resolve(process.cwd(), index), inject: true}))
  }
```

```js
var jsLoaders = []
```
Reactuate enables ES2015, react/react hot module replacement, and stage-0 presets:

```js
  var react = require.resolve('babel-preset-react')
  var es2015 = require.resolve('babel-preset-es2015')
  var stage0 = require.resolve('babel-preset-stage-0')
  var react_hmre = require.resolve('babel-preset-react-hmre')
  jsLoaders.push('babel-loader?{presets:["' + react + '","' + es2015 + '","' + stage0 + '"],env: {development: {presets: ["' + react_hmre + '"]}, production: {plugins: ["transform-react-remove-prop-types","transform-react-constant-elements","transform-react-inline-elements"]}}}')
```

```js
  loaders.push({test: /\.js$/,
    loaders: jsLoaders,
    exclude: /node_modules/
  })
```

Reactuate also allows importing JSON files with [json-loader](https://github.com/webpack/json-loader) loader.

```js
  loaders.push({ test: /\.json$/, loader: 'json'})
```

```js
  return {
    entry: entry,
    plugins: plugins,
    output: {
      path: path.resolve(process.cwd(), '_":build directory"'),
      publicPath: '/',
      filename: 'js/bundle.js'
    },
    module: {loaders: loaders},
    target: "web", // Make web variables accessible to webpack, e.g. window
    stats: false, // Don't show stats in the console
    progress: true,
```

An important part is being able to resolve reactuate's own dependencies

```js
    resolve: {
      root: [path.resolve(path.join(__dirname, 'node_modules')), path.resolve(path.join(process.cwd(), 'node_modules'))]
    },
    resolveLoader: {
      root: [path.resolve(path.join(__dirname, 'node_modules')), path.resolve(path.join(process.cwd(), 'node_modules'))]
    }
  }
}
```


## Running a development Webpack server

It is imperative to be able to run an easy to update, hot-reloadable development version of the application before shipping an optimized version of it. This is what [webpack-dev-server@1.14.1](# ":|dependency") does.

In order to start a development Webpack server, you can run:

[]()
```shell
$ node node_modules/reactuate/webpack-dev-server.js
```

Alternatively, you can add a convenience helper to your `package.json`:

[]()
```json
"scripts": {
  "start": "node node_modules/reactuate/webpack-dev-server.js"
}
```

With this you can simply run the following to start your development server:

```shell
$ npm start
```

### Development server

[webpack-dev-server.js](# "save:")
```js
var path = require('path'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require(path.join(__dirname, 'webpack-config'))()

console.log('Starting server...\n')

new WebpackDevServer(webpack(config), { // Start a server
  publicPath: config.output.publicPath,
  hot: true, // With hot reloading
  inline: false,
  historyApiFallback: true,
  quiet: false
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err)
  } else {
    console.log('Server started')
    console.log('Listening at localhost:3000')
  }
})
```

# Language Layer

## Babel Layer

Reactuate encourages the use of recent versions of Babel. [Babel](http://babeljs.io) is a transpiler from future versions of ECMAScript to JavaScript you can run in the browser today [babel-core@6.4.0](# ":|dependency").

Babel 6 is still fairly new and unfortunately, not all tools support it well, but this should be less of a problem going forward.

In order to avoid generating plain JavaScript files for this package, we also include [babel-register](https://babeljs.io/docs/usage/require/) [babel-register@6.4.3](# ":|dependency")

# React Layer

Reactuate is a React-based stack, so it naturall depends on [react@0.14.6](# ":|dependency") and
[react-dom@0.14.6](# ":|dependency").

## Redux Layer

Part of React's power lies in the so called "Flux" architecture. There are many
different implementations of it, and Reactuate is using [Redux](http://rackt.org/redux/) [redux@3.0.5](# ":|dependency") and its React binding [react-redux@4.0.6](# ":|dependency")

## React Routing

As a foundation for routing React applications, we use [react-router](https://github.com/rackt/react-router) 
[react-router@2.0.0-rc5](# ":|dependency")

We also supplement it with a [Redux extension](https://github.com/acdlite/redux-router) [redux-router@1.0.0-beta7](# ":|dependency"). Although this
one is less stable, we believe it has more comprehensive functionality comparing to [redux-simple-router](redux-simple-router).

We encapsulate `ReduxRouter` into our own Router to hide some of the complexity.

[Router.js]()
```js
import React from 'react'
import { ReduxRouter } from 'redux-router'

class Router extends React.Component {

  static propTypes = {
     children: React.PropTypes.node
  };

  render() {
    return (
      <ReduxRouter>
        {this.props.children}
      </ReduxRouter>
    )
  }
}
```

However, since there is more than one thing that requires your routes, we
export a function that takes your routes, and produces a `Router` component
as well as a [store enhancer](http://rackt.org/redux/docs/Glossary.html#store-enhancer):

```js
import { createHistory } from 'history'
import { reduxReactRouter, routerStateReducer } from 'redux-router'

export default function(routes) {
  return {
    Router: React.createClass({

      render() {
        return <Router>{routes}</Router>
      }

    }),
    storeEnhancer: reduxReactRouter({routes, createHistory})
  }
}
```

[Router.js](#:Router.js "save:")

# Appendix 0. Package Dependency

To simplify dependency definition, the following `dependency` definition should be used:

[dependency](# "define:")
```js
function() {
  global.dependencies = {}
  return function(input, args, name) {
    name = name.split(doc.colon.v).reverse()[2]
    var arr = name.split("@"),
        package = arr[0],
        version = arr[1]
    global.dependencies[package] = version
    var deps = []
    for (k in global.dependencies) {
      deps.push('"' + k + '": "' + global.dependencies[k] + '"')
    }
    doc.store("package.json dependencies", deps.join(",\n"))
  }
}()
```


# Appendix A. Package file

[package.json](# "save:")

```json
{
  "name": "reactuate",
  "version": "_"Version"",
  "description": "Reactuate is an opinionated React-based stack",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" &&   exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/reactuate/reactuate.git"
  },
  "keywords": [
    "react",
    "redux",
    "frontend"
  ],
  "author": "Yurii Rashkovskii <yrashk@gmail.com>",
  "license": "Apache-2.0",
  "engines": {"node": ">=_"Requirements:Node.js version" <6.0"},
  "dependencies": {
      _"package.json dependencies"
  },
  "bugs": {
    "url": "https://github.com/reactuate/reactuate/issues"
  },
  "homepage": "https://github.com/reactuate/reactuate#readme"
}
```


# Appendix Z. Entry point

[index.js](# "save:")
```js
require('babel-register')
module.exports = 
{
  router: require('./Router').default
}
```