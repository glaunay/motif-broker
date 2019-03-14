import winston = require('winston');

const config = {
    levels: {
      error: 0,
      debug: 1,
      warn: 2,
      data: 3,
      info: 4,
      verbose: 5,
      silly: 6,
      custom: 7
    },
    colors: {
      error: 'red',
      debug: 'blue',
      warn: 'yellow',
      data: 'grey',
      info: 'green',
      verbose: 'cyan',
      silly: 'magenta',
      custom: 'yellow'
    }
  };

winston.addColors(config.colors);

function createFileTransport(path:string="./myNodeApp.log"):winston.transports.FileTransportInstance {

    let files = new winston.transports.File({ filename: path,
        format: winston.format.combine(
        winston.format.simple()
        ) });
    return files;
}

let consoleT = new winston.transports.Console(
  { 
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
});
winston.add(consoleT);

//let fileDefaultTransport:winston.transports.FileTransportInstance = createFileTransport();
//winston.add(fileDefaultTransport);

let logLevel:string = 'info';

function isLogLvl(value:string):boolean {
    return config.levels.hasOwnProperty(value)
}
export function setLogLevel(value:string):void {
    
    if(!isLogLvl(value))
        throw `Unrecognized logLvel "${value}"`;
    logLevel = value;
    winston.level = logLevel;
}

export function setLogFile(logFilePath:string):void {
    //winston.remove(fileDefaultTransport);
    let fileCustomTransport:winston.transports.FileTransportInstance = createFileTransport(logFilePath);
    winston.add(fileCustomTransport);
    //winston.level = logLevel;
}

export {winston as logger};