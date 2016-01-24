import path  from 'path'
import yesno from 'yesno'
import { existsSync, readFileSync, writeFileSync } from 'fs'

function printInstructions() {
  console.log(`Add this to your package.json:

"scripts": {
  "start": "node node_modules/reactuate/webpack-dev-server.js"
}

  This way you can easily run your application:

$ npm start

  Also, you can add this to your package.json

"scripts": {
  "build": "NODE_ENV=production webpack --config node_modules/reactuate/default-webpack-config.js --progress --colors"
}

  This way you can easily make a production build of your application:

$ npm run build
`)
}

const cwd = process.cwd()
const packageJson = path.join(cwd, '..', '..', 'package.json')

const startScript = "node node_modules/reactuate/webpack-dev-server.js"
const buildScript = "NODE_ENV=production webpack --config node_modules/reactuate/default-webpack-config.js --progress --colors"

if (existsSync(packageJson)) {
  let pkg = JSON.parse(readFileSync(packageJson))
  let scripts = pkg.scripts || {}
  if (scripts.start !== startScript ||
      scripts.build !== buildScript) {
      printInstructions()
      yesno.ask('Reactuate can add these convenience helpers to your package.json automatically. Proceed? ([yes]/no)', true, function(ok) {
        if (ok) {
          console.log("Updating your package.json")
          let pkg = JSON.parse(readFileSync(packageJson))
          scripts.start = startScript
          scripts.build = buildScript
          pkg.scripts = scripts
          writeFileSync(packageJson, JSON.stringify(pkg, null, 4))
        }
        process.exit(0)
      })
  } else {
    console.log("Congratulations! Your package scripts are already configured for Reactuate")
  }
} else {
  console.log("WARNING: Looks like you haven't initialized your package with `npm init`")
  printInstructions()
}
