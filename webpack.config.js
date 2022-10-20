const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

const pages = ['index', 'game', 'results'];

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  entry: pages.reduce((config, page) => {
    config[page] = `./src/${page}.js`;
    return config;
  }, {}),
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: "[name].js",
  },
  resolve: {
    alias: {
      'img': './img'
    }
  },
  plugins:
    [].concat(
      pages.map(
        (page) =>
          new HtmlWebpackPlugin({
            inject: true,
            template: `./${page}.html`,
            filename: `${page}.html`,
            chunks: [page],
          })
      )
    ),
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [
      '...',
      new CssMinimizerPlugin()
    ],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-preset-env')],
              }
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.ttf$/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env",]
          }
        }
      }
    ]
  }
}