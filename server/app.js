import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { serverPort } from '../etc/config.json';

import * as db from './utils/DataBaseUtils';

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});

// RESTful api handlers
app.get('/notes', (req, res) => {
    db.listNotes().then(data => res.send(data));
});

app.post('/notes', (req, res) => {
    db.createNote(req.body).then(data => res.send(data));
});

app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data));
});

//HEROKU
var port = process.env.PORT || 3000; 

const server = app.listen(port, function() {
    console.log(`Server is up and running on port ${port}`);
});


//LOCALHOST
/*
const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});
*/