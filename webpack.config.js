const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemovePlugin = require("remove-files-webpack-plugin");

const config = (env, argv) => {
  const { mode } = argv;

  const isDevMode = mode === "development";
  const isProdMode = mode === "production";

  return {
    entry: ["./src/index.js"],
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "bundle.js",
    },
    stats: isDevMode ? "minimal" : "normal",
    resolve: {
      extensions: ["*", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.(scss|sass|css)$/,
          exclude: /node_modules/,
          loaders: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: !!isDevMode },
            },
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10000,
              },
            },
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff2?|otf)$/,
          use: "file-loader",
        },
      ],
    },
    plugins: [
      new RemovePlugin({
        before: {
          include: ["./build/"],
          exclude: ["./build/.git"],
        },
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
        favicon: path.join(__dirname, "public", "favicon.ico"),
      }),
      new MiniCssExtractPlugin({
        filename: isDevMode ? "[name].css" : "[name].[contentHash].css",
        chunkFilename: isDevMode ? "[id].css" : "[id].[contentHash].css",
      }),
    ],
    devtool: isProdMode ? false : "eval-source-map",
    devServer: {
      contentBase: path.resolve(__dirname, "public"),
      contentBasePublicPath: "/",
      clientLogLevel: "error",
      compress: true,
      host: "localhost",
      https: false,
      port: 3000,
      liveReload: false,
      hot: true,
      hotOnly: true,
      transportMode: "ws",
      injectHot: true,
      open: "Firefox",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers":
          "X-Requested-With, content-type, Authorization",
      },
    },
  };
};

module.exports = config;
