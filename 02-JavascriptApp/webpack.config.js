const path = require("path");
module.exports = {
  target : 'node',
  mode: "production",
  entry: {
    app: path.resolve(__dirname, "src", "index.js"),
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
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
    
  
 
};
