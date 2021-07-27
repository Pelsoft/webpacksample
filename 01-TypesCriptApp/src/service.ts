import * as Color from 'colors';
import  Helper  from "./helper";
import { AppSettings } from "./settings";
import * as cron from 'node-cron';


export class ImportadorTomaEstado {

  constructor() {}

  public async Start() {
    
    
    // console.log(
    //   Color.blue("------------------Toma Estados Importer Start--------------------")
    // );
    //cada 2 minutos entre las 21 y 22 hs
    // */50 16   20-30 * *  At every 50th minute past hour 16 on every day-of-month from 20 through 30 
    // */2 16-17* * *       At every 2nd minute past every hour from 16 through 17.                    
     // cron.schedule("*/50 16 20-30 * *", async () => {
     //cron.schedule("* * * * *", async () => {
      cron.schedule(AppSettings.Instance.setting.scheduling, async () => {
      await this.DoWork();
    });
  }

 

  public async DoWork(): Promise<void> {
  
    

    try {
      Helper.Log(`tomaestado demmo is working  ` );
     
      
      console.log( Color.cyan('----------------'));
      const d=     this.GenerateData();
      console.log( Color.green(d));


      console.log( Color.cyan('----------------'));

    } catch (error) {
      Helper.LogErrorFull(` Error `, error);
    }
  }



  

    GenerateData ():any {
    const fecha = new Date();
    const data = {
      year: fecha.getFullYear(),
      month: fecha.getMonth() + 1
    };

    return data;
  }

}
