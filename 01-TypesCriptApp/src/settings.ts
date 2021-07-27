import  Helper  from "./helper";

import * as dotenv from "dotenv";



export class AppSettings {

  public static Instance:AppSettings;

  
    public  static async Create(): Promise<AppSettings>{
      
      dotenv.config({ path: __dirname+'/.env' });

      Helper.Log(__dirname)
      //let setting:   AppSettings;
     if(AppSettings.Instance)
      return AppSettings.Instance;
      else
      {
        var res = await Helper.OpenFile(`appsettins.${process.env.ENV || 'prod'}.json`);

        AppSettings.Instance = JSON.parse(res) as AppSettings;
      }
      
      return  AppSettings.Instance;
    } 


    public setting: Setting;
}


export class Setting {
  public apiUrlBase: string;
  public sourceFolder: string;
  public destFolder: string;
  public scheduling :string;
}
