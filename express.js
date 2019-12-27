const express = require('express');
const path = require('path');
const app = express();

const webpack = require('webpack');
const config = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const compiler = webpack(config);

const port = 3000

//app.get('/', (req, res) => res.send('Hello World!'))

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(express.static(path.join(__dirname, "dist")));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/staff', function (req, res) {
  res.sendFile(path.join(__dirname + '/staff.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))