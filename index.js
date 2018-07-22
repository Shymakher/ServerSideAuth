// Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost:/auth');

// App Setup - middlewares
// logging framework
app.use(morgan('combined'));
// allows to others ports to address to this server`s port
app.use(cors());
// parsing incoming requests to json
app.use(bodyParser.json({type: '*/*'}));

router(app);

//404 catch error
app.use(function(req, res, next){
  res.send({error:"404"});
})

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening port on:', port);