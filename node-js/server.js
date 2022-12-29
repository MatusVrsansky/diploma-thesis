const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();
const http = require('http').createServer(app);

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


const db = require("./models");
const Role = db.role;
db.sequelize.sync();


function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "moderator"
    });
   
    Role.create({
      id: 3,
      name: "admin"
    });
  }



var message = "<p style='font-weight:bold;'> Hi. My name is John </p>";


console.log('server.js')


// run cron 
const config = require('./config');
const scheduler = require('./scheduler');

scheduler.initCrons(config);


// foreach all data of table Users
// update table user with new notification text


// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/notifications.routes')(app);
require('./routes/twilio.routes')(app);
require('./routes/config.routes')(app);


http.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running ${process.env.PORT || 3000}`);

})