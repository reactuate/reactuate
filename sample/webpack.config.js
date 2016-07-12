var conf = require('../default-webpack-config');

conf.output.publicPath =  '/build/';
conf.output.path =  './build/';

module.exports = conf;
