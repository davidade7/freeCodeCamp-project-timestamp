// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function(req, res) {
  let returnedDate = new Date(req.params.date);

  // Check if there is no param
  if (!req.params.date) {
    let now = new Date()
    res.json({ unix: now.getTime(), utc: now.toUTCString() })
  }
  // Check if the date is valid
  else if (returnedDate.getTime() > 0) {
    res.json({ unix: returnedDate.getTime(), utc: returnedDate.toUTCString() });
  } 
  // Check if the date is an unix timestamp
  else if (req.params.date * 1 > 0) {
    res.json({ unix: req.params.date * 1, utc: new Date(req.params.date * 1).toUTCString() });
  } 
  // Else return error
  else {
    res.json({ error: "Invalid Date" })
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
