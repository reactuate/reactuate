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
{`"scripts": {
  "start": "node node_modules/reactuate/webpack-dev-server.js"
}`}
        </code></pre>
        This way you can easily run your application:
        <pre><code>
{`$ npm start`}
        </code></pre>
       </li>
       <li>Also, add this to your package.json
       <pre><code>
{`"scripts": {
  "build": "NODE_ENV=production webpack --config node_modules/reactuate/default-webpack-config.js --progress --colors"
}`}
       </code></pre>
       This way you can easily make a production build of your application:
       <pre><code>
{`$ npm run build`}
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
