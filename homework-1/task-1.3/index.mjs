import fs from 'fs';
import csv from 'csvtojson';
import path from 'path';
import { pipeline } from 'stream';

const csvFolder = './csv';
const resultFolder = './result-whole';
const resultLineByLineFolder = './result-line-by-line';


chechResultFolder(resultFolder);
chechResultFolder(resultLineByLineFolder);

fs.readdir(csvFolder, function (err, files) {
    if (err) {
        return console.log(`Unable to scan directory: ${err}`);
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
    let readStream = fs.createReadStream(csvFile);
    let fileContent = [];

    readStream.on('data', (chunk) => {
        fileContent.push(chunk);        
    })
    .on('error', (error) => {
        console.log(`Read error: ${error}`);
    })
    .on('end', () => {
        csv()
        .on('error', (error) => {
            console.log(`Conversion error: ${error}`);
        })
        .fromString(fileContent.toString())
        .then((json) => {
            let transformed = transformArray(json);

            let writeStream = fs.createWriteStream(resultFile);
            writeStream.on('error', (error) => {
                console.log(`Write error ${error}`);
            });  
            writeStream.write(transformed);
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