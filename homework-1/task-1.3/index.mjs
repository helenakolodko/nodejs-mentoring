import fs from 'fs';
import csv from 'csvtojson';
import path from 'path';
import { pipeline } from 'stream';

const csvFolder = path.join('.', 'csv');
const resultFolder = path.join('.', 'result-whole');
const resultLineByLineFolder = path.join('.', 'result-line-by-line');

chechResultFolder(resultFolder);
chechResultFolder(resultLineByLineFolder);

fs.readdir(csvFolder, function (err, files) {
    if (err) {
        return console.error(`Unable to scan directory: ${err}`);
    } 
    files.forEach(function (file) {
        console.log(`Converting file ${file}`); 
        let resultFile = path.join(resultFolder, path.basename(file, path.extname(file)) + '.txt')
        let csvFile = path.join(csvFolder, file);

        convertWholeFile(csvFile, resultFile);
        
        resultFile = path.join(resultLineByLineFolder, path.basename(file, path.extname(file)) + '.txt')

        convertFileLineByLine(csvFile, resultFile);
    });
});

function convertWholeFile(csvFile, resultFile) {
    fs.readFile(csvFile, (err, data) =>{
        if(err){
            return console.error(`Read error: ${error}`);
        }

        csv()
        .on('error', (error) => {
            console.log(`Conversion error: ${error}`);
        })
        .fromString(data.toString())
        .then((json) => {
            let transformed = transformArray(json);

            fs.writeFile(resultFile, transformed, (err) => {
                if(err){
                    console.error(`Write error ${err}`);
                }
            });
        });
    });     
}

function convertFileLineByLine(csvFile, resultFile) {
    let readStream = fs.createReadStream(csvFile);
    let writeStream = fs.createWriteStream(resultFile);

    pipeline(readStream,
        csv().subscribe((jsonObj,index) =>
        {
            transformJson(jsonObj);
        }),
        writeStream, 
        (err) => {
            if (err) {
            console.error(err);
            } 
        });
}

function transformArray(json){
    let result = '';    
    json.forEach(item => {
        transformJson(item);
        result += JSON.stringify(item) + '\n';
    });
    return result;
}

function transformJson(json){
    Object.entries(json)
    .reduce((t, [key, value]) => {  
        json[key.toLowerCase()] = value;
        delete json[key];
    }, {});
}

function chechResultFolder(resultFolder) {
    try {
        if (!fs.existsSync(resultFolder)) {
            fs.mkdirSync(resultFolder);
        }
    }
    catch (error) {
        console.error(`Unable to create result folder: ${error}`);
    }
}