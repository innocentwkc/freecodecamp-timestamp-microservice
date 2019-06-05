// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var moment = require('moment')

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp endpoint... 
app.get("/api/timestamp/:date_string?", function (req, res) {
  
  var inputDate = req.params.date_string
  var unix = null
  var natural = null
  
  function toUnix(date) {
    // Conver from natural date to unix timestamp
      return moment(date, "MMMM D, YYYY").format("X");
  }

  function toNatural(unix) {
      // Convert unix timestamp to natural date
      return moment.unix(unix).format("MMMM D, YYYY");
  }
  
  // Check initial unix time
  if (+inputDate >= 0) {
      unix = +inputDate
      natural = toNatural(unix)
  }
  
  // Check initial natural time
  if (isNaN(+inputDate) && moment(inputDate, "MMMM D, YYYY").isValid()) {
      unix = +toUnix(inputDate)
      natural = toNatural(unix)
  }
  
  var extractedResult = (unix == null) ? "Invalid Date": natural
  
  var date = { "unix": unix, "utc": natural }
  var error = { "error": "Invalid Date" }
  
  if (moment(inputDate, "MMMM D, YYYY").isValid()) {
    res.send(date) 
  } else {
    res.send(date) 
  }
  
  // res.send(output)
});
    



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});