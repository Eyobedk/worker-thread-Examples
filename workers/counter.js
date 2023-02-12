const {workerData}= require('worker_threads');


const {port}= workerData;
const {data}= workerData;

// some heavy operation
let counter = data;

let num = 0;
for(let i=0; i<counter; i++){
    num++;
}

//port 1
port.postMessage(num);