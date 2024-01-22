// index.js
// where your node app starts
require("dotenv").config();
// init project
const express = require("express");
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
let cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  let date = !isNaN(req.params.date)
    ? new Date(Number(req.params.date))
    : new Date(req.params.date);

  if (!req.params.date) {
    let date = new Date();
    let UTC = date.getTime() + 30000;
    UTC = new Date(UTC);
    let UTS = UTC.toUTCString();
    let UNIX = date.getTime() + 30000;
    res.json({ unix: UNIX, utc: UTS });
    return;
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
    return;
  }
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
