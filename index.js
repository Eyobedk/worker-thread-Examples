const express = require('express');
const config  =require('./config');

//worker constructor inside the worker threads
const {Worker, MessageChannel, workerData} = require('worker_threads');

const app =express();
const port = config.port || 3000;

app.get('/light', (req, res)=>{
    try{
        res.status(200).json({
            message: "this endpoint has non blocking operation"
        });
    }catch(err){throw err}
});

app.get('/heavy', (req, res)=>{
    try{
        const number = 12;
        const { port1, port2 } = new MessageChannel();

        //create a new worker thread by using the Worker constructor
       const worker = new Worker('./workers/counter.js', {workerData: {
        port: port2, data: number
       },transferList:[port2]});

       //the message event is fired, with the message data being the first argument to the event handler function. 
       port1.on("message", (data)=>{
            res.status(200).json({
                message: "counting numbers finished",
                data: data
            });
       })

       //handle errors
       worker.on("error", (data)=>{
            res.status(500).json({
                message: "an error has occured",
                error: data
            })
       })
    }catch(err){throw err}
});

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})