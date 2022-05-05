# Using webpack in backend 
How to configure our packages to be delivered correctly using webpack

## Table of Contents

- [Intro ](#Intro)
- [Getting started](#Getting-started)
- [For 01-TypesCriptApp](#For-01-TypesCriptApp)
- [Deployd](#Deployd )
- [What do we need in build root folder](#What-do-we-need-in-build-root-folder)
- [Posible ERRORS](#Posible-ERRORS)

## Intro

In this example I will try to show the step to create a professional form release
In many cases I have seen that developers host their deploys on the server in the wrong way, Untranspiled code without minification and the worst ...
they copy all the node_modules in production !!!!
Frameworks like angular react lready have these things cooked up. and they are thought so that with a simple command like ng --prod it will do everything for us

But what about our NodeJs that run in the backend such as sheddulers , daemosn or any otherjobs that work in background ?

For practical purpose I am going to create 2 projects
     One for Typescript  (allocated in 01-TypesCriptApp) and  another one for pure  Javascript (in 02-JavascriptApp)


# Getting started 

### First of all 

For both projects we must have the following development dependencies installed

### Install webpack
    npm i -D webpack webpack-cli
### Install webpack pluging
    Copies individual files or entire directories, which already exist, to the build directory.
    In this case we'll copy extra bat and settings files that will serve as support to starat or run de app on the server
    `you'll need to install copy-webpack-plugin`

   - npm install copy-webpack-plugin --save-dev


### Install Babel 

- [Babel-page](https://babeljs.io/): tranpilate code WA2015 to old js 
Install via npm

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

### Install console logs colors
    npm install colors

# For a practical purposes

- this project will have two intentional dependencies to show the ability to include them in the packaging without having the need to copy and paste the node_modules folder in the hosting

### dayjs 
```bash
    npm i dayjs
```
### node-cron scheduler 
```bash
    npm install --save node-cron
```
 **types/node** I we use typescript.   Do you need to install type definitions for node Try `npm i --save-dev @types/node`


## For 01-TypesCriptApp 

### Typesript 
```bash
    npm install typescript --save-dev
```
### Type definitions for NodeJS

    npm i --save-dev @types/node

### Create tsconfig.json file to configure Typesript
```json
    {
        "compilerOptions": {
        "outDir": "./dist/",
        "noImplicitAny": true,
        "module": "es6",
        "target": "ES6",
        "sourceMap": true,
        "moduleResolution": "node",
        "allowJs": true,
        }
    }
```


## Deployd

- Create the release (runscript) --> npm run build 
- webpack will generate dist folder with the transpiled bundle.js bundle.js or the name you spesify in webpack output
- copy dist folder in production with package.json file in root dir. Not inside dist folder
- Posisionated in package.json file path directory, you can run either 

   node dist/bundle.js

or simply
        
    npm start



## What do we need in build root folder
 
In ./filesToRelease foder I left you some files tht you can use when you make the deployd. imply copy and paste them in the root destination directory
The files are:

### Option 1 serviceStart.bat `Optional you can create bat &&  package.json files`
 - serviceStart.bat
    ```bat  
        @echo on
        npm run prod2
        pause
    ```
- package.json
   Enshure that you've create package.json file with the correct script section:
```json
        {
        "name": "MyService",
        "version": "1.0.0",
        "description": "Servicio e automatizacion de importacion facturas y socios mensual",
        "main": "index.js",
        "scripts": {
            "start": "tsc && nodemon  --tls-min-v1.0   dist/bundle.js",
            "prod": "tsc && node --tls-min-v1.0  dist/bundle.js",
            "prod2": "nodemon dist/main.js",
            "test": "echo \"Error: no test specified\" && exit 1",
            "build": "webpack"
        },
        "author": "Marcelo F. Oviedo",
        "license": "ISC",
        "browserslist": "> 0.25%, not dead, not ie 11"

        } 
```

### Option2 serviceStartnode.bat: this method calls tsc and nodemom directly

 ```bat  
    @echo on
    tsc && nodemon    dist/bundle.js
    pause
```

# Posible ERRORS

    `Codule not found: Error: Can't resolve 'path' in  ...`
     `BREAKING CHANGE: webpack < 5 u `
- Solution

    Check if target: 'node' is configurated in webpack.config.js

    The target: 'node' option tells webpack not to touch any built-in modules like fs or path.



    
