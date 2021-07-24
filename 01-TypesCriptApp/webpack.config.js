//ver https://www.youtube.com/watch?v=DqjuUA_SDQg&t=22s
// const {merge} = 
const path = require("path");
const nodeExternals = require("webpack-node-externals");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
//
module.exports = {
  target : 'node',
  mode: "production",
  devtool: 'inline-source-map',

  entry: {
    app: path.resolve(__dirname, "src", "index.ts"),
    
  },
  output: {
    //filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    filename: '[name].[contenthash].bundle.js',        // generara un hash diferente con cada compilado para que no quede en la cache de los navegadores
   
  },

  module: {
    rules: [
      // {
      //   test: /\.js$/i,
      //   use: "babel-loader",
      //   exclude: /node_modules/,
      // },
      {
        test: /\.(ts|tsx)$/i, // que archivos vas a soportar . Expresion regular
        exclude:  /node_modules/,
        use:"ts-loader"
        
       
      },
    ],
  },
  resolve :{
    fallback: { 
      "path": false
    },
    extensions: ['.tsx', '.ts','.js', '.json', '.wasm']
  }
 
};
