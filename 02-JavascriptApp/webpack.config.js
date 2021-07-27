const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
module.exports = {
  target : 'node',
  mode: "production",
  entry: {
    app: path.resolve(__dirname, "src", "index.js"),
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/service"),
     clean: true,
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        //test: /\.(ts|tsx)$/i, // que archivos vas a soportar . Expresion regular
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  resolve :{
    fallback: { 
      "path": false
    }
  }
    ,  plugins: [
      new CopyPlugin({
        patterns: [
          { from: "filesToRelease/serviceStart.bat", to: "../serviceStart.bat" },
          { from: "filesToRelease/package.json", to: "../package.json" }
    
        ],
      }),
    ]
  
 
};
