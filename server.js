'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var sortJson = require('sort-json');
var fs = require('fs');
var contacts = [];

///*--------------Trial for sort-json npm (not working)--------------------------*/ 
//const options = { ignoreCase: true, reverse: true, depth: 2};
//const copy = sortJson({ AA: 123, a: 1, b: 21 }, options);
//// copy => { b: 21, AA: 123, a: 1 }
// 
//sortJson.overwrite('data.json');

/*----------------------------Outputting Every HTML-------------------------------*/ 
app.get('/', ( req, res ) => {          
    res.sendFile(`${__dirname}/index.html`) // outputting to index / targetting the index.html
    
});

fs.readFile('data.json', 'utf8', (err, data) => { //declaring which json file to read
    if (err) throw err;
    contacts = JSON.parse(data); // calling data json file via contacts variable
    console.log(data);          // prints out json in terminal when file is read
    
});

//this is outputting date and time of changes/events in terminal
app.use((request, response, next) => {
//divider to know position
 console.log('############');
 console.log(new Date().toISOString(), request.method, request.originalUrl);
 return next();
});


//
app.use(express.static('./'))// change to ./public
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//gets the records / links the json to scripts.js
app.get('/show_all', ( req, res ) => {
    res.json(contacts)
});

//this is showing the port which local host is on
app.listen(1337, () => {
    console.log('Listening on port 1337!')
})