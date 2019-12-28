const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'myapp.js'
  },
  mode: 'development',
  //mode: 'production'
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react', '@babel/env'],
            plugins: [
              ["@babel/plugin-proposal-decorators", {
                "legacy": true
              }],
              ["@babel/plugin-proposal-class-properties", {
                "loose": true
              }]
            ]
          }
        }
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              // options...
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {},
        }, ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/mystyles.css'
    }),
  ]
};