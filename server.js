// Get dependencies
var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

// Create the app
var app = express();

// Enable CORS for Angular frontend
app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// establish a connection to the mongo database
mongoose
  .connect('mongodb://localhost:27017/petAdoptionApp')
  .then(() => {
    console.log('Connected to Database: petAdoptionApp');
  })
  .catch((err) => {
    console.log('Connection to database failed: ' + err);
  });

// API routes (we will create these soon)
app.use('/api/pets', require('./server/routes/pets'));
app.use('/api', require('./server/routes/app'));

// // Serve Angular frontend
// app.use(express.static(path.join(__dirname, 'dist/pet-adoption-app')));

// // Return Angular index.html for any unknown routes
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/pet-adoption-app/index.html'));
// });

// Set port
const port = process.env.PORT || 3000;
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on port 3000
server.listen(port, () => console.log(`API running on port ${port}`));
