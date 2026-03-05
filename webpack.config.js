const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('./package.json');

const ensureTrailingSlash = (value) => {
  if (!value) {
    return '/';
  }

  return value.endsWith('/') ? value : `${value}/`;
};

const getPublicPathFromHomepage = () => {
  if (!packageJson.homepage) {
    return '/';
  }

  try {
    const homepageUrl = new URL(packageJson.homepage);
    return ensureTrailingSlash(homepageUrl.pathname);
  } catch (error) {
    return ensureTrailingSlash(packageJson.homepage);
  }
};

const publicPath = ensureTrailingSlash(process.env.ASSET_PATH || getPublicPathFromHomepage());

module.exports = {
  mode: 'production',
  entry: './src/index.js',

  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath,
    assetModuleFilename: 'assets/[name][contenthash][ext][query]',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],

      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true,
  },
};
