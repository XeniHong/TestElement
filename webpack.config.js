const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");

const isBuild = process.env.NODE_ENV == "production";
const isDev = process.env.NODE_ENV == "development";

module.exports = {
  //entry: path.join(__dirname, 'src', 'index.pug'), //точка входа
  entry: path.join(__dirname, "src", "app.js"),
  output: {
    path: path.join(__dirname, "build"), //точка выхода
    filename: "index.[contenthash].js", //[contenthash:8]
    assetModuleFilename: path.join("images", "[name].[contenthash][ext]")
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|tsx|ts)$/,
        use: {
          loader: "babel-loader" // Используем babel-loader
        },
        exclude: /node_modules/
      },
      {
        test: /\.pug$/,
        loader: "pug-loader"
      },
      {
        test: /\.(html)$/,
        use: ["html-loader"]
      },
      {
        // обработка CSS
        test: /\.(pcss|css)$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              url: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js")
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
      {
        test: /\.svg$/,
        type: "asset/resource"
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/pages", "index.pug"),
      filename: "index.html"
    }),

    new FileManagerPlugin({
      events: {
        onStart: {
          delete: ["build"]
        },
        onEnd: {}
      }
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : "[name].[contenthash].css"
    }),
    new ESLintPlugin({
      files: "/src/js/*.js(x)"
    }),
    new StylelintPlugin({
      files: "/src/styles/*.(p)css"
    }),
    new CopyWebpackPlugin({
      patterns: [
        //{ from: path.resolve(__dirname, "src/images"), to: "images" },
        { from: path.resolve(__dirname, "src/fonts"), to: "fonts" }
      ]
    })
  ],
  devServer: {
    watchFiles: path.join(__dirname, "src"),
    port: 9000 //по умолчанию 8080
  }
};
