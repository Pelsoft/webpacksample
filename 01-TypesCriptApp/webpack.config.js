const CreateFileWebpack = require('create-file-webpack');
const path = require("path");


const options = {
  // path to folder in which the file will be created
  path: './dist',
  // file name
  fileName: 'service.bat',
  // content of the file
  content: '@echo on   npm run prod  pause'
};

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
    //filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    filename: '[name].[contenthash].bundle.js',        // generara un hash diferente con cada compilado para que no quede en la cache de los navegadores
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
    new CreateFileWebpack( options)
  ]
 
};
