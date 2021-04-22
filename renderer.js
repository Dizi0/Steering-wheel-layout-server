// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
// Dans le processus de rendu (page web).
//


const http = require("http")
const myParser = require("body-parser");
const express = require("express");
const app = express();

let port = ":443"
let fulladdr = ""
let connectionEstablished = false
let devicename = '';
let ip = '';

let address,
    ifaces = require('os').networkInterfaces();
for (const dev in ifaces) {
    ifaces[dev].filter((details) => details.family === 'IPv4' && details.internal === false ? address = details.address: undefined);
}
// console.log(address)
shortaddress = address.replace("192.168.", "");
fulladdr = "http://"+ "192.168." + shortaddress + port
document.getElementById('localip').innerText += " " +  shortaddress


console.log("Listening ...")

function invert(number){
    if (number < 0){
        return Math.abs(number)
    }
    else if(number > 0){
        return -Math.abs(number)
    }
}

app.use(myParser.urlencoded({extended : true}));
app.get("/", function(request, response) {
    if(connectionEstablished === false){
        if(request.query.device !== undefined){
            devicename = request.query.device
            console.log(devicename)
            document.getElementById('device').innerText= devicename
            connectionEstablished =true
        }
    }
    if(request.query.Accelerator !== undefined) {
        document.getElementById('accel').value = invert(request.query.Accelerator)
    }
    if(request.query.Brake !== undefined) {
        document.getElementById('brake').value = invert(request.query.Brake)
    }
    if(request.query.Clutch !== undefined) {
        document.getElementById('clutch').value = invert(request.query.Clutch)
    }
    if(request.query.Wheel !== undefined) {
        document.getElementById("steering").style.transform = "rotate("+request.query.Wheel * 360+"deg)";
    }
    response.send("Message received.");
});

app.listen(443);
