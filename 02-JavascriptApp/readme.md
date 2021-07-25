
## Deployd

- Create the release (runscript) --> npm run build 
- webpack will generate dist folder with the transpiled main.js bundle.js or the name you spesify in webpack output
- copy dist folder in production with package.json file in root dir. Not inside dist folder
- Posisionated in package.json file path directory, you can run either 

   - nodemon dist/main.js
   - node dist/main.js 
  -  npm start if web`ve creted package.json in root deployment folder


## What do we need in build root folder?
 
In ./filesToRelease foder I left you some files tht you can use when you make the deployd. imply copy and paste them in the root destination directory
The files are:

### Option 1 serviceStart.bat `Optional you can create bat &&  package.json files`
 - serviceStart.bat
    ```bat  
        @echo on
        npm run prod
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
            "start": "nodemon  dist/main.js",
            "prod": "nodemon dist/main.js"
          
        },
        "author": "Marcelo F. Oviedo",
        "license": "ISC",
        "browserslist": "> 0.25%, not dead, not ie 11"

        } 
```

### Option2 serviceStartnode.bat: this method calls tsc and nodemom directly

 ```bat  
    @echo on
     nodemon  dist/main.js
    pause
```

    
