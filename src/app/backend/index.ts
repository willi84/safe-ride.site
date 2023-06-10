import { MAX_FLOAT_DECIMAL } from './../config';
import { reduceFloat } from './../_shared/tools/tools';
import { readFile, writeFileSync } from './../_shared/fs/fs';
console.log('get data');


const data = readFile('data/unfaelle_2021.csv').toString();
// console.log(data);

const lines = data.split('\n');
console.log(lines.length);


// last latitued
const KEYS = lines[0].replace(/\r/, '').split(';');
console.log(KEYS)

const lat = KEYS[KEYS.length - 1];
const long = KEYS[KEYS.length - 2];
const isRad = 'IstRad';

const indexLat = KEYS.length - 1;
const indexLon = KEYS.length - 2;
const indexRad = KEYS.indexOf(isRad)
const result = {
    unfaelle: []
};


lines.forEach((line:string, index: number) => {
    if(index === 0){
        return;
    }
    // if(index > 10){
    //     return;
    // }
    const dataSEt = line.replace(/\r/, '').split(';');
    const isRad = dataSEt[indexRad];
    if(isRad){
        const longitude = dataSEt[indexLon];
        const latitude = dataSEt[indexLat];
        const newLong = reduceFloat(longitude, MAX_FLOAT_DECIMAL);
        const newLat = reduceFloat(latitude, MAX_FLOAT_DECIMAL);
            result.unfaelle.push([
                [newLong, newLat]
                // { 
                //     oldValue: [longitude, latitude],
                //     newValue: [parseFloat(newLong), parseFloat(newLat)],
                // }
                
            ]);
                // long: dataSEt[indexLon], lat: dataSEt[indexLat]
            // })
        // longitude = parseFloat(longitude).toFixed(6).toString();

// console.log(latitude);  // Output: 54.768787
// console.log(longitude); // Output: 8.751233
    }
});

writeFileSync('src/app/dashboard/assets/unfaelle.json', JSON.stringify(result));
// writeFileSync('src/app/dashboard/assets/unfaelle.json', JSON.stringify(result, null, 4));

// const rea

// const readExcel = async (file: any) => {
//     const fileReader = await new FileReader()
//     fileReader.readAsArrayBuffer(file)

//     fileReader.onload = (e: any) => {
//       const bufferArray = e?.target.result
//       const wb = XLSX.read(bufferArray, { type: "buffer" })
//       const wsname = wb.SheetNames[0]
//       const ws = wb.Sheets[wsname]

//       const data = XLSX.utils.sheet_to_json(ws)
//       const fileName = file.name.split(".")[0]

//       console.log(data)
//     }

// readExcel('data/unfaelle_2021.csv');