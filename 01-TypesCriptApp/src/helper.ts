import * as Color from "colors";
import * as dayjs from "dayjs";
import "dayjs/locale/es";
import * as fs from "fs";


export default class Helper {
  public static WriteFile(fileName: string, data: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.writeFile(fileName, data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public static AppendFile(fileName: string, data: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      fs.appendFile(fileName, data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public static OpenFile(fileName: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      var json = fs.readFileSync(fileName, "utf8");
      // console.log(json);
      resolve(json);
    });
  }

  public static async Move_old(source: string, dest: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        fs.rename(source, dest, function (err) {
          if (err) throw err;

          resolve("Moved");
          Helper.Log("File moved successfully : " + dest);
        });
      } catch (error) {
        Helper.LogError("Error moving file " + Helper.GetError(error));
        reject(error);
      }
    });
  }

  public static async Move(source: string, dest: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        fs.rename(source, dest, function (err) {
          if (err) {
            Helper.MoveLinux(source, dest);
          }

          resolve("Moved");
          Helper.Log(`File moved successfully : ${dest} dest`);
        });
      } catch (error) {
        //if (error.code === "EXDEV") {
          Helper.LogError(
            `Error moving file ${source} + ${Helper.GetError(error)}`
          );
          reject(error);
        
      }
    });
  }

  public static async MoveLinux(source: string, dest: string): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        fs.copyFile(source, dest, (err) => {
          if (!err) resolve("");
          else reject(err);
        });
        // Remove the old file
        fs.unlink(source, (err) => {
          if (!err) resolve("");
          else reject(err);
        });
      } catch (err) {
        reject(err);

      }
    });
  }

  /* 
    Coinvierte fecha local y retorna a formato ISO  
  */
  public static getTime_Iso() {
    dayjs().locale("es");

    let d = dayjs().toISOString();

    return d;
  }

  public static getMonth_MM(): String {
    return dayjs().format("MM");
  }

  /* 
   muestra log en consola y guarda en archivo
   */
  public static Log(message: string, save: boolean = true): void {
    if (!save) {
      save = true;
    }
    try {
      let logFileName = Helper.getFileNamePrefix() + "logs.txt";
      let log = Helper.getTime_Iso() + " INFO ";
      log = log.concat(message, "\n");
      if (save) {
        Helper.AppendFile(logFileName, log);
      }

      console.log(Color.green(log));
    } catch (error) {
      console.error(`Got an error trying to write to a file: ${error.message}`);
    }
  }
  /* 
   loguea un error en consola y guarda en archivo
   */
  public static LogError(message: string): void {
    let logFileName = Helper.getFileNamePrefix() + "logs.txt";
    let log = Helper.getTime_Iso() + " ERROR ";
    log = log.concat(message, "\n");
    console.log(Color.red(log));
    Helper.AppendFile(logFileName, log);
  }

  /* 
   returns YYYYMMDD_ prefix
   */
  public static getFileNamePrefix(): String {
    const d = dayjs().format("YYYYMMDD_");
    return d;
  }

  public static LogErrorFull(message: string, error: any): void {
    Helper.LogError(Helper.GetError(error));

    console.log(
      Color.red(
        Helper.getTime_Iso() + " " + message + "  " + Helper.GetError(error)
      )
    );
  }

  public static GetError(error: any): string {
    let message = error.message;
    if (error.response)
      message = message.concat(error.response.data.Message, "\n");
    return message;
  }

  /* Retorna 2021_04 */
  public static getPeriodo(): string {
    let dt = dayjs().format("YYYY_MM");
    return dt;
  }
}
