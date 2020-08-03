import fs from 'fs';
import csv from 'csvtojson';

const csvFolder = './csv';
const resultFolder = './result';

const writeStream = fs.createWriteStream(resultFolder + '/test1.txt');
writeStream.on('error', (error) => {        
    console.log(`Write error ${error}`);
});

csv()
    .on('error', (error) => {        
        console.log(`Conversion error: ${error}`);
    })
    .fromFile(csvFolder + '/test1.csv')
    .subscribe((json, lineNumber) => {
        writeStream.write(JSON.stringify(json) + '\n');
    });