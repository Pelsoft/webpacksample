# Using webpack in backend 
How to configure our packages to be delivered correctly using webpack

## Intro

In this example I will try to show the step to create a professional form release
In many cases I have seen that developers host their deploys on the server in the wrong way, Untranspiled code without minification and the worst ...
they copy all the node_modules in production !!!!
Frameworks like angular react lready have these things cooked up. and they are thought so that with a simple command like ng --prod it will do everything for us

But what about our NodeJs that run in the backend such as sheddulers , daemosn or any otherjobs that work in background ?

For practical purpose I am going to create 2 projects
     One for Typescript  (allocated in 01-TypesCriptApp) and  another one for pure  Javascript (in 02-JavascriptApp)


#Getting start 

### First of all 

For both projects we must have the following development dependencies installed

### Install webpack
    npm i -D webpack webpack-cli

### Install Babel 

- [Babel-page](https://babeljs.io/): transpilador de codigo WA2015 a js viejo
Install via NPM

    - npm i -D babel-loader @babel/core  @babel/preset-env 
    - create file .babelrc in root directory
```json
    {
    "presets":[
        ["@babel/preset-env",{

            "corejs": 3.10,
            "useBuiltIns":"usage"
        }]
        ,"@babel/preset-typescript" ]
}
```

### Install nodemom 
- [nodemon-page](https://www.npmjs.com/package/nodemon): Is a tool that helps develop node.js based applications by `automatically restarting` the node application when file changes in the 
    To use nodemom you need to change yours scripts in package.json as show below

 
```json
  "scripts": {
            "start": "tsc && nodemon  --tls-min-v1.0   dist/app.js",
            "prod": "node app"}
        }
 "nodemonConfig": {
              "ignore": ["test/*", "docs/*"],
              "delay": "2500"
            }
```
If you specify a --config file or provide a local `nodemon.json` any package.json config is ignored.


## For 01-TypesCriptApp 

### Typesript 

    npm install typescript --save-dev

### Type definitions for NodeJS

    npm i --save-dev @types/node

***Note *** this project will have two intentional dependencies to show the ability to include them in the packaging without having the need to copy and paste the node_modules folder in the hosting
### dayjs 

    npm i dayjs

### node-cron scheduler 
    npm install --save node-cron
    
 **types/node** I we use typescript
'require'.   Do you need to install type definitions for node? Try `npm i --save-dev @types/node`


# deployd 

1 run --> npm run build script
2 webpack will generate dist folder with the transpiled main.js
3 copy dist folder in production with package.json file in root dir. Not inside dist folder
4 Posisionated in package.json file path directory, you can run either 
    node dist/main.js
        or simply
    npm start

## What do we need in build root folder
 

# Option 1 serviceStart.bat `Optional you can create bat &&  package.json files`
    
serviceStart.bat
    @echo on
    npm run prod2
    pause
    
package.json
   enshure that you've create package.json file with the correct script section:
```json
        {
        "name": "MyService",
        "version": "1.0.0",
        "description": "Servicio e automatizacion de importacion facturas y socios mensual",
        "main": "index.js",
        "scripts": {
            "start": "tsc && nodemon  --tls-min-v1.0   dist/main.js",
            "prod": "tsc && node --tls-min-v1.0  dist/main.js",
            "prod2": "nodemon dist/main.js",
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "webpack"
        },
        "author": "Marcelo F. Oviedo",
        "license": "ISC",
        "browserslist": "> 0.25%, not dead, not ie 11"

        } 
```

# Option2 serviceStartnode.bat: this method calls tsc and nodemom directly
    @echo on
    tsc && nodemon  --tls-min-v1.0   dist/main.js
    pause

***ERROR***: 

Al agregar cron-node y hacer npm runbuild 
    `Codule not found: Error: Can't resolve 'path' in  ...`
     `BREAKING CHANGE: webpack < 5 u `
    ### solution

    Cheack if target: 'node' is configurated in webpack.config.js

    The target: 'node' option tells webpack not to touch any built-in modules like fs or path.


<p align="center" style="font-weight:22px">
  nodemon
</p>

Is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
Installation  will be installed globally to your system path.

npm install -g nodemon

Usage
    nodemon [your node app]

    nodemon ./server.js localhost 8080

    
