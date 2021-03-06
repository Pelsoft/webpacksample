import  Helper  from './helper';
import  { ImportadorTomaEstado } from './service';
import { AppSettings } from './settings';

const importer = new ImportadorTomaEstado();



// init().then(()=>{
//     console.log('Pelsoft service version 1.2')
//     importer.Start();
// });


init().then(()=>{
    importer.Start().then((res)=>{
     });
});

 
async function init() {
      try {
        let setting =  await AppSettings.Create();
        
        Helper.Log('Initializing ....');
        console.log(setting.setting );
      } catch (error) {
        Helper.LogError(`Got an error trying to load settings: ${error.message}`);
        
      }
    }