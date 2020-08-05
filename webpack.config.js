const path = require(`path`);
const webpack = require(`webpack`);
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const {CleanWebpackPlugin} = require(`clean-webpack-plugin`);
const CopyWebpackPlugin = require(`copy-webpack-plugin`);
const ImageminPlugin = require(`imagemin-webpack-plugin`).default;

const isProd = process.env.NODE_ENV === 'production';

console.log(__dirname);
console.log(path.join(__dirname, `src`));
console.log(path.resolve(__dirname, `src`));

module.exports = {
  context: path.join(__dirname, `src`),

  entry: {
    app: [
      `./js/app.js`,
      `./scss/style.scss`
    ],
  },

  output: {
    filename: `js/[name].bundle.js`,
    path: path.join(__dirname, `build`),
  },

  devServer: {
    contentBase: path.join(__dirname, `app`),
    compress: false,
    open: false,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require(`autoprefixer`)
              ],
            }
          },
          'sass-loader'
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: `file-loader`,
            options: {
              name: `[path][name].[ext]`,
            },
          },
          {
            loader: 'img-loader',
            options: {
              plugins: isProd && [
                require('imagemin-gifsicle')({
                  interlaced: false
                }),
                require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false
                }),
                require('imagemin-pngquant')({
                  floyd: 0.5,
                  speed: 2
                }),
                require('imagemin-svgo')({
                  plugins: [
                    {removeTitle: true},
                    {convertPathData: false}
                  ]
                })
              ]
            }
          }
        ],
      },
      {
        test: /\.svg$/,
        use: [
          `svg-url-loader`
        ],
      },
      {
        test: /\.(woff2?|eot|[ot]tf)$/,
        use: [
          {
            loader: `file-loader`,
            options: {
              name: `[path][name].[ext]`,
            },
          }
        ]
      }
    ],
  },


  plugins: [
    new MiniCssExtractPlugin({
      filename: `css/style.css`
    }),

    new CleanWebpackPlugin(),

    new CopyWebpackPlugin(
        [
          {from: `./img`, to: `img`}
        ],
        {
          ignore: [
            {glob: `svg/*`}
          ]
        }
    ),

    new ImageminPlugin({
      test: /\.(png|svg|jpe?g|gif)$/i,
      disable: !isProd,
      pngquant: {
        speed: 2,
        dithering: 0.5
      },
      jpegtran: {
        progressive: true
      }
    }),

    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise'
    })
  ],

  devtool: isProd ? false : 'source-map'
};
