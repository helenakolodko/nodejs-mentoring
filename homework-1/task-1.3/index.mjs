import fs from 'fs';
import csv from 'csvtojson';
import path from 'path';

const csvFolder = './csv';
const resultFolder = './result';

chechResultFolder();

fs.readdir(csvFolder, function (err, files) {
    if (err) {
        return console.log(`Unable to scan directory: ${err}`);
    } 
    files.forEach(function (file) {
        console.log(`Convert file '${file}'`); 
        let resultFile = path.join(resultFolder, path.basename(file, path.extname(file)) + '.txt')
        let csvFile = path.join(csvFolder, file);
        convertFile(csvFile, resultFile);
    });
});

function convertFile(csvFile, resultFile) {
    const writeStream = fs.createWriteStream(resultFile);
    writeStream.on('error', (error) => {
        console.log(`Write error ${error}`);
    });

    csv()
        .on('error', (error) => {
            console.log(`Conversion error: ${error}`);
        })
        .fromFile(csvFile)
        .subscribe((json, lineNumber) => {
            writeStream.write(JSON.stringify(json) + '\n');
        });
}

function chechResultFolder() {
    try {
        if (!fs.existsSync(resultFolder)) {
            fs.mkdirSync(resultFolder);
        }
    }
    catch (error) {
        console.error(`Unable to create result folder: ${error}`);
    }
}