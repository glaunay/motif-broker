import utils = require('util');
import program = require('commander');

import {logger, setLogLevel} from './logger';

import express = require('express');

let app = express();
app.use(express.json());

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}



program
  .version('0.1.0')
  .option('-n, --threads <nThread>', 'Number of distinct databases', parseInt)
  .option('-p, --port <portNum>', 'Port Listening Number', parseInt, 2345)
  .option('-v, --verbosity [logLevel]', 'Set log level', setLogLevel, 'info')
.parse(process.argv)

if (!program.threads)
    throw ('Please provide a number of pseudo databases to mimick');

logger.info(program.port);


let routeList:any[] = [...Array(program.threads).keys()].map( (k:number) => {
    let n = k + 1;
   /*
    app.get(`/db${n}`, function (req, res) {
        let t:number = getRandomInt(5) * 1000;
        logger.info(`Delay is ${t}`);



        setTimeout( function() {
            res.json({"meta": `GET request to the DB ${n} at ${t}`});
        }, t);
    */
    
    app.post(`/db${n}`, function (req, res) {
        let t:number = getRandomInt(5) * 1000;
        logger.info(`Delay is ${t}`);
        logger.info(`${utils.inspect(req.body, {showHidden: false, depth: null})}`);
        setTimeout( function() {
            res.json({"meta": `POST request to the DB ${n} at ${t}`});
        }, t);



    });
});

/*
for (let iNode of [...Array(program.threads).keys()]){
    logger.info(`${iNode}`);
}
*/


app.listen(program.port, () => {
    logger.info(`${program.threads} DB listening  listening on port ${program.port}!`)
})