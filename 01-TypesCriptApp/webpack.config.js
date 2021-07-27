// const CreateFileWebpack = require('create-file-webpack');
const CopyPlugin = require("copy-webpack-plugin");

const path = require("path");




const addContent =()=>{

  let content = '@echo on   pause';
  content = string.concat(content, 'npm run prod' );  
  content = string.concat(content, 'npm run pause' )

}

module.exports = {
  target : 'node',
  mode: "production",
  devtool: 'inline-source-map',

  entry: {
    app: path.resolve(__dirname, "src", "index.ts"),
    
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist/service"),
    //filename: '[name].[contenthash].bundle.js',        // generara un hash diferente con cada compilado para que no quede en la cache de los navegadores
    clean: true,
   
  },

  module: {
    rules: [
     
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
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "filesToRelease/serviceStart.bat", to: "../serviceStart.bat" },
         { from: "filesToRelease/package.json", to: "../package.json" },
         { from: "appsettins.json", to: "../appsettins.prod.json" },
       
         
      ],
    }),
  ]
 
};
