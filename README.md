[![npm package][npm-badge]][npm]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Reactuate](#reactuate)
  - [Version](#version)
  - [License](#license)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Webpack Layer](#webpack-layer)
  - [Webpack Configuration](#webpack-configuration)
- [Reactuate Application](#reactuate-application)
  - [Running a development Webpack server](#running-a-development-webpack-server)
    - [Development server](#development-server)
- [Language Layer](#language-layer)
  - [Babel Layer](#babel-layer)
- [React Layer](#react-layer)
  - [Redux Layer](#redux-layer)
  - [React Routing](#react-routing)
  - [Layout](#layout)
  - [Domain](#domain)
  - [Managing effects](#managing-effects)
  - [Putting it all together](#putting-it-all-together)
- [Appendix 0. Package Dependency](#appendix-0-package-dependency)
- [Appendix A. Package file](#appendix-a-package-file)
- [Appendix B. .gitignore](#appendix-b-gitignore)
- [Appendix B1. .npmignore](#appendix-b1-npmignore)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Reactuate

Reactuate is an opinionated stack for building React-based frontend applications. Core objectives are as follows:

1. Fork-and-forget (or fork-and-follow) is not a great way to keep up with what's happening in the frontend space. Therefore, starting off from a cloned boilerplate "kit" is not an acceptable solution. Reactuate is distributed as a __dependency__.
1. Reactuate is strictly a frontend-oriented stack and is not meant to provide a foundation for so called "universal" (server and client side) JavaScript applications.
1. Reducing the amount of noise. Many kits suffer from the need to create too many files for each "functional vertical" (such as
   action creators, constants, reducer), which in turn leads to increased maintenance complexity (try renaming one of the vericals),
   "import nightmare" and inability to have a compact overview of the functionality.
1. Discovering and learning the capabilities of comprehensive stack solution could be complicated. What's even worse, maintaining such stacks can be equally painful. Therefore, unconventionally, Reactuate is written as a *literate program* and is meant to be read as a small book and be a concise reference manual — while being a functional library.
1. Don't cling on the legacy stuff. Move forward.

## Version

Current published version:

    0.1.7

## License

Reactuate is licensed under the terms of [Apache 2.0 license](LICENSE.md).

# Requirements

Reactuate requires the minimum of the following version of Node.js:

<!--+ [Node.js version]() -->

    v5.4.1

More recent versions are allowed, within the upper boundary of the next major version.

In order to produce the extracted source code of Reactuate (should you need it), you will need `litpro` npm package to be installed. Currently required version:

<!--+ [litpro version]() -->

    0.12.0

Building Reactuate is quite simple:

```shell
$ make
```

# Getting started

As it has been mentioned before, Reactuate is distributed as a dependency, and can, therefore, be installed with npm (assuming you already initialized your project with `npm init`):

```shell
$ npm install --save-dev reactuate
$ node node_modules/reactuate/webpack-dev-server.js
```

Then open [http://localhost:3000](http://localhost:3000) and complete the TODO
items listed there.

The rest of this manual will introduce you to concepts and software used in the stack.


# Webpack Layer

We serve the application in development mode and package the production version by employing [webpack](http://webpack.github.io) package [npm|webpack@1.12.11](# "push:"):

## Webpack Configuration

There's normally little to no Webpack configuration tweaking you need to do.

By default, it will assume your index.html to be this:

<!--+ [index.html]() -->
```html
<!doctype html>
<html lang="en">
	<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Reactuate Application</title>
	</head>
	<body>
		<div id="app"></div>
	</body>
</html>
```

<!--+ [sample/index.html](#:index.html "save:") -->

When you are ready to override it, simply copy the above file to the root of your project:

<!--+ [index file]() -->
```js
require('fs').existsSync(path.join(process.cwd(), 'index.html')) ?
  path.join(process.cwd(), 'index.html') : path.join(__dirname, 'sample', 'index.html')
```
This file will be processed with [npm|html-webpack-plugin@1.7.0](# "push:").

Reactuate will search for your source code files in this directory in your project:

<!--+ [source directory]() -->

    src

It will assume your main file in that directory to be `index.js, and if there is no such file in your project yet, Reactuate will use its own sample file.

<!--+ [main file]() -->

```js
require('fs').existsSync(path.join(src, 'index.js')) ?
  path.join(src, 'index.js') : path.join(__dirname, 'sample','index.js')
```


All the JavaScript files are going to be process by Babel through the use of
[npm|babel-loader@6.2.1](# "push:") plugin, current version:

To enable ES2015 syntax and experimental features, the following plugins are required:

* [npm|babel-preset-es2015@6.3.13](# "push:")
* [npm|babel-preset-stage-0@6.3.13](# "push:")
* [npm|babel-plugin-transform-export-extensions@6.4.0](# "push:")

To enable React-specific features, a number of Babel plugins is required:

* [npm|babel-plugin-react-transform@2.0.0](# "push:")
* [npm|babel-preset-react@6.3.13](# "push:")
* [npm|babel-preset-react-hmre@1.0.1](# "push:")

In production builds, following optimizations are used:

* [npm|babel-plugin-transform-react-constant-elements@6.4.0](# "push:")
* [npm|babel-plugin-transform-react-inline-elements@6.4.0](# "push:")
* [npm|babel-plugin-transform-react-remove-prop-types@0.1.0](# "push:")

Source code builds will produced into this directory in your project:

<!--+ [build directory]() -->

    build

<!--+ []() -->

This is how the configuration is composed:

<!--+ [webpack-config.js](# "save:") -->
```js
var path = require('path')

var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function(options) {
  var plugins = []
  var loaders = []

  var production = process.env['NODE_ENV'] === 'production'
  var src = '_":source directory"'
  var main = _":main file"
  console.log('Using ' + main + ' as an entry script')
  var index = _":index file"
  console.log('Using ' + index + ' as an index file')

  var entry = path.resolve(process.cwd(), main)
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
    plugins.push(new HtmlWebpackPlugin({template: index, inject: true}))
  }
```

In production, more HTML processing will happening

```js
if (production) {
  plugins.push(new HtmlWebpackPlugin({
    template: index,
    minify: { // Minifying it while it is parsed()
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    },
    inject: true // inject all files that are generated by webpack, e.g. bundle.js, main.css with the correct HTML tags
  }))
}
```

We will also define the location of this module:

```js
plugins.push(new webpack.DefinePlugin({"REACTUATE_DIRNAME": production ? "undefined" : JSON.stringify(__dirname)}))
```

In production, produce compacted and somewhat obscured JavaScript (no source
map to avoid divulging original source code's information)

```js
if (production) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({sourceMap: false, compress: {warnings: false}}))
}
```

It is quite convenient to be able to know if we're running a development or production instance in the browser:

```js
plugins.push(new webpack.DefinePlugin({
  "process.env": {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
  }
}))
```



```js
var jsLoaders = []
```
Reactuate enables ES2015, react/react hot module replacement, and stage-0 presets:

```js
  jsLoaders.push('babel-loader?{presets:["react","es2015","stage-0"],env: {development: {presets: ["react-hmre"]}, production: {plugins: ["transform-export-extensions","transform-react-remove-prop-types","transform-react-constant-elements","transform-react-inline-elements"]}}}')
```

```js
  loaders.push({test: /\.js$/,
    loaders: jsLoaders,
    exclude: /node_modules/
  })
```

Reactuate also allows importing JSON files with [json-loader](https://github.com/webpack/json-loader) [npm|json-loader@0.5.4](# "push:").

```js
  loaders.push({ test: /\.json$/, loader: 'json'})
```

Reactuate also allows importing CSS files with [npm|style-loader@0.13.0](# "push:") [npm|css-loader@0.23.1](# "push:"), [npm|less@2.5.3](# "push:") with [npm|less-loader@2.2.2](# "push:") and [npm|postcss-loader@0.8.0](# "push:").

```js
  loaders.push({ test: /\.css$/, loader: 'style!css'})
  loaders.push({ test: /\.less$/, loader: 'style!css!less'})
```

Reactuate also allows importing fonts and images with [npm|file-loader@0.8.5](# "push:") and [npm|url-loader@0.5.7](# "push:").

```js
  loaders.push({ test: /\.woff(2)?(\?.+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" })
  loaders.push({ test: /\.ttf(\?.+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" })
  loaders.push({ test: /\.eot(\?.+)?$/, loader: "file" },
   { test: /\.svg(\?.+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" })
  loaders.push({ test: /\.png$/, loader: "url-loader?limit=100000" })
  loaders.push({ test: /\.jpg$/, loader: "file-loader" })

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

An important part is being able to resolve application's own dependencies

```js
    resolve: {
      root: [path.resolve(path.join(process.cwd(), 'node_modules'))]
    }
  }
}
```

In order to automate your production builds, add this to your package.json:

<!--+ [npm run build]() -->
```json
"scripts": {
  "build": "NODE_ENV=production webpack --config node_modules/reactuate/default-webpack-config.js --progress --colors"
}
```

You will be able to run it with

<!--+ [npm run build command]() -->
```shell
$ npm run build
```

<!--+ [default webpack config]() -->
```js
var path = require('path')
var fs = require('fs')
var configFile = path.join(process.cwd(), "webpack.config.js")
var config = fs.existsSync(configFile) ? require(configFile) : {}
console.log('Using webpack config ' + configFile)
module.exports = require(path.join(__dirname, 'webpack-config'))(config)
module.exports._config = config
```

<!--+ [default-webpack-config.js](#:default-webpack-config "save:") -->

## Running a development Webpack server

It is imperative to be able to run an easy to update, hot-reloadable development version of the application before shipping an optimized version of it. This is what [npm|webpack-dev-server@1.14.1](# "push:") does.

In order to start a development Webpack server, you can run:

<!--+ []() -->
```shell
$ node node_modules/reactuate/webpack-dev-server.js
```

Alternatively, you can add a convenience helper to your `package.json`:

<!--+ [webpack-dev-server-script]() -->
```json
"scripts": {
  "start": "node node_modules/reactuate/webpack-dev-server.js"
}
```

With this you can simply run the following to start your development server:

<!--+ [webpack-dev-server-start]() -->
```shell
$ npm start
```

### Development server

<!--+ [webpack-dev-server.js](# "save:") -->
```js
var path = require('path'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    config = require(path.join(__dirname, 'default-webpack-config'))

console.log('Starting server...\n')

new WebpackDevServer(webpack(config), { // Start a server
  publicPath: config.output.publicPath,
  hot: true, // With hot reloading
  inline: false,
  historyApiFallback: true,
  quiet: false,
  proxy: config._config.devProxy
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

Reactuate encourages the use of recent versions of Babel. [Babel](http://babeljs.io) is a transpiler from future versions of ECMAScript to JavaScript you can run in the browser today [npm|babel-core@6.4.0](# "push:").

Babel 6 is still fairly new and unfortunately, not all tools support it well, but this should be less of a problem going forward.

In order to avoid generating plain JavaScript files for this package, we also include [babel-register](https://babeljs.io/docs/usage/require/) [npm|babel-register@6.4.3](# "push:")

ES6 also has new APIs that are provided by [npm|babel-polyfill@6.3.14](# "push:").

# React Layer

Reactuate is a React-based stack, so it naturall depends on [npm|react@0.14.6](# "push:") and
[npm|react-dom@0.14.6](# "push:").

## Redux Layer

Part of React's power lies in the so called "Flux" architecture. There are many
different implementations of it, and Reactuate is using [Redux](http://rackt.org/redux/) [npm|redux@3.0.5](# "push:") and its React binding [npm|react-redux@4.0.6](# "push:"). To enable asynchronous action creators, [npm|redux-thunk@1.0.3](# "push:") is used. It also uses [npm|redux-logger@2.3.2](# "push:") for logging.

Our own version of `createStore` takes care of a few things automatically.

<!--+ [createStore.js]() -->
```js
import { createHistory }                         from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider }                              from 'react-redux'
import thunk                                     from 'redux-thunk'
import { reduxReactRouter, routerStateReducer }  from 'redux-router'
import createLogger                              from 'redux-logger'
import sagaMiddleware                            from 'redux-saga'

import domainMiddleware                          from './domainMiddleware'

export default function(routes, domains) {
  let sagas = []
  for (var domainName in domains) {
    let sagasDict = domains[domainName].get('sagas')
    for (var sagaName in sagasDict) {
      sagas.push(sagasDict[sagaName])
    }
  }
  let store = compose(
    applyMiddleware(
```

It enables Saga middleware for complex asynchronous operations orchestration:

```js
      sagaMiddleware(...sagas),
```

It enables serializability of domain actions:

```js
      domainMiddleware,
```

It also enables asynchronous action creators:

```js
      thunk,
```

And adds logging in development mode:

```js
      createLogger({
        predicate: (getState, action) =>
        (process.env.NODE_ENV === 'development' &&
        action['type'] !== 'EFFECT_TRIGGERED' &&
        action['type'] !== 'EFFECT_RESOLVED' &&
        !action['type'].startsWith("@@redux")),
        actionTransformer: (action) => {
          if (action['type'] === '@@reactuate/action') {
            return action.payload
          } else {
            return action
          }
        }
        })),
```

It is important to note that it automatically injects a store enhancer for react-router:

```js
    reduxReactRouter({routes, createHistory})
  )(createStore)
  return store
}
```

<!--+ [createStore.js](#:createStore.js "save:") -->

## React Routing

As a foundation for routing React applications, we use [react-router](https://github.com/rackt/react-router)
[npm|react-router@1.0.3](# "push:") (which requires a peer dependency of [npm|history@1.17.0](# "push:"))

We also supplement it with a [npm|Redux extension](https://github.com/acdlite/redux-router) [redux-router@1.0.0-beta7](# "push:"). Although this
one is less stable, we believe it has more comprehensive functionality comparing to [redux-simple-router](redux-simple-router).

First of all, we want to define a way to create a conformant reducer:

* Inject `routerStateReducer` at `router`

<!--+ [combineReducers.js]() -->

```js
import { combineReducers }    from 'redux'
import { routerStateReducer } from 'redux-router'

export default function(reducers) {
   if (typeof reducers !== 'object') {
     throw "Reactuate reducers should be an object (and not a function)"
   }
   return combineReducers({router: routerStateReducer, ...reducers})
}
```

<!--+ [combineReducers.js](#:combineReducers.js "save:") -->

Since there is more than one thing that requires your routes, we
export a function that takes your routes, and produces a router component:

<!--+ [createRouter.js]() -->

```js
import React           from 'react'
import { ReduxRouter } from 'redux-router'
import { Provider }    from 'react-redux'

export default function(store, routes) {
  return <Provider store={store}><ReduxRouter>{routes}</ReduxRouter></Provider>
}
```


<!--+ [createRouter.js](#:createRouter.js "save:") -->

## Layout

Many React/Redux applications adopt the following directory layout (or a variation of it):

```
src/
   actions/
     UserActions.js
     FooActions.js
   constants/
     UserConstants.js
     FooConstants.js
   reducers/
     UserReducers.js
     FooReducers.js
   components/
     Login.js
     Dashboard.js
```

We find this layout very counter-productive comparing to organizing code by domains. The above layout
is only marginally better than organizing directories or packages by entity types. Consider doing this in Java:

```
com.foo.bar.
           classes
           interfaces
           singletons
           factories
```

Does this make a lot of sense to you? Hope not!

Therefore, we propose organizing Reactuate-based
applications by domain:

```
src/
   user/
      actions.js
      reducers.js
   small/
      index.js
```

This way, while working
on one domain, you don't need to jump across the
hierarchy of the project too much, and you can easily
rename the domain without having to rename 4-5 files!

## Domain

Now we have approached one of the important aspects of Reactuate. We structure our applications around domains, not types of artifacts.

While JavaScript as a language is quite fluid and doesn't possess a strong type
system, there are some great libraries available that solve this problem to an extent. Reactuate applications make a heavy use of [npm|tcomb@2.6.0](# "push:") and its helper module [npm|tcomb-form-types@1.1.0](# "push:").

First of all, we need to define a class representing a domain. It will later
become clearer why we need this.

<!--+ [Domain.js]() -->
```js
export default class Domain {

  constructor(prefix) {
    this.prefix = prefix || ""
  }

  withPrefix(name) {
    return (this.prefix == "" ? "" : this.prefix + "/") + name
  }

  withoutPrefix(name) {
    return name.replace(new RegExp(`^${this.prefix}\/`),'')
  }

  register(type, name, value) {
    this[type] = this[type] || {}
    this[type][name] = value
  }

  get(type) {
    return this[type] || {}
  }
}
```

<!--+ [Domain.js](# "save:") -->


Every domain begins with a state. We define state with tcomb's help:

<!--+ [Domain state example]() -->
```js
import ft from 'tcomb-form-types'

import { t, Domain } from 'reactuate'

const domain = new Domain("counter")
export default domain

const State = t.struct({
  counter: ft.Number.Integer
}, State)
```

In the above example, we are defining a state that has a counter. Now, we should define an increment action. Reactuate offers helper functionality to do so, in adherence with [FSA](https://github.com/acdlite/flux-standard-action) [npm|flux-standard-action@0.6.0](# "push:") guidelines:

<!--+ [createAction.js]() -->
```js
import t from 'tcomb'

export default function(domain, action, payload, meta) {
  let actionString = domain.withPrefix(action)
  let actionType = t.struct({
    type: t.refinement(t.Any, (v) => v === actionString, action),
    payload: t.maybe(payload || t.Any),
    error: t.maybe(t.refinement(t.Boolean, (n) => n == true, 'True')),
    meta: t.maybe(meta || t.Any)
  }, action.toString())
  actionType.prototype._action = true
  let newActionType = function(payload, error, meta) {
    return actionType({payload, error, meta, type: actionString})
  }
  for (var key in actionType) {
    newActionType[key] = actionType[key]
  }
  domain.register('actions', action, newActionType)
  return newActionType
}
```

<!--+ [createAction.js](#:createAction.js "save:") -->

Unfortunately, tcomb structures do not fit the definition of a plain object
required by redux, so we have to implement a custom middleware that strips the extra metadata.

<!--+ [domainMiddleware.js]() -->
```js
export default function ({ getState }) {
  return (next) => (action) => {
    if (typeof action._action !== 'undefined') {
      let newAction = {type: "@@reactuate/action", payload: {...action}, meta: {name: action.type}}
      return next(newAction)
    } else {
      return next(action)
    }
  }
}
```

<!--+ [domainMiddleware.js](#:domainMiddleware.js "save:") -->

<!--+ [Domain action example]() -->
```js

import { createAction } from 'reactuate'

const incrementParameter = t.struct({increment: ft.Number.Integer}, 'incrementParameter')
const IncrementCounter = createAction(domain, 'IncrementCounter',
                                      t.maybe(incrementParameter))
```

`IncrementCounter` in this example also becomes a synchronous action creator.

Reactuate has helper functionality that allows creating a reducer that (again)
can take advantage of tcomb. It also takes care of disabling state mutation (however, normally this shouldn't be necessary, if tcomb is used for action creators).

<!--+ [createReducer.js]() -->
```js
import t from 'tcomb'

export default function(domain, initialState, ...cases) {
  let reducer = (state = initialState, action) => {
    let typedAction = action
    if (action['type'] === '@@reactuate/action') {
      let actionCreator = domain.get('actions')[domain.withoutPrefix(action.meta.name)]
      if (!t.Nil.is(actionCreator)) {
        typedAction = actionCreator(action.payload.payload, action.payload.error, action.payload.meta)
      }
    }
    Object.freeze(state)
    let stateCases = cases.map(f => {
      if (typeof f === 'function' && typeof f.meta === 'undefined') {
        return (handler) => f(state, handler)
      } else {
        return f
      }
    })
    return t.match(typedAction, ...stateCases, t.Any, () => state)
  }
  domain.reducer = reducer
  return reducer
}
```
<!--+ [createReducer.js](#:createReducer.js "save:") -->

<!--+ [Domain reducer example]() -->
```js
import { createReducer } from 'reactuate'

const initialState = State({counter: 0}, 'CounterState')

const reducer = createReducer(domain, initialState,
    IncrementCounter, (state, action) => {
      let increment = 1;
      if (incrementParameter.is(action.payload)) {
        increment = action.payload.increment
      }
      return State.update(state, {counter: { $set: state.counter + increment }})
    })
```

Lets put this entire example together for the sample, exporting `reducer` (the naming is important) and the action creator. Did you notice we avoided creating
the whole layer of 'constants'?

<!--+ [Domain example]() -->
```js
_":Domain state example"
_":Domain action example"
_":Domain reducer example"
```

<!--+ [sample/counter/index.js](#:Domain-example "save:") -->

## Managing effects

When asynchronous (thunk middleware) action creates are getting too complex, it's a sign that it's time to manage effects in an orchestrated way. We are using [redux-saga](https://github.com/yelouafi/redux-saga), [npm|redux-saga@0.4.1](# "push:") for that.

<!--+ [createSaga.js]() -->
```js
export default function(domain, name, saga) {
  domain.register('sagas', name, saga)
}
```

<!--+ [createSaga.js](#:createSaga.js "save:") -->

The below examples show handling the counter example in an async way (and we're introducing a delay as well):

<!--+ [Saga example]() -->
```js
import ft               from 'tcomb-form-types'
import { t,
         Domain,
         createSaga,
         createAction,
         fork,
         take, put }    from 'reactuate'

import domain           from './index'

const asyncDomain = new Domain("counterAsync")

const incrementParameter = t.struct({increment: ft.Number.Integer}, 'incrementParameter')
const IncrementCounterDelayed = createAction(asyncDomain,
                                'IncrementCounterDelayed', t.maybe(incrementParameter))

function delay(millis) {
    return new Promise(resolve =>
      setTimeout( () => resolve(true), millis)
    )
}

createSaga(asyncDomain, 'IncrementCounterDelayed', function* () {
  while(true) {
     const nextAction = yield take(IncrementCounterDelayed.is)
     yield fork(function* () {
       yield delay(1000)
       yield put(domain.actions.IncrementCounter(nextAction.payload))
     })
   }
})

export default asyncDomain
```

<!--+ [sample/counter/async.js](#:Saga-example "save:") -->


## Putting it all together

<!--+ [Application.js]() -->
```js
import t               from 'tcomb'
import ReactDOM        from 'react-dom'

import createStore     from './createStore'
import combineReducers from './combineReducers'
import createRouter    from './createRouter'

export default class Application {

  constructor(properties) {
    this.routes = properties.routes
    this.element = properties.element || document.getElementById('app')
    this.domains = properties.domains || {}
    this.reducers = {}
    for (var key in this.domains) {
      if (!t.Nil.is(this.domains[key].reducer)) {
        this.reducers[key] = this.domains[key].reducer
      }
    }
    if (!!this.routes) {
      this.store = createStore(this.routes, this.domains)(combineReducers(this.reducers))
      this.router = createRouter(this.store, this.routes)
    }
  }

  render() {
    ReactDOM.render(this.router, this.element)
  }

}
```

<!--+ [Application.js](#:Application.js "save:") -->

<!--+ [index.js]() -->
```js
require('babel-register')
require('babel-polyfill')
module.exports = require('./index.es6.js')
```
<!--+ [index.js](#:index.js "save:") -->


<!--+ [index.es6.js]() -->
```js
export Application            from './Application'
export Domain                 from './Domain'
export createReducer          from './createReducer'
export createAction           from './createAction'
export createSaga             from './createSaga'
export React                  from 'react'
export { Route }              from 'react-router'
export { connect }            from 'react-redux'
export { bindActionCreators } from 'redux'
export t                      from 'tcomb'

export { take, put, race, call,
         apply, cps, fork, join,
         cancel, as } from 'redux-saga'
```
<!--+ [index.es6.js](#:index.es6.js "save:") -->

You can use it this way (this is the sample file you get by default, by the way!):

<!--+ [Example]() -->

```js
import { React, Route, Application,
         connect, bindActionCreators } from 'reactuate'

import counter from './counter'
import counterAsync from './counter/async'

class App extends React.Component {
  render() {
    return <div>{this.props.children}</div>
  }
}

class HomePage extends React.Component {
  handleIncrement() {
    this.props.actions.IncrementCounter()
  }
  handleIncrementDelayed() {
    this.props.actions.IncrementCounterDelayed()
  }
  render() {
    return (<div>
     <h1>Reactuate Application</h1>
     <p>
     Congratulations! You are running a Reactuate application now. Here is what you need to do to start developing your own application:
     </p>
     <ol>
       <li>Unless you have done so already, add a start script to your package.json:
        <pre><code>
{`_"Running a development Webpack server:webpack-dev-server-script|trim"`}
        </code></pre>
        This way you can easily run your application:
        <pre><code>
{`_"Running a development Webpack server:webpack-dev-server-start"`}
        </code></pre>
       </li>
       <li>Also, add this to your package.json
       <pre><code>
{`_"Webpack Configuration:npm run build"`}
       </code></pre>
       This way you can easily make a production build of your application:
       <pre><code>
{`_"Webpack Configuration:npm run build command"`}
       </code></pre>
       </li>
       <li>Copy the starter file from {`${typeof REACTUATE_DIRNAME === 'undefined' ? "<reactuate package dir>" : REACTUATE_DIRNAME}/sample/index.js`} to src/index.js</li>
     </ol>
     <div>
       <h5>Counter example</h5>
       {this.props.counter}
       <button onClick={() => this.handleIncrement()}>Increment</button>
       <button onClick={() => this.handleIncrementDelayed()}>Increment with delay</button>
     </div>
    </div>)
  }
}

HomePage = connect(state => ({counter: state.counter.counter}),
                   dispatch => ({actions:
                     bindActionCreators({...counter.actions, ...counterAsync.actions}, dispatch)}))(HomePage)

const routes = (
  <Route component={App}>
    <Route path="/" component={HomePage} />
  </Route>
)

new Application({routes, domains: {counter, counterAsync}}).render()
```

<!--+ [sample/index.js](#:Example "save:") -->


# Appendix 0. Package Dependency

The following `dependency` command is used to generate dependencies for
package.json:

<!--+ [dependency](# "define:") -->
```js
function(input, args, name) {
    var arr = input.split("@"),
        package = arr[0],
        version = arr[1]
    return '"' + package + '": "' + version + '"'
}
```

# Appendix A. Package file

We process all declared dependencies to produce dependencies:

<!--+ [package.json](# "save:") -->

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
      _"npm| .mapc dependency | .join \,\n"

  },
  "bugs": {
    "url": "https://github.com/reactuate/reactuate/issues"
  },
  "homepage": "https://github.com/reactuate/reactuate#readme",
  "babel": {"presets":["react","es2015","stage-0"]}
}
```

# Appendix B. .gitignore

<!--+ [.gitignore](# "save:") -->

All produced files should be ignored:

```
*
!Makefile
!README.md
!LICENSE.md
```

# Appendix B1. .npmignore

As npm documentation says:

"Use a .npmignore file to keep stuff out of your package. If there's no .npmignore file, but there is a .gitignore file, then npm will ignore the stuff matched by the .gitignore file. If you want to include something that is excluded by your .gitignore file, you can create an empty .npmignore file to override it"

<!--+ [.npmignore](# "save:") -->
 ```
 Makefile
 ```

[npm]: https://www.npmjs.org/package/reactuate
[npm-badge]: https://img.shields.io/npm/v/reactuate.svg?style=flat-square
