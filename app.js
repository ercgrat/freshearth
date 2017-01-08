"use strict";
const express = require('express');
const http = require('http');
const https = require('https');
const fileSystem = require('fs');
const app = express();

app.use(express.static('node_modules'));
app.use(express.static('public'));

// HTML5 Mode Setup
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
}).on('error', function(error) {
    console.log("Error: \n" + error.message);
    console.log(error.stack);
});

// Specify SSL cert filepath
var options = {
    hostname: 'app.freshearth.io',
    port: 443,
    path: '/',
    method: 'GET',
    cert: fileSystem.readFileSync('/etc/letsencrypt/live/app.freshearth.io/cert.pem'),
    key: fileSystem.readFileSync('/etc/letsencrypt/live/app.freshearth.io/privkey.pem')
};
options.agent = new https.Agent(options);

http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

https.createServer(options, app).listen(443, function(){
    console.log("Listening on port 443.");
});