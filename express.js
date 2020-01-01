const express = require('express');
const path = require('path');
const app = express();

const webpack = require('webpack');
const config = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const compiler = webpack(config);

const port = 3000


//MongoDB
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://jacky:qwerty123@cluster0-db-cgad8.gcp.mongodb.net/shopsellingweb?retryWrites=true&w=majority', {useNewUrlParser: true});
var db = mongoose.connection;
db.once('open', () => console.log('connected to database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Setup static path
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(express.static(path.join(__dirname, "dist")));


//Default path
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

//Product router
const productRouter = require('./src/services/productServices');
app.use('/products', productRouter)

app.get('/staff', function (req, res) {
  res.sendFile(path.join(__dirname + '/staff.html'));
});

//App Start
app.listen(port, () => console.log(`Example app listening on port ${port}!`))