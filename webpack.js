const TerserPlugin = require("terser-webpack-plugin");

const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === "production" ? true : false;

console.log({ NODE_ENV, isProduction });

module.exports = {
  entry: "./src/index.js",
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "source-maps" : "eval",
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false
        }
      })
    ]
  }
};
