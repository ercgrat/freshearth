"use strict";
const express = require('express');
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

app.listen(80, function() {
    console.log("Listening on port 80.");
});
