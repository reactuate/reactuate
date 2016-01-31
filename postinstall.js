'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _yesno = require('yesno');

var _yesno2 = _interopRequireDefault(_yesno);

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function printInstructions() {
  console.log('Add this to your package.json:\n\n"scripts": {\n  "start": "node node_modules/reactuate/webpack-dev-server.js"\n}\n\n  This way you can easily run your application:\n\n$ npm start\n\n  Also, you can add this to your package.json\n\n"scripts": {\n  "build": "NODE_ENV=production webpack --config node_modules/reactuate/default-webpack-config.js --progress --colors"\n}\n\n  This way you can easily make a production build of your application:\n\n$ npm run build\n');
}

var cwd = process.cwd();
var packageJson = _path2.default.join(cwd, '..', '..', 'package.json');

var startScript = "node node_modules/reactuate/webpack-dev-server.js";
var buildScript = "NODE_ENV=production webpack --config node_modules/reactuate/default-webpack-config.js --progress --colors";

if ((0, _fs.existsSync)(packageJson)) {
  (function () {
    var pkg = JSON.parse((0, _fs.readFileSync)(packageJson));
    var scripts = pkg.scripts || {};
    if (scripts.start !== startScript || scripts.build !== buildScript) {
      printInstructions();
      _yesno2.default.ask('Reactuate can add these convenience helpers to your package.json automatically. Proceed? ([yes]/no)', true, function (ok) {
        if (ok) {
          console.log("Updating your package.json");
          var _pkg = JSON.parse((0, _fs.readFileSync)(packageJson));
          scripts.start = startScript;
          scripts.build = buildScript;
          _pkg.scripts = scripts;
          (0, _fs.writeFileSync)(packageJson, JSON.stringify(_pkg, null, 4));
        }
        process.exit(0);
      });
    } else {
      console.log("Congratulations! Your package scripts are already configured for Reactuate");
    }
  })();
} else {
  console.log("WARNING: Looks like you haven't initialized your package with `npm init`");
  printInstructions();
}
