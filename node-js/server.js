const express = require("express");
const cors = require("cors");
const app = express();
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

  // send email
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'microbitpython@gmail.com',
        pass: 'mbwnqmmpwgopnoga',
    }
});

var message = "<p style='font-weight:bold;'> Hi. My name is John </p>";

// test variables for temperature, wind ...
//html:"<p>Your message "+variable1+".Message continueous "+variable+"</p>"


var temperature = 23.25;
var wind = 45.5668;

const mailOptions = {
    from: 'microbitpython@gmail.com',
    to: 'vrsansky.matus@gmail.com',
    subject: 'Sent from Node.js',
    text: "Plaintext version of the message",
    html: "<h4>Microbit prediction</h4><p><strong>temeprature: </strong>" + temperature + "</p>" + "<p><strong>wind: </strong>" + wind + "</p>"
};

//

transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: '+ info.response);
    }
});


// run cron 
const config = require('./config');
const scheduler = require('./scheduler')

scheduler.initCrons(config);


// foreach all data of table Users
// update table user with new notification text

const User = db.user;

const results = await User.findAll();

console.log(results)
  // routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);